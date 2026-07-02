/* eslint-disable react/no-unescaped-entities */
"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trash2, ShieldCheck, Mail, Clock, Lock, AlertTriangle, 
  FileText, Link2, Globe, ArrowRight, HelpCircle, Database, FileWarning
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

// Glowing Floating Background Icons for Hero
const FloatingBackground = () => {
  const icons = [
    { Icon: Trash2, top: "15%", left: "10%", size: 50, duration: 7, delay: 0, color: "#25D366" },
    { Icon: Lock, top: "25%", left: "85%", size: 35, duration: 9, delay: 1, color: "#075E54" },
    { Icon: ShieldCheck, top: "65%", left: "15%", size: 40, duration: 8, delay: 0.5, color: "#25D366" },
    { Icon: FileText, top: "75%", left: "80%", size: 35, duration: 10, delay: 1.5, color: "#075E54" },
    { Icon: Database, top: "45%", left: "90%", size: 45, duration: 8.5, delay: 0.2, color: "#25D366" },
    { Icon: AlertTriangle, top: "55%", left: "5%", size: 40, duration: 9.5, delay: 1.2, color: "#075E54" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const { Icon, top, left, size, duration, delay, color } = item;
        return (
          <motion.div
            key={`hero-float-${index}`}
            className="absolute"
            style={{ top, left, filter: `blur(1px)` }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
              opacity: [0.15, 0.35, 0.15] 
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

export default function DataDeletionPage() {
  const requestDetails = [
    "Registered Business Name", 
    "Registered Email Address", 
    "Account ID (if available)", 
    "Contact Person Name", 
    "Reason for Request (Optional)"
  ];

  const verificationSteps = [
    "Email verification", 
    "Business ownership confirmation", 
    "Account authentication", 
    "Identity confirmation where necessary"
  ];

  const deletableData = [
    "AllChat account information", "User profiles", "Team member accounts", 
    "Contact records stored within AllChat", "Customer conversation records stored by AllChat", 
    "Campaign history", "Forms and form responses", "Tags and labels", 
    "Platform configuration settings", "API credentials created within AllChat", 
    "Activity history associated with the account (where applicable)"
  ];

  const retainedData = [
    "Compliance with applicable laws", "Financial and accounting records", 
    "Fraud prevention", "Security investigations", "Dispute resolution", 
    "Enforcement of our Terms of Service", "Backup and disaster recovery processes", 
    "Legal obligations"
  ];

  const thirdPartyPlatforms = [
    "WhatsApp Business Platform", "Meta Business Services", "Google Workspace", "Google Sheets", "Other integrated business applications"
  ];

  const processingDelays = [
    "Legal obligations", "Security reviews", "Large data volumes", "Technical requirements"
  ];

  const deactivationImpacts = [
    "User access may be suspended.", 
    "Active subscriptions may continue unless cancelled separately.", 
    "Data may remain stored until a permanent deletion request is received."
  ];

  const deletionImpacts = [
    "Your AllChat account may no longer be accessible.", 
    "Team member access may be removed.", 
    "Customer conversations stored within AllChat may no longer be available.", 
    "Campaign history may be deleted.", 
    "Forms and submitted responses may be permanently removed.", 
    "Platform settings may be deleted.", 
    "Certain recovery options may no longer be available."
  ];

  // Updated to include hrefs for Next.js Link
  const relatedPolicies = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Security & Compliance", href: "/security" },
    { label: "Acceptable Use Policy", href: "/acceptable-use" },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-44 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#ffffff]">
        <FloatingBackground />
        
        <div className="absolute top-20 right-[5%] opacity-[0.08] pointer-events-none">
          <FileText size={280} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-10 left-[2%] opacity-[0.08] pointer-events-none">
          <Trash2 size={180} className="text-[#075E54] -rotate-12" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn>
            <span className="inline-flex items-center bg-white/80 backdrop-blur-md text-[#075E54] px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 md:mb-8 border border-[#25D366]/20 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              Effective Date: 1 June 2026 | Last Updated: 1 June 2026
            </span>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            <AnimatedText>Data Deletion</AnimatedText> 
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Instructions</span>
            </AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4 text-base md:text-lg text-gray-500 leading-relaxed font-light">
              <p>
                At AllChat, we respect your privacy and provide businesses with the ability to request deletion of eligible account information and associated data.
              </p>
              <p>
                This page explains how businesses can request data deletion and what information may be retained for legal, operational, or security purposes.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About & How to Request */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[5%] left-[-3%] opacity-[0.07] pointer-events-none">
          <Database size={320} className="text-[#25D366]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start relative z-10">
          {/* About Data Deletion */}
          <FadeIn>
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4 flex items-center">
              <FileText className="w-4 h-4 mr-2" /> About Data Deletion
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>You own your data</AnimatedText>
            </h3>
            <div className="space-y-4 text-base md:text-lg text-gray-500 leading-relaxed">
              <p>
                AllChat is developed and operated by The Real Leads and provides communication tools for businesses using the WhatsApp Business Platform.
              </p>
              <p>
                Businesses using AllChat remain the owners of their business accounts and customer data. If you decide to stop using our Services, you may request deletion of eligible information associated with your account.
              </p>
            </div>
          </FadeIn>

          {/* How to Request Data Deletion - Dark Card */}
          <FadeIn delay={0.15}>
            <div className="bg-gradient-to-br from-[#075E54] to-[#0b3d35] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 h-64 w-64 border-[20px] border-white/5 rounded-full"
              ></motion.div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-[#25D366]" /> How to Request Deletion
                </h3>
                <p className="text-green-100/80 text-sm leading-relaxed mb-6">
                  Please contact our support team using the information below.
                </p>
                
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mb-6 border border-white/10">
                  <p className="text-xs text-green-100/60 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:hello@allchat.in" className="font-medium text-white hover:text-[#25D366] transition-colors">hello@allchat.in</a>
                  <p className="text-xs text-green-100/60 uppercase tracking-wider mt-3 mb-1">Subject Line</p>
                  <p className="font-medium text-white">Data Deletion Request</p>
                </div>

                <p className="text-sm text-green-100/80 mb-4">Please include the following details in your request:</p>
                <ul className="space-y-3">
                  {requestDetails.map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                      <ArrowRight className="h-4 w-4 text-[#25D366] flex-shrink-0" />
                      <span className="text-sm text-green-100/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-green-100/60 mt-6 italic">
                  Providing accurate information helps us verify your identity and process your request securely.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute bottom-[10%] right-[2%] opacity-[0.07] pointer-events-none">
          <ShieldCheck size={180} className="text-[#075E54]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Verification Process</AnimatedText>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              To protect your account and business information, we may request additional verification before processing a deletion request.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {verificationSteps.map((step, i) => (
              <FadeIn key={step} delay={i * 0.1}>
                <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-[#075E54]" />
                  </div>
                  <p className="font-medium text-gray-700 text-sm">{step}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4} className="text-center mt-8">
            <p className="text-sm text-gray-400 italic">This process helps prevent unauthorized deletion requests.</p>
          </FadeIn>
        </div>
      </section>

      {/* What Data Can Be Deleted vs Retained */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          
          {/* Deletable Data */}
          <FadeIn>
            <div className="bg-[#f0fdf4] p-8 md:p-10 rounded-[2rem] border border-[#25D366]/20 h-full">
              <h3 className="text-xl md:text-2xl font-bold text-[#075E54] mb-6 flex items-center">
                <Trash2 className="w-6 h-6 mr-3" /> What Data Can Be Deleted
              </h3>
              <p className="text-gray-500 text-sm mb-6">Subject to applicable legal and operational requirements, deletion requests may include:</p>
              <ul className="space-y-3">
                {deletableData.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <ArrowRight className="h-4 w-4 text-[#25D366] flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Retained Data */}
          <FadeIn delay={0.15}>
            <div className="bg-[#f8fafc] p-8 md:p-10 rounded-[2rem] border border-black/5 h-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileWarning className="w-6 h-6 mr-3 text-gray-500" /> Data That May Be Retained
              </h3>
              <p className="text-gray-500 text-sm mb-6">Certain information may be retained where required for:</p>
              <ul className="space-y-3">
                {retainedData.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2"></span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-6 italic">
                Where retention is required, access to such information will be limited and handled in accordance with our Privacy Policy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Third-Party Platforms & Processing Time */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f0fdf4] relative overflow-hidden">
        <div className="absolute top-[10%] left-[8%] opacity-[0.08] pointer-events-none">
          <Link2 size={250} className="text-[#075E54]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          
          {/* Third-Party Platforms */}
          <FadeIn>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-black/5 shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Link2 className="w-6 h-6 mr-3 text-[#075E54]" /> Third-Party Platforms
              </h3>
              <div className="space-y-4 text-gray-500 leading-relaxed text-sm mb-6">
                <p>If your AllChat account is connected to third-party services such as:</p>
                <div className="flex flex-wrap gap-2">
                  {thirdPartyPlatforms.map((platform) => (
                    <span key={platform} className="bg-[#f8fafc] px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 border border-gray-100">
                      {platform}
                    </span>
                  ))}
                </div>
                <p>You may also need to manage or remove your information directly from those services in accordance with their respective policies. Deletion of your AllChat account does not automatically remove data maintained by third-party providers.</p>
              </div>
            </div>
          </FadeIn>

          {/* Processing Time */}
          <FadeIn delay={0.15}>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-black/5 shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-[#075E54]" /> Processing Time
              </h3>
              <div className="space-y-4 text-gray-500 leading-relaxed text-sm mb-6">
                <p>After successful verification, eligible deletion requests are generally processed within <span className="font-bold text-[#075E54]">30 business days</span>.</p>
                <p>In certain situations, additional time may be required due to:</p>
                <ul className="space-y-2">
                  {processingDelays.map((item) => (
                    <li key={item} className="flex items-center space-x-3">
                      <ArrowRight className="h-4 w-4 text-[#25D366] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>If additional time is required, we will inform you whenever reasonably possible.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Account Deactivation & Impact of Deletion */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          
          {/* Account Deactivation */}
          <FadeIn>
            <div className="bg-[#f8fafc] p-8 md:p-10 rounded-[2rem] border border-black/5 shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-[#075E54]" /> Account Deactivation
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm mb-6">
                If you do not wish to permanently delete your information, you may request temporary account deactivation, subject to availability. During deactivation:
              </p>
              <ul className="space-y-4">
                {deactivationImpacts.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 mt-1.5 h-4 w-4 rounded-full border-2 border-[#25D366]"></span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Impact of Data Deletion - Warning Tinted Card */}
          <FadeIn delay={0.15}>
            <div className="bg-[#fff7ed] p-8 md:p-10 rounded-[2rem] border border-[#fb923c]/20 shadow-sm h-full">
              <h3 className="text-xl md:text-2xl font-bold text-[#9a3412] mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-[#c2410c]" /> Impact of Data Deletion
              </h3>
              <p className="text-[#c2410c]/80 leading-relaxed text-sm mb-6">
                Once your deletion request has been completed:
              </p>
              <ul className="space-y-4">
                {deletionImpacts.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <AlertTriangle className="flex-shrink-0 mt-0.5 h-4 w-4 text-[#c2410c]" />
                    <span className="text-sm text-[#9a3412]">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#9a3412]/60 mt-6 italic">
                Please ensure you download any information you wish to retain before submitting a deletion request.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Data Security & Meta Platform */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          
          <FadeIn className="text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mx-auto shadow-md border border-black/5">
                <Lock className="h-8 w-8 text-[#075E54]" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Data Security</h3>
            <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Throughout the deletion process, AllChat applies reasonable administrative and technical measures to help protect your information from unauthorized access or disclosure.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-black/5 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Link2 className="w-6 h-6 mr-3 text-[#075E54]" /> Meta Platform Data Deletion
              </h3>
              <div className="space-y-4 text-gray-500 leading-relaxed text-sm">
                <p>
                  If you connected your WhatsApp Business Account or other Meta services to AllChat, you may disconnect those integrations at any time through your Meta Business settings or by contacting us for assistance.
                </p>
                <p>
                  Deletion of your AllChat account does not automatically delete information maintained by Meta or other third-party platforms. Such data remains subject to the applicable policies and procedures of those providers.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="text-center bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Changes to These Instructions</h3>
              <p className="text-gray-500 leading-relaxed text-sm max-w-xl mx-auto">
                We may update these Data Deletion Instructions from time to time to reflect changes in our Services, legal requirements, or operational practices. The latest version will always be available on our website with the updated revision date.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact & Related Policies CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-[#075E54] to-[#128C7E] rounded-[2rem] md:rounded-[3rem] py-16 md:py-20 px-6 md:px-8 text-center overflow-hidden shadow-[0_30px_80px_-20px_rgba(7,94,84,0.5)]">
              
              <div className="absolute -top-20 -left-20 h-72 w-72 bg-white/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-[#25D366]/20 rounded-full filter blur-3xl"></div>
              
              <div className="absolute top-10 left-[10%] opacity-[0.15] pointer-events-none hidden md:block">
                <HelpCircle size={80} className="text-white" />
              </div>
              <div className="absolute bottom-10 right-[15%] opacity-[0.15] pointer-events-none hidden md:block">
                <Mail size={90} className="text-white" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto">
                  <AnimatedText>Questions About Data</AnimatedText>
                  <AnimatedText delay={0.1}>Deletion?</AnimatedText>
                </h2>
                <p className="text-base md:text-lg text-green-100/80 mb-10 max-w-xl mx-auto">
                  If you have any questions regarding account deletion or data removal, please contact us.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                  <motion.a 
                    href="mailto:hello@allchat.in" 
                    whileHover={{ y: -2 }}
                    className="group bg-white text-[#075E54] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" /> hello@allchat.in
                  </motion.a>
                  <motion.a 
                    href="https://www.allchat.in" 
                    whileHover={{ y: -2 }}
                    className="group bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all shadow-sm flex items-center justify-center"
                  >
                    <Globe className="w-5 h-5 mr-2" /> https://www.allchat.in
                  </motion.a>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm text-green-100/60 uppercase tracking-widest mb-4">Related Policies</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {relatedPolicies.map((policy) => (
                      <Link 
                        key={policy.label} 
                        href={policy.href}
                        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-white border border-white/10 cursor-pointer hover:bg-white/20 transition-colors"
                      >
                        {policy.label}
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
