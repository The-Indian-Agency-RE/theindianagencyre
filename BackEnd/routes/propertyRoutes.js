import express from 'express';
import { 
  createProperty, 
  getProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty 
} from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new property (protected)
router.post('/', protect, createProperty);

// Get all properties (public)
router.get('/', getProperties);

// Get single property by ID (public)
router.get('/:id', getPropertyById);

// Update a property (protected)
router.put('/:id', protect, updateProperty);

// Delete a property (protected)
router.delete('/:id', protect, deleteProperty);

export default router;
