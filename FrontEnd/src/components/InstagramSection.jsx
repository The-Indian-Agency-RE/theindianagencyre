import React from "react";
import { FaInstagram } from "react-icons/fa";

const InstagramSection = () => {
  const posts = [
    { id: 1, img: "https://images.unsplash.com/photo-1612637968894-660373e23b03?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", caption: "Luxury Villa in LA - $7.5M" },
    { id: 2, img: "https://plus.unsplash.com/premium_photo-1664266386277-2789b93c8b53?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", caption: "Modern Beachfront Mansion" },
    { id: 3, img: "https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", caption: "Tuscan Estate in Malibu" },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
        Follow Us On
      </p>
      <h2 className="text-4xl font-bold text-gray-800 mb-12 relative inline-block">
        Instagram
        <span className="block w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></span>
      </h2>

      {/* Instagram Posts */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1"
          >
            <img
              src={post.img}
              alt={`Post ${post.id}`}
              className="w-full h-64 object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-90"
            />
            {/* Overlay with caption */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl">
              <p className="text-white text-lg font-medium px-4 text-center">
                {post.caption}
              </p>
            </div>
            {/* Instagram Icon */}
            <div className="absolute bottom-3 left-3 text-pink-500 text-2xl">
              <FaInstagram />
            </div>
          </div>
        ))}
      </div>

      {/* Follow Button */}
      <div className="mt-10">
        <a
          href="https://www.instagram.com/"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 hover:scale-105 transition transform"
        >
          <FaInstagram className="text-pink-500 text-xl" />
          Follow
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;
