import React, { createContext, useEffect, useState } from "react";
import API from "./api";

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  // Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};
