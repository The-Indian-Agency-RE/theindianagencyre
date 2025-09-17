'use client';

import React, { useEffect } from "react";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            LEADERSHIP
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Founder
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Driven by excellence and committed to transforming the real estate experience
          </p>
        </div>

        {/* Leader Card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative">
              <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1724093832100-fa80f73b424b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Mr. Ashish - Founder & CEO"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <div className="h-full flex flex-col justify-center">
                {/* Title & Position */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Mr. Ashish
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Founder & CEO
                    </span>
                    <span className="text-gray-500 text-sm">
                      15+ Years Experience
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    With over 15 years of comprehensive experience in the real estate industry, 
                    Mr. Ashish has established himself as a visionary leader committed to 
                    excellence and innovation.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    His strategic approach and deep market understanding have positioned 
                    The Indian Agency as a trusted name in premium real estate solutions, 
                    serving clients with integrity and professionalism.
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">500+ Properties Sold</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">98% Client Satisfaction</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">RERA Certified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">Industry Recognition</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Social Links */}
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaLinkedin size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaTwitter size={18} />
                    </a>
                    <a
                      href="mailto:ashish@indianagency.in"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaEnvelope size={18} />
                    </a>
                    <a
                      href="tel:+911234567890"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <FaPhone size={18} />
                    </a>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push("/about")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 transform hover:-translate-y-0.5"
                  >
                    Learn More About Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          {[
            {
              title: "Excellence",
              description: "We strive for excellence in every aspect of our service, ensuring our clients receive the best possible experience.",
              icon: "🎯"
            },
            {
              title: "Integrity",
              description: "Built on trust and transparency, we maintain the highest ethical standards in all our business practices.",
              icon: "🤝"
            },
            {
              title: "Innovation",
              description: "Embracing modern technology and innovative approaches to deliver cutting-edge real estate solutions.",
              icon: "💡"
            }
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;