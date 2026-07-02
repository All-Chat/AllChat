/* eslint-disable react/no-unescaped-entities */
"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ShieldCheck,
  Users,
  Workflow,
  LayoutTemplate,
  ListChecks,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Phone,
  Video,
  Send,
  Bot,
  ArrowRight,
  Rocket,
  MessagesSquare,
  Zap,
  Network,
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
    { Icon: MessageCircle, top: "15%", left: "10%", size: 50, duration: 7, delay: 0, color: "#25D366" },
    { Icon: Phone, top: "25%", left: "85%", size: 35, duration: 9, delay: 1, color: "#075E54" },
    { Icon: Video, top: "65%", left: "15%", size: 40, duration: 8, delay: 0.5, color: "#25D366" },
    { Icon: Send, top: "75%", left: "80%", size: 35, duration: 10, delay: 1.5, color: "#075E54" },
    { Icon: Bot, top: "45%", left: "90%", size: 45, duration: 8.5, delay: 0.2, color: "#25D366" },
    { Icon: Users, top: "55%", left: "5%", size: 40, duration: 9.5, delay: 1.2, color: "#075E54" },
    { Icon: Rocket, top: "10%", left: "70%", size: 45, duration: 11, delay: 0.8, color: "#075E54" },
    { Icon: Zap, top: "80%", left: "45%", size: 30, duration: 7.5, delay: 0.4, color: "#25D366" },
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

