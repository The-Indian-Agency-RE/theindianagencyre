'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Commercial = () => {
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  const listings = [
    {
      id: 1,
      title: "Premium Office Space – BKC, Hyderabad",
      image: "https://images.unsplash.com/photo-1521386455230-4ceaa25b72be?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "5 Cr",
      size: "5,000 sq. ft.",
      location: "Banjara Hills, Hyderabad",
      type: "office",
      features: ["Parking", "24/7 Security", "AC", "High-Speed Internet"]
    },
    {
      id: 2,
      title: "Retail Showroom – Commercial District",
      image: "https://images.unsplash.com/photo-1572044727169-8b7dda92916e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.5 Cr",
      size: "3,000 sq. ft.",
      location: "Jubilee Hills, Hyderabad",
      type: "retail",
      features: ["Street Facing", "Display Windows", "Storage Area", "Customer Parking"]
    },
    {
      id: 3,
      title: "IT Park Unit – Tech Hub",
      image: "https://media.istockphoto.com/id/2157387196/photo/a-modern-open-plan-office-with-abundant-natural-light-minimalist-decor-and-collaborative.jpg?s=1024x1024&w=is&k=20&c=9uzJLWRVNQEMYHMXmMRhpI8Hm_3LtSkzm0XYTOU-a5w=",
      price: "4.2 Cr",
      size: "4,000 sq. ft.",
      location: "HITEC City, Hyderabad",
      type: "office",
      features: ["Modern Infrastructure", "Conference Rooms", "Cafeteria", "Metro Connectivity"]
    },
    {
      id: 4,
      title: "Corporate Office Complex",
      image: "https://images.unsplash.com/photo-1626002860244-0907b3be82ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "6.8 Cr",
      size: "6,500 sq. ft.",
      location: "Financial District, Hyderabad",
      type: "office",
      features: ["Premium Location", "Elevator Access", "Reception Area", "Multiple Floors"]
    },
    {
      id: 5,
      title: "Commercial Warehouse Space",
      image: "https://images.unsplash.com/photo-1559076294-ad5d97e1e7c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "3.2 Cr",
      size: "8,000 sq. ft.",
      location: "Shamshabad, Hyderabad",
      type: "warehouse",
      features: ["Loading Dock", "High Ceiling", "Wide Access", "Security Systems"]
    },
    {
      id: 6,
      title: "Business Center Suite",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "2.8 Cr",
      size: "2,500 sq. ft.",
      location: "Madhapur, Hyderabad",
      type: "office",
      features: ["Furnished", "Meeting Rooms", "Shared Facilities", "IT Support"]
    },
  ];

  const propertyTypes = [
    { key: 'all', label: 'All Properties' },
    { key: 'office', label: 'Office Spaces' },
    { key: 'retail', label: 'Retail Spaces' },
    { key: 'warehouse', label: 'Warehouses' }
  ];

  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(listing => listing.type === filter);

  const handleContactClick = (propertyId: number) => {
    router.push(`/contact?property=${propertyId}&type=commercial`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Commercial Properties
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover premium commercial real estate opportunities designed for business success and growth
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Filter by Property Type
              </h2>
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-lg">
              <span className="text-slate-700 font-medium">
                {filteredListings.length} Properties Available
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map(type => (
              <button
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === type.key
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
            <h3 className="text-2xl font-semibold text-slate-900">
              Available Commercial Properties
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-slate-400 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute top-4 left-4 bg-slate-900 text-white text-sm px-3 py-1 rounded-full font-medium capitalize">
                  {item.type}
                </span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-slate-500 text-sm mb-3">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{item.location}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-slate-600">
                    <span className="text-sm">{item.size}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900">₹{item.price}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {item.features.length > 2 && (
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                        +{item.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleContactClick(item.id)}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Need Expert Commercial Real Estate Advice?
            </h3>
            <p className="text-lg text-slate-600 mb-8">
              Our experienced commercial property specialists are ready to help you find the perfect space for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/contact')}
                className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Contact Our Experts
              </button>
              <button
                onClick={() => router.push('/services/commercial')}
                className="bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Learn About Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commercial;