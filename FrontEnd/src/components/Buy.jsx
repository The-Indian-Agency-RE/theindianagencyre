import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/properties")
      .then((res) => {
        const hyderabadProperties = res.data.filter(
          (p) => p.location?.toLowerCase().includes("hyderabad")
        );
        setProperties(hyderabadProperties);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          🏘 Buy Properties in Hyderabad
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Explore premium properties in Hyderabad with our AI-powered search and interactive map.
        </p>
      </div>

      {/* AI Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-200 hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🔍 Search for properties
        </h2>
        <AISearch />
      </div>

      {/* Map + Property Listings */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Google Map */}
        <div className="lg:w-1/2 w-full sticky top-20 self-start">
          <div className="bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 h-[calc(100vh-100px)]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore on Map</h2>
            <div className="relative h-full rounded-xl overflow-hidden border border-gray-300 shadow-inner hover:shadow-lg transition duration-300">
              <LoadScript googleMapsApiKey="AIzaSyAZl50D1RFVs5ZjiIMr9jxqCgMTFbHAc7Q">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                  {properties.map(
                    (property) =>
                      property.coordinates?.lat &&
                      property.coordinates?.lng && (
                        <Marker
                          key={property._id}
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
                        className="cursor-pointer"
                        onClick={() => navigate(`/property/${selectedProperty._id}`)}
                      >
                        <img
                          src={
                            selectedProperty.image ||
                            "https://placehold.co/200x120"
                          }
                          alt={selectedProperty.title}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <strong className="block">{selectedProperty.title}</strong>
                        <span className="text-sm text-gray-500">
                          {selectedProperty.location}
                        </span>
                        <p className="text-blue-600 font-bold mt-1">
                          ₹{selectedProperty.price}
                        </p>
                        <p className="text-xs text-gray-500">Click for details</p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="lg:w-1/2 w-full overflow-y-auto max-h-[calc(100vh-100px)] pr-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Available Properties in Hyderabad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {properties.length > 0 ? (
              properties.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/property/${p._id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <img
                    src={p.image || "https://placehold.co/400x300?text=No+Image"}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded-md mb-3 transition-transform duration-500 hover:scale-105"
                  />
                  <h2 className="text-lg font-bold text-gray-800">{p.title}</h2>
                  <p className="text-gray-600">{p.location}</p>
                  <p className="text-blue-600 font-bold mt-2 text-lg">
                    ₹{p.price.toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center text-lg mt-10">
                No properties available in Hyderabad.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
