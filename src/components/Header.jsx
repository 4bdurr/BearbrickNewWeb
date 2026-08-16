import React from "react";
import { Search, Menu } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="relative z-30 flex items-center justify-between px-8 py-6">
      {/* Sisi Kiri: Logo + Dot Merah */}
      <div className="flex items-center gap-3">
        <h1 className="font-black text-2xl tracking-tighter text-black uppercase select-none">
          BE@RBRICK™
        </h1>
        <div className="h-5 w-5 rounded-full bg-[#D61B1F] shadow-xs" />
      </div>

      {/* Sisi Kanan: Search + Social Icons + Hamburger */}
      <div className="flex items-center gap-6">
        {/* Search Bar Capsule */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search collection..."
            className="h-9 w-60 rounded-full border border-black/80 bg-transparent px-4 pr-9 text-xs font-medium text-black placeholder:text-black/50 focus:outline-hidden focus:ring-1 focus:ring-black"
          />
          <Search size={14} className="absolute right-3.5 text-black/80 pointer-events-none" />
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 text-black">
          <a href="#instagram" className="transition-transform hover:scale-110">
            <FaInstagram size={18} />
          </a>
          <a href="#twitter" className="transition-transform hover:scale-110">
            <FaXTwitter size={18} />
          </a>
          <a href="#facebook" className="transition-transform hover:scale-110">
            <FaFacebookF size={18} />
          </a>
        </div>

        {/* Hamburger Menu */}
        <button
          type="button"
          className="flex items-center justify-center text-black transition-transform hover:scale-105"
          aria-label="Toggle navigation menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;