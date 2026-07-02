"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck, CheckCircle2, Ban, UserX, Scale, Bug, 
  MessageSquareWarning, Copyright, UserCheck, Mail, 
  Globe, FileText, ArrowRight, AlertTriangle, Lock, Users, Gavel
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

export default function AcceptableUsePage() {
  const prohibitedActs = [
    {
      icon: Ban,
      title: "Spam & Unsolicited Messaging",
      color: "text-red-500",
      bg: "bg-red-50",
      list: ["Sending unsolicited messages.", "Sending bulk messages without appropriate consent.", "Repeatedly contacting users who have opted out."]
    },
    {
      icon: UserX,
      title: "Fraud & Deceptive Practices",
      color: "text-orange-500",
      bg: "bg-orange-50",
      list: ["Impersonating another individual or business.", "Mislead customers or conduct scams.", "Collecting confidential information through deception."]
    },
    {
      icon: Scale,
      title: "Illegal Activities",
      color: "text-purple-500",
      bg: "bg-purple-50",
      list: ["Promoting illegal goods or services.", "Money laundering or counterfeit products.", "Unauthorized financial schemes."]
    },
    {
      icon: Bug,
      title: "Harmful Content",
      color: "text-pink-500",
      bg: "bg-pink-50",
      list: ["Distributing malware, viruses, or phishing links.", "Uploading harmful software.", "Injecting unauthorized scripts."]
    },
    {
      icon: MessageSquareWarning,
      title: "Offensive or Abusive Content",
      color: "text-rose-500",
      bg: "bg-rose-50",
      list: ["Hate speech, harassment, or threats.", "Discrimination or defamation.", "Obscene or abusive material."]
    },
    {
      icon: Copyright,
      title: "Intellectual Property Violations",
      color: "text-blue-500",
      bg: "bg-blue-50",
      list: ["Uploading copyrighted material without authorization.", "Distributing trademarks or logos illegally.", "Creating derivative works without permission."]
    }
  ];

  const relatedPolicies = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Data Deletion", href: "/data-deletion" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Terms of Service", href: "/terms" },
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
            <AnimatedText>Acceptable Use Policy</AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <span className="w-2 h-2 bg-[#25D366] rounded-full"></span> Effective Date: 2 July 2026
              </span>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" /> Last Updated: 2 July 2026
              </span>
            </div>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light px-4 max-w-3xl mx-auto">
              This Acceptable Use Policy (&quot;Policy&quot;) explains the rules and standards that apply when using AllChat, a business communication platform developed and operated by The Real Leads. By accessing or using AllChat, you agree to use the platform responsibly and in accordance with this Policy, our Terms of Service, and all applicable laws.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content Sections Container */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
          
          {/* Purpose & Permitted Use (Split Layout) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#25D366] to-[#075E54]"></div>
                <div className="pl-4 md:pl-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">Purpose of This Policy</h2>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                    AllChat is designed to help businesses communicate with customers efficiently and responsibly. This Policy helps protect our users, customers, partners, and the integrity of our platform by preventing misuse.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.1)] transition-shadow duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-[#25D366]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">Permitted Use</h2>
                </div>
                <p className="text-gray-500 text-sm">You may use AllChat to:</p>
                <PolicyList items={[
                  "Manage business communications.",
                  "Send transactional and service-related messages.",
                  "Collaborate with team members & manage contacts.",
                  "Create and manage message templates.",
                  "Launch customer communication campaigns.",
                  "Automate approved business workflows."
                ]} />
              </div>
            </FadeIn>
          </div>

          {/* Prohibited Activities (Bento Grid) */}
          <div>
            <FadeIn className="mb-8 text-center">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 block">Strictly Forbidden</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F1A] tracking-tight">
                <AnimatedText>Prohibited Activities</AnimatedText>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">You must not use AllChat for any activity that is unlawful, harmful, or abusive. This includes, but is not limited to:</p>
            </FadeIn>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prohibitedActs.map((act, i) => (
                <FadeIn key={act.title} delay={i * 0.05}>
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${act.bg} flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                      <act.icon className={`w-6 h-6 ${act.color}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#0B1F1A] mb-3">{act.title}</h3>
                    <ul className="space-y-2.5 mt-2">
                      {act.list.map((item) => (
                        <li key={item} className="flex items-start text-gray-600">
                          <span className={`w-1.5 h-1.5 ${act.color} bg-current rounded-full mt-2 mr-3 flex-shrink-0 opacity-70`}></span>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Consent & Messaging (Alternating Layout) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-gradient-to-br from-[#f8fafc] to-[#f0fdf4] p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-shadow duration-500 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">Customer Consent</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Businesses are responsible for obtaining any permissions or consents required before communicating with customers.</p>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">You should not send marketing or promotional messages to individuals who have withdrawn consent or requested to stop receiving communications.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquareWarning className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">Responsible Messaging</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">We encourage businesses to:</p>
                <PolicyList items={[
                  "Communicate respectfully.",
                  "Send relevant business messages.",
                  "Avoid excessive messaging.",
                  "Keep customer information accurate.",
                  "Respect customer preferences."
                ]} />
              </div>
            </FadeIn>
          </div>

          {/* Security & Account (Dark Split) */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeIn>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">Platform Security</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Users must not:</p>
                <PolicyList items={[
                  "Attempt unauthorized access.",
                  "Interfere with platform operations.",
                  "Circumvent security measures.",
                  "Test vulnerabilities without authorization.",
                  "Use automated tools to disrupt Services."
                ]} />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-[#075E54]" />
                  <h2 className="text-xl md:text-2xl font-bold text-[#0B1F1A] tracking-tight">Account Responsibility</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-2">Account owners are responsible for:</p>
                <PolicyList items={[
                  "Protecting login credentials.",
                  "Managing user access.",
                  "Monitoring account activity.",
                  "Removing access for former employees.",
                  "Keeping account information up to date."
                ]} />
              </div>
            </FadeIn>
          </div>

          {/* Monitoring & Enforcement (Warning Card) */}
          <FadeIn>
            <div className="bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl relative overflow-hidden h-full">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#25D366]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#128C7E]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <Gavel className="w-7 h-7 text-[#25D366]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Monitoring & Enforcement</h2>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">To maintain platform security and reliability, we may investigate suspected violations of this Policy.</p>
                </div>
                
                <div className="md:col-span-2 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10">
                  <p className="text-white/80 text-sm mb-4 font-medium">If we determine that an account has violated this Policy, we may take appropriate action, including:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {["Issuing warnings.", "Restricting specific features.", "Temporarily suspending access.", "Permanently terminating accounts.", "Reporting unlawful activity to authorities."].map((item) => (
                      <li key={item} className="flex items-start text-sm text-white/80 list-none">
                        <AlertTriangle className="w-4 h-4 text-[#25D366] mr-3 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Reporting & Changes (Split) */}
          <div className="grid md:grid-cols-5 gap-6 pt-4">
            <FadeIn className="md:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center relative overflow-hidden group hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-red-50 rounded-full filter blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[#0B1F1A] mb-4 tracking-tight">Reporting Abuse</h3>
                  <p className="text-gray-500 leading-relaxed mb-6 text-sm md:text-base">If you believe that AllChat is being used in violation of this Policy, please contact us. Please include as much relevant information as possible to help us investigate the issue.</p>
                  <motion.a href="mailto:hello@allchat.in" whileHover={{ x: 5 }} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-red-500 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Email Us</p>
                      <span className="font-medium text-gray-700 group-hover:text-[#075E54] transition-colors">hello@allchat.in</span>
                    </div>
                  </motion.a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="md:col-span-2">
              <div className="bg-white p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-[#075E54]" />
                  <h3 className="text-lg font-bold text-[#0B1F1A]">Changes to This Policy</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">We may update this Acceptable Use Policy from time to time to reflect changes in our Services, legal requirements, or operational practices. The latest version will always be available on our website.</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Related Policies</p>
                  <div className="flex flex-wrap gap-2">
                    {relatedPolicies.map((p) => (
                      <Link key={p.label} href={p.href} className="bg-[#FAFEFB] px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-gray-100 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-300 flex items-center group">
                        {p.label} <ArrowRight className="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
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
