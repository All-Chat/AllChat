"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare, Megaphone, UserX, ClipboardList, 
  Workflow, Users, UserCog, BarChart3, Sheet, Lock, 
  TrendingUp, Building2, CheckCircle2, ArrowRight, CheckCheck
} from "lucide-react";

// Added back the missing TypeScript type
type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

// Reusable Fade In Animation
const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    // Removed 'amount: 0.1' to prevent it from getting stuck invisible
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Premium Slide-Up Text Reveal Animation
const AnimatedText = ({ children, delay = 0, className = "" }: FadeInProps) => (
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

export default function FeaturesPage() {
  return (
    // Changed overflow-hidden to overflow-x-hidden to fix scroll animation bugs
    <div className="min-h-screen bg-[#FAFEFB] text-gray-800 overflow-x-hidden font-sans selection:bg-[#25D366]/20">
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-24 md:pb-32 text-center overflow-hidden">
        {/* Premium Soft Background Orbs */}
        <div className="absolute top-20 left-1/4 h-72 w-72 md:h-96 md:w-96 bg-[#25D366]/10 rounded-full filter blur-[80px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 h-80 w-80 md:h-[500px] md:w-[500px] bg-[#075E54]/5 rounded-full filter blur-[90px] md:blur-[120px] pointer-events-none"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
          <FadeIn>
            <span className="inline-flex items-center mb-6 md:mb-8 px-4 py-1.5 md:px-5 md:py-2 bg-white text-green-700 rounded-full text-xs sm:text-sm font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-green-100/50">
              <span className="h-2 w-2 bg-[#25D366] rounded-full mr-2 animate-pulse"></span>
              Platform Features
            </span>
          </FadeIn>

          {/* Animated Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0B1F1A] tracking-tight mb-6 md:mb-8 leading-[1.1]">
            <AnimatedText>Everything You Need to Manage</AnimatedText>
            <AnimatedText delay={0.1}>
              <span className="bg-gradient-to-r from-[#075E54] to-[#25D366] bg-clip-text text-transparent">Business Conversations</span>
            </AnimatedText>
          </h1>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-5xl mx-auto leading-relaxed font-light px-4">
              AllChat combines customer communication, campaign management, workflow automation, team collaboration, and reporting into one powerful platform designed for businesses of all sizes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 1: Messaging & Live Chat */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <span className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Messaging</span>
            {/* Animated Section Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F1A] mb-5 md:mb-6 tracking-tight leading-tight">
              <AnimatedText>Manage Every Customer</AnimatedText>
              <AnimatedText delay={0.1}>Conversation from One Place</AnimatedText>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
              AllChat provides a centralized messaging workspace where your team can handle customer conversations efficiently without switching between multiple devices or applications. Whether it&apos;s customer support, sales inquiries, or service updates, every conversation remains organized and accessible.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {["Shared Team Inbox", "Live Chat Management", "Create Message Templates", "Manage Approved Templates", "Multi-Agent Collaboration", "Complete Chat History"].map((item) => (
                <div key={item} className="flex items-center group">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Enhanced Visual Chat Mockup */}
          <FadeIn delay={0.2}>
            <div className="relative max-w-sm md:max-w-md mx-auto w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366] to-[#128C7E] rounded-[2.5rem] md:rounded-[3rem] blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-[#F0F2F5] flex items-center gap-3 p-3 md:p-4 border-b border-gray-200">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold shadow-sm text-sm">JD</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-base md:text-lg">John Doe</p>
                    <p className="text-[10px] md:text-xs text-green-600 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                    </p>
                  </div>
                </div>
                {/* Chat Body */}
                <div className="p-4 md:p-6 space-y-4 md:space-y-5 bg-[#ECE5DD] min-h-[280px] md:min-h-[320px] flex flex-col justify-end" style={{ backgroundImage: "radial-gradient(#d1d7db 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                  <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-none p-3 md:p-3.5 shadow-sm">
                    <p className="text-xs md:text-sm text-gray-700">Hi! I need an update on my order #4082.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-gray-400">10:30 AM</span>
                    </div>
                  </div>
                  <div className="max-w-[80%] ml-auto bg-[#25D366] text-white rounded-2xl rounded-tr-none p-3 md:p-3.5 shadow-md">
                    <p className="text-xs md:text-sm">Hi John! Your order is currently out for delivery and will arrive by 4 PM today.</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-white/80">10:31 AM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-100" />
                    </div>
                  </div>
                  <div className="max-w-[50%] bg-white rounded-2xl rounded-tl-none p-3 md:p-3.5 shadow-sm">
                    <p className="text-xs md:text-sm text-gray-700">Perfect, thank you!</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] text-gray-400">10:32 AM</span>
                    </div>
                  </div>
                </div>
                {/* Typing Indicator */}
                <div className="bg-[#F0F2F5] p-3 border-t border-gray-200 flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 md:py-2.5 text-gray-400 text-xs md:text-sm shadow-inner border border-gray-100">Type a message...</div>
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer">
                    <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Campaigns & Forms */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFEFB]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Enhanced Campaign Visual */}
          <FadeIn className="order-2 lg:order-1">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] p-6 md:p-10 border border-gray-50 relative overflow-hidden max-w-sm md:max-w-md mx-auto">
              <div className="absolute top-0 right-0 h-32 w-32 md:h-40 md:w-40 bg-[#25D366]/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg md:text-xl">Campaign Performance</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">Last 30 days</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 md:w-6 md:h-6 text-[#075E54]" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { label: "Delivered", val: "92%", color: "bg-green-500", width: "92%" },
                    { label: "Read", val: "78%", color: "bg-blue-400", width: "78%" },
                    { label: "Replied", val: "45%", color: "bg-purple-400", width: "45%" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-xs md:text-sm mb-2">
                        <span className="text-gray-500 font-medium">{stat.label}</span>
                        <span className="font-bold text-gray-800">{stat.val}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 md:h-2.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className={`h-full ${stat.color} rounded-full shadow-sm`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                  {["Pending", "Sent", "Failed"].map(p => (
                    <span key={p} className="text-[10px] md:text-xs bg-gray-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-gray-500 border border-gray-100 font-medium">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <span className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Campaign Management</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F1A] mb-5 md:mb-6 tracking-tight leading-tight">
              <AnimatedText>Reach Customers</AnimatedText>
              <AnimatedText delay={0.1}>at Scale</AnimatedText>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
              Launch communication campaigns quickly using organized contact lists and powerful reporting tools. AllChat enables businesses to manage customer outreach from a single dashboard while monitoring campaign performance in real time.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4 md:gap-5 group p-3 md:p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm">
                  <ClipboardList className="w-5 h-5 md:w-6 md:h-6 text-[#075E54] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg md:text-xl mb-1">Smart Forms & Responses</h4>
                  <p className="text-gray-500 text-sm md:text-base">Create custom forms for lead generation, feedback, or registrations. Review submissions and export data easily.</p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-5 group p-3 md:p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm">
                  <UserX className="w-5 h-5 md:w-6 md:h-6 text-[#075E54] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg md:text-xl mb-1">Opted-Out Contacts</h4>
                  <p className="text-gray-500 text-sm md:text-base">Respect customer communication preferences by maintaining an organized list of contacts who have opted out.</p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Section 3: Automation & Team */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-20">
            <span className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Efficiency & Collaboration</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1F1A] mb-4 md:mb-6 tracking-tight leading-tight px-2">
              <AnimatedText>Automate Tasks. Empower Teams.</AnimatedText>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Reduce manual effort by creating workflows that automate communication. Enable your entire team to collaborate from one secure platform.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
            
            {/* Automation Side */}
            <FadeIn>
              <div className="bg-[#F0FDF4] p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-green-100/50 h-full relative overflow-hidden group hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.15)] transition-shadow duration-500">
                <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-[#25D366]/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm">
                    <Workflow className="w-7 h-7 md:w-8 md:h-8 text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F1A] mb-3 md:mb-4 tracking-tight">Workflow Automation & Tags</h3>
                  <p className="text-gray-500 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                    Improve efficiency by automating repetitive tasks. Organize conversations and contacts using custom tags to make searching and reporting significantly easier.
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-2.5 mb-6 md:mb-8">
                    {["Welcome Messages", "Lead Assignment", "Follow-ups", "Status Updates"].map(item => (
                      <span key={item} className="text-xs md:text-sm bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-gray-700 shadow-sm border border-gray-100 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["New Lead", "Existing Customer", "Hot Lead", "VIP Customer", "Sales"].map(tag => (
                      <span key={tag} className="text-xs md:text-sm bg-[#075E54] text-white px-3 md:px-3.5 py-1 md:py-1.5 rounded-full font-medium shadow-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Team Management Side */}
            <FadeIn delay={0.15}>
              <div className="bg-gradient-to-br from-[#0B1F1A] via-[#075E54] to-[#0b3d35] p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-white h-full relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(11,31,26,0.4)]">
                <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-[#25D366]/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-48 h-48 md:w-64 md:h-64 bg-[#128C7E]/30 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/20 shadow-lg">
                    <Users className="w-7 h-7 md:w-8 md:h-8 text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight">Shared Team Inbox & Roles</h3>
                  <p className="text-white/80 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
                    Instead of relying on a single device, multiple team members can access customer conversations securely from one shared workspace.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <UserCog className="w-5 h-5 md:w-6 md:h-6 text-green-400 mb-2 md:mb-3" />
                      <p className="text-base md:text-lg font-bold mb-1">User Management</p>
                      <p className="text-xs md:text-sm text-white/60">Role-based access & permissions</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                      <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-green-400 mb-2 md:mb-3" />
                      <p className="text-base md:text-lg font-bold mb-1">Collaboration</p>
                      <p className="text-xs md:text-sm text-white/60">Assign chats & internal notes</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-8 flex flex-wrap gap-2">
                    {["Administrator", "Manager", "Agent", "Team Member"].map(role => (
                      <span key={role} className="text-[10px] md:text-xs bg-white/10 backdrop-blur-sm px-3 md:px-3.5 py-1 md:py-1.5 rounded-full font-medium border border-white/10">{role}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Section 4: Analytics & Security */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFEFB]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <FadeIn>
            <span className="text-xs sm:text-sm font-bold text-[#25D366] uppercase tracking-widest mb-3 block">Reports & Integrations</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F1A] mb-5 md:mb-6 tracking-tight leading-tight">
              <AnimatedText>Business Insights</AnimatedText>
              <AnimatedText delay={0.1}>That Matter</AnimatedText>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 md:mb-10 text-base md:text-lg">
              Monitor communication performance through detailed dashboards and reporting tools. Track important metrics to optimize customer engagement strategies.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4 md:gap-6 group hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-[#075E54] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-xl mb-1">Comprehensive Analytics</h4>
                  <p className="text-gray-500 text-xs md:text-base">Track delivery, read rates, replies, and team productivity.</p>
                </div>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center gap-4 md:gap-6 group hover:shadow-[0_20px_50px_-15px_rgba(37,211,102,0.15)] transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                  <Sheet className="w-6 h-6 md:w-8 md:h-8 text-[#075E54] group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base md:text-xl mb-1">Google Sheets Integration</h4>
                  <p className="text-gray-500 text-xs md:text-base">Automatically sync reports for live updating and easy sharing.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Refined Security Grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0">
              <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-50 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#25D366] transition-colors">
                  <Lock className="w-6 h-6 md:w-7 md:h-7 text-[#25D366] group-hover:text-white" />
                </div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2">Secure Platform</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Authentication, controlled access, and responsible data handling.</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-50 text-center sm:mt-8 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#25D366] transition-colors">
                  <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#25D366] group-hover:text-white" />
                </div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2">Scalable</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Designed to grow from small businesses to large enterprises.</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] border border-gray-50 text-center sm:-mt-4 sm:col-span-2 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:bg-[#25D366] transition-colors">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-[#25D366] group-hover:text-white" />
                </div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2">Modern Businesses</h4>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Support teams across multiple industries efficiently.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 5: Why Choose Us (Interactive Tiles) */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1F1A] mb-3 md:mb-4 tracking-tight px-2">
              <AnimatedText>Why Businesses Choose AllChat</AnimatedText>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-500 font-light px-4">Combining communication, collaboration, automation, reporting, and customer management.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              "Centralized Customer Communication", "Shared Team Inbox", "Live Chat Management", 
              "Workflow Automation", "Campaign Management", "Contact Organization", 
              "Form Builder", "Team Collaboration", "Google Sheets Integration", 
              "Reports & Analytics", "User Management", "Secure Access Controls", 
              "Business-Friendly Interface", "Scalable Infrastructure"
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex items-center h-full p-4 md:p-6 bg-[#FAFEFB] rounded-xl md:rounded-2xl border border-gray-50 group cursor-default hover:bg-white hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <span className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-green-50 flex items-center justify-center mr-3 md:mr-4 group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#25D366] group-hover:text-white transition-colors" />
                  </span>
                  <p className="font-semibold text-gray-700 text-sm md:text-lg group-hover:text-[#075E54] transition-colors">{feature}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-4 sm:px-6 bg-[#FAFEFB]">
        <FadeIn>
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/10 to-[#075E54]/10 rounded-[2rem] md:rounded-[3rem] blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1F1A] mb-4 md:mb-6 tracking-tight leading-tight px-2">
                <AnimatedText>Built for Modern Businesses</AnimatedText>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-500 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4">
                AllChat is designed to support businesses across multiple industries, helping teams communicate efficiently, automate routine tasks, organize customer interactions, and make informed decisions.
              </p>
              <a href="/contact" >
              <button className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-semibold text-base md:text-lg hover:bg-[#1ebd5a] transition-all duration-300 shadow-[0_15px_40px_rgba(37,211,102,0.3)] hover:-translate-y-1">
                Start Free <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
