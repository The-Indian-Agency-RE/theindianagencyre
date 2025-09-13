// AddProperty.jsx
import { useState } from "react";
import axios from "axios";

export default function AddProperty() {
  const [formData, setFormData] = useState({ title: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await axios.post("/api/admin/properties", formData);
      setSuccessMsg("✅ Property added successfully!");
      setFormData({ title: "", price: "" });
    } catch (err) {
      setSuccessMsg("❌ Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🏠 Add New Property
      </h2>

      {successMsg && (
        <div
          className={`mb-4 p-3 text-sm rounded-lg ${
            successMsg.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {successMsg}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Property Title
          </label>
          <input
            type="text"
            placeholder="e.g. Luxury Villa in Jaipur"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 15000000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}
