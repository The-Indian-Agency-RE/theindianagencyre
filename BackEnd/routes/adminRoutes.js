import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Property from "../models/Property.js";

const router = express.Router();

// Multer (store files in memory before uploading to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config (keys from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * GET: All properties (newest first)
 */
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

/**
 * POST: Add property with optional image
 */
router.post("/properties", upload.single("image"), async (req, res) => {
  try {
    const { title, location, price, bedrooms, description } = req.body;

    // Validation
    if (!title || !location || !price) {
      return res
        .status(400)
        .json({ error: "Title, location, and price are required." });
    }

    let imageUrl = "";

    // Upload to Cloudinary if image is provided
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "real_estate" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Image upload failed"));
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // Save property to DB
    const property = new Property({
      title,
      location,
      price,
      bedrooms,
      description,
      image: imageUrl,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add property" });
  }
});

/**
 * DELETE: Remove property by ID
 */
router.delete("/properties/:id", async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete property" });
  }
});

export default router;
