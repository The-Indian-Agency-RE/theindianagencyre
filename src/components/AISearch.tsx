'use client';

import React, { useState } from 'react';
import propertyService from '../lib/propertyService';
import { Property } from '@/types/property';


const AISearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Property[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const properties = await propertyService.searchProperties(query);
      const validProperties = properties.filter(p => 
        p.type === 'sale' || p.type === 'rent'
      ) as Property[];
      setResults(validProperties);
      if (validProperties.length === 0) {
        setError('No properties found matching your criteria');
      }
    } catch (err) {
      console.error('AI Search Error:', err);
      setError('Failed to perform search. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">🔍 AI Property Search</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. 2BHK in Mumbai under 50k"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}

      <div className="mt-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map(p => (
              <div key={p._id} className="border p-4 rounded shadow">
                <img
                  src={p.image || 'https://placehold.co/400x300'}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-semibold mt-2">{p.title}</h3>
                <p className="text-gray-600">{p.location}</p>
                <p className="text-blue-600 font-bold">₹{p.price}</p>
              </div>
            ))}
          </div>
        ) : !error && !loading && (
          <p className="text-gray-500 mt-4">No results yet. Try searching!</p>
        )}
      </div>
    </div>
  );
};

export default AISearch;
