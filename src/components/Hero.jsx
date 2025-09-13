import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://videos.pexels.com/video-files/8440735/8440735-uhd_2732_1440_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Luxury Living
        </h1>

        {/* Search All Properties Button */}
        <Link
          to="/allproperties"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
        >
          Search All Properties
        </Link>
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
    </section>
  );
};

export default Hero;






// import React from 'react';

// const Hero = () => {
//   return (
//     <section
//       id="hero"
//       className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center"
//     >
//       {/* Background Video */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="https://videos.pexels.com/video-files/8440735/8440735-uhd_2732_1440_25fps.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Text Overlay */}
//       <div className="relative z-10 text-white px-4">
//         <h1 className="text-5xl md:text-6xl font-bold mb-4">
//           Discover Luxury Living
//         </h1>
//       </div>

//       {/* Dark overlay for readability */}
//       <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
//     </section>
//   );
// };

// export default Hero;
