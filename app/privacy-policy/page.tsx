"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck, User, Building2, Users, MessageSquare, ClipboardList, 
  Cpu, Database, Share2, Clock, Lock, AlertTriangle, Globe, 
  Mail, FileText, Cookie, Trash2, Scale, Send,
  CheckCircle2
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
  <ul className="space-y-2.5 mt-4">
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

export default function PrivacyPolicyPage() {
  const dataTypes = [
    {
      icon: User,
      title: "Account Information",
      desc: "When you create an account, we may collect:",
      items: ["Business Name", "Contact Person Name", "Email Address", "Mobile Number", "Company Address", "Business Website", "Business Identification Info", "Login Credentials"]
    },
    {
      icon: Building2,
      title: "Business Profile Information",
      desc: "When connecting business services, we may collect:",
      items: ["Business Portfolio ID", "WhatsApp Business Account ID", "Phone Number ID", "Display Name", "Business Category", "Time Zone", "Language Preferences"]
    },
    {
      icon: Users,
      title: "Customer Contact Information",
      desc: "Businesses may choose to upload or synchronize:",
      items: ["Customer Name", "Mobile Number", "Email Address", "Labels and Tags", "Communication Preferences"]
    },
    {
      icon: MessageSquare,
      title: "Communication Data",
      desc: "To provide messaging services, we may process:",
      items: ["Customer Conversations", "Message Status", "Delivery Information", "Read Status", "Reply Status", "Template Information", "Campaign Information"]
    },
    {
      icon: ClipboardList,
      title: "Form Data",
      desc: "When businesses create forms, submitted info may include:",
      items: ["Name", "Phone Number", "Email", "Company Name", "Inquiry Details", "Custom Form Fields"]
    },
    {
      icon: Cpu,
      title: "Technical Information",
      desc: "We automatically collect certain technical data:",
      items: ["IP Address", "Browser Type", "Device Information", "Operating System", "Log Files", "Session Information", "Date and Time of Access"]
    }
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
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
            </div>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1F1A] tracking-tight mb-6 md:mb-8 leading-[1.1]">
            <AnimatedText>Privacy Policy</AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <span className="w-2 h-2 bg-[#25D366] rounded-full"></span> Effective Date: 1 June 2026
              </span>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-yellow-500" /> Last Updated: 1 June 2026
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light px-4 max-w-3xl mx-auto">
              Welcome to AllChat, a product developed and operated by The Real Leads (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). Your privacy is important to us. This Privacy Policy explains how we collect, use, store, disclose, and protect information when you access or use the AllChat platform, website, applications, APIs, and related services (&quot;Services&quot;).
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Sections Container */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
          
          {/* 1. About AllChat */}
          <FadeIn>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#25D366] to-[#075E54]"></div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight pl-4 md:pl-6">1. About AllChat</h2>
              <div className="pl-4 md:pl-6">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                  AllChat is a business communication platform developed by The Real Leads that enables businesses to manage customer communication, collaborate with teams, automate workflows, and use the WhatsApp Business Platform through authorized integrations.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">AllChat is designed for business users and organizations.</p>
              </div>
            </div>
          </FadeIn>

          {/* 2. Information We Collect (Bento Grid) */}
          <div>
            <FadeIn className="mb-8 text-center">
              <span className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Data Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F1A] tracking-tight">
                <AnimatedText>2. Information We Collect</AnimatedText>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">Depending on how you use our Services, we may collect the following categories of information.</p>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataTypes.map((type, i) => (
                <FadeIn key={type.title} delay={i * 0.05}>
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(37,211,102,0.15)] transition-all duration-500 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm mb-5">
                      <type.icon className="w-6 h-6 text-[#075E54] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A] mb-2">{type.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{type.desc}</p>
                    <PolicyList items={type.items} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* 3, 4, 5, 6 (Alternating Layout) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">3. How We Use Information</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">We use collected information to:</p>
                <PolicyList items={["Provide and operate the Services", "Create user accounts & Authenticate users", "Enable business communication", "Process customer conversations", "Manage message templates & Deliver campaigns", "Improve platform functionality", "Respond to customer support requests", "Detect fraud or unauthorized access", "Maintain security & Comply with legal obligations"]} />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">4. Platform Data</h2>
                <div className="bg-[#f0fdf4] p-4 rounded-xl border border-green-100/50 mb-4">
                  <p className="text-gray-700 text-sm font-medium flex items-start">
                    <AlertTriangle className="w-5 h-5 text-[#25D366] mr-3 flex-shrink-0 mt-0.5" />
                    We do not use Platform Data for advertising purposes or sell Platform Data to third parties.
                  </p>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">AllChat processes Platform Data only for the purpose of providing services requested by the business using our platform.</p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">Businesses remain responsible for obtaining any required permissions or consents from their customers before communicating with them through the platform.</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">5. WhatsApp Business Platform</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">AllChat enables businesses to connect their own WhatsApp Business Accounts using authorized integration methods.</p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">Use of the WhatsApp Business Platform is also subject to the applicable Meta Platform Terms, WhatsApp Business Terms, and related policies.</p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">Businesses are responsible for ensuring that their use of messaging services complies with applicable platform requirements.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">6. Cookies & Similar Technologies</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Our website may use cookies and similar technologies to:</p>
                <PolicyList items={["Maintain user sessions", "Improve website functionality", "Remember preferences", "Analyze website usage", "Enhance user experience"]} />
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm">Users can manage cookie preferences through their browser settings. Read our <Link href="/cookie-policy" className="text-[#075E54] font-medium hover:underline">Cookie Policy</Link>.</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 7, 8, 9 (Security & Sharing Split) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">7. Sharing of Information</h2>
                </div>
                <div className="bg-red-50/50 p-4 rounded-xl border border-red-100/50 mb-4">
                  <p className="text-gray-700 text-sm font-medium">We do not sell personal information.</p>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Information may be shared only when necessary:</p>
                <PolicyList items={["With service providers supporting our platform", "With infrastructure providers", "To comply with legal obligations", "To protect our legal rights", "During business transfers or mergers", "When required by applicable law"]} />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">8. Data Retention</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">We retain information only for as long as necessary to:</p>
                <PolicyList items={["Provide Services", "Meet legal obligations", "Resolve disputes", "Enforce agreements", "Maintain platform security"]} />
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm">Businesses may request deletion of eligible information as described in our <Link href="/data-deletion" className="text-[#075E54] font-medium hover:underline">Data Deletion Instructions</Link>.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="md:col-span-2">
              <div className="bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl relative overflow-hidden h-full">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#25D366]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#128C7E]/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                      <Lock className="w-7 h-7 text-[#25D366]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">9. Data Security</h2>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base mb-4">We implement reasonable administrative, technical, and organizational measures to help protect information from unauthorized access, disclosure, alteration, or destruction.</p>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">However, no internet-based system can guarantee absolute security. Users are responsible for protecting their account credentials.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Scale className="w-5 h-5 text-green-400" />
                      <h4 className="font-bold text-lg">10. User Responsibilities</h4>
                    </div>
                    <p className="text-white/60 text-sm mb-4">Businesses using AllChat agree to:</p>
                    <ul className="space-y-2.5">
                      {["Maintain accurate account information.", "Keep login credentials secure.", "Obtain necessary customer consent where required.", "Use the platform responsibly.", "Comply with applicable laws and platform requirements."].map((item) => (
                        <li key={item} className="flex items-start text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#25D366] mr-3 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 11, 12, 13 (Minimal Cards) */}
          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F1A] mb-3">11. Children&apos;s Privacy</h3>
                <p className="text-gray-500 text-sm leading-relaxed">AllChat is intended for business use and is not directed toward children under the age required by applicable law. We do not knowingly collect personal information directly from children.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F1A] mb-3">12. International Data Transfers</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Depending on your location, information may be processed or stored in countries other than your own. Where applicable, we take reasonable steps to protect transferred information in accordance with applicable privacy requirements.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <Database className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1F1A] mb-3">13. Third-Party Services</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">Our Services may integrate with third-party platforms, including:</p>
                <div className="flex flex-wrap gap-2">
                  {["WhatsApp Business", "Meta Business", "Google Workspace", "Google Sheets", "Cloud Hosting"].map((t) => (
                    <span key={t} className="text-xs font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 14 & 15 (Rights and Deletion) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#f0fdf4] p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-shadow duration-500 h-full">
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">14. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Depending on applicable laws, users may have rights to:</p>
                <PolicyList items={["Access personal information", "Correct inaccurate information", "Request deletion", "Request restriction of processing", "Object to certain processing", "Receive a copy of their information"]} />
                <p className="text-gray-500 text-sm leading-relaxed mt-6">Requests can be submitted using the contact information below.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">15. Account Deletion</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Businesses may request deletion of their AllChat account by contacting us. Certain information may be retained where required for:</p>
                <PolicyList items={["Legal compliance", "Fraud prevention", "Security", "Financial records", "Contractual obligations"]} />
              </div>
            </FadeIn>
          </div>

          {/* 16 & 17 (Updates and Contact) */}
          <div className="grid md:grid-cols-5 gap-6 pt-4">
            <FadeIn className="md:col-span-2">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-[#075E54]" />
                  <h3 className="text-lg font-bold text-[#0B1F1A]">16. Changes to this Policy</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">We may update this Privacy Policy from time to time. The latest version will always be available on our website with the updated effective date. Continued use of our Services after changes become effective constitutes acceptance of the revised Privacy Policy.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="md:col-span-3">
              <div className="bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl h-full relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#25D366]/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">17. Contact Us</h3>
                  <p className="text-white/70 leading-relaxed mb-8 text-sm md:text-base">If you have questions regarding this Privacy Policy or our privacy practices, please contact us:</p>
                  <div className="space-y-4">
                    <motion.a href="https://www.allchat.in" whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-green-100/60 uppercase tracking-wider">Website</p>
                        <span className="font-medium text-sm md:text-base">https://www.allchat.in</span>
                      </div>
                    </motion.a>
                    <motion.a href="mailto:hello@allchat.in" whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-green-100/60 uppercase tracking-wider">Email</p>
                        <span className="font-medium text-sm md:text-base">hello@allchat.in</span>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </div>
  );
}
