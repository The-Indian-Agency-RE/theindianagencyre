'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import propertyService from "../lib/propertyService";

const Rent = () => {
  const [rentals, setRentals] = useState([]);
  const [filters, setFilters] = useState({ location: "", min: "", max: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    propertyService.getProperties({ type: 'rent' })
      .then((rentalProperties) => {
        setRentals(rentalProperties);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ location: "", min: "", max: "" });
  };

  const filteredRentals = rentals.filter((p) => {
    const matchesLocation = p.location
      .toLowerCase()
      .includes(filters.location.toLowerCase());
    
    // Convert price string to number for comparison
    const priceNumber = parseInt(p.price.replace(/,/g, ''));
    const matchesMin = filters.min ? priceNumber >= parseInt(filters.min) : true;
    const matchesMax = filters.max ? priceNumber <= parseInt(filters.max) : true;
    
    return matchesLocation && matchesMin && matchesMax;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Rental Properties
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover premium rental homes and apartments tailored to your lifestyle
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Filter Properties
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 font-medium">
                {filteredRentals.length} Properties Found
              </span>
              {(filters.location || filters.min || filters.max) && (
                <button
                  onClick={clearFilters}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium underline transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Search by location or area"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Rent (₹)
              </label>
              <input
                type="number"
                name="min"
                placeholder="Min rent"
                value={filters.min}
                onChange={handleFilterChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Maximum Rent (₹)
              </label>
              <input
                type="number"
                name="max"
                placeholder="Max rent"
                value={filters.max}
                onChange={handleFilterChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
            <h3 className="text-2xl font-semibold text-slate-900">
              Available Rental Properties
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-slate-300 rounded mb-2"></div>
                  <div className="h-6 bg-slate-300 rounded mb-4"></div>
                  <div className="h-6 bg-slate-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRentals.length > 0 ? (
              filteredRentals.map((rental) => (
                <div
                  key={rental._id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate-400 group"
                  onClick={() => router.push(`/property/${rental._id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={rental.image || "https://placehold.co/400x300/e2e8f0/475569?text=Rental+Property"}
                      alt={rental.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute top-4 left-4 bg-slate-900 text-white text-sm px-3 py-1 rounded-full font-medium">
                      For Rent
                    </span>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-slate-800">View Details</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-slate-500 text-sm mb-3">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{rental.location}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors line-clamp-2">
                      {rental.title}
                    </h3>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">
                          ₹{rental.price}
                        </p>
                        <p className="text-sm text-slate-500">per month</p>
                      </div>
                      <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">No Rental Properties Found</h4>
                <p className="text-slate-600 mb-6">
                  {filters.location || filters.min || filters.max 
                    ? "Try adjusting your filters to see more properties." 
                    : "We couldn't find any rental properties at the moment."
                  }
                </p>
                {(filters.location || filters.min || filters.max) && (
                  <button
                    onClick={clearFilters}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quick Statistics */}
        {filteredRentals.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {filteredRentals.length}
                </div>
                <div className="text-slate-600">Available Properties</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {rentals.length > 0 ? Math.floor(filteredRentals.reduce((sum, p) => sum + parseInt(p.price.replace(/,/g, '')), 0) / filteredRentals.length).toLocaleString() : '0'}
                </div>
                <div className="text-slate-600">Average Rent (₹)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {new Set(filteredRentals.map(p => p.location.split(',')[0].trim())).size}
                </div>
                <div className="text-slate-600">Locations Available</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rent;