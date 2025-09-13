// src/components/Commercial.jsx
import React from "react";

const Commercial = () => {
  const listings = [
    {
      id: 1,
      title: "Premium Office Space – BKC, Hyderabad",
      image: "https://images.unsplash.com/photo-1521386455230-4ceaa25b72be?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹5 Cr",
      size: "5000 sq. ft.",
      location: "Bandra Kurla Complex, Hyderabad",
    },
    {
      id: 2,
      title: "Retail Showroom – Connaught Place, Hyderabad",
      image: "https://images.unsplash.com/photo-1572044727169-8b7dda92916e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹3.5 Cr",
      size: "3000 sq. ft.",
      location: "Connaught Place, Hyderabad",
    },
    {
      id: 3,
      title: "IT Park Unit – Whitefield, Hyderabad",
      image: "https://media.istockphoto.com/id/2157387196/photo/a-modern-open-plan-office-with-abundant-natural-light-minimalist-decor-and-collaborative.jpg?s=1024x1024&w=is&k=20&c=9uzJLWRVNQEMYHMXmMRhpI8Hm_3LtSkzm0XYTOU-a5w=",
      price: "₹4.2 Cr",
      size: "4000 sq. ft.",
      location: "Whitefield, Hyderabad",
    },
    {
      id: 4,
      title: "IT Park Unit – Whitefield, Hyderabad",
      image: "https://images.unsplash.com/photo-1626002860244-0907b3be82ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹4.2 Cr",
      size: "4000 sq. ft.",
      location: "Whitefield, Hyderabad",
    },
    {
      id: 5,
      title: "IT Park Unit – Whitefield, Hyderabad",
      image: "https://images.unsplash.com/photo-1559076294-ad5d97e1e7c4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹4.2 Cr",
      size: "4000 sq. ft.",
      location: "Whitefield, Hyderabad",
    },
    {
      id: 6,
      title: "IT Park Unit – Whitefield, Hyderabad",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹4.2 Cr",
      size: "4000 sq. ft.",
      location: "Whitefield, Hyderabad",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center mb-10">Commercial Properties</h2>

      <p className="text-center max-w-2xl mx-auto mb-10 text-gray-700">
        Explore our curated collection of high-end commercial properties — perfect for offices, showrooms,
        co-working spaces, and more. Premium locations and world-class infrastructure.
      </p>

      {/* 🔹 Listings Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {listings.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <img src={item.image} alt={item.title} className="h-60 w-full object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-1">{item.location}</p>
              <p className="text-sm text-gray-500 mb-2">
                {item.size} | {item.price}
              </p>
              <a
                href="/contact"
                className="inline-block mt-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 hover:shadow-lg transition duration-300"
              >
                Book Visit
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 CTA Section */}
      <div className="text-center mt-16 mb-24 px-4 sm:px-0">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Need Help Finding the Right Property?
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Our expert agents are here to guide you every step of the way.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-semibold px-8 py-3 rounded-full hover:from-green-600 hover:to-teal-600 hover:shadow-lg transition duration-300 mb-10"
        >
          Contact Our Experts
        </a>
      </div>
    </div>
  );
};

export default Commercial;
