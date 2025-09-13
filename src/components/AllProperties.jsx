import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import API from "../api";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";

    API.get("/properties", { params: { search: searchQuery } })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, [location.search]);

  const handleClearFilters = () => {
    navigate("/allproperties");
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
          🏡 <span>All Properties</span>
        </h2>
        <button
          onClick={handleClearFilters}
          className="mt-4 sm:mt-0 bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Clear Filters
        </button>
      </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map((p) => (
            <div
              key={p._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Image with Hover Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image || "https://placehold.co/400x300?text=No+Image"}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex justify-center items-center opacity-0 group-hover:opacity-100">
                  <Link
                    to={`/property/${p._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{p.location}</p>
                <p className="text-blue-600 font-extrabold text-lg">
                  ₹{p.price.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {p.description}
                </p>

                {/* EMI Button */}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/property/${p._id}?showCalculator=true`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition transform hover:scale-105"
                  >
                    Calculate EMI
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center mt-20">
          No properties found.
        </p>
      )}
    </div>
  );
};

export default AllProperties;
