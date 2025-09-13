import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaRegIdCard, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-16 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        
        {/* Logo & Accreditation */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">THE INDIAN AGENCY</h1>
          <div className="flex items-center gap-4 mt-4">
            <img src="img url" alt="Leading" className="w-20" />
            <img src="" alt="LPI" className="w-20" />
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="uppercase font-semibold text-lg mb-4 border-b border-gray-600 inline-block">Contact Us</h3>
          <p className="text-gray-300">
            The Indian Agency<br />
            1st Floor, South Extension Market, Delhi - 110049
          </p>
          <div className="mt-3 space-y-2 text-gray-300">
            <p className="flex items-center gap-2 hover:text-gray-400 transition"><FaPhoneAlt /> +91 123456789</p>
            <p className="flex items-center gap-2 hover:text-gray-400 transition"><FaEnvelope /> info@indianagency.in</p>
            <p className="flex items-center gap-2 hover:text-gray-400 transition"><FaRegIdCard /> RERA ID: xyz12345678</p>
          </div>
          <div className="flex gap-3 mt-4">
            <FaInstagram className="hover:text-gray-400 cursor-pointer transition" />
            <FaFacebookF className="hover:text-gray-400 cursor-pointer transition" />
            <FaYoutube className="hover:text-gray-400 cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-gray-400 cursor-pointer transition" />
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h3 className="uppercase font-semibold text-lg mb-4 border-b border-gray-600 inline-block">Navigate</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Our Story</li>
            <li className="hover:text-white cursor-pointer transition">Associates</li>
            <li className="hover:text-white cursor-pointer transition">Exclusive Properties</li>
            <li className="hover:text-white cursor-pointer transition">Search All Homes</li>
            <li className="hover:text-white cursor-pointer transition">Media</li>
            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
          </ul>
        </div>

        {/* Membership / Design Credit */}
        <div className="space-y-4 text-gray-300">
          <p className="text-xs uppercase">Custom Website Design By</p>
          <h3 className="text-xl font-semibold tracking-wide text-white">The Indian Agency Design</h3>
          <p className="text-sm uppercase">Proud Member of</p>
          <img src="" alt="CREDAI" className="w-24" />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-8 space-y-2">
        <p>© 2025 The Indian Agency Real Estate. All Rights Reserved</p>
        <p>Sitemap | Privacy Policy | Terms</p>
      </div>
    </footer>
  );
};

export default Footer;
