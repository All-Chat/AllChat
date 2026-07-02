"use client";

import React, { useState, useRef, ChangeEvent, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Globe, Clock, Send, ArrowRight, MessageCircle, 
  LifeBuoy, CheckCircle2, User, Building, Phone, Sparkles,
  LucideIcon
} from "lucide-react";

// --- TypeScript Interfaces ---

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon?: LucideIcon;
  textarea?: boolean;
  required?: boolean;
}

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FloatingIconData {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// --- Reusable Animation Components ---

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

// Premium Floating Label Input Component
const FloatingInput: React.FC<FloatingInputProps> = ({ 
  id, label, type = "text", value, onChange, icon: Icon, textarea = false, required = true 
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  const baseClasses = "w-full bg-transparent border border-gray-200 rounded-2xl p-4 text-gray-800 outline-none transition-all duration-300 peer";
  const focusClasses = "focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10 focus:shadow-md";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          rows={5}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className={`${baseClasses} ${focusClasses} resize-none pt-6`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          className={`${baseClasses} ${focusClasses} pt-6`}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute flex items-center left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? "top-2 text-xs text-[#075E54] font-medium"
            : "top-4 text-base text-gray-400"
        }`}
      >
        {Icon && <Icon className={`w-4 h-4 mr-2 ${isFocused || value ? "text-[#25D366]" : "text-gray-400"}`} />}
        {label}
      </label>
    </div>
  );
};

// Floating Background Icons for Hero
const FloatingBackground: React.FC = () => {
  const icons: FloatingIconData[] = [
    { Icon: Mail, top: "15%", left: "10%", size: 40, duration: 7, delay: 0, color: "#25D366" },
    { Icon: Phone, top: "25%", left: "85%", size: 35, duration: 9, delay: 1, color: "#075E54" },
    { Icon: MessageCircle, top: "65%", left: "15%", size: 40, duration: 8, delay: 0.5, color: "#25D366" },
    { Icon: Send, top: "75%", left: "80%", size: 35, duration: 10, delay: 1.5, color: "#075E54" },
    { Icon: Sparkles, top: "40%", left: "90%", size: 30, duration: 8.5, delay: 0.2, color: "#25D366" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const { Icon, top, left, size, duration, delay, color } = item;
        return (
          <motion.div
            key={`contact-float-${index}`}
            className="absolute"
            style={{ top, left, filter: `blur(1px)` }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 15, 0],
              opacity: [0.1, 0.25, 0.1]
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

// --- Main Page Component ---

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: "", companyName: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  const handleTopicClick = (topic: string) => {
    setFormData(prev => ({ ...prev, subject: topic }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const helpTopics: string[] = ["Product Demo", "Sales Enquiries", "Technical Support", "Account Assistance", "Business Partnerships"];

  // Stagger configuration for form fields
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen font-sans bg-[#FAFEFB] text-gray-800 overflow-x-hidden selection:bg-[#25D366]/20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden bg-gradient-to-b from-[#f0fdf4] to-[#FAFEFB]">
        <FloatingBackground />
        
        {/* Large subtle bg icons */}
        <div className="absolute top-20 right-[5%] opacity-[0.06] pointer-events-none">
          <Mail size={300} className="text-[#075E54]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <FadeIn>
            <span className="inline-flex items-center bg-white/80 backdrop-blur-md text-[#075E54] px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 md:mb-8 border border-[#25D366]/20 shadow-sm">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              Contact Us
            </span>
          </FadeIn>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Get in Touch</span>
            </AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-4 text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed font-light px-4">
              <p>
                Have questions about AllChat? Whether you need product information, technical support, or business assistance, our team is here to help.
              </p>
              <p>
                We&apos;re committed to providing timely and reliable support for all your business communication needs.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Contact Info & Help Topics */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 relative z-10">
          
          {/* Contact Information - Premium Dark Glassmorphism Card */}
          <FadeIn className="md:col-span-2">
            <div className="bg-gradient-to-br from-[#075E54] to-[#0b3d35] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)] transition-shadow duration-500">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 h-64 w-64 border-[20px] border-white/5 rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -left-20 h-72 w-72 border-[15px] border-[#25D366]/10 rounded-full"
              ></motion.div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">
                  <AnimatedText>Contact Information</AnimatedText>
                </h3>
                
                <div className="space-y-6">
                  <motion.a href="mailto:hello@allchat.in" whileHover={{ x: 5 }} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#25D366] transition-all duration-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-green-100/60 uppercase tracking-wider">Email</p>
                      <span className="font-medium text-white">hello@allchat.in</span>
                    </div>
                  </motion.a>

                  <motion.a href="https://www.allchat.in" whileHover={{ x: 5 }} className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#25D366] transition-all duration-300">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-green-100/60 uppercase tracking-wider">Website</p>
                      <span className="font-medium text-white">https://www.allchat.in</span>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-[#25D366]" />
                  <h4 className="text-lg font-bold">Business Hours</h4>
                </div>
                <div className="space-y-3 text-sm text-green-100/80">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-white">9:30 AM – 6:30 PM (IST)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Saturday</span>
                    <span className="font-medium text-white">10:00 AM – 2:00 PM (IST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-red-300">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* How Can We Help? - Interactive Pills */}
          <FadeIn delay={0.15} className="md:col-span-3">
            <div className="bg-[#f8fafc] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-black/5 h-full flex flex-col justify-center relative overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-shadow duration-500">
              <div className="absolute top-0 right-0 h-40 w-40 bg-[#25D366]/5 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md border border-black/5 group hover:bg-[#25D366] transition-colors duration-300 cursor-default">
                    <LifeBuoy className="h-7 w-7 text-[#075E54] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 ml-4 tracking-tight">
                    <AnimatedText>How Can We Help?</AnimatedText>
                  </h3>
                </div>
                
                <p className="text-gray-500 mb-8 leading-relaxed text-base md:text-lg">
                  Select a category below to automatically apply it to your message subject, or specify it manually in the form.
                </p>

                <div className="flex flex-wrap gap-3">
                  {helpTopics.map((topic, i) => (
                    <motion.button
                      type="button"
                      key={i}
                      onClick={() => handleTopicClick(topic)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full border transition-all duration-300 ${
                        formData.subject === topic
                          ? "bg-[#075E54] text-white border-[#075E54] shadow-lg"
                          : "bg-white text-gray-700 border-gray-200 hover:border-[#25D366]/40 shadow-sm"
                      }`}
                    >
                      <span className={`text-xs md:text-sm font-medium ${formData.subject === topic ? "text-white" : "text-gray-600"}`}>{topic}</span>
                      <ArrowRight className={`h-4 w-4 transition-colors ${formData.subject === topic ? "text-white" : "text-[#25D366]"}`} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Send Us a Message (Form) */}
      <section ref={formRef} className="py-16 md:py-24 px-4 sm:px-6 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute top-[10%] left-[5%] opacity-[0.05] pointer-events-none">
          <Send size={260} className="text-[#075E54] -rotate-12" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn className="text-center mb-12">
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4">Send Us a Message</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              <AnimatedText>Let&apos;s start a conversation</AnimatedText>
            </h3>
            <p className="text-base md:text-lg text-gray-400">Fill out the contact form below and our team will get back to you as soon as possible.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#075E54] to-[#25D366] rounded-t-[2rem] md:rounded-t-[2.5rem]"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <motion.div variants={itemVariants}>
                  <FloatingInput id="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} icon={User} />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FloatingInput id="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} icon={Building} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FloatingInput id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} icon={Mail} />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FloatingInput id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} icon={Phone} />
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-2">
                  <FloatingInput id="subject" label="Subject" value={formData.subject} onChange={handleChange} icon={Sparkles} />
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-2">
                  <FloatingInput id="message" label="Message" value={formData.message} onChange={handleChange} textarea />
                </motion.div>
              </div>

              {/* Submit Button / Success State */}
              <div className="mt-10 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center space-x-2 text-[#075E54] bg-[#e7f8ef] px-8 py-4 rounded-full font-medium shadow-lg border border-[#25D366]/20"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[#25D366]" />
                      <span>Message sent successfully! We&apos;ll be in touch soon.</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-[#25D366] text-white px-8 md:px-12 py-3.5 md:py-4 rounded-full font-semibold hover:bg-[#1ebe5d] transition-all shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.5)] flex items-center justify-center text-base md:text-lg"
                    >
                      Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          </FadeIn>
        </div>
      </section>

      {/* 4. About AllChat Blurb */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white border-t border-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#f0fdf4] mx-auto">
                <MessageCircle className="h-8 w-8 text-[#075E54]" />
              </div>
            </div>
            <h2 className="text-sm font-bold text-[#25D366] uppercase tracking-widest mb-4">About AllChat</h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light px-4">
              AllChat is a business communication platform developed by The Real Leads to help businesses manage customer conversations, automate workflows, and improve team collaboration through the WhatsApp Business Platform.
            </p>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
