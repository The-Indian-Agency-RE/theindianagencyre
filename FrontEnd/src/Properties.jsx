import React, { useContext, useState } from 'react';
import { PropertyContext } from '../PropertyContext'; // <-- Import context
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  const { properties } = useContext(PropertyContext); // <-- Get properties from context
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  // Filter properties based on search & price
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice ? p.price >= parseInt(minPrice) : true;
    const matchesMax = maxPrice ? p.price <= parseInt(maxPrice) : true;
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">🏡 Property Listings</h2>

      {/* Search and filters */}
      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          className="border p-2 rounded w-1/4"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="border p-2 rounded w-1/4"
        />
      </div>

      {/* Property cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/property/${p._id}`)}
            >
              <img
                src={p.image || 'https://placehold.co/400x300'}
                alt={p.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.location}</p>
              <p className="text-blue-600 font-bold">₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
