'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import logo from '../assets/WhatsApp Image 2025-08-14 at 01.30.11_60fbe58c.jpg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 flex items-center transition-all duration-500 ${
        scrolled ? 'bg-black' : 'bg-transparent'
      }`}
      style={{
        height: '80px',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          zIndex: 60,
          left: '150px',
          top: scrolled ? '5px' : '0px', // stays at very top, moves down slightly on scroll
          width: scrolled ? '80px' : '160px', // bigger starting size
          height: scrolled ? '80px' : '160px',
        }}
      >
        <img
          src={logo}
          alt="IndianAgency Logo"
          className="object-cover w-full h-full"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-8 font-medium ml-auto mr-10">
        {['Buy', 'Sell', 'Rent', 'Commercial', 'Our Services', 'Contact'].map(
          item => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase().replace(' ', '')}`}
                className={scrolled ? 'text-white' : 'text-black'}
              >
                {item}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiSearch } from 'react-icons/fi';
// import logo from '../assets/Back 1.png'; // Ensure file exists

// const Navbar = () => {
//   const [search, setSearch] = useState('');
//   const [show, setShow] = useState(false);
//   const [scrolling, setScrolling] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => setShow(true), 100);
//     const handleScroll = () => setScrolling(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/allproperties?search=${search}`);
//       setSearch('');
//     }
//   };

//   return (
//     <nav
//       className={`relative sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-700 ease-in-out transform
//         ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
//         bg-gray-900/95 backdrop-blur-md
//         ${scrolling ? 'shadow-[0_0_30px_#00bfff] border-b border-blue-400' : 'shadow-md'}
//         hover:shadow-[0_0_40px_#00bfff]`}
//     >
//       {/* Logo (hanging without increasing navbar height) */}
//       <Link to="/" className="absolute -bottom-10 left-6 flex items-center">
//         <img
//           src={logo}
//           alt="IndianAgency Logo"
//           className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg"
//         />
//         {/* <span className="text-white font-bold text-xl tracking-wide ml-2 hidden md:block">
//           IndianAgency
//         </span> */}
//       </Link>

//       {/* Navigation Links */}
//       <ul className="flex gap-6 text-white font-medium ml-44">
//         {['Buy', 'Sell', 'Rent', 'Commercial', 'Our Services', 'Contact'].map((item) => (
//           <li key={item} className="relative group">
//             <Link
//               to={`/${item.toLowerCase().replace(' ', '')}`}
//               className="hover:text-gray-300 transition-colors duration-300"
//             >
//               {item}
//             </Link>
//             <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 rounded-full transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_#00bfff]"></span>
//           </li>
//         ))}
//       </ul>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="relative ml-6">
//         <FiSearch className="absolute left-3 top-3 text-gray-400 transition-colors duration-300" />
//         <input
//           type="text"
//           placeholder="Search properties..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-800 text-white border border-gray-700
//             focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
//             transition-all duration-500 placeholder-gray-400 hover:border-blue-400 hover:shadow-[0_0_8px_#00bfff]"
//         />
//       </form>
//     </nav>
//   );
// };

// export default Navbar;
