import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Icon buat mobile menu


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">PS</span>
          </div>
          <span className="text-xl font-inter font-bold text-[#1a1a3a] tracking-tight">
            PeaceSchool
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-gray-600 font-plus-jakarta hover:text-indigo-600 font-medium transition">Home</a>
          <a href="#services" className="text-gray-600 font-plus-jakarta hover:text-indigo-600 font-medium transition">Services</a>
          <a href="#recent" className="text-gray-600 font-plus-jakarta hover:text-indigo-600 font-medium transition">About</a>
          <Link href={'/login'} as={'button'} className="bg-[#2d2654] text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition shadow-lg shadow-indigo-100">
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700">
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full px-6 py-6 flex flex-col gap-4 shadow-xl">
          <a href="#hero" className="text-gray-600 font-medium border-b pb-2">Home</a>
          <a href="#services" className="text-gray-600 font-medium border-b pb-2">Services</a>
          <a href="#recent" className="text-gray-600 font-medium border-b pb-2">About</a>
          <button className="bg-[#2d2654] text-white px-6 py-3 rounded-lg font-bold">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
