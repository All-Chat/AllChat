"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Added Link import
import {
  CheckCircle2, ChevronDown, ArrowRight, Sparkles, ShieldCheck, 
  Info, Mail, Zap, X
} from "lucide-react";

// Strict TypeScript Types for Animations
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

// Reusable Fade In Animation
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

// Types for Data
type PlanFeature = string;
type Plan = {
  name: string;
  desc: string;
  desc2: string;
  price: string;
  priceSuffix: string;
  button: string;
  href: string; // Added href property
  features: PlanFeature[];
  highlighted: boolean;
};

type ComparisonRow = {
  feature: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
};

type Faq = {
  q: string;
  a: string;
};

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const plans: Plan[] = [
    {
      name: "Starter",
      desc: "Ideal for Small Businesses",
      desc2: "Perfect for businesses getting started with customer communication.",
      price: "₹999",
      priceSuffix: "/ Month",
      button: "Get Started",
      href: "/contact", // Link added
      features: [
        "1 WhatsApp Business Account", "Shared Team Inbox", "Up to 3 Team Members", 
        "Live Chat", "Message Templates", "Basic Campaigns", "Basic Reports", "Email Support"
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      desc: "Built for Growing Teams",
      desc2: "Designed for businesses managing higher customer volumes.",
      price: "₹2,999",
      priceSuffix: "/ Month",
      button: "Start Free Trial",
      href: "/contact", // Link added
      features: [
        "Everything in Starter", "Up to 10 Team Members", "Advanced Campaign Management", 
        "Workflow Automation", "Smart Forms", "Reports & Analytics", "Google Sheets Integration", "Priority Email Support"
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      desc: "Custom Solutions for Large Organizations",
      desc2: "Designed for businesses requiring advanced collaboration, integrations, and dedicated support.",
      price: "Custom",
      priceSuffix: "Pricing",
      button: "Contact Sales",
      href: "/contact", // Link added
      features: [
        "Unlimited Team Members*", "Multiple WhatsApp Numbers", "Advanced User Roles", 
        "API Access", "Webhooks", "Dedicated Account Manager", "Priority Support", "Custom Integrations"
      ],
      highlighted: false,
    }
  ];

  const comparisonData: ComparisonRow[] = [
    { feature: "Shared Team Inbox", starter: true, growth: true, enterprise: true },
    { feature: "Live Chat", starter: true, growth: true, enterprise: true },
    { feature: "Contacts", starter: true, growth: true, enterprise: true },
    { feature: "Campaigns", starter: "Basic", growth: "Advanced", enterprise: "Advanced" },
    { feature: "Automation", starter: false, growth: true, enterprise: true },
    { feature: "Forms", starter: false, growth: true, enterprise: true },
    { feature: "Analytics", starter: "Basic", growth: "Advanced", enterprise: "Advanced" },
    { feature: "Google Sheets Integration", starter: false, growth: true, enterprise: true },
    { feature: "Priority Support", starter: false, growth: true, enterprise: true },
  ];

  const faqs: Faq[] = [
    { q: "Is WhatsApp pricing included?", a: "No. WhatsApp Business Platform conversation charges are determined by Meta and are billed separately where applicable." },
    { q: "Can I upgrade later?", a: "Yes. You can upgrade your subscription as your business grows." },
    { q: "Do you offer a free trial?", a: "Please contact our team to learn about current trial availability." },
    { q: "Is onboarding support included?", a: "Yes. Our team provides onboarding assistance for all plans." }
  ];

  const renderTableCell = (value: boolean | string) => {
    if (value === true) return <CheckCircle2 className="w-5 h-5 text-[#25D366] mx-auto" />;
    if (value === false) return <X className="w-4 h-4 text-gray-300 mx-auto" />;
    return <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-[#FAFEFB] text-gray-800 overflow-x-hidden font-sans selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-24 text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 h-72 w-72 md:h-96 md:w-96 bg-[#25D366]/10 rounded-full filter blur-[80px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 h-80 w-80 md:h-[500px] md:w-[500px] bg-[#075E54]/5 rounded-full filter blur-[90px] md:blur-[120px] pointer-events-none"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
          <FadeIn>
            <span className="inline-flex items-center mb-6 md:mb-8 px-4 py-1.5 md:px-5 md:py-2 bg-white text-green-700 rounded-full text-xs sm:text-sm font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-green-100/50">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              Pricing Plans
            </span>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1F1A] tracking-tight mb-6 md:mb-8 leading-[1.1]">
            <AnimatedText>Simple, Transparent Pricing</AnimatedText>
            <AnimatedText delay={0.1} className="bg-gradient-to-r from-[#086356] via-[#139460] to-[#1EBB65] bg-clip-text text-transparent">for Every Business</AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light px-4 mb-6">
              Choose a plan that fits your business communication needs. Whether you&apos;re a startup, a growing business, or an enterprise, AllChat provides flexible plans designed to scale with your team.
            </p>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
              WhatsApp conversation charges are determined by Meta and are billed separately.
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 md:gap-6 items-stretch">
          
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.15} className="h-full">
              {/* Card Wrapper */}
              <div className={`relative h-full rounded-[2rem] p-8 md:p-10 flex flex-col transition-all duration-500 group ${
                plan.highlighted 
                  ? "bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] text-white shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)] lg:scale-105 z-10" 
                  : "bg-white text-gray-800 border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)]"
              }`}>
                
                {/* Soft Glow for Highlighted Card */}
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-[#25D366]/10 rounded-[2rem] blur-2xl -z-10"></div>
                )}
                
                {/* Recommended Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20">
                    <Sparkles className="w-3.5 h-3.5" /> Recommended
                  </div>
                )}
                
                {/* Header */}
                <div className="mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-[#0B1F1A]"}`}>{plan.name}</h3>
                  <p className={`text-sm font-semibold mb-1 ${plan.highlighted ? "text-green-400" : "text-[#25D366]"}`}>{plan.desc}</p>
                  <p className={`text-sm ${plan.highlighted ? "text-white/60" : "text-gray-500"}`}>{plan.desc2}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`text-4xl md:text-5xl font-extrabold ${plan.highlighted ? "text-white" : "text-[#0B1F1A]"}`}>{plan.price}</span>
                    <span className={`text-sm font-medium ${plan.highlighted ? "text-white/60" : "text-gray-500"}`}>{plan.priceSuffix}</span>
                  </div>
                  {plan.price === "Custom" && <p className={`text-xs mt-2 ${plan.highlighted ? "text-white/50" : "text-gray-400"}`}>Contact our sales team for a personalized quote.</p>}
                </div>

                {/* Features */}
                <div className={`mb-8 pt-6 border-t ${plan.highlighted ? "border-white/10" : "border-gray-100"}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${plan.highlighted ? "text-green-400" : "text-gray-400"}`}>Includes</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-[#25D366]" : "text-[#25D366]"}`} />
                        <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-gray-600"}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button - Converted to Link */}
                <div className="mt-auto">
                  <Link 
                    href={plan.href} 
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all duration-300 group ${
                      plan.highlighted 
                        ? "bg-[#25D366] text-white hover:bg-[#1ebd5a] shadow-[0_8px_30px_rgba(37,211,102,0.3)]" 
                        : "bg-[#0B1F1A] text-white hover:bg-[#075E54] shadow-sm"
                    }`}
                  >
                    {plan.button} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}

        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F1A] mb-4 tracking-tight">
              <AnimatedText>Compare Plans</AnimatedText>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">Find the right features for your team.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative overflow-x-auto rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] bg-white custom-scrollbar">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-5 px-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Features</th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-[#0B1F1A]">Starter</th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-[#0B1F1A] bg-green-50/50 rounded-tl-2xl">Growth</th>
                    <th className="py-5 px-4 text-center text-sm font-bold text-[#0B1F1A]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-700">{row.feature}</td>
                      <td className="py-4 px-4 text-center">{renderTableCell(row.starter)}</td>
                      <td className="py-4 px-4 text-center bg-green-50/30">{renderTableCell(row.growth)}</td>
                      <td className="py-4 px-4 text-center">{renderTableCell(row.enterprise)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What's Included & Additional Charges */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFEFB]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          
          <FadeIn>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#25D366]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F1A]">What&apos;s Included</h3>
              </div>
              <p className="text-gray-500 mb-6">Every AllChat subscription includes:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Secure Login", "Shared Team Inbox", "Message Templates", "Campaign Dashboard", "User Management", "Regular Platform Updates", "Email Support"].map((item) => (
                  <li key={item} className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Info className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F1A]">Additional Charges</h3>
              </div>
              <p className="text-gray-500 mb-6">Please note:</p>
              <ul className="space-y-4">
                {[
                  "WhatsApp Business Platform conversation charges are determined by Meta and may apply separately.",
                  "Third-party integrations or custom development services, if requested, may incur additional charges.",
                  "Applicable taxes will be charged as per local regulations."
                ].map((item) => (
                  <li key={item} className="flex items-start text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-50">
        <FadeIn>
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#25D366]/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#128C7E]/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4 block">Need a Custom Plan?</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">Every business is different.</h2>
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  If your organization has unique requirements, we&apos;d be happy to design a solution that fits your business.
                </p>
                <a href="mailto:hello@allchat.in" className="inline-flex items-center gap-2 text-white font-semibold group bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#25D366]" />
                  hello@allchat.in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <p className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">We can help with:</p>
                <div className="grid grid-cols-2 gap-4">
                  {["Enterprise Deployment", "Multi-Team Setup", "API Integration", "Custom Workflows", "Dedicated Support", "Large-Scale Comms"].map((item) => (
                    <div key={item} className="flex items-center text-sm text-white/80">
                      <Zap className="w-4 h-4 text-[#25D366] mr-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFEFB]">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F1A] mb-4 tracking-tight">
              <AnimatedText>Frequently Asked Questions</AnimatedText>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-md">
                  <button 
                    className="w-full flex justify-between items-center p-5 md:p-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-base md:text-lg text-gray-800">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'bg-[#25D366] text-white rotate-180' : 'bg-green-50 text-[#25D366]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-500 text-sm md:text-base leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-white border-t border-gray-50">
        <FadeIn>
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 to-[#075E54]/10 rounded-[2rem] md:rounded-[3rem] blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1F1A] mb-4 md:mb-6 tracking-tight leading-tight px-2">
                <AnimatedText>Ready to Get Started?</AnimatedText>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-500 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4">
                Simplify customer communication with AllChat. Start your journey today.
              </p>
              <Link href="/contact">
                <button className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg hover:bg-[#1ebd5a] transition-all duration-300 shadow-[0_15px_40px_rgba(37,211,102,0.3)] hover:-translate-y-1">
                  Get Started <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Inline Styles for Custom Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

    </div>
  );
}
