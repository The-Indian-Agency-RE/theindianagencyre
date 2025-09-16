import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We're here to assist you with all your property needs. Reach out to our team 
            for expert guidance on buying, selling, or investing in real estate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white border border-slate-200 p-8">
            <h2 className="text-xl font-medium text-slate-900 mb-6">Send Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:border-slate-500 transition-colors resize-none"
                  placeholder="How can we help you with your property needs?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-3 px-6 hover:bg-slate-800 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6">
              <h3 className="font-medium text-slate-900 mb-4">Office Address</h3>
              <p className="text-slate-600 leading-relaxed">
                123 Business District<br />
                Sector 15, Gomti Nagar<br />
                Lucknow, UP 226010<br />
                India
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="font-medium text-slate-900 mb-4">Phone</h3>
              <p className="text-slate-600">+91 522 123 4567</p>
              <p className="text-slate-600">+91 98765 43210</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="font-medium text-slate-900 mb-4">Email</h3>
              <p className="text-slate-600">contact@propertyexperts.com</p>
              <p className="text-slate-600">support@propertyexperts.com</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <h3 className="font-medium text-slate-900 mb-4">Business Hours</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700">Monday - Friday</span>
                  <span className="text-slate-600">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Saturday</span>
                  <span className="text-slate-600">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700">Sunday</span>
                  <span className="text-slate-600">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;