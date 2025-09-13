import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Slider from "react-slick";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  // Calculator states
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAZl50D1RFVs5ZjiIMr9jxqCgMTFbHAc7Q",
  });

  // Fetch property and auto-fill loan amount
  useEffect(() => {
    API.get(`/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        setLoanAmount(res.data.price || "");
      })
      .catch((err) => console.error(err));
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

        setEmi(emiValue.toFixed(2));
        setTotalCost((emiValue * months).toFixed(2));
      }
    } else {
      setEmi(null);
      setTotalCost(null);
    }
  }, [loanAmount, interestRate, tenure]);

  if (!property) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading property details...
      </p>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  // Always show Hyderabad on map
  const coordinates = { lat: 17.385044, lng: 78.486671 };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Main Image */}
        <div className="h-96">
          <img
            src={property.image || "https://placehold.co/800x400?text=No+Image"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Info */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-gray-600 mt-1">{property.location}</p>
          <p className="text-blue-600 text-2xl font-bold mt-3">
            ₹{property.price}
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {property.description}
          </p>

          {/* Gallery Carousel */}
          {property.gallery && property.gallery.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Gallery</h2>
              <Slider {...sliderSettings}>
                {property.gallery.map((img, index) => (
                  <div key={index} className="px-2">
                    <img
                      src={img || "https://placehold.co/400x300?text=No+Image"}
                      alt={`Gallery ${index}`}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* EMI & Cost Calculator */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4">
              EMI & Cost Calculator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Loan Amount (₹)"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Interest Rate (%)"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Tenure (Years)"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="border p-2 rounded"
              />
            </div>

            {emi && (
              <div className="mt-4 bg-white p-4 rounded shadow">
                <p className="text-lg font-semibold">Monthly EMI: ₹{emi}</p>
                <p className="text-gray-700">Total Cost: ₹{totalCost}</p>
              </div>
            )}
          </div>

          {/* Google Map */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <div className="h-96 rounded-lg overflow-hidden shadow">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={coordinates}
                  zoom={13}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              ) : (
                <p className="text-center text-gray-500 mt-20">
                  Loading map...
                </p>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Message"
                className="w-full border p-2 rounded"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
