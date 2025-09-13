import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import OpenAI from 'openai';
import Property from '../models/Property.js';

const router = express.Router();

let client = null;

// ✅ Safe initialization with check
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '') {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("✅ OpenAI client initialized.");
} else {
  console.warn("⚠️ OPENAI_API_KEY is missing. AI search will be disabled.");
}

// AI Search Endpoint
router.post('/search', async (req, res) => {
  if (!client) {
    return res.status(503).json({ error: 'AI search unavailable. Missing API key.' });
  }

  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid query. Please provide a text query.' });
    }

    const prompt = `
      Convert this user query into a JSON with filters for MongoDB:
      Query: "${query}"
      Example output:
      {
        "location": "Mumbai",
        "priceMax": 50000,
        "bedrooms": 2
      }
    `;

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    // ✅ Safely parse AI response
    let filters = {};
    try {
      const aiResponse = response.choices[0]?.message?.content || '{}';
      filters = JSON.parse(aiResponse);
    } catch (err) {
      console.error("AI response parsing error:", err);
      return res.status(500).json({ error: 'AI response parsing failed' });
    }

    // ✅ MongoDB query
    const mongoQuery = {};
    if (filters.location) mongoQuery.location = { $regex: filters.location, $options: 'i' };
    if (filters.priceMax) mongoQuery.price = { $lte: filters.priceMax };
    if (filters.bedrooms) mongoQuery.bedrooms = filters.bedrooms;

    const properties = await Property.find(mongoQuery);
    res.json({ filters, properties });

  } catch (err) {
    console.error("AI search error:", err);
    res.status(500).json({ error: 'AI search failed' });
  }
});

export default router;
