// import React, { useEffect } from "react";
// import { FaLinkedin, FaTwitter } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const OurStory = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
//   }, []);

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-5xl mx-auto px-6 text-center">
//         {/* Section Title */}
//         <h2
//           className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 tracking-tight"
//           data-aos="fade-up"
//         >
//           Leadership Team
//         </h2>

//         {/* Leader Card */}
//         <div
//           className="relative bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto hover:shadow-xl transition-shadow duration-500"
//           data-aos="fade-up"
//         >
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             {/* Leader Image */}
//             <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0">
//               <img
//                 src="https://images.unsplash.com/photo-1724093832100-fa80f73b424b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0"
//                 alt="Leader"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Info */}
//             <div className="text-left">
//               <h3 className="text-2xl font-semibold text-gray-900 mb-1">
//                 Mr. Ashish
//               </h3>
//               <p className="text-indigo-600 uppercase tracking-wide mb-3 text-sm">
//                 Founder & CEO
//               </p>
//               <p className="text-gray-700 text-base md:text-lg mb-4">
//                 Mr. Ashish has over 15 years of experience in real estate, guiding
//                 the company with expertise, vision, and commitment to excellence.
//               </p>

//               {/* Social Icons */}
//               <div className="flex gap-4 mb-4">
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-indigo-600 transition-colors duration-300"
//                 >
//                   <FaLinkedin size={24} />
//                 </a>
//                 <a
//                   href="#"
//                   className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
//                 >
//                   <FaTwitter size={24} />
//                 </a>
//               </div>

//               {/* Read More Button */}
//               <button
//                 onClick={() => navigate("/readmore")}
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
//               >
//                 Read More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurStory;


import React, { useEffect } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-gray-100 to-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 tracking-tight"
          data-aos="fade-up"
        >
          Leadership Team
        </h2>

        {/* Leader Card */}
        <div
          className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-xl p-1 shadow-xl hover:shadow-2xl transition duration-500"
          data-aos="fade-up"
        >
          <div className="bg-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            {/* Leader Image */}
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 shadow-lg flex-shrink-0 transform transition duration-500 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1724093832100-fa80f73b424b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0"
                alt="Leader"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                Mr. Ashish
              </h3>
              <p className="text-purple-600 uppercase tracking-wide mb-3 text-sm">
                Founder & CEO
              </p>
              <p className="text-gray-700 text-base md:text-lg mb-4">
                Mr. Ashish has over 15 years of experience in real estate, leading
                the company with vision and passion for excellence.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-purple-600 transition-colors duration-300"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                >
                  <FaTwitter size={24} />
                </a>
              </div>

              {/* Read More Button */}
              <button
                onClick={() => navigate("/readmore")}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition duration-300"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
