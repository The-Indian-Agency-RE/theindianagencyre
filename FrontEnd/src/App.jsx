import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PropertyProvider } from "./components/PropertyContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurStory from "./components/Story";
import Footer from "./components/Footer";
import FeaturedProperties from "./components/FeaturedProperties";
import InstagramSection from "./components/InstagramSection";
import Sell from "./components/Sell";
import Commercial from "./components/Commercial";
import Services from "./components/Services";
import ServiceDetail from "./components/ServiceDetail";
import Contact from "./components/Contact";
import Readmore from "./components/Readmore";
import AllProperties from "./components/AllProperties";
import PropertyDetails from "./components/PropertyDetails";
import Buy from "./components/Buy";
import Rent from "./components/Rent";
import Login from "./components/Login";

// ✅ Default export in Dashboard.jsx will match this import
import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <PropertyProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <OurStory />
                <FeaturedProperties />
                <InstagramSection />
                <Footer />
              </>
            }
          />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/allproperties" element={<AllProperties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          
          {/* Redirect /ourservices to /services */}
          <Route path="/ourservices" element={<Navigate to="/services" replace />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/readmore" element={<Readmore />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </PropertyProvider>
  );
}

export default App;
