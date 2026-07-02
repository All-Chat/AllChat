"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cookie, ShieldCheck, BarChart3, Lock, SlidersHorizontal, Settings, 
  AlertTriangle, Mail, Globe, FileText, ArrowRight, Sparkles
} from "lucide-react";

// Strict TypeScript Types
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

// Reusable Fade In Up Animation
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Premium Slide-Up Text Reveal Animation
const AnimatedText: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden pb-2">
    <motion.span
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

// Reusable List Component
const PolicyList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-3 mt-4">
    {items.map((item) => (
      <li key={item} className="flex items-start text-gray-600 group">
        <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover:bg-[#25D366] transition-colors duration-300">
          <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full group-hover:bg-white transition-colors duration-300"></span>
        </span>
        <span className="text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{item}</span>
      </li>
    ))}
  </ul>
);

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: ShieldCheck,
      title: "Essential Cookies",
      desc: "Necessary for the operation of our website. They enable core functionality such as page navigation, account login, and security.",
      items: ["User authentication", "Session management", "Security protection", "Login persistence", "Form submission support"]
    },
    {
      icon: SlidersHorizontal,
      title: "Functional Cookies",
      desc: "Remember your preferences and improve your browsing experience across sessions.",
      items: ["Language preference", "Time zone", "User interface settings", "Previously entered information", "Dashboard preferences"]
    },
    {
      icon: BarChart3,
      title: "Performance & Analytics",
      desc: "Help us understand how visitors interact with our website so we can improve performance and usability.",
      items: ["Pages visited", "Time spent on pages", "Browser type & Device type", "Operating system", "Website performance & Navigation behavior"]
    },
    {
      icon: Lock,
      title: "Security Cookies",
      desc: "Help us maintain a secure business communication platform for all users.",
      items: ["Detect suspicious activity", "Prevent unauthorized access", "Protect user accounts", "Reduce fraud risks", "Maintain platform integrity"]
    }
  ];

  // Updated related policies with actual links
  const relatedPolicies = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Data Deletion Instructions", href: "/data-deletion" },
    { label: "Security & Compliance", href: "/security" },
    { label: "Acceptable Use Policy", href: "/acceptable-use" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFEFB] text-gray-800 overflow-x-hidden font-sans selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#FAFEFB]">
        <div className="absolute top-20 left-1/4 h-72 w-72 md:h-96 md:w-96 bg-[#25D366]/10 rounded-full filter blur-[80px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 h-80 w-80 md:h-[500px] md:w-[500px] bg-[#075E54]/5 rounded-full filter blur-[90px] md:blur-[120px] pointer-events-none"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-green-100/50 mb-6 md:mb-8">
              <Cookie className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
            </div>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1F1A] tracking-tight mb-6 md:mb-8 leading-[1.1]">
            <AnimatedText>Cookie Policy</AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <span className="w-2 h-2 bg-[#25D366] rounded-full"></span> Effective Date: 1 June
              </span>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" /> Last Updated: 1 June 2026
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light px-4 max-w-3xl mx-auto">
              This Cookie Policy explains how AllChat, a product developed and operated by The Real Leads (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), uses cookies and similar technologies when you visit our website, applications, and related services.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro & Consent Banner */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#25D366] to-[#075E54]"></div>
              <div className="relative z-10">
                <p className="text-gray-600 leading-relaxed text-sm md:text-lg mb-4">
                  By continuing to use our website, you consent to the use of cookies as described in this Cookie Policy unless you disable them through your browser settings.
                </p>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  By continuing to use the AllChat website and Services, you acknowledge that you have read and understood this Cookie Policy and consent to our use of cookies as described herein, subject to your browser preferences and applicable law.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Sections Container */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          
          {/* 1 & 2. What & Why (Split Layout) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.1)] transition-shadow duration-500">
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">1. What Are Cookies?</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                  Cookies are small text files stored on your device by your web browser when you visit a website. They help websites remember your preferences, improve functionality, enhance security, and provide a better user experience.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Cookies may be temporary (session cookies) or remain on your device for a longer period (persistent cookies).
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.1)] transition-shadow duration-500">
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">2. Why We Use Cookies</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">We use cookies and similar technologies to:</p>
                <div className="grid grid-cols-1 gap-x-4">
                  <PolicyList items={["Ensure our website functions correctly.", "Keep users securely logged in.", "Remember user preferences.", "Improve website performance.", "Analyze website usage.", "Enhance website security.", "Support customer experience.", "Detect suspicious or fraudulent activity."]} />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 3. Types of Cookies We Use (Bento Grid) */}
          <div>
            <FadeIn className="mb-8 text-center">
              <span className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Categorization</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F1A] tracking-tight">
                <AnimatedText>3. Types of Cookies We Use</AnimatedText>
              </h2>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {cookieTypes.map((type, i) => (
                <FadeIn key={type.title} delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(37,211,102,0.15)] transition-all duration-500 group">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm">
                        <type.icon className="w-6 h-6 text-[#075E54] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A]">{type.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{type.desc}</p>
                    <PolicyList items={type.items} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* 4. Third-Party Cookies */}
          <FadeIn>
            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f0fdf4] p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-shadow duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F1A] mb-4 tracking-tight">4. Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">Depending on the Services you use, third-party providers may place cookies on your device. Examples may include:</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Google Analytics", "Google Fonts", "Google reCAPTCHA", "Cloudflare", "Embedded Videos"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm hover:border-[#25D366] hover:text-[#075E54] transition-colors cursor-default">
                    <Sparkles className="w-3.5 h-3.5 text-[#25D366]" /> {t}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">These third parties operate under their own privacy policies. We recommend reviewing their respective policies for additional information.</p>
            </div>
          </FadeIn>

          {/* 5 & 6. Managing & Browser Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Settings className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F1A] mb-4">5. Managing Cookies</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Most web browsers allow you to control cookies through browser settings. You can:</p>
                <PolicyList items={["View stored cookies.", "Delete existing cookies.", "Block future cookies.", "Receive notifications before cookies are stored."]} />
                <p className="text-gray-500 text-sm leading-relaxed mt-4">Please note that disabling certain cookies may affect website functionality and your user experience.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <SlidersHorizontal className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F1A] mb-4">6. Browser Controls</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Most modern browsers provide options to:</p>
                <PolicyList items={["Accept all cookies.", "Reject all cookies.", "Delete cookies when the browser closes.", "Block cookies from specific websites.", "Configure cookie permissions individually."]} />
              </div>
            </FadeIn>
          </div>

          {/* 7. Impact of Disabling Cookies (Warning Card) */}
          <FadeIn>
            <div className="bg-gradient-to-br from-red-50/50 to-orange-50/50 p-8 md:p-10 rounded-[2rem] border border-orange-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-orange-100">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">7. Impact of Disabling Cookies</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">If you choose to disable cookies:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <PolicyList items={["Certain website features may not function properly.", "Login sessions may not persist.", "User preferences may not be remembered."]} />
                <PolicyList items={["Some platform functionality may become unavailable.", "Overall website performance may be affected."]} />
              </div>
            </div>
          </FadeIn>

          {/* 8 & 9. Advertising & Updates (Clean Minimal Cards) */}
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A] mb-3">8. Do We Use Advertising Cookies?</h3>
                <p className="text-gray-500 text-sm leading-relaxed">At this time, AllChat does not use cookies for personalized advertising on its platform. If advertising or marketing technologies are introduced in the future, this Cookie Policy will be updated accordingly.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A] mb-3">9. Updates to This Cookie Policy</h3>
                <p className="text-gray-500 text-sm leading-relaxed">We may update this Cookie Policy from time to time to reflect changes in our website, technologies, legal requirements, or operational practices. The updated version will always be published on this page with the revised &quot;Last Updated&quot; date. Your continued use of our Services after any updates constitutes acceptance of the revised Cookie Policy.</p>
              </div>
            </FadeIn>
          </div>

          {/* 10. Contact Us & Related Policies (Premium Split) */}
          <div className="grid md:grid-cols-5 gap-6 pt-8">
            <FadeIn className="md:col-span-3">
              <div className="bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl h-full relative overflow-hidden group hover:shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)] transition-shadow duration-500">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#25D366]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#128C7E]/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">10. Contact Us</h3>
                  <p className="text-white/70 leading-relaxed mb-8 text-sm md:text-base">If you have any questions about our use of cookies or this Cookie Policy, please contact us.</p>
                  <div className="space-y-4">
                    <motion.a href="https://www.allchat.in" whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base">https://www.allchat.in</span>
                    </motion.a>
                    <motion.a href="mailto:hello@allchat.in" whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base">hello@allchat.in</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="md:col-span-2">
              <div className="bg-white p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-[#075E54]" />
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A]">Related Policies</h3>
                </div>
                <ul className="space-y-3">
                  {relatedPolicies.map((p) => (
                    <li key={p.label}>
                      <Link 
                        href={p.href} 
                        className="flex items-center justify-between text-sm text-gray-600 hover:text-[#075E54] group transition-colors py-2 border-b border-gray-50 last:border-0"
                      >
                        <span>{p.label}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </div>
  );
}
