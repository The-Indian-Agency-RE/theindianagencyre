'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn,
  FaYoutube,
  FaCertificate,
  FaBed,
  FaBath,
  FaRulerCombined
} from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for featured properties
  const mockProperties = [
    {
      _id: '1',
      title: 'Luxury Villa in Hyderabad',
      location: 'Banjara Hills, Hyderabad',
      price: '2,50,00,000',
      type: 'sale',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,200 sq ft',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    },
    {
      _id: '2',
      title: 'Modern Apartment',
      location: 'HITEC City, Hyderabad',
      price: '85,00,000',
      type: 'sale',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sq ft',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    },
    {
      _id: '3',
      title: 'Premium Office Space',
      location: 'Financial District, Hyderabad',
      price: '1,20,00,000',
      type: 'sale',
      bedrooms: null,
      bathrooms: 2,
      area: '2,500 sq ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    }
  ];

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        let properties = [];
        
        try {
          const propertyService = await import('@/lib/propertyService');
          properties = await propertyService.default.getProperties();
        } catch (serviceError) {
          console.log('Property service not available, using mock data');
          properties = mockProperties;
        }
        
        setFeaturedProperties(properties.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured properties:', error);
        setFeaturedProperties(mockProperties.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    if (typeof price === 'number') return price.toLocaleString();
    return 'Contact for Price';
  };

  return (
    <footer className="bg-slate-50">
      {/* Featured Properties Section - Reduced Height */}
      <div className="bg-white border-t border-slate-200 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-1 h-6 bg-slate-700 rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-slate-900">Featured Properties</h2>
              </div>
              <p className="text-slate-600">Handpicked premium properties</p>
            </div>
            <Link 
              href="/allproperties" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View All Properties
            </Link>
          </div>
          
          {/* Property Cards - Compact Design */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-slate-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="h-40 bg-slate-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-slate-300 rounded mb-2"></div>
                    <div className="h-6 bg-slate-300 rounded mb-3"></div>
                    <div className="h-6 bg-slate-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProperties.length > 0 ? (
                featuredProperties.map((property, index) => (
                  <Link 
                    key={property._id || index} 
                    href={`/property/${property._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-slate-400">
                      <div className="relative overflow-hidden">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-1 text-xs font-medium rounded">
                          For {property.type === 'sale' ? 'Sale' : 'Rent'}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-slate-500 text-sm mb-2">
                          <FaMapMarkerAlt className="mr-2" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                          {property.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-slate-900">
                            ₹{formatPrice(property.price)}
                          </span>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            {property.bedrooms && (
                              <span className="flex items-center gap-1">
                                <FaBed />
                                <span>{property.bedrooms}</span>
                              </span>
                            )}
                            {property.bathrooms && (
                              <span className="flex items-center gap-1">
                                <FaBath />
                                <span>{property.bathrooms}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-slate-600">No featured properties available at the moment.</p>
                  <Link 
                    href="/admin" 
                    className="inline-block mt-3 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Add Properties
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Main Footer - Compact Design */}
      <div className="bg-slate-900 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold mb-3">THE INDIAN AGENCY</h2>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Your trusted partner in premium real estate solutions across India.
              </p>
              <div className="flex items-center gap-2">
                <div className="bg-slate-700 text-white px-2 py-1 rounded text-xs">
                  RERA Certified
                </div>
                <div className="bg-slate-700 text-white px-2 py-1 rounded text-xs">
                  ISO Certified
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <div className="text-slate-300">
                  <p className="mb-1">1st Floor, South Extension Market,</p>
                  <p>New Delhi - 110049, India</p>
                </div>
                <a 
                  href="tel:+911234567890" 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <FaPhoneAlt size={12} />
                  <span>+91 123 456 7890</span>
                </a>
                <a 
                  href="mailto:info@indianagency.in" 
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <FaEnvelope size={12} />
                  <span>info@indianagency.in</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'All Properties', href: '/allproperties' },
                  { name: 'Buy Property', href: '/buy' },
                  { name: 'Sell Property', href: '/sell' },
                  { name: 'Services', href: '/services' },
                  { name: 'Contact Us', href: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Social */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Our Services</h3>
              <ul className="space-y-2 text-sm mb-6">
                {[
                  'Property Valuation',
                  'Legal Assistance', 
                  'Home Loans',
                  'Property Management',
                  'Investment Advisory'
                ].map((service) => (
                  <li key={service}>
                    <Link 
                      href="/services" 
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div>
                <p className="text-slate-400 text-sm mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[
                    { icon: FaFacebookF, href: '#' },
                    { icon: FaInstagram, href: '#' },
                    { icon: FaTwitter, href: '#' },
                    { icon: FaLinkedinIn, href: '#' },
                    { icon: FaYoutube, href: '#' }
                  ].map(({ icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Icon size={14} className="text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div className="mb-3 md:mb-0">
              <p>© 2025 The Indian Agency Real Estate. All Rights Reserved</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Disclaimer', href: '/disclaimer' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;