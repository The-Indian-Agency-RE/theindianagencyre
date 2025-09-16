import React from "react";
import { FaInstagram, FaArrowRight } from "react-icons/fa";

const InstagramSection = () => {
  const posts = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1612637968894-660373e23b03?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      caption: "Stunning Modern Architecture",
      likes: "2,847",
      date: "2 days ago"
    },
    { 
      id: 2, 
      img: "https://plus.unsplash.com/premium_photo-1664266386277-2789b93c8b53?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      caption: "Luxury Beachfront Living",
      likes: "3,142",
      date: "4 days ago"
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      caption: "Elegant Interior Design",
      likes: "1,923",
      date: "1 week ago"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaInstagram />
            FOLLOW OUR JOURNEY
          </div>
          <h2 className="text-5xl font-bold mb-4">
            Behind The Scenes
            <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              @IndianAgency
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get exclusive access to luxury properties, market insights, and behind-the-scenes content
          </p>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={post.img}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Instagram Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <FaInstagram className="text-white text-lg" />
                  </div>
                </div>

                {/* Post Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg font-semibold mb-2">{post.caption}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>❤️ {post.likes} likes</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                      <FaInstagram className="text-white text-2xl" />
                    </div>
                    <p className="text-white font-medium">View on Instagram</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { number: '125K+', label: 'Followers' },
            { number: '2.8M', label: 'Total Likes' },
            { number: '850+', label: 'Properties Featured' },
            { number: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <FaInstagram className="text-xl transition-transform group-hover:scale-110" />
            <span>Follow @IndianAgency</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;