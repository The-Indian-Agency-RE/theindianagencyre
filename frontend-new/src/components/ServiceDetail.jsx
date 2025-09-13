import React from "react";
import { useParams } from "react-router-dom";

const servicesData = {
  buying: {
    title: "Property Buying Assistance",
    description:
      "Our expert team guides you through every step of your property purchase journey, from property search to legal support.",
    points: [
      "Personalized property recommendations",
      "Expert price negotiation",
      "Legal documentation support",
      "Loan assistance",
    ],
  },
  selling: {
    title: "Property Selling",
    description:
      "Get the best market price for your property with our experienced selling agents and marketing strategies.",
    points: [
      "Property valuation",
      "Professional marketing",
      "Expert negotiation",
      "Complete legal support",
    ],
  },
  rental: {
    title: "Rental Services",
    description:
      "Find quality tenants or the perfect rental property quickly with our verified rental service.",
    points: [
      "Verified tenants and landlords",
      "Rental agreement support",
      "Property management services",
      "Affordable rental solutions",
    ],
  },
  commercial: {
    title: "Commercial Property Advisory",
    description:
      "We help you find the perfect office, showroom, or commercial property for your business needs.",
    points: [
      "Prime commercial locations",
      "Property leasing guidance",
      "Legal documentation",
      "Investment support",
    ],
  },
  legal: {
    title: "Legal & Documentation Help",
    description:
      "We offer end-to-end legal assistance for property transactions, agreements, and compliance.",
    points: [
      "Document verification",
      "Property registration",
      "Agreement drafting",
      "Full legal support",
    ],
  },
  interior: {
    title: "Interior & Renovation Consulting",
    description:
      "Design, plan, and execute beautiful interiors with our expert interior consultants and architects.",
    points: [
      "Custom interior design",
      "Renovation planning",
      "Material selection",
      "Professional project execution",
    ],
  },
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 animate-pulse">
          Service not found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10 md:p-16 bg-gray-50 min-h-screen transition-all duration-500">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          {service.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          {service.description}
        </p>
        <ul className="space-y-3">
          {service.points.map((point, index) => (
            <li
              key={index}
              className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:text-xl hover:text-blue-500 transition-colors duration-300"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
