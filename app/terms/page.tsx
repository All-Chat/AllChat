/* eslint-disable react/no-unescaped-entities */
"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText, Mail, Globe, HelpCircle, 
  Scale, ArrowRight
} from "lucide-react";

// --- TypeScript Interfaces & Reusable Components ---

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Standard Fade In Up Animation
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

// Data Array for Terms
type TermItem = {
  num: string;
  title: string;
  desc?: string;
  list?: string[];
  size?: "sm" | "lg" | "xl"; // sm: 1 col, lg: 2 cols, xl: 3 cols (full width)
  variant?: "default" | "dark";
};

const termsData: TermItem[] = [
  { num: "01", size: "lg", title: "About AllChat", desc: "AllChat is a Software-as-a-Service (SaaS) platform that enables businesses to manage customer communication, team collaboration, workflow automation, campaign management, and integrations with the WhatsApp Business Platform. AllChat is intended solely for business use." },
  { num: "02", size: "sm", title: "Eligibility", list: ["Be at least 18 years of age.", "Have the authority to act on behalf of your business or organization.", "Provide accurate and complete registration information.", "Comply with all applicable laws and regulations."] },
  { num: "03", size: "sm", title: "Account Registration", desc: "To access certain features, you must create an account. You agree to:", list: ["Provide accurate information.", "Keep your login credentials secure.", "Notify us immediately of any unauthorized access.", "Be responsible for all activities under your account."] },
  { num: "04", size: "lg", title: "Business Accounts", desc: "Businesses using AllChat are responsible for their Meta Business Account, WhatsApp Business Account, connected phone numbers, customer communication, message content, and compliance with applicable platform policies. AllChat does not own or control your WhatsApp Business Account." },
  { 
    num: "05", 
    size: "xl", 
    variant: "dark",
    title: "Acceptable Use", 
    desc: "You agree not to use AllChat for:", 
    list: [
      "Spam or unsolicited messaging.", "Fraudulent activities.", "Illegal products or services.", "Phishing.", "Malware distribution.",
      "Harassment.", "Hate speech.", "Copyright infringement.", "Unauthorized access to other systems.", "Any activity prohibited by applicable laws or platform policies."
    ] 
  },
  { num: "06", size: "sm", title: "Customer Data", desc: "Businesses retain ownership of their customer information. AllChat processes customer information only for the purpose of providing the Services requested by the business. Businesses are responsible for obtaining any required customer permissions before communicating through the platform." },
  { num: "07", size: "lg", title: "WhatsApp Business Platform", desc: "AllChat allows businesses to connect their own WhatsApp Business Accounts using authorized integration methods. Your use of WhatsApp Business Platform features is also governed by Meta Platform Terms, WhatsApp Business Terms, and Applicable Meta Policies. You are responsible for complying with those policies." },
  { num: "08", size: "sm", title: "Message Templates", desc: "Businesses are responsible for creating appropriate message templates, following applicable messaging requirements, ensuring communication is lawful, and maintaining customer consent where required. Template approval is determined by Meta, not AllChat." },
  { num: "09", size: "sm", title: "Campaigns", desc: "Campaign features are provided to assist businesses in communicating with their customers. Businesses are responsible for recipient lists, customer consent, message timing, message content, and compliance with applicable messaging laws." },
  { num: "10", size: "sm", title: "Team Management", desc: "Account administrators are responsible for creating users, assigning permissions, removing access when employees leave, and protecting account security." },
  { num: "11", size: "lg", title: "Subscription & Billing", desc: "Certain features of AllChat may require a paid subscription. Subscription details, pricing, billing cycles, and renewal terms will be displayed before purchase. Unless otherwise stated, subscription fees are billed in advance, taxes may apply, and payments are generally non-refundable except where required by law." },
  { num: "12", size: "sm", title: "Third-Party Services", desc: "AllChat may integrate with third-party services including WhatsApp Business Platform, Meta Business Services, Google Workspace, Google Sheets, and Cloud Infrastructure Providers. Use of third-party services is governed by their own terms and privacy policies." },
  { num: "13", size: "sm", title: "Platform Availability", desc: "We strive to maintain reliable platform availability. However, we do not guarantee uninterrupted or error-free operation. Maintenance, upgrades, or technical issues may temporarily affect service availability." },
  { num: "14", size: "lg", title: "Security", desc: "We implement reasonable administrative and technical measures to protect our platform. Users remain responsible for using strong passwords, protecting login credentials, securing connected devices, and monitoring account activity." },
  { num: "15", size: "sm", title: "Intellectual Property", desc: "All software, branding, logos, graphics, documentation, website content, and technology associated with AllChat remain the property of The Real Leads unless otherwise stated. Users may not copy, modify, reverse engineer, redistribute, resell, license, or create derivative works without written permission." },
  { num: "16", size: "sm", title: "Confidentiality", desc: "Businesses may access confidential platform information while using AllChat. Both parties agree to use confidential information only for legitimate business purposes." },
  { num: "17", size: "sm", title: "Service Suspension", desc: "We may suspend or restrict access if:", list: ["These Terms are violated.", "Fraudulent activity is detected.", "Platform abuse occurs.", "Legal obligations require suspension.", "Security risks are identified."] },
  { num: "18", size: "lg", title: "Account Termination", desc: "Users may stop using AllChat at any time. We reserve the right to suspend or terminate accounts that violate these Terms or applicable laws. Upon termination, access to Services may end, certain information may be retained where legally required, and businesses remain responsible for outstanding obligations." },
  { num: "19", size: "sm", title: "Disclaimer", desc: "AllChat is provided on an 'as available' and 'as is' basis. We make reasonable efforts to maintain platform reliability but do not guarantee continuous availability, error-free operation, compatibility with every device or system, or business outcomes and customer engagement results." },
  { num: "20", size: "sm", title: "Limitation of Liability", desc: "To the maximum extent permitted by law, The Real Leads shall not be liable for indirect damages, lost profits, business interruption, loss of data, loss resulting from third-party services, or customer misuse of the platform." },
  { num: "21", size: "sm", title: "Indemnification", desc: "You agree to indemnify and hold harmless The Real Leads, its employees, officers, and affiliates from claims arising from your use of the Services, violation of these Terms, violation of applicable laws, customer disputes, or content sent through your account." },
  { num: "22", size: "sm", title: "Changes to the Services", desc: "We may improve, modify, discontinue, or replace features at any time to enhance the platform or comply with legal and technical requirements." },
  { num: "23", size: "sm", title: "Changes to These Terms", desc: "We may update these Terms from time to time. The latest version will always be published on our website. Continued use of AllChat after updates constitutes acceptance of the revised Terms." },
  { num: "24", size: "sm", title: "Governing Law", desc: "These Terms shall be governed by and interpreted in accordance with the laws of India, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Yamunanagar, Haryana, India." },
  { num: "25", size: "sm", title: "Contact Information", desc: "If you have any questions regarding these Terms, please contact us. The Real Leads (Product: AllChat). Website: https://www.allchat.in. Email: hello@allchat.in." },
  { 
    num: "26", 
    size: "xl", 
    variant: "dark",
    title: "Acknowledgement", 
    desc: "By accessing or using AllChat, you acknowledge that you have read, understood, and agreed to these Terms of Service." 
  }
];

