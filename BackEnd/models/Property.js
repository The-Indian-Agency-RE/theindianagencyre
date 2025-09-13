import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL or image path
    },
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
