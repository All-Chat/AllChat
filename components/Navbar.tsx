"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get current route
  
  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Us", href: "/contact" },
  ];
  
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Floating Glassmorphism Nav Pill */}
        <nav className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
          
          {/* Image Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.svg" 
              alt="AllChat Logo"
              width={160}      
              height={160}     
              className="h-9 md:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
              priority        
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const isActive = pathname === l.href;
              
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    isActive
                      ? "font-semibold text-[#075E54] bg-[#c9fbd9]" // Active styles
                      : "font-medium text-gray-500 hover:text-[#075E54] hover:bg-[#f0fdf4]" // Inactive styles
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="https://app.allchat.in/" 
              className="text-sm font-semibold text-white bg-[#075E54] px-5 py-2.5 rounded-full hover:bg-[#0b3d35] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Access Dashboard
            </Link>
          </div>

          {/* Mobile toggle (Custom CSS Hamburger - No Icons) */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${open ? "opacity-0 scale-x-0" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${open ? "-rotate-45 -translate-y-[3.5px]" : ""}`}></span>
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgb(0,0,0,0.06)] rounded-3xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-1">
              {links.map((l) => {
                const isActive = pathname === l.href;
                
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? "font-semibold text-[#075E54] bg-[#f0fdf4]" // Active styles
                        : "font-medium text-gray-600 hover:bg-[#f0fdf4] hover:text-[#075E54]" // Inactive styles
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-2">
              <Link
                href="https://app.allchat.in/"
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-semibold text-white bg-[#075E54] px-5 py-3 rounded-full shadow-sm hover:bg-[#0b3d35] transition"
              >
                Access Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