// FAQ Accordion Item
const FAQItem = ({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-md rounded-[1.5rem] mb-5 overflow-hidden border ${isOpen ? 'border-[#25D366]/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-black/5 shadow-[0_2px_10px_rgb(0,0,0,0.02)]'} transition-all duration-300`}>
      <button
        className="flex w-full items-center justify-between p-6 text-left group"
        onClick={onToggle}
      >
        <h4 className={`text-lg font-medium transition-colors ${isOpen ? 'text-[#075E54]' : 'text-gray-700 group-hover:text-[#075E54]'}`}>
          {question}
        </h4>
        <div className={`ml-4 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#25D366] rotate-180' : 'bg-gray-100'}`}>
          <ChevronDown className={`h-5 w-5 transition-colors ${isOpen ? 'text-white' : 'text-gray-500'}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    { icon: ShieldCheck, title: "Secure Account Connection", desc: "Connect your WhatsApp Business Account using Meta Embedded Signup without sharing sensitive credentials." },
    { icon: Users, title: "Shared Team Inbox", desc: "Allow multiple team members to manage conversations from one centralized workspace." },
    { icon: Workflow, title: "Workflow Automation", desc: "Create automated responses, lead routing, follow-ups, and customer journeys." },
    { icon: LayoutTemplate, title: "Message Templates", desc: "Create and manage Meta-approved message templates for business communication." },
    { icon: ListChecks, title: "Conversation Management", desc: "Assign chats, add internal notes, organize conversations, and improve team collaboration." },
    { icon: BarChart3, title: "Reporting & Analytics", desc: "Track response time, conversation volume, and team productivity." },
  ];

  const steps = [
    "Sign up for AllChat.",
    "Connect your Meta Business Account.",
    "Link your WhatsApp Business Account using Meta Embedded Signup.",
    "Invite your team members.",
    "Start managing customer conversations.",
  ];

  const industries = ["Automotive", "Retail", "Healthcare", "Education", "Real Estate", "Logistics", "E-commerce", "Professional Services", "And Many more"];

  const benefits = ["Easy onboarding", "Shared inbox", "Automation", "Team collaboration", "Reporting", "Secure infrastructure", "Scalable platform"];

  const faqs = [
    { q: "What is AllChat?", a: "AllChat is a customer communication platform developed by The Real Leads." },
    { q: "How do I connect WhatsApp?", a: "Businesses connect their own WhatsApp Business Accounts using Meta Embedded Signup." },
    { q: "Can multiple team members use one account?", a: "Yes, AllChat provides a shared team inbox where multiple members can manage conversations simultaneously." },
    { q: "Does AllChat store customer conversations?", a: "Customer information is processed only as required to provide platform functionality and according to our Privacy Policy and applicable platform requirements." },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-44 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#ffffff]">
        <FloatingBackground />
        
        <div className="absolute top-20 right-[5%] opacity-[0.08] pointer-events-none">
          <MessagesSquare size={280} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-10 left-[2%] opacity-[0.08] pointer-events-none">
          <Rocket size={180} className="text-[#075E54] -rotate-45" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn>
            <span className="inline-flex items-center bg-white/80 backdrop-blur-md text-[#075E54] px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 md:mb-8 border border-[#25D366]/20 shadow-[0_4px_15px_rgb(0,0,0,0.03)]">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              Trusted Business Communication Platform
            </span>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            <AnimatedText>Business Communication</AnimatedText> 
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Made Simple</span>
            </AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-500 mb-6 max-w-3xl mx-auto font-light">
              Connect, Collaborate, and Communicate with Confidence.
            </p>
            <p className="text-sm md:text-md text-gray-400 mb-10 max-w-2xl mx-auto px-4">
              AllChat enables businesses to securely connect their WhatsApp Business Accounts using Meta Embedded Signup, manage customer conversations, automate workflows, and collaborate through a shared team inbox.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
              <a href="/contact" className="block">
              <button className="group bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1ebe5d] transition-all shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.5)] hover:-translate-y-1 flex items-center justify-center">
                Start Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
              </a>
              <a href="/contact" className="block">
                <button className="bg-white text-[#075E54] border border-gray-100 px-8 py-4 rounded-full font-semibold  hover:bg-gray-50 transition-all shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:-translate-y-1">
                    Schedule a Demo
                </button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why AllChat (Features) */}
      <section id="features" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden bg-white border-t border-gray-50">
        <div className="absolute top-[5%] left-[-3%] opacity-[0.07] pointer-events-none">
          <Network size={320} className="text-[#25D366]" />
        </div>
        <div className="absolute bottom-[10%] right-[2%] opacity-[0.07] pointer-events-none">
          <Zap size={180} className="text-[#075E54]" />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <FadeIn className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Why AllChat?</AnimatedText>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">Tools needed to streamline customer communication while helping you use the WhatsApp Business Platform responsibly.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-black/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.2)] hover:-translate-y-2 transition-all duration-500 group h-full">
                  <div className="bg-gradient-to-br from-[#f0fdf4] to-[#e0f2fe] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#25D366] group-hover:to-[#1ebe5d] transition-all duration-500 shadow-sm">
                    <feature.icon className="h-7 w-7 text-[#075E54] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-[15%] right-[5%] opacity-[0.07] pointer-events-none">
          <Rocket size={220} className="text-[#075E54] rotate-12" />
        </div>
        <div className="absolute bottom-[10%] left-[5%] opacity-[0.07] pointer-events-none">
          <MessagesSquare size={200} className="text-[#25D366]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>How It Works</AnimatedText>
            </h2>
            <p className="text-base md:text-lg text-gray-400">Get started in just a few simple steps</p>
          </FadeIn>
          
          <div className="relative">
            {steps.map((step, i) => (
              <FadeIn key={`step-${i}`} delay={i * 0.1}>
                <div className="flex items-center mb-8 group">
                  <div className="relative z-10 bg-white border border-[#25D366]/20 text-[#075E54] font-bold w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-md mr-6 group-hover:bg-[#25D366] group-hover:text-white group-hover:scale-110 transition-all duration-300 text-lg md:text-xl">
                    {i + 1}
                  </div>
                  <div className="bg-white p-4 md:p-6 rounded-2xl flex-1 shadow-[0_5px_20px_rgb(0,0,0,0.03)] border border-black/5 group-hover:border-[#25D366]/30 transition-all duration-300">
                    <p className="text-base md:text-lg font-medium text-gray-700">{step}</p>
                  </div>
                </div>
                {i !== steps.length - 1 && (
                  <div className="absolute left-7 md:left-8 top-16 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-[#25D366]/30 to-transparent -translate-x-1/2"></div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#f0fdf4] relative overflow-hidden">
        <div className="absolute top-[10%] left-[8%] opacity-[0.08] pointer-events-none">
          <Network size={250} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-[10%] right-[8%] opacity-[0.08] pointer-events-none">
          <Send size={180} className="text-[#25D366]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Industries We Serve</AnimatedText>
            </h2>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((ind, i) => (
              <FadeIn key={ind} delay={i * 0.05}>
                <div className="bg-white p-4 md:p-5 px-6 md:px-8 rounded-full text-center shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-black/5 hover:border-[#25D366]/40 hover:shadow-[0_10px_25px_rgb(37,211,102,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <p className="font-semibold text-sm md:text-base text-gray-600 hover:text-[#075E54] transition-colors">{ind}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Security & Benefits */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="absolute top-[20%] right-[5%] opacity-[0.07] pointer-events-none">
          <ShieldCheck size={260} className="text-[#25D366]" />
        </div>
        <div className="absolute bottom-[15%] left-[5%] opacity-[0.07] pointer-events-none">
          <MessageCircle size={200} className="text-[#075E54]" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          <FadeIn>
            <span className="inline-block bg-[#e7f8ef] text-[#075E54] px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-6">
              Built for Security
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              <AnimatedText>Why Businesses Choose AllChat</AnimatedText>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg">
              We are committed to helping businesses use the WhatsApp Business Platform responsibly. Platform Data is processed only to deliver requested services while respecting applicable privacy and security requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <motion.div 
                  key={benefit}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-3 md:p-4 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#25D366] flex-shrink-0" />
                  <span className="font-medium text-gray-600 text-sm md:text-base">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute -top-10 -left-10 h-72 w-72 bg-[#25D366]/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 h-72 w-72 bg-[#075E54]/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white">
                <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#075E54] flex items-center justify-center text-white text-xl font-bold mr-4">A</div>
                  <div>
                    <p className="font-semibold text-gray-800">AllChat Team</p>
                    <p className="text-sm text-green-500 flex items-center"><span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>Online</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#e7f8ef] p-4 rounded-2xl rounded-tl-sm max-w-[60%] shadow-sm">
                    <p className="text-gray-700 text-sm">Hello! How can we help your business today?</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-tr-sm max-w-[60%] ml-auto text-right shadow-sm">
                    <p className="text-gray-700 text-sm">We need a secure shared inbox for our team.</p>
                  </div>
                  <div className="bg-[#e7f8ef] p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                    <p className="text-gray-700 text-sm">Great! AllChat is built exactly for that. Let's get you started! 🚀</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 bg-[#f1f5f9] relative overflow-hidden">
        <div className="absolute top-[10%] left-[5%] opacity-[0.07] pointer-events-none">
          <MessagesSquare size={260} className="text-[#075E54]" />
        </div>
        <div className="absolute bottom-[15%] right-[5%] opacity-[0.07] pointer-events-none">
          <Bot size={220} className="text-[#25D366]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Frequently Asked Questions</AnimatedText>
            </h2>
            <p className="text-base md:text-lg text-gray-400">Everything you need to know about the platform</p>
          </FadeIn>
          
          <div>
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.05}>
                <FAQItem 
                  question={faq.q} 
                  answer={faq.a} 
                  isOpen={openFaq === i} 
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)} 
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-[#075E54] to-[#128C7E] rounded-[2rem] md:rounded-[3rem] py-16 md:py-20 px-6 md:px-8 text-center overflow-hidden shadow-[0_30px_80px_-20px_rgba(7,94,84,0.5)]">
              
              <div className="absolute -top-20 -left-20 h-72 w-72 bg-white/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-[#25D366]/20 rounded-full filter blur-3xl"></div>
              
              <div className="absolute top-10 left-[10%] opacity-[0.15] pointer-events-none hidden md:block">
                <Rocket size={80} className="text-white -rotate-45" />
              </div>
              <div className="absolute bottom-10 right-[15%] opacity-[0.15] pointer-events-none hidden md:block">
                <MessagesSquare size={90} className="text-white" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight max-w-2xl mx-auto">
                  <AnimatedText>Ready to improve your</AnimatedText>
                  <AnimatedText delay={0.1}>business communication?</AnimatedText>
                </h2>
                <p className="text-base md:text-lg text-green-100/80 mb-10">Start using AllChat today.</p>
                <div className="flex flex-col md:flex-row justify-center gap-4 px-4">
                  <a href="/contact" className="block">
                  <button className="group bg-white text-[#075E54] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-1 flex items-center justify-center">
                    Start Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
                  </button>
                  </a>
                  <a href="/contact" className="block">
                    <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all shadow-sm hover:-translate-y-1">
                      Contact Sales
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
