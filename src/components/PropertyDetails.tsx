'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import propertyService from "../lib/propertyService";
import Slider from "react-slick";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Property } from "@/types/property";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculator states
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [emi, setEmi] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);

  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });
  console.log("api is :" ,process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

  // Fetch property and auto-fill loan amount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await propertyService.getPropertyById(id);
        setProperty({
          ...propertyData,
          type: propertyData.type as "sale" | "rent",
          features: (propertyData as any).features || propertyData.amenities || []
        } as Property);
        // Clean price string and set as loan amount
        const cleanPrice = propertyData.price?.replace(/[₹,\s]/g, '') || "";
        setLoanAmount(cleanPrice);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Auto-update EMI & Total Cost when inputs change
  useEffect(() => {
    if (loanAmount && interestRate && tenure) {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 12 / 100;
      const months = parseInt(tenure) * 12;

      if (principal > 0 && rate > 0 && months > 0) {
        const emiValue =
          (principal * rate * Math.pow(1 + rate, months)) /
          (Math.pow(1 + rate, months) - 1);
        
        const totalAmount = emiValue * months;
        const interestAmount = totalAmount - principal;

        setEmi(emiValue.toFixed(0));
        setTotalCost(totalAmount.toFixed(0));
        setTotalInterest(interestAmount.toFixed(0));
      }
    } else {
      setEmi(null);
      setTotalCost(null);
      setTotalInterest(null);
    }
  }, [loanAmount, interestRate, tenure]);

  const handleContactSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form submitted:", contactForm);
    // Reset form
    setContactForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const formatNumber = (num: string | number | bigint | null) => {
    if (num === null) return '0';
    const numericValue = typeof num === 'string' ? parseFloat(num) : num;
    return new Intl.NumberFormat('en-IN').format(numericValue);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700 text-lg font-medium mb-2">
            {error || "Property not found"}
          </p>
          <p className="text-slate-500">Please try again or go back to listings.</p>
        </div>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots custom-dots",
  };

  // Use property coordinates if available, otherwise default to Lucknow
  const coordinates = property?.coordinates || { lat: 26.8467, lng: 80.9462 };

  return (
    <div className="min-h-screen bg-slate-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="bg-white border border-slate-200 mb-8">
          <div className="aspect-video w-full">
            <img
              src={property.image || "https://placehold.co/800x400?text=No+Image"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-medium text-slate-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-slate-600 mb-4">{property.location}</p>
                <p className="text-slate-900 text-2xl font-medium">
                  ₹{property.price}
                </p>
              </div>
              
              <div className="flex gap-4">
                <button className="bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition-colors font-medium">
                  Schedule Visit
                </button>
                <button className="border border-slate-300 text-slate-700 px-6 py-3 hover:border-slate-400 transition-colors">
                  Save Property
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white border border-slate-200 p-8">
              <h2 className="text-xl font-medium text-slate-900 mb-4">Description</h2>
              <p className="text-slate-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Gallery */}
            {property.gallery && property.gallery.length > 0 && (
              <div className="bg-white border border-slate-200 p-8">
                <h2 className="text-xl font-medium text-slate-900 mb-6">Gallery</h2>
                <div className="gallery-slider">
                  <Slider {...sliderSettings}>
                    {property.gallery.map((img, index) => (
                      <div key={index}>
                        <img
                          src={img || "https://placehold.co/600x400?text=No+Image"}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}

            {/* Location Map */}
            <div className="bg-white border border-slate-200 p-8">
              <h2 className="text-xl font-medium text-slate-900 mb-6">Location</h2>
              <div className="h-80 border border-slate-200">
                {isLoaded ? (
                  <GoogleMap

                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={coordinates}
                    zoom={15}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}
                  >
                    <Marker position={coordinates} />
                  </GoogleMap>
                ) : (
                  <div className="flex items-center justify-center h-full bg-slate-50">
                    <p className="text-slate-500">Loading map...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* EMI Calculator */}
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-6">EMI Calculator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="8.5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="20"
                  />
                </div>
              </div>

              {emi && (
                <div className="mt-6 p-4 bg-slate-50 border border-slate-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-700">Monthly EMI:</span>
                      <span className="font-medium text-slate-900">₹{formatNumber(emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Total Amount:</span>
                      <span className="font-medium text-slate-900">₹{formatNumber(totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Total Interest:</span>
                      <span className="font-medium text-slate-900">₹{formatNumber(totalInterest)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Agent */}
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-6">Contact Agent</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                    placeholder="I'm interested in this property..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-3 px-4 hover:bg-slate-800 transition-colors font-medium"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Property Features */}
            {property.features && (
              <div className="bg-white border border-slate-200 p-6">
                <h3 className="text-lg font-medium text-slate-900 mb-6">Key Features</h3>
                <div className="space-y-3">
                  {property.features.map((feature: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery-slider .slick-dots {
          bottom: 20px;
        }
        
        .gallery-slider .slick-dots li button:before {
          color: white;
          font-size: 12px;
        }
        
        .gallery-slider .slick-dots li.slick-active button:before {
          color: #475569;
        }
        
        .gallery-slider .slick-prev,
        .gallery-slider .slick-next {
          z-index: 1;
        }
        
        .gallery-slider .slick-prev:before,
        .gallery-slider .slick-next:before {
          color: #475569;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;