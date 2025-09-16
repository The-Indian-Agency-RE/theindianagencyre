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

        {error && <p className="text-red-500">{error}</p>}

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
          <p>Loading properties...</p>
        ) : properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Bedrooms</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p, index) => (
                  <tr
                    key={p._id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="px-4 py-3">{p.title}</td>
                    <td className="px-4 py-3">{p.location}</td>
                    <td className="px-4 py-3">₹{p.price}</td>
                    <td className="px-4 py-3">{p.bedrooms}</td>
                    <td className="px-4 py-3">{p.description}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
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
