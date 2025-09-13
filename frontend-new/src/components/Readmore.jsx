import React from 'react';

const Readmore = () => {
  return (
    <section className="px-6 py-12 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center">About Our Leadership</h1>

      {/* Leader Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Text Section (Left) */}
        <div className="flex-1 text-left">
          <h3 className="text-2xl font-semibold">Mr. Ashish</h3>
          <p className="text-gray-600 text-lg mb-4">Founder & CEO</p>
          <p className="text-gray-700 leading-relaxed">
            Mr. Ashish has over 15 years of experience in real estate, leading
            the company with vision and passion for excellence. He has been
            instrumental in driving the company's growth through innovative
            strategies, customer-first solutions, and a focus on delivering
            premium real estate services.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Under his leadership, the company has expanded its footprint across
            major cities in India and continues to be a trusted name in the
            industry. His expertise and commitment inspire the team to achieve
            new milestones every day.
          </p>
        </div>

        {/* Image Section (Right) */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1724093832100-fa80f73b424b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mr. Ashish"
            className="w-[350px] h-[350px] object-cover shadow-lg border border-gray-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Readmore;
