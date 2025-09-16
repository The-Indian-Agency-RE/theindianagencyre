'use client';

import React, { useEffect, useState } from "react";
import propertyService from "../lib/propertyService";

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const fetchedProperties = await propertyService.getProperties();
      setProperties(fetchedProperties);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Process amenities as array
      const amenitiesArray = formData.amenities ? formData.amenities.split(',').map(a => a.trim()) : [];
      
      const propertyData = {
        ...formData,
        amenities: amenitiesArray,
        coordinates: { lat: 17.385044, lng: 78.486671 } // Default Hyderabad coordinates
      };

      if (editId) {
        await propertyService.updateProperty(editId, propertyData);
        setEditId(null);
      } else {
        await propertyService.addProperty(propertyData);
      }

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
      });

      fetchProperties();
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save property");
    }
  };

  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms || "",
      area: property.area || "",
      type: property.type,
      category: property.category,
      description: property.description,
      image: property.image || "",
      amenities: property.amenities ? property.amenities.join(', ') : "",
    });
    setEditId(property.id);
  };

  const handleDelete = async (id) => {
    try {
      await propertyService.deleteProperty(id);
      fetchProperties();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete property");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🏠 Admin Dashboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "✏️ Edit Property" : "➕ Add New Property"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g., 50,00,000)"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="area"
              placeholder="Area (e.g., 1200 sqft)"
              value={formData.area}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 col-span-2"
            />
            <input
              type="text"
              name="amenities"
              placeholder="Amenities (comma separated)"
              value={formData.amenities}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 col-span-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 col-span-2"
              rows="3"
            />
            <div className="flex gap-3 col-span-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {editId ? "Update Property" : "Add Property"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
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
                    });
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Properties List */}
        {loading ? (
          <div className="text-center py-4">
            <p>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No properties found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Bedrooms</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr
                    key={property.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-3">
                      {property.image ? (
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className="truncate" title={property.title}>
                        {property.title}
                      </div>
                    </td>
                    <td className="px-4 py-3">{property.location}</td>
                    <td className="px-4 py-3">₹{property.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        property.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.type === 'sale' ? 'Sale' : 'Rent'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{property.bedrooms}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
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
        )}
      </div>
    </div>
  );
}
