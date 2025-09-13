import React from 'react';
import { Link } from 'react-router-dom';

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    title: '1645 Vine St #1001',
    location: 'Los Angeles',
  },
  {
    id: 2,
    image: 'https://media.istockphoto.com/id/157307499/photo/beautiful-entryway-with-custom-wrought-iron-staircase-in-estate-home.jpg?s=1024x1024&w=is&k=20&c=3PRYD6C8rM9KmY0j1FbbYJQz4WdGPzX2uOaWeSVgl3A=',
    title: '23618 Malibu Colony Rd #56',
    location: 'Malibu',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    title: '9200 Old Flowers Road',
    location: 'Bellvue',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    title: '10777 Wilshire Blvd',
    location: 'Beverly Hills',
  },
];

const FeaturedProperties = () => {
  return (
    <section id="featured" className="py-24 bg-gray-100 px-6">
      <div className="max-w-6xl mx-auto">
        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Our Featured Listings</h4>
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Exclusive Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative group">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover transition duration-300 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 group-hover:opacity-80 transition flex justify-center items-center">
                  <button className="text-white border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-black transition">
                    View Property
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  {property.title}{' '}
                  <span className="text-gray-500 font-medium">| {property.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔘 View All Properties Button */}
        <div className="text-center mt-12">
          <Link
            to="/allproperties"
            className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-widest rounded-lg hover:bg-gray-800 hover:shadow-lg transition duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
