import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables before anything else
dotenv.config();

// Local imports
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cloudinary from "./cloudinaryConfig.js"; // Make sure ES Module syntax is used here

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if DB fails to connect
  });

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json({ limit: "10mb" })); // Allow larger JSON payloads if images are uploaded

// API Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "✅ Real Estate API is running..." });
});

// Global Error Handler (to catch unhandled errors)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
