import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  const API_BASE = "http://localhost:5000/api/admin";

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/properties`);
      setProperties(res.data);
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
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      if (editId) {
        await axios.put(`${API_BASE}/properties/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await axios.post(`${API_BASE}/properties`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        description: "",
        image: null,
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
      description: property.description,
      image: null,
    });
    setEditId(property._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/properties/${id}`);
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
            encType="multipart/form-data"
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
              type="number"
              name="price"
              placeholder="Price"
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
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400 col-span-2"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="col-span-2"
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
                      description: "",
                      image: null,
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
                    <td className="px-4 py-3">${p.price}</td>
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
