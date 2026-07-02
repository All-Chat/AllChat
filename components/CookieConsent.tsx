"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie, ArrowRight, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("allchat-cookie-consent");
    if (!consent) {
      // Show popup after a slight delay for a premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("allchat-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("allchat-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 md:bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-3xl"
        >
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
            
            {/* Soft Background Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#25D366]/10 rounded-full filter blur-3xl pointer-events-none"></div>
            
            {/* Close Button (Optional) */}
            <button 
              onClick={handleDecline}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors md:hidden"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Icon */}
            <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl bg-[#f0fdf4] items-center justify-center shadow-sm border border-green-100/50">
              <Cookie className="w-8 h-8 text-[#25D366]" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-lg font-bold text-[#0B1F1A] mb-1 flex items-center justify-center md:justify-start">
                <Cookie className="w-5 h-5 mr-2 text-[#25D366] md:hidden" /> 
                We value your privacy
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We use cookies to improve your browsing experience, analyze website traffic, and enhance our services. By clicking &quot;Accept&quot;, you agree to our use of cookies.
              </p>
              <Link 
                href="/cookie-policy" 
                className="inline-flex items-center text-xs font-semibold text-[#075E54] hover:text-[#25D366] mt-2 group transition-colors"
              >
                Learn more in our Cookie Policy 
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0 relative z-10">
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-full font-semibold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-300 w-full md:w-auto"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="group px-6 py-3 rounded-full font-semibold text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 shadow-[0_8px_20px_-5px_rgba(37,211,102,0.4)] w-full md:w-auto flex items-center justify-center"
              >
                Accept
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
