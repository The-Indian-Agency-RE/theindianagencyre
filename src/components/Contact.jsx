// Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-24 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Get in Touch</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        We'd love to hear from you. Whether you're looking to buy, sell, or invest in property, our expert team is here to help.
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-10 rounded-2xl shadow-2xl">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="abcd@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-teal-600 hover:shadow-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8 bg-gray-50 p-6 rounded-xl shadow-inner">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Visit Our Office</h4>
            <p className="text-gray-600">123 Beverly Hills Blvd, Los Angeles, CA 90210</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h4>
            <p className="text-gray-600">+91(***) 123-456</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Email</h4>
            <p className="text-gray-600">contact@abcdefgh.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
