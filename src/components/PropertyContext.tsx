'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import propertyService from '../lib/propertyService';

interface PropertyContextType {
  properties: any[];
  fetchProperties: () => Promise<void>;
  addProperty: (newProperty: any) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider = ({ children }: PropertyProviderProps) => {
  const [properties, setProperties] = useState<any[]>([]);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const fetchedProperties = await propertyService.getProperties();
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error instanceof Error ? error.message : String(error));
    }
  };

  // Add a new property and update state instantly
  const addProperty = async (newProperty: any) => {
    try {
      const addedProperty = await propertyService.addProperty(newProperty);
      setProperties((prev) => [...prev, addedProperty]);
    } catch (error) {
      console.error('Error adding property:', error instanceof Error ? error.message : String(error));
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
