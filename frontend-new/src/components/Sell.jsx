import React from 'react';

const Sell = () => {
  return (
    <div>
      {/* Hero Image Section */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/8470839/pexels-photo-8470839.jpeg?_gl=1*11h0u9r*_ga*NzMxMDc3NjI0LjE3NDk3MDIzNTU.*_ga_8JE65Q40S6*czE3NTM2MTgwNzYkbzMkZzEkdDE3NTM2MjA1NTQkajM3JGwwJGgw')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">Sell Your Property</h1>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Why List with IndianAgency?</h2>
        <p className="mb-6 text-gray-700">
          We provide maximum exposure, personalized service, and a network of trusted buyers. Our expert team ensures
          your property is presented in the best light to sell fast and at the best price.
        </p>

        <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Professional Photography</li>
          <li>Targeted Marketing</li>
          <li>Experienced Agents</li>
          <li>Legal and Documentation Support</li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Property Information</h2>
        <form className="grid grid-cols-1 gap-4">
          <input type="text" placeholder="Full Name" className="p-2 border rounded" />
          <input type="text" placeholder="Contact Number" className="p-2 border rounded" />
          <input type="text" placeholder="Email Address" className="p-2 border rounded" />
          <input type="text" placeholder="Property Area (Location)" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Property Type</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Plot</option>
          </select>
          <input type="text" placeholder="Property Size (sq ft)" className="p-2 border rounded" />
          <textarea placeholder="Additional Info" className="p-2 border rounded h-24" />
          <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
