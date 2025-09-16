"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import propertyService from "../lib/propertyService";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import AISearch from "./AISearch";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 17.402822,
  lng: 78.37076,
};

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const router = useRouter();

  useEffect(() => {
    propertyService.getProperties({ type: 'sale' })
      .then((fetchedProperties) => {
        const hyderabadProperties = fetchedProperties.filter((p) =>
          p.location?.toLowerCase().includes("hyderabad")
        );
        console.log(hyderabadProperties);
        setProperties(hyderabadProperties);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              Property Marketplace
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Discover premium real estate opportunities in Hyderabad with our comprehensive property platform
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* AI Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Advanced Property Search
            </h2>
          </div>
          <AISearch />
        </div>

        {/* Map + Property Listings */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Google Map */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4">
                <h3 className="text-lg font-semibold">Interactive Map View</h3>
              </div>
              <div className="h-[600px] bg-slate-100">
                <LoadScript googleMapsApiKey="AIzaSyAZl50D1RFVs5ZjiIMr9jxqCgMTFbHAc7Q">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                  >
                    {properties.map(
                      (property, index) =>
                        property.coordinates?.lat &&
                        property.coordinates?.lng && (
                          <Marker
                            key={property.id || property._id || `marker-${index}`}
                            position={{
                              lat: property.coordinates.lat,
                              lng: property.coordinates.lng,
                            }}
                            onClick={() => setSelectedProperty(property)}
                          />
                        )
                    )}

                    {selectedProperty && (
                      <InfoWindow
                        position={{
                          lat: selectedProperty.coordinates.lat,
                          lng: selectedProperty.coordinates.lng,
                        }}
                        onCloseClick={() => setSelectedProperty(null)}
                      >
                        <div
                          className="cursor-pointer max-w-xs"
                          onClick={() =>
                            router.push(`/property/${selectedProperty.id || selectedProperty._id}`)
                          }
                        >
                          <img
                            src={
                              selectedProperty.image ||
                              "https://placehold.co/200x120/e2e8f0/475569?text=Property"
                            }
                            alt={selectedProperty.title}
                            className="w-full h-24 object-cover rounded mb-3"
                          />
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {selectedProperty.title}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2">
                            {selectedProperty.location}
                          </p>
                          <p className="text-slate-900 font-bold text-lg mb-2">
                            ₹{selectedProperty.price}
                          </p>
                          <p className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            Click to view details
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-2 h-8 bg-slate-700 rounded-full mr-4"></div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Available Properties
                </h3>
              </div>
              <div className="bg-slate-100 px-4 py-2 rounded-lg">
                <span className="text-slate-700 font-medium">
                  {properties.length} Properties Found
                </span>
              </div>
            </div>

            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
              {properties.length > 0 ? (
                properties.map((p, index) => (
                  <div
                    key={p.id || p._id || `property-${index}`}
                    onClick={() => router.push(`/property/${p.id || p._id}`)}
                    className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate-400 group"
                  >
                    <div className="flex">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={
                            p.image || "https://placehold.co/400x300/e2e8f0/475569?text=Property+Image"
                          }
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700">
                            {p.title}
                          </h4>
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                            For Sale
                          </span>
                        </div>
                        <p className="text-slate-600 mb-4 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {p.location}
                        </p>
                        <div className="flex justify-between items-end">
                          <p className="text-2xl font-bold text-slate-900">
                            ₹{typeof p.price === 'string' ? p.price : p.price.toLocaleString()}
                          </p>
                          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">No Properties Found</h4>
                  <p className="text-slate-600">
                    We couldn't find any properties matching your criteria in Hyderabad.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;