import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Property Buying Assistance",
    description: "Expert guidance and support through every step of your property purchase journey.",
    icon: "🏠",
    path: "/services/buying",
  },
  {
    title: "Property Selling",
    description: "Get the best market price for your property with our experienced selling agents.",
    icon: "💰",
    path: "/services/selling",
  },
  {
    title: "Rental Services",
    description: "Find quality tenants or the perfect rental property with ease.",
    icon: "📄",
    path: "/services/rental",
  },
  {
    title: "Commercial Property Advisory",
    description: "Leverage our expertise for offices, showrooms, and commercial properties.",
    icon: "🏢",
    path: "/services/commercial",
  },
  {
    title: "Legal & Documentation Help",
    description: "Full legal support and document handling for smooth property transactions.",
    icon: "📑",
    path: "/services/legal",
  },
  {
    title: "Interior & Renovation Consulting",
    description: "Design, plan, and execute beautiful spaces with our expert interior consultants.",
    icon: "🛠",
    path: "/services/interior",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        We provide a wide range of real estate services tailored to meet your residential and commercial needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition cursor-pointer"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
