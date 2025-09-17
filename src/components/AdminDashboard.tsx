'use client';

import React, { useEffect, useState } from "react";
import propertyService from "../lib/propertyService";
import { Property } from "@/types/property";

interface FormData {
  title: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  type: "sale" | "rent";
  category: "residential" | "commercial";
  description: string;
  image: string;
  amenities: string;
  features?: string;
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "sale",
    category: "residential",
    description: "",
    image: "",
    amenities: "",
    features: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const fetchedProperties = await propertyService.getProperties();
      const typedProperties = fetchedProperties.map(property => ({
        ...property,
        type: property.type as "sale" | "rent",
        category: property.category as "residential" | "commercial"
      }));
      setProperties(typedProperties);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Process amenities and features as arrays
      const amenitiesArray = formData.amenities 
        ? formData.amenities.split(',').map(a => a.trim()).filter(a => a.length > 0)
        : [];
      
      const featuresArray = formData.features 
        ? formData.features.split(',').map(f => f.trim()).filter(f => f.length > 0)
        : [];

      if (editId) {
        // Create update data with all required fields and correct types
        const updateData = {
          id: editId,
          _id: editId,
          title: formData.title,
          location: formData.location,
          price: formData.price,
          type: formData.type as string,
          category: formData.category as string,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
          area: formData.area || "",
          description: formData.description || "",
          image: formData.image || "",
          gallery: [] as string[],
          amenities: amenitiesArray,
          coordinates: { lat: 17.385044, lng: 78.486671 },
        };
        await propertyService.updateProperty(editId, updateData);
        setSuccess("Property updated successfully!");
      } else {
        // Create property data object for adding new property
        const propertyData = {
          title: formData.title,
          location: formData.location,
          price: formData.price,
          bedrooms: formData.bedrooms || "",
          bathrooms: formData.bathrooms || "",
          area: formData.area || "",
          type: formData.type,
          category: formData.category,
          description: formData.description || "",
          image: formData.image || "",
          amenities: amenitiesArray,
          features: featuresArray,
          coordinates: { lat: 17.385044, lng: 78.486671 },
          gallery: [],
        };
        await propertyService.addProperty(propertyData);
        setSuccess("Property added successfully!");
      }

      // Reset form
      setFormData({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        type: "sale",
        category: "residential",
        description: "",
        image: "",
        amenities: "",
        features: "",
      });
      setEditId(null);
      
      await fetchProperties();
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area || "",
      type: property.type,
      category: property.category || "residential",
      description: property.description || "",
      image: property.image || "",
      amenities: property.amenities ? property.amenities.join(', ') : "",
      features: property.features ? property.features.join(', ') : "",
    });
    setEditId(property.id || property._id || "");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }
    
    try {
      await propertyService.deleteProperty(id);
      setSuccess("Property deleted successfully!");
      await fetchProperties();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete property");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      type: "sale",
      category: "residential",
      description: "",
      image: "",
      amenities: "",
      features: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🏠 Admin Dashboard
          </h1>
          <p className="text-slate-600">Manage your property listings</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              {success}
            </div>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              {editId ? "✏️ Edit Property" : "➕ Add New Property"}
            </h2>
            {editId && (
              <button
                onClick={handleCancel}
                className="text-slate-500 hover:text-slate-700 text-sm"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Luxury 3BHK Apartment"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Banjara Hills, Hyderabad"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g., 50,00,000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Area
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g., 1200 sqft"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="e.g., 3"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="e.g., 2"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Amenities and Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amenities
                </label>
                <input
                  type="text"
                  name="amenities"
                  placeholder="e.g., Swimming Pool, Gym, Parking"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Separate with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Key Features
                </label>
                <input
                  type="text"
                  name="features"
                  placeholder="e.g., Sea View, Garden, Balcony"
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Separate with commas</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the property in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {editId ? "Updating..." : "Adding..."}
                  </>
                ) : (
                  <>
                    {editId ? "Update Property" : "Add Property"}
                  </>
                )}
              </button>
              
              {editId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-400 text-white px-6 py-3 rounded-lg hover:bg-slate-500 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Properties List */}
        {loading && !editId ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading properties...</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-medium text-slate-800 mb-2">No Properties Found</h3>
            <p className="text-slate-600">Add your first property to get started.</p>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">
                Properties ({properties.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {properties.map((property) => (
                    <tr key={property.id || property._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {property.image ? (
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                                <span className="text-slate-500 text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {property.title}
                            </p>
                            <p className="text-sm text-slate-500 truncate">
                              {property.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          <p className="font-medium">₹{property.price}</p>
                          {property.bedrooms && (
                            <p className="text-slate-500">
                              {property.bedrooms} bed • {property.bathrooms || 0} bath
                            </p>
                          )}
                          {property.area && (
                            <p className="text-slate-500">{property.area}</p>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          property.type === 'sale' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors text-xs font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property.id || property._id || "")}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-xs font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}