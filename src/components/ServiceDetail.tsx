// ServiceDetail.jsx
'use client';
import React from "react";
import { useParams } from "next/navigation";

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-slate-700 mb-4">
            Service Not Found
          </h1>
          <p className="text-slate-500">The requested service could not be located.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-40">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="bg-white border border-slate-200 p-8 mb-8">
          <h1 className="text-3xl font-medium text-slate-900 mb-4">
            {service.title}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white border border-slate-200 p-8">
          <h2 className="text-xl font-medium text-slate-900 mb-6">Key Features</h2>
          <div className="grid gap-4">
            {service.points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}