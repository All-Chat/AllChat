/* eslint-disable react/no-unescaped-entities */
"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, Mail, ArrowRight, Search, MessageCircle, 
  Send, AlertTriangle, Globe
} from "lucide-react";

// --- TypeScript Interfaces & Reusable Components ---

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating Background Icons
const FloatingBackground = () => {
  const icons = [
    { Icon: Search, top: "15%", left: "10%", size: 50, duration: 7, delay: 0, color: "#25D366" },
    { Icon: MessageCircle, top: "25%", left: "85%", size: 35, duration: 9, delay: 1, color: "#075E54" },
    { Icon: Send, top: "65%", left: "15%", size: 40, duration: 8, delay: 0.5, color: "#25D366" },
    { Icon: AlertTriangle, top: "75%", left: "80%", size: 35, duration: 10, delay: 1.5, color: "#075E54" },
    { Icon: Globe, top: "45%", left: "90%", size: 45, duration: 8.5, delay: 0.2, color: "#25D366" },
    { Icon: Mail, top: "55%", left: "5%", size: 40, duration: 9.5, delay: 1.2, color: "#075E54" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const { Icon, top, left, size, duration, delay, color } = item;
        return (
          <motion.div
            key={`404-float-${index}`}
            className="absolute"
            style={{ top, left, filter: `blur(1px)` }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} style={{ color: color }} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen mt-10 font-sans bg-gradient-to-b from-[#f0fdf4] to-[#ffffff] text-gray-800 overflow-x-hidden selection:bg-[#25D366]/20 flex items-center justify-center px-4">
      
      <FloatingBackground />
      
      {/* Soft Glowing Orbs */}
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 h-96 w-96 bg-[#25D366]/10 rounded-full filter blur-3xl pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-[#075E54]/10 rounded-full filter blur-3xl pointer-events-none"
      ></motion.div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        <FadeIn>
          <span className="inline-flex items-center bg-white/80 backdrop-blur-md text-[#075E54] px-4 py-2 rounded-full text-sm font-medium mb-8 border border-[#25D366]/20 shadow-sm">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Error 404: Page Not Found
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-[8rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#075E54] to-[#25D366] leading-none tracking-tighter drop-shadow-sm">
            404
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Oops! We can't find that page.
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <button className="group bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1ebe5d] transition-all shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.5)] hover:-translate-y-1 flex items-center justify-center w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" /> Go Back Home 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
            
            <Link href="/contact">
              <button className="bg-white text-[#075E54] border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm hover:-translate-y-1 flex items-center justify-center w-full sm:w-auto">
                <Mail className="w-5 h-5 mr-2" /> Contact Support
              </button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-16 pt-8 border-t border-gray-100 max-w-md mx-auto">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Quick Links</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/about" className="text-sm text-gray-500 hover:text-[#075E54] transition-colors">About Us</Link>
              <span className="text-gray-300">•</span>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-[#075E54] transition-colors">Terms of Service</Link>
              <span className="text-gray-300">•</span>
              <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-[#075E54] transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
