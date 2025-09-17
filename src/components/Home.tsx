import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* 🔹 Fullscreen Hero Video */}
      <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
        {/* Background Video with slow zoom */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] transform scale-105 animate-zoom-slow"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/17380073/17380073-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            Discover Luxury Living
          </h1>
          <p className="text-lg md:text-xl text-gray-200 animate-fadeIn delay-300">
            Step into a world of premium real estate
          </p>
          <Link
            to="/allproperties"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105 animate-fadeIn delay-500"
          >
            Explore Properties
          </Link>
        </div>

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        {/* Animation Styles */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-fadeIn {
              animation: fadeIn 1s forwards;
            }

            .animate-fadeIn.delay-300 {
              animation-delay: 0.3s;
            }

            .animate-fadeIn.delay-500 {
              animation-delay: 0.5s;
            }

            @keyframes zoomSlow {
              0% { transform: scale(1.05); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1.05); }
            }

            .animate-zoom-slow {
              animation: zoomSlow 30s ease-in-out infinite;
            }
          `}
        </style>
      </section>

      {/* 🔻 Intro Section */}
      <section className="mt-12 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 animate-fadeIn">Welcome to Indian Agency</h2>
        <p className="text-gray-700 text-lg animate-fadeIn delay-300">
          We provide handpicked luxury properties for rent, sale, and investment. Explore our latest listings and
          find the perfect property for you.
        </p>
      </section>

      {/* 🔻 Call to Action */}
      <div className="text-center mt-10 mb-12">
        <Link
          to="/rent"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition transform hover:scale-105 animate-fadeIn delay-500"
        >
          Explore Rentals
        </Link>
      </div>
    </div>
  );
};

export default Home;
