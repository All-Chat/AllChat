"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Features", "How it works", "Reviews", "FAQ"];
  
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Changed from 'glass' to 'bg-white' to make it opaque */}
      <div className="bg-white border-b border-[#E8EDE9]">
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Image Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Image 
              src="/logo.svg" // Replace with your actual image path
              alt="AllChat Logo"
              width={160}      
              height={160}     
              // Added h-10 w-auto so the 140x140 image doesn't stretch the navbar height
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
              priority        
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-[#3D504A] hover:text-[#075E54] transition"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="https://app.allchat.in/" className="text-sm font-semibold text-[#3D504A] hover:text-[#075E54] px-4 py-2 transition">
              Sign in
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F0F4F1] transition"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-[#E8EDE9] bg-white px-5 py-4 space-y-1 shadow-lg">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#3D504A] hover:bg-[#F0FBF4] transition"
              >
                {l}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center text-sm font-semibold text-white bg-[#075E54] px-5 py-3 rounded-full shadow-soft"
            >
              Access Dashboard
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
