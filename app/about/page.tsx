"use client";

import { motion } from "framer-motion";
import {
  Target, Eye, Mail, ShieldCheck, Layers, Building,
  Rocket, MessagesSquare, Network, Zap, ArrowUpRight, Sparkles, LayoutDashboard, Blocks
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

export default function AboutPage() {
  const industries = [
    "Automotive", "Retail", "Healthcare", "Education", "Financial Services", 
    "Real Estate", "Hospitality", "Logistics", "Professional Services", 
    "E-commerce", "Manufacturing", "Customer Support Centers"
  ];

  const whatWeDo = [
    "Connect their own WhatsApp Business Accounts using Meta Embedded Signup.",
    "Manage customer conversations through a shared team inbox.",
    "Collaborate across departments using conversation assignments and internal notes.",
    "Automate repetitive communication workflows.",
    "Organize customer interactions efficiently.",
    "Monitor team performance through reporting and analytics.",
    "Improve customer response times.",
    "Support business communication at scale."
  ];

  const advantages = [
    "Centralized communication management", "Shared team inbox", "Workflow automation", 
    "Customer conversation management", "Team collaboration tools", "Reporting and analytics", 
    "Scalable architecture", "Secure onboarding", "Reliable platform performance", 
    "Business-focused design", "Easy-to-use interface", "Continuous product improvements"
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden bg-[#FAFEFB] selection:bg-[#25D366]/20">
      
      {/* 1. Hero Section - Elegant & Airy */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#FAFEFB]">
        <div className="absolute top-20 right-[5%] opacity-[0.08] pointer-events-none">
          <MessagesSquare size={280} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-10 left-[2%] opacity-[0.08] pointer-events-none">
          <Rocket size={180} className="text-[#075E54] -rotate-45" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn>
            <span className="inline-flex items-center bg-white/80 backdrop-blur-md text-[#075E54] px-4 py-2 rounded-full text-sm font-medium mb-8 border border-[#25D366]/20 shadow-sm">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              About AllChat
            </span>
          </FadeIn>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            <AnimatedText>Business Communication.</AnimatedText> 
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Simplified. Secure. Scalable.</span>
            </AnimatedText>
          </h1>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              AllChat is a modern business communication platform developed and operated by The Real Leads. We help businesses streamline customer conversations by providing a centralized platform to manage communication, automate workflows, collaborate across teams, and improve customer engagement through the WhatsApp Business Platform.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#25D366]/10 hover:shadow-lg transition-all duration-300">
                <p className="text-gray-500 leading-relaxed text-sm">
                  Our platform is designed for organizations that want a secure, reliable, and scalable way to communicate with customers while maintaining operational efficiency and respecting user privacy.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[#25D366]/10 hover:shadow-lg transition-all duration-300">
                <p className="text-gray-500 leading-relaxed text-sm">
                  Whether you&apos;re a startup, a growing business, or a large enterprise, AllChat provides the tools needed to simplify customer communication and support business growth.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Who We Are & Our Story - Editorial Mixed Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[5%] left-[-3%] opacity-[0.07] pointer-events-none">
          <Network size={320} className="text-[#25D366]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start relative z-10">
          
          <FadeIn>
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4 flex items-center">
              <Layers className="w-4 h-4 mr-2" /> Who We Are
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              <AnimatedText>Building practical solutions</AnimatedText>
              <AnimatedText delay={0.1}>for modern organizations</AnimatedText>
            </h3>
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#075E54] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                The Real Leads is a digital solutions company that develops products and services to help businesses improve customer engagement, communication, and business growth.
              </p>
              <p>
                As part of our commitment to innovation, we developed AllChat to simplify customer communication through a centralized platform that enables businesses to manage conversations, automate workflows, and collaborate more efficiently.
              </p>
              <p>
                Our focus is to build practical solutions that help organizations improve operational efficiency while delivering better customer experiences.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="bg-[#f8fafc] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-black/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.15)] transition-all duration-500 h-full">
              <div className="absolute -top-8 -left-4 text-[12rem] font-bold text-gray-50 select-none pointer-events-none group-hover:text-[#f0fdf4] transition-colors duration-500">S</div>
              <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
              <div className="space-y-5 text-gray-500 leading-relaxed relative z-10">
                <p>
                  Businesses today interact with customers across multiple communication channels, making it increasingly difficult to maintain organized conversations, respond quickly, and provide consistent customer support.
                </p>
                <p>
                  Many organizations struggle with fragmented communication, delayed responses, manual workflows, and limited visibility into customer interactions.
                </p>
                <p>
                  Recognizing these challenges, The Real Leads developed AllChat to simplify business messaging through an intuitive platform that helps teams collaborate efficiently while maintaining complete control over customer conversations.
                </p>
                <p>
                  Our objective has always been to provide businesses with practical communication tools that improve productivity, enhance customer experience, and support long-term growth.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Mission & Vision - Open Layout with Side Borders */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute bottom-[10%] right-[2%] opacity-[0.07] pointer-events-none">
          <Zap size={180} className="text-[#075E54]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          <FadeIn>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-black/5 group hover:bg-[#25D366] transition-colors duration-300 cursor-default">
                <Target className="h-7 w-7 text-[#075E54] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-4 tracking-tight">Our Mission</h3>
            </div>
            <div className="space-y-5 text-lg text-gray-500 leading-relaxed border-l-2 border-gray-100 ml-7 pl-8">
              <p>
                Our mission is to empower businesses with secure, reliable, and intelligent communication solutions that simplify customer engagement while supporting responsible use of messaging technologies.
              </p>
              <p>
                We aim to reduce communication complexity by providing tools that help businesses manage conversations efficiently, automate repetitive tasks, improve collaboration, and deliver better customer experiences.
              </p>
              <p>
                Every feature we build is designed with business productivity, security, and usability in mind.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-black/5 group hover:bg-[#25D366] transition-colors duration-300 cursor-default">
                <Eye className="h-7 w-7 text-[#075E54] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-4 tracking-tight">Our Vision</h3>
            </div>
            <div className="space-y-5 text-lg text-gray-500 leading-relaxed border-l-2 border-gray-100 ml-7 pl-8">
              <p>
                We envision a future where businesses of every size can communicate with customers effortlessly through modern, scalable, and intelligent messaging solutions.
              </p>
              <p>
                Our vision is to become a trusted business communication platform that enables organizations worldwide to build stronger customer relationships through secure and efficient communication technologies.
              </p>
              <p>
                As communication continues to evolve, we remain committed to continuous innovation, reliability, and customer success.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. What We Do - Grid Box Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[15%] right-[5%] opacity-[0.07] pointer-events-none">
          <Rocket size={220} className="text-[#075E54] rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>A comprehensive communication suite</AnimatedText>
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              AllChat provides businesses with a comprehensive set of communication tools designed to improve customer engagement and internal collaboration. Our platform enables organizations to:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatWeDo.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="relative bg-[#f8fafc] p-6 rounded-[1.5rem] border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.15)] hover:-translate-y-2 transition-all duration-500 h-full group cursor-pointer overflow-hidden">
                  <div className="absolute top-0 right-0 h-20 w-20 bg-[#25D366]/10 rounded-bl-[3rem] rounded-tr-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <span className="text-3xl font-bold text-gray-200 group-hover:text-[#25D366] transition-colors duration-300">{`0${i+1}`}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#075E54] transition-colors duration-300">
                      <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed relative z-10 font-medium">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Platform - Beautiful Split Layout with Highlight Cards */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f0fdf4] relative overflow-hidden">
        <div className="absolute top-[10%] left-[8%] opacity-[0.08] pointer-events-none">
          <Network size={250} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-[10%] right-[8%] opacity-[0.08] pointer-events-none">
          <MessagesSquare size={200} className="text-[#25D366]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>Our Platform</AnimatedText>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              AllChat has been designed with simplicity, flexibility, and scalability at its core. The platform offers a centralized workspace where teams can securely manage customer communication without switching between multiple tools.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="space-y-6">
            <div className="bg-white p-6 rounded-[1.5rem] border border-black/5 shadow-sm flex items-start space-x-4 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 group">
               <div className="w-12 h-12 rounded-xl bg-[#e7f8ef] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                 <LayoutDashboard className="h-6 w-6 text-[#075E54] group-hover:text-white transition-colors" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-900 mb-2">Unified Dashboard</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">
                   Businesses can organize conversations, assign chats to team members, automate workflows, and gain insights into communication performance—all from a single dashboard. By combining communication management, workflow automation, and collaboration tools into one platform, AllChat helps businesses operate more efficiently while maintaining consistent customer experiences.
                 </p>
               </div>
            </div>

            <div className="bg-white p-6 rounded-[1.5rem] border border-black/5 shadow-sm flex items-start space-x-4 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 group">
               <div className="w-12 h-12 rounded-xl bg-[#e7f8ef] flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                 <Blocks className="h-6 w-6 text-[#075E54] group-hover:text-white transition-colors" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-900 mb-2">Modular Architecture</h4>
                 <p className="text-sm text-gray-500 leading-relaxed">
                   Our modular architecture allows businesses to adopt features according to their operational requirements while maintaining a consistent and intuitive user experience.
                 </p>
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Built for Businesses - Pills Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4 flex items-center justify-center">
              <Building className="w-4 h-4 mr-2" /> Built for Businesses
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>Industries We Serve</AnimatedText>
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              AllChat supports organizations across multiple industries. Regardless of industry, our objective remains the same: helping businesses communicate more effectively with their customers.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-wrap justify-center gap-4">
            {industries.map((ind) => (
              <motion.div 
                key={ind} 
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white p-5 px-8 rounded-full text-center shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-black/5 hover:border-[#25D366]/40 hover:shadow-[0_10px_25px_rgb(37,211,102,0.1)] transition-all duration-300 cursor-pointer"
              >
                <p className="font-semibold text-gray-600 hover:text-[#075E54] transition-colors">{ind}</p>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* 7. Security & Privacy - Split Layout (Open Text + Dark Box) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 items-stretch relative z-10">
          
          <FadeIn className="md:col-span-3">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-black/5 group hover:bg-[#25D366] transition-colors duration-300 cursor-default">
                <ShieldCheck className="h-7 w-7 text-[#075E54] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 ml-4 tracking-tight">Security & Privacy</h3>
            </div>
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed border-l-2 border-gray-100 ml-7 pl-8">
              <p>
                Security and privacy are fundamental principles behind the development of AllChat. We understand that customer communication often contains valuable business information, which is why our platform is designed with security-focused practices and responsible data handling principles.
              </p>
              <p>
                Platform Data is processed only to provide the services requested by businesses using AllChat. We encourage our customers to use the WhatsApp Business Platform responsibly and in accordance with Meta&apos;s Platform Terms and applicable privacy requirements.
              </p>
              <p>
                Our commitment is to provide businesses with a communication platform that prioritizes trust, reliability, and operational integrity.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-2">
            <div className="bg-gradient-to-br from-[#075E54] to-[#0b3d35] p-10 rounded-[2.5rem] text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)] transition-shadow duration-500">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 h-64 w-64 border-[20px] border-white/5 rounded-full"
              ></motion.div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-6">Compliance</h4>
                <div className="space-y-5 text-green-100/80 text-sm leading-relaxed">
                  <p>
                    AllChat is committed to helping businesses use communication technologies responsibly.
                  </p>
                  <p>
                    Our platform is designed to support businesses in maintaining compliance with applicable platform requirements, messaging policies, and privacy obligations.
                  </p>
                  <p>
                    We continuously improve our systems to provide a secure environment that supports responsible business communication.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. Why Businesses Choose AllChat - Grid Box Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[20%] right-[5%] opacity-[0.07] pointer-events-none">
          <ShieldCheck size={260} className="text-[#25D366]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Why Businesses Choose AllChat</AnimatedText>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Businesses choose AllChat because it combines communication, collaboration, and automation into a single platform. Key advantages include:
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div className="flex items-center space-x-4 bg-[#f8fafc] p-5 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-default">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#25D366] transition-colors duration-300">
                    <Sparkles className="h-4 w-4 text-[#25D366] group-hover:text-white transition-colors" />
                  </span>
                  <p className="font-medium text-gray-700 text-sm">{adv}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-500 italic leading-relaxed">
              Our goal is to help businesses spend less time managing communication and more time building meaningful customer relationships.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 9. Our Commitment - Open Typography Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4">Our Commitment</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              <AnimatedText>Guided by Three Core Principles</AnimatedText>
            </h3>
            <div className="space-y-6 text-lg text-gray-500 max-w-3xl mx-auto mb-16 leading-relaxed">
              <p>
                At The Real Leads, we are committed to continuous innovation and long-term customer success. We actively listen to customer feedback, improve our platform, and develop new capabilities that help businesses adapt to changing communication needs.
              </p>
              <p>
                We believe that technology should simplify business operations—not complicate them. Every improvement we make to AllChat is guided by three core principles:
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {["Simplicity", "Reliability", "Trust"].map((principle, i) => (
              <FadeIn key={principle} delay={i * 0.15}>
                <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.15)] hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="relative z-10 text-3xl font-bold bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent mb-4">
                    {principle}
                  </h4>
                  <div className="relative z-10 w-12 h-1 bg-[#25D366] mx-auto rounded-full opacity-50 group-hover:w-20 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.2}>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              These principles shape how we build products, support customers, and plan the future of our platform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 10. Get in Touch - Open Split Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[10%] left-[5%] opacity-[0.07] pointer-events-none">
          <MessagesSquare size={260} className="text-[#075E54]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
          
          <FadeIn>
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4">Get in Touch</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>We&apos;re here to help</AnimatedText>
            </h3>
            <div className="space-y-6 text-lg text-gray-500 mb-10 leading-relaxed">
              <p>
                Whether you&apos;re exploring AllChat for your organization, looking to improve customer communication, or interested in learning more about our platform, our team is here to help.
              </p>
              <p>
                We welcome inquiries from businesses of all sizes and are committed to providing reliable support throughout your journey with AllChat.
              </p>
            </div>
            
            <div className="space-y-6">
              <motion.a 
                href="mailto:hello@allchat.in" 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] flex items-center justify-center shadow-sm group-hover:bg-[#075E54] transition-all duration-300">
                  <Mail className="h-6 w-6 text-[#075E54] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Email Us</p>
                  <span className="text-lg font-medium text-gray-700 group-hover:text-[#075E54] transition-colors">hello@allchat.in</span>
                </div>
              </motion.a>
            </div>
          </FadeIn>

          {/* 11. Company Information - Boxed Card Layout */}
          <FadeIn delay={0.15} className="md:mt-8">
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-black/5 relative overflow-hidden hover:shadow-[0_25px_70px_-15px_rgba(37,211,102,0.15)] transition-shadow duration-500">
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-[#25D366]/10 rounded-full filter blur-3xl"></div>
              
              <h4 className="relative z-10 text-xl font-bold text-gray-900 mb-8 flex items-center justify-between">
                Company Information
                <span className="text-xs font-medium bg-[#e7f8ef] text-[#075E54] px-3 py-1 rounded-full flex items-center">
                  <span className="h-1.5 w-1.5 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
                  Active
                </span>
              </h4>
              <div className="relative z-10 space-y-6 text-base">
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pb-5 border-b border-gray-100">
                  <span className="text-gray-400 mb-1 sm:mb-0">Product Name</span>
                  <span className="font-semibold text-gray-700 text-lg">AllChat</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pb-5 border-b border-gray-100">
                  <span className="text-gray-400 mb-1 sm:mb-0">Developed & Operated By</span>
                  <span className="font-semibold text-gray-700 text-lg">The Real Leads</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center pb-5 border-b border-gray-100">
                  <span className="text-gray-400 mb-1 sm:mb-0">Business Type</span>
                  <span className="font-semibold text-gray-700 text-lg text-right">Business Communication Platform</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