export default function TermsPage() {
  const relatedPolicies = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Data Deletion", href: "/data-deletion" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Acceptable Use", href: "/acceptable-use" },
  ];

  const getSpanClass = (size: "sm" | "lg" | "xl" | undefined) => {
    if (size === "lg") return "md:col-span-2";
    if (size === "xl") return "md:col-span-2 lg:col-span-3";
    return "md:col-span-1";
  };

  return (
    <div className="min-h-screen font-sans bg-[#FAFEFB] text-gray-800 overflow-x-hidden selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#FAFEFB]">
        {/* Premium Soft Background Orbs */}
        <div className="absolute top-20 left-1/4 h-72 w-72 md:h-96 md:w-96 bg-[#25D366]/10 rounded-full filter blur-[80px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 h-80 w-80 md:h-[500px] md:w-[500px] bg-[#075E54]/5 rounded-full filter blur-[90px] md:blur-[120px] pointer-events-none"></div>
        
        {/* Large subtle bg icons */}
        <div className="absolute top-20 right-[5%] opacity-[0.06] pointer-events-none">
          <FileText size={300} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-10 left-[2%] opacity-[0.06] pointer-events-none">
          <Scale size={180} className="text-[#075E54]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-green-100/50 mb-6 md:mb-8">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
            </div>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1F1A] tracking-tight mb-6 md:mb-8 leading-[1.1]">
            <AnimatedText>Terms of</AnimatedText> 
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Service</span>
            </AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4 text-base md:text-lg text-gray-500 leading-relaxed font-light px-4">
              <p>
                Welcome to AllChat, a business communication platform developed and operated by The Real Leads (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
              </p>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the AllChat website, applications, APIs, and related services (collectively, the &quot;Services&quot;). By accessing or using AllChat, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16">
            <span className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Agreement Details</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F1A] tracking-tight">
              <AnimatedText>Terms & Conditions</AnimatedText>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
            {termsData.map((item, i) => {
              const isDark = item.variant === "dark";
              const isWide = item.size === "lg" || item.size === "xl";

              return (
                <FadeIn key={item.num} delay={(i % 3) * 0.08} className={`${getSpanClass(item.size)} h-full`}>
                  <div className={`relative p-8 rounded-[2rem] border transition-all duration-500 h-full group overflow-hidden flex flex-col ${
                    isDark 
                      ? "bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] text-white shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)] border-transparent hover:shadow-[0_40px_100px_-20px_rgba(11,31,26,0.5)]" 
                      : "bg-[#FAFEFB] border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0_25px_70px_-15px_rgba(37,211,102,0.15)] hover:-translate-y-2"
                  }`}>
                    
                    {/* Giant Background Number */}
                    <div className={`absolute top-0 right-0 text-[8rem] font-bold select-none pointer-events-none leading-none p-4 transition-colors duration-500 ${
                      isDark ? "text-white/5" : "text-gray-50/80 group-hover:text-[#f0fdf4]"
                    }`}>
                      {item.num}
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors duration-300 ${
                          isDark ? "bg-white/10 text-[#25D366] border-white/20" : "text-[#25D366] bg-[#f0fdf4] border-[#25D366]/20"
                        }`}>
                          Section {item.num}
                        </span>
                      </div>
                      <h3 className={`text-xl md:text-2xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-[#0B1F1A]"}`}>{item.title}</h3>
                      
                      {item.desc && (
                        <p className={`text-sm md:text-base leading-relaxed mb-4 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                          {item.desc}
                        </p>
                      )}

                      {item.list && (
                        <ul className={`space-y-2.5 mt-2 ${item.size === "xl" ? "md:grid md:grid-cols-2 md:gap-x-8" : ""}`}>
                          {item.list.map((listItem, idx) => (
                            <li key={idx} className="flex items-start space-x-3 group/list">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-1 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                                isDark ? "bg-white/10 group-hover/list:bg-[#25D366]" : "bg-green-50 group-hover/list:bg-[#25D366]"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                  isDark ? "bg-[#25D366] group-hover/list:bg-white" : "bg-[#25D366] group-hover/list:bg-white"
                                }`}></span>
                              </span>
                              <span className={`text-sm leading-relaxed transition-colors duration-300 ${
                                isDark ? "text-white/80 group-hover/list:text-white" : "text-gray-600 group-hover/list:text-gray-800"
                              }`}>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Related Policies CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFEFB] relative overflow-hidden border-t border-gray-50">
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] py-16 md:py-20 px-6 md:px-8 text-center overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
              
              {/* Soft glowing accents */}
              <div className="absolute -top-20 -left-20 h-72 w-72 bg-[#25D366]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-[#075E54]/10 rounded-full filter blur-3xl"></div>
              
              <div className="absolute top-10 left-[10%] opacity-[0.08] pointer-events-none hidden md:block">
                <HelpCircle size={80} className="text-[#075E54]" />
              </div>
              <div className="absolute bottom-10 right-[15%] opacity-[0.08] pointer-events-none hidden md:block">
                <Mail size={90} className="text-[#075E54]" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F1A] mb-6 tracking-tight max-w-2xl mx-auto">
                  <AnimatedText>Questions About Our</AnimatedText>
                  <AnimatedText delay={0.1}>Terms?</AnimatedText>
                </h2>
                <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
                  If you have any questions regarding these Terms, please contact us.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4">
                  <motion.a 
                    href="mailto:hello@allchat.in" 
                    whileHover={{ y: -2 }}
                    className="group bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1ebe5d] transition-all shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.5)] flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" /> hello@allchat.in
                  </motion.a>
                  <motion.a 
                    href="https://www.allchat.in" 
                    whileHover={{ y: -2 }}
                    className="group bg-white text-[#075E54] border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
                  >
                    <Globe className="w-5 h-5 mr-2" /> https://www.allchat.in
                  </motion.a>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Related Policies</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {relatedPolicies.map((policy) => (
                      <Link 
                        key={policy.label} 
                        href={policy.href}
                        className="bg-[#FAFEFB] px-5 py-2.5 rounded-full text-xs font-medium text-gray-700 border border-gray-100 cursor-pointer hover:bg-[#25D366] hover:text-white hover:border-transparent hover:-translate-y-0.5 transition-all duration-300 flex items-center group shadow-sm"
                      >
                        {policy.label} <ArrowRight className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
