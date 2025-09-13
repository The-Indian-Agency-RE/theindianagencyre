import React, { createContext, useState, useEffect } from 'react';
import API from '../api.js'; // ✅ updated import path

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const res = await API.get('/properties');
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching properties:', error.response?.data || error.message);
    }
  };

  // Add a new property and update state instantly
  const addProperty = async (newProperty) => {
    try {
      const res = await API.post('/properties', newProperty);
      setProperties((prev) => [...prev, res.data]);
    } catch (error) {
      console.error('Error adding property:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, fetchProperties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
