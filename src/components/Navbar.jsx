'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 flex items-center transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20' 
          : 'bg-transparent'
      }`}
      style={{
        height: scrolled ? '70px' : '80px',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center transition-all duration-300 ease-in-out"
        style={{
          zIndex: 60,
        }}
      >
        <Image
          src="/WhatsApp Image 2025-08-14 at 01.30.11_60fbe58c.jpg"
          alt="IndianAgency Logo"
          className="object-cover rounded-full"
          width={scrolled ? 50 : 60}
          height={scrolled ? 50 : 60}
        />
        <span className="ml-3 text-white font-bold text-xl">
          IndianAgency
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-8 font-medium ml-auto">
        {[
          { name: 'Home', href: '/' },
          { name: 'Buy Property', href: '/buy' },
          { name: 'Sell Property', href: '/sell' },
          { name: 'Rent Property', href: '/rent' },
          { name: 'Commercial', href: '/commercial' },
          { name: 'Services', href: '/services' },
          { name: 'Contact Us', href: '/contact' }
        ].map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="ml-8">
        <Link
          href="/allproperties"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Explore Properties
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;