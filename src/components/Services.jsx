'use client';

import React from "react";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "Property Buying Assistance",
    description: "Expert guidance and support through every step of your property purchase journey with market insights and negotiation expertise.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    path: "/services/buying",
    features: ["Market Analysis", "Property Inspection", "Negotiation Support", "Documentation Help"]
  },
  {
    title: "Property Selling",
    description: "Get the best market price for your property with our experienced selling agents and comprehensive marketing strategy.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    path: "/services/selling",
    features: ["Property Valuation", "Marketing Campaign", "Buyer Screening", "Transaction Management"]
  },
  {
    title: "Rental Services",
    description: "Find quality tenants or the perfect rental property with our comprehensive tenant screening and property management services.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    path: "/services/rental",
    features: ["Tenant Screening", "Lease Management", "Rent Collection", "Property Maintenance"]
  },
  {
    title: "Commercial Property Advisory",
    description: "Leverage our expertise for offices, showrooms, and commercial properties with specialized market knowledge and investment analysis.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    path: "/services/commercial",
    features: ["Investment Analysis", "Location Assessment", "Lease Negotiation", "Portfolio Management"]
  },
  {
    title: "Legal & Documentation Support",
    description: "Full legal support and document handling for smooth property transactions with experienced legal professionals and compliance experts.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    path: "/services/legal",
    features: ["Title Verification", "Contract Review", "Registration Support", "Legal Compliance"]
  },
  {
    title: "Property Management & Consulting",
    description: "Comprehensive property management services and interior consulting to maximize your property's value and aesthetic appeal.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    path: "/services/management",
    features: ["Maintenance Services", "Interior Design", "Space Planning", "Renovation Consulting"]
  },
];

export default function Services() {
  const router = useRouter();

  const handleServiceClick = (servicePath) => {
    router.push(servicePath);
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Our Services
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive real estate solutions tailored to meet your residential and commercial property needs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Services Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Professional Real Estate Services
            </h2>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            From property acquisition to management, we provide end-to-end real estate solutions backed by years of experience and deep market knowledge. Our expert team ensures every transaction is smooth, transparent, and profitable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.path)}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate-400 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-slate-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                <span className="mr-2">Learn More</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-slate-600">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">15+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">1000+</div>
              <div className="text-slate-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-slate-600">Customer Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-slate-600 mb-8">
              Let our experienced team help you with your real estate needs. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactClick}
                className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Get Free Consultation
              </button>
              <button
                onClick={() => router.push('/about')}
                className="bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
              >
                Learn About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}