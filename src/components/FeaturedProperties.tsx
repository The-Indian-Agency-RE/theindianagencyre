'use client';

import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaArrowRight, FaPlay } from 'react-icons/fa';


const FeaturedProperties= ({ initialProperties}: { initialProperties: any[] }) => {
  // Fallback static properties
  const fallbackProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      title: 'Luxury Villa Residence',
      location: 'Beverly Hills, CA',
      price: '$2,850,000',
      type: 'For Sale',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,200 sq ft'
    },
    {
      id: 2,
      image: 'https://media.istockphoto.com/id/157307499/photo/beautiful-entryway-with-custom-wrought-iron-staircase-in-estate-home.jpg?s=1024x1024&w=is&k=20&c=3PRYD6C8rM9KmY0j1FbbYJQz4WdGPzX2uOaWeSVgl3A=',
      title: 'Modern Oceanfront Estate',
      location: 'Malibu, CA',
      price: '$4,200,000',
      type: 'For Sale',
      bedrooms: 5,
      bathrooms: 4,
      area: '4,800 sq ft'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      title: 'Contemporary Family Home',
      location: 'Bellevue, WA',
      price: '$1,650,000',
      type: 'For Sale',
      bedrooms: 3,
      bathrooms: 2,
      area: '2,400 sq ft'
    }
  ];

  // Use server-provided properties if available, otherwise use fallback
  const properties = initialProperties.length > 0 ? initialProperties : fallbackProperties;
  

  return (
    <section id="featured" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            FEATURED LISTINGS
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Exclusive Premium
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Properties
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of luxury properties in the most desirable locations
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {properties.map((property: { id: React.Key | null | undefined; image: string | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; type: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; bedrooms: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; bathrooms: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; area: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
            <div
              key={property.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={String(property.title || 'Property')}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                    {property.type}
                  </span>
                </div>
                
                {/* View Property Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                    <FaPlay className="text-sm" />
                    View Property
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {property.title}
                </h3>

                {/* Property Features */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{property.bedrooms} Beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>•</span>
                  <span>{property.area}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            href="/allproperties"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <span>Explore All Properties</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;