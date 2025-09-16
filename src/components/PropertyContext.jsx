'use client';

import React, { createContext, useState, useEffect } from 'react';
import propertyService from '../lib/propertyService';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const fetchedProperties = await propertyService.getProperties();
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error.message);
    }
  };

  // Add a new property and update state instantly
  const addProperty = async (newProperty) => {
    try {
      const addedProperty = await propertyService.addProperty(newProperty);
      setProperties((prev) => [...prev, addedProperty]);
    } catch (error) {
      console.error('Error adding property:', error.message);
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
