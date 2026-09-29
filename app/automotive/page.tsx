'use client';

import { useEffect, useState, Fragment, type FormEvent } from 'react';
import {
  CalendarCheck,
  MessageCircle,
  BadgeCheck,
  Send,
  Bot,
  Phone,
  Video,
  Car,
  ShoppingBag,
  GraduationCap,
  Home,
  HeartPulse,
  Headset,
  ShieldCheck,
  Users,
  Megaphone,
  Plug,
  BarChart3,
  Sparkles,
  LayoutGrid,
  MessagesSquare,
  Workflow,
  FileText,
  LineChart,
  Route,
  Link as LinkIcon,
  LayoutDashboard,
  ArrowRight,
  X,
  Plus,
  HelpCircle,
  GitCompare as Compare,
  Rocket,
  Wrench,
  Gauge,
  Table as TableIcon,
  FileSpreadsheet,
  Webhook,
  Code2,
  Zap,
  PhoneCall,
  MessageSquarePlus,
  Tag,
  Paperclip,
  MoreVertical,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

/* ───────────────────────── Fonts ───────────────────────── */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

/* ───────────────────────── Types ───────────────────────── */
interface WhatsAppIconProps {
  className?: string;
}

interface IndustryItem {
  icon: LucideIcon;
  label: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface FeatureCardData {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay: string;
  tag?: string;
}

interface StepData {
  num: string;
  step: string;
  title: string;
  desc: string;
  footer?: string;
  tags?: string[];
  icon?: LucideIcon;
  delay: string;
}

interface AutoDealerFeatureData {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface CRMFeatureData {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface WorkflowNodeData {
  icon: LucideIcon;
  title: string;
  sub: string;
}

/* ───────────────────────── Data ───────────────────────── */
const WHATSAPP_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.608.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

const industries: IndustryItem[] = [
  { icon: Car, label: 'Automobile' },
  { icon: ShoppingBag, label: 'Retail' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Home, label: 'Real Estate' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: Headset, label: 'Services' },
];

const faqItems: FAQItem[] = [
  {
    q: 'Is AllChat an official WhatsApp API provider?',
    a: 'Yes. AllChat works with the official Meta WhatsApp Business Platform.',
  },
  {
    q: 'Can I use my existing WhatsApp Business number?',
    a: 'Yes, in most cases your existing business number can be migrated to the API.',
  },
  {
    q: 'Does AllChat support multiple team members?',
    a: 'Yes. Multiple agents can manage customer conversations simultaneously.',
  },
  {
    q: 'Can I automate replies?',
    a: 'Absolutely. Build AI-powered workflows, welcome messages, lead qualification and support automation.',
  },
];

const whyCards: FeatureCardData[] = [
  { icon: ShieldCheck, title: 'Official WhatsApp API', desc: 'Direct Meta integration', delay: '0s' },
  { icon: Bot, title: 'AI Chat Automation', desc: 'Instant replies & smart flows', delay: '0.05s' },
  { icon: Users, title: 'Shared Team Inbox', desc: 'Multiple agents, one number', delay: '0.1s' },
  { icon: Megaphone, title: 'Broadcast Campaigns', desc: 'Send offers with live reports', delay: '0.15s' },
  { icon: Plug, title: 'CRM & Lead Integration', desc: 'Google Sheets, APIs & Webhooks', delay: '0.2s' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Sent, delivered, read & replies', delay: '0.25s' },
];

const featureCards: FeatureCardData[] = [
  { icon: Send, tag: 'Campaigns', title: 'Bulk Messaging', desc: 'Send personalized campaigns with images, videos, PDFs and buttons.', delay: '0s' },
  { icon: Bot, tag: 'AI', title: 'AI WhatsApp Bot', desc: 'Automate FAQs, lead qualification and customer support 24×7.', delay: '0.05s' },
  { icon: MessagesSquare, tag: 'Team', title: 'Multi-Agent Live Chat', desc: 'Assign conversations to team members and collaborate efficiently.', delay: '0.1s' },
  { icon: Workflow, tag: 'Automation', title: 'Automation Workflows', desc: 'Trigger messages from forms, CRM, websites and Google Sheets.', delay: '0.15s' },
  { icon: FileText, tag: 'Templates', title: 'Template Management', desc: 'Create and manage Meta-approved WhatsApp templates easily.', delay: '0.2s' },
  { icon: LineChart, tag: 'Analytics', title: 'Campaign Reports', desc: 'Track delivery, read rate, click rate and customer responses in real time.', delay: '0.25s' },
];

const steps: StepData[] = [
  { num: '1', step: 'Step 01', title: 'Connect', desc: 'Link your WhatsApp Business account using Meta Embedded Signup.', footer: 'Meta Embedded Signup', icon: LinkIcon, delay: '0s' },
  { num: '2', step: 'Step 02', title: 'Import', desc: 'Add contacts from Excel, Google Sheets, CRM or APIs.', tags: ['Excel', 'Google Sheets', 'CRM', 'APIs'], delay: '0.1s' },
  { num: '3', step: 'Step 03', title: 'Engage', desc: 'Send campaigns, automate replies and manage conversations from one dashboard.', footer: 'One Unified Dashboard', icon: LayoutDashboard, delay: '0.2s' },
];

const autoDealerFeatures: AutoDealerFeatureData[] = [
  { icon: Rocket, title: 'New Launches & Inquiries', desc: 'Broadcast new model reveals instantly and handle thousands of inbound inquiries with AI.' },
  { icon: CalendarCheck, title: 'Test Drive Bookings', desc: 'Let customers book test drives directly via WhatsApp with automated reminders.' },
  { icon: Wrench, title: 'Service Reminders', desc: 'Send automated service due reminders and reduce no-shows for your service center.' },
];

const crmFeatures: CRMFeatureData[] = [
  { icon: FileSpreadsheet, title: 'Google Sheets', desc: 'Auto-log messages and leads instantly.' },
  { icon: Webhook, title: 'Custom Webhooks', desc: 'Trigger workflows on your own server.' },
  { icon: Code2, title: 'REST APIs', desc: 'Seamlessly integrate with existing stack.' },
  { icon: Users, title: 'Lead Routing', desc: 'Assign leads to sales reps instantly.' },
];

const workflowNodes: WorkflowNodeData[] = [
  { icon: MessageSquarePlus, title: 'Trigger', sub: 'Keyword: "Demo"' },
  { icon: Bot, title: 'AI Reply', sub: 'Send Details' },
  { icon: Tag, title: 'Action', sub: 'Assign Agent' },
];

const comparisonFeatures: string[] = [
  'Official WhatsApp API',
  'AI Chatbot',
  'Bulk Campaigns',
  'Shared Team Inbox',
  'Automation Flows',
  'CRM Integration',
  'Live Analytics',
  'Meta Embedded Signup',
];

/* ───────────────────────── Component ───────────────────────── */
function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

export default function AllChatPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number>(-1);
  const [navScrolled, setNavScrolled] = useState<boolean>(false);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const testimonials = [
    { 
      name: 'Sameer Sir', 
      role: 'Berkeley Motors', 
      message: 'Ever since we implemented AllChat at Berkeley Motors, our customer response time has dropped to seconds. The AI bot schedules test drives at 2 AM while we sleep. It\'s like having a night shift sales team without the overhead.' 
    },
    { 
      name: 'Vikas ji', 
      role: 'Tata Motors', 
      message: 'At Tata Motors, handling bulk inquiries during new launches used to crash our standard WhatsApp. AllChat\'s official API setup meant we handled over 5,000 messages on launch day without a single delivery failure.' 
    },
    { 
      name: 'Rajesh Sharma', 
      role: 'Jawa Ambala', 
      message: 'For a premium brand like Jawa, customer experience is everything. AllChat\'s shared inbox lets our floor managers and service team stay on the same page. Automated service reminders have reduced our no-shows by 60%.' 
    },
    { 
      name: 'Rohit Jindal', 
      role: 'Automobile Dealer', 
      message: 'Managing walk-in follow-ups was a mess of spreadsheets. Now, AllChat automatically follows up with showroom visitors after 3 days. We saw a 25% bump in conversion rates in the first quarter itself.' 
    },
    { 
      name: 'Prince Tripathi', 
      role: 'Multi-Branch Dealer', 
      message: 'I run multiple dealerships and keeping track of leads across locations was tough. The CRM integration automatically routes WhatsApp leads to the nearest branch manager instantly. It\'s completely changed how we operate.' 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  /* ── Effects ── */
    /* ── Hide Global Navbar from layout.tsx ── */
  useEffect(() => {
    // Find the global Navbar element (usually a <header> or <nav> tag)
    const globalNavbar = document.querySelector<HTMLElement>('header, nav');
    
    if (globalNavbar) {
      // Hide it
      globalNavbar.style.display = 'none';
    }

    return () => {
      // Restore it when leaving the page
      if (globalNavbar) {
        globalNavbar.style.display = '';
      }
    };
  }, []);
  useEffect(() => {
    document.title =
      'AllChat — Grow Your Business with Official WhatsApp API & AI Automation';

    // Apply font variables to <html> so body & all children inherit them
    document.documentElement.classList.add(jakarta.variable, inter.variable);
    document.body.classList.add('mesh');

    const handleScroll = (): void => setNavScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e: MouseEvent): void => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document
        .querySelectorAll<HTMLElement>('.floaty, .floaty-slow')
        .forEach((el, i) => {
          el.style.transform = `translate(${x * (i % 2 ? -1 : 1) * 0.3}px, ${y * 0.3}px)`;
        });
    };
    document.addEventListener('mousemove', handleMouseMove);

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
      document.documentElement.classList.remove(jakarta.variable, inter.variable);
      document.body.classList.remove('mesh');
    };
  }, [jakarta.variable, inter.variable]);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
  }, [modalOpen]);

  /* ── Handlers ── */
  const openModal = (): void => {
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const closeModal = (): void => setModalOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('Demo Booking:', data);
    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setTimeout(() => {
        setFormSubmitted(false);
        form.reset();
      }, 300);
    }, 4000);
  };

  const toggleFaq = (index: number): void =>
    setOpenFaq((prev) => (prev === index ? -1 : index));

  /* ── Render ── */
  return (
    <div>
      <style jsx global>{`
        :root {
          --bg: #f0fdf6;
          --bg-soft: #e7fbee;
          --fg: #06231a;
          --muted: #4b6358;
          --accent: #25d366;
          --accent-2: #128c7e;
          --accent-deep: #075e54;
          --card: #ffffff;
          --border: #d6f3df;
          --bubble: #dcf8c6;
          --shadow: 0 20px 50px -20px rgba(7, 94, 84, 0.25);
        }
        * {
          -webkit-font-smoothing: antialiased;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: var(--font-jakarta), 'Plus Jakarta Sans', system-ui,
            sans-serif;
          background: var(--bg);
          color: var(--fg);
          overflow-x: hidden;
        }
        .font-display {
          font-family: var(--font-jakarta), 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.02em;
        }
        .font-body {
          font-family: var(--font-inter), 'Inter', sans-serif;
        }

        .mesh {
          background: radial-gradient(at 8% 0%, rgba(37, 211, 102, 0.22) 0%, transparent 45%),
            radial-gradient(at 92% 5%, rgba(18, 140, 126, 0.18) 0%, transparent 50%),
            radial-gradient(at 50% 100%, rgba(37, 211, 102, 0.1) 0%, transparent 55%),
            var(--bg);
        }
        .doodle-bg {
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(7, 94, 84, 0.1) 1px,
            transparent 0
          );
          background-size: 22px 22px;
        }
        .grid-lines {
          background-image: linear-gradient(rgba(18, 140, 126, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18, 140, 126, 0.05) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .text-gradient {
          background: linear-gradient(
            135deg,
            var(--accent-deep) 0%,
            var(--accent-2) 50%,
            var(--accent) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.in {
          opacity: 1;
          transform: none;
        }

        .btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          cursor: pointer;
        }
        .btn-primary {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          color: #fff;
          box-shadow: 0 12px 30px -8px rgba(18, 140, 126, 0.5);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -10px rgba(18, 140, 126, 0.65);
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .btn-primary:hover::after {
          left: 120%;
        }
        .btn-ghost {
          background: #fff;
          color: var(--accent-deep);
          border: 1.5px solid var(--border);
        }
        .btn-ghost:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px -10px rgba(37, 211, 102, 0.35);
        }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow);
          border-color: rgba(37, 211, 102, 0.45);
        }
        .icon-tile {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(18, 140, 126, 0.1));
          border: 1px solid rgba(37, 211, 102, 0.35);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card:hover .icon-tile {
          transform: rotate(-6deg) scale(1.06);
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .floaty { animation: floaty 5s ease-in-out infinite; }
        .floaty-slow { animation: floaty 7s ease-in-out infinite; }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        .typing span {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #128c7e;
          border-radius: 50%;
          margin: 0 1.5px;
          animation: blink 1.4s infinite both;
        }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        .msg-anim { animation: msgIn 0.5s ease both; }

        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          70% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .pulse-ring { animation: pulseRing 2.4s infinite; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 22s linear infinite; }

        .chat-doodle {
          background-color: #ece5dd;
          background-image: radial-gradient(circle at 25% 25%, rgba(37, 211, 102, 0.1) 2px, transparent 3px),
            radial-gradient(circle at 75% 60%, rgba(18, 140, 126, 0.1) 2px, transparent 3px),
            radial-gradient(circle at 50% 90%, rgba(37, 211, 102, 0.08) 2px, transparent 3px);
          background-size: 80px 80px, 60px 60px, 100px 100px;
        }

        .faq-item .faq-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease, padding 0.5s ease;
        }
        .faq-item.open .faq-body { max-height: 300px; }
        .faq-item.open .faq-icon { transform: rotate(45deg); }
        .faq-icon { transition: transform 0.35s ease; }

        .cmp-row { transition: background 0.25s ease; }
        .cmp-row:hover {
          background: linear-gradient(90deg, rgba(37, 211, 102, 0.06), transparent);
        }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, var(--accent), var(--accent-2));
          border-radius: 10px;
        }

        .step-line {
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%);
          height: 2px;
          flex: 1;
        }

        .nav-scrolled {
          background: rgba(240, 253, 246, 0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }

        .link-u { position: relative; }
        .link-u::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: width 0.3s ease;
        }
        .link-u:hover::after { width: 100%; }

        .wa-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .wa-icon svg { width: 100%; height: 100%; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(7, 94, 84, 0.55);
          backdrop-filter: blur(8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .modal-overlay.show {
          opacity: 1;
          pointer-events: auto;
        }
        .modal-wrap {
          position: fixed;
          inset: 0;
          z-index: 101;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          pointer-events: none;
        }
        .modal-card {
          width: 100%;
          max-width: 480px;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px -20px rgba(7, 94, 84, 0.5);
          transform: scale(0.92) translateY(20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          max-height: 92vh;
          overflow-y: auto;
        }
        .modal-overlay.show + .modal-wrap .modal-card {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-deep);
          margin-bottom: 6px;
          display: block;
        }
        .field-input {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          font-family: var(--font-inter), 'Inter', sans-serif;
          color: var(--fg);
          background: #f8fefb;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .field-input:focus {
          outline: none;
          border-color: var(--accent);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(37, 211, 102, 0.12);
        }
        .field-input::placeholder { color: #9cb3a8; }

        @keyframes popIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .success-check { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes drawCheck {
          from { stroke-dashoffset: 48; }
          to { stroke-dashoffset: 0; }
        }
        .check-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.5s 0.2s ease forwards;
        }

        .wa-tooltip {
          position: absolute;
          right: 64px;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          white-space: nowrap;
          background: var(--fg);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .wa-float:hover .wa-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: var(--fg);
        }

        .logo-img {
          height: 38px;
          width: auto;
          border-radius: 8px;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .logo-img { height: 32px; }
        }

        .flow-line {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            var(--accent) 0,
            var(--accent) 4px,
            transparent 4px,
            transparent 8px
          );
        }

        .cta-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* ═══════════ NAV ═══════════ */}
      <header
        id="nav"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          navScrolled ? 'nav-scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-2.5 group">
              <img
                src="/logo.svg"
                alt="AllChat Logo"
                className="logo-img"
              />
            </a>
            {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--muted)]">
              <a href="#why" className="link-u hover:text-[var(--accent-deep)] transition">
                Why AllChat
              </a>
              <a href="#features" className="link-u hover:text-[var(--accent-deep)] transition">
                Features
              </a>
              <a href="#how" className="link-u hover:text-[var(--accent-deep)] transition">
                How it Works
              </a>
              <a href="#auto-dealers" className="link-u hover:text-[var(--accent-deep)] transition">
                Auto Dealers
              </a>
              <a href="#faq" className="link-u hover:text-[var(--accent-deep)] transition">
                FAQ
              </a>
            </nav> */}
            <div className="flex items-center gap-3">
              <button
                onClick={openModal}
                className="btn btn-primary px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden mesh">
        <div className="absolute inset-0 grid-lines opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl floaty-slow" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl floaty" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-semibold text-[var(--accent-deep)] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-ring" />
              Official Meta Tech Provider
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Grow Your Business with{' '}
              <span className="text-gradient">Official WhatsApp API</span> &amp; AI Automation
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl">
              AllChat helps businesses automate customer conversations, run bulk WhatsApp
              campaigns, manage team chats, and convert more leads — all from one powerful
              platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={openModal}
                className="btn btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Free Demo
              </button>
              <a
                href="#features"
                className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Start with WhatsApp API
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[var(--accent-2)]" /> Meta Tech Provider
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[var(--accent-2)]" /> Official WhatsApp Business API
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[var(--accent-2)]" /> Made in India
              </span>
            </div>
          </div>

          {/* Right column — phone mockup */}
          <div className="reveal relative">
            <div className="absolute -top-6 -left-4 z-20 bg-white rounded-2xl shadow-xl border border-emerald-100 p-3.5 w-56 floaty-slow hidden sm:block">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Send className="w-4 h-4 text-[var(--accent-2)]" />
                </div>
                <div>
                  <div className="text-xs text-[var(--muted)]">Campaign Sent</div>
                  <div className="text-sm font-bold">5,000 contacts</div>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full w-[78%] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] rounded-full" />
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 z-20 bg-white rounded-2xl shadow-xl border border-emerald-100 p-3.5 floaty hidden sm:block">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-[var(--muted)]">AI Replies</div>
                  <div className="text-sm font-bold">24×7 Active</div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative bg-[#075E54] rounded-[2.5rem] p-2.5 shadow-2xl shadow-emerald-900/30">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="wa-icon w-5 h-5">
                        <WhatsAppIcon />
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">AllChat Business</div>
                      <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                        <span className="typing">
                          <span />
                          <span />
                          <span />
                        </span>
                        typing...
                      </div>
                    </div>
                    <Phone className="w-4 h-4 text-white/80" />
                    <Video className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="chat-doodle px-3 py-4 h-[360px] flex flex-col gap-3 overflow-hidden">
                    <div className="text-center text-[10px] text-[var(--muted)] bg-white/70 inline-block mx-auto px-2 py-0.5 rounded-full">
                      Today
                    </div>
                    <div className="msg-anim max-w-[80%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm shadow-sm self-start">
                      Hi, I&apos;m interested in your services
                      <div className="text-[9px] text-[var(--muted)] text-right mt-1">
                        10:32 AM
                      </div>
                    </div>
                    <div className="msg-anim max-w-[85%] bg-[var(--bubble)] rounded-2xl rounded-tr-sm px-3 py-2 text-sm shadow-sm self-end ml-auto">
                      Hello! 👋 Thanks for reaching out. How can I help you today?
                      <div className="text-[9px] text-[var(--muted)] text-right mt-1">
                        10:32 AM ✓✓
                      </div>
                    </div>
                    <div className="msg-anim max-w-[80%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm shadow-sm self-start">
                      Do you have a catalog?
                      <div className="text-[9px] text-[var(--muted)] text-right mt-1">
                        10:33 AM
                      </div>
                    </div>
                    <div className="msg-anim max-w-[85%] bg-[var(--bubble)] rounded-2xl rounded-tr-sm px-3 py-2 text-sm shadow-sm self-end ml-auto">
                      Sure! Here&apos;s our latest catalog 📚
                      <div className="text-[9px] text-[var(--muted)] text-right mt-1">
                        10:33 AM ✓✓
                      </div>
                    </div>
                    <div className="msg-anim max-w-[60%] bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm self-start">
                      <span className="typing">
                        <span />
                        <span />
                        <span />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20 relative max-w-7xl mx-auto px-5 lg:px-8 reveal">
          <div className="text-center text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-5">
            Trusted across industries
          </div>
          <div
            className="overflow-hidden relative"
            style={{
              maskImage:
                'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)',
            }}
          >
            <div className="flex gap-12 marquee-track w-max">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-12 items-center">
                  {industries.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="text-sm font-semibold text-[var(--muted)] flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY ALLCHAT ═══════════ */}
      <section id="why" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Why AllChat?
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              One Platform. <span className="text-gradient">Every Customer Conversation.</span>
            </h2>
            <p className="mt-5 text-[var(--muted)] text-base sm:text-lg">
              Whether you&apos;re generating leads, sending promotions, or supporting customers,
              AllChat gives your entire team one centralized WhatsApp workspace.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyCards.map(({ icon: Icon, title, desc, delay }) => (
              <div
                key={title}
                className="card p-6 reveal"
                style={{ transitionDelay: delay }}
              >
                <div className="icon-tile w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--accent-2)]" />
                </div>
                <h3 className="font-display font-bold text-lg mb-1.5">{title}</h3>
                <p className="text-sm text-[var(--muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section
        id="features"
        className="relative py-20 md:py-28 bg-[var(--bg-soft)] overflow-hidden"
      >
        <div className="absolute inset-0 doodle-bg opacity-60 pointer-events-none" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl floaty-slow" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[var(--accent-deep)] text-xs font-semibold mb-4 border border-emerald-200">
              <LayoutGrid className="w-3.5 h-3.5" /> Features
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Everything You Need to <span className="text-gradient">Scale WhatsApp</span>
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map(({ icon: Icon, tag, title, desc, delay }) => (
              <div
                key={title}
                className="card p-7 reveal group"
                style={{ transitionDelay: delay }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="icon-tile w-14 h-14 rounded-2xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[var(--accent-2)]" />
                  </div>
                  {tag && (
                    <span className="text-[11px] font-semibold text-[var(--accent-2)] bg-emerald-50 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <Route className="w-3.5 h-3.5" /> Process
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              How <span className="text-gradient">AllChat</span> Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] step-line opacity-30" />
            {steps.map(({ num, step, title, desc, footer, tags, icon: Icon, delay }) => (
              <div key={num} className="reveal relative" style={{ transitionDelay: delay }}>
                <div className="card p-7 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#075E54] text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      {num}
                    </div>
                    <div>
                      <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-wider">
                        {step}
                      </div>
                      <h3 className="font-display font-bold text-xl">{title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{desc}</p>
                  <div className="mt-5 pt-5 border-t border-emerald-100">
                    {tags ? (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-semibold text-[var(--accent-2)] bg-emerald-50 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      Icon && (
                        <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent-2)]">
                          <Icon className="w-4 h-4" /> {footer}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ UNIFIED WORKSPACE ═══════════ */}
      <section
        id="workspace"
        className="relative py-20 md:py-28 bg-[var(--bg)] overflow-hidden"
      >
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl floaty-slow" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <LayoutDashboard className="w-3.5 h-3.5" /> Unified Workspace
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              A Workspace Your <span className="text-gradient">Team Will Love</span>
            </h2>
            <p className="mt-5 text-[var(--muted)] text-base sm:text-lg">
              Manage campaigns, automate flows, and collaborate seamlessly from one beautiful
              dashboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Shared Team Inbox */}
            <div className="reveal relative">
              <div className="absolute -top-4 right-6 z-20 bg-white rounded-xl shadow-lg border border-emerald-100 p-2.5 floaty flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-[var(--accent-deep)]">
                  R
                </div>
                <div>
                  <div className="text-[10px] text-[var(--muted)]">Assigned to</div>
                  <div className="text-xs font-bold text-[var(--fg)]">Rahul (Sales)</div>
                </div>
              </div>

              <div className="card p-0 overflow-hidden shadow-xl">
                <div className="grid grid-cols-3 h-[400px]">
                  <div className="col-span-1 border-r border-emerald-50 bg-[#F0FDF6] py-4">
                    <div className="px-4 pb-3 border-b border-emerald-50">
                      <div className="text-sm font-bold text-[var(--accent-deep)]">Inbox</div>
                    </div>
                    <div className="px-3 py-3 mt-2 bg-white border-l-2 border-[var(--accent)] flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        P
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-semibold text-[var(--fg)] truncate">
                            Priya Sharma
                          </div>
                          <div className="text-[9px] text-[var(--muted)]">10:32</div>
                        </div>
                        <div className="text-[10px] text-[var(--muted)] truncate">
                          Do you have a catalog?
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    </div>
                    <div className="px-3 py-3 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        A
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-semibold text-[var(--muted)] truncate">
                            Amit Verma
                          </div>
                          <div className="text-[9px] text-[var(--muted)]">10:15</div>
                        </div>
                        <div className="text-[10px] text-[var(--muted)] truncate">
                          Order #3920 status?
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-3 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        S
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-semibold text-[var(--muted)] truncate">
                            Sneha R.
                          </div>
                          <div className="text-[9px] text-[var(--muted)]">09:48</div>
                        </div>
                        <div className="text-[10px] text-[var(--muted)] truncate">Need a demo</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex flex-col">
                    <div className="px-4 py-3 border-b border-emerald-50 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[var(--fg)]">Priya Sharma</div>
                        <div className="text-[10px] text-emerald-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                        </div>
                      </div>
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex-1 chat-doodle p-4 flex flex-col gap-3 overflow-hidden">
                      <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-xs shadow-sm self-start">
                        Hi, I&apos;m interested in your services
                        <div className="text-[9px] text-gray-400 text-right mt-1">10:32 AM</div>
                      </div>
                      <div className="max-w-[80%] bg-[var(--bubble)] rounded-2xl rounded-tr-sm px-3 py-2 text-xs shadow-sm self-end ml-auto">
                        Hello! 👋 Thanks for reaching out. How can I help you today?
                        <div className="text-[9px] text-gray-400 text-right mt-1">10:32 AM ✓✓</div>
                      </div>
                      <div className="max-w-[80%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-xs shadow-sm self-start">
                        Do you have a catalog?
                        <div className="text-[9px] text-gray-400 text-right mt-1">10:33 AM</div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-emerald-50 bg-white">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
                        <span className="text-xs text-gray-400">Type a message...</span>
                        <Paperclip className="w-4 h-4 text-gray-400 ml-auto" />
                        <button className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center">
                          <Send className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-display font-bold text-xl mb-1">Shared Team Inbox</h3>
                <p className="text-sm text-[var(--muted)]">
                  Assign conversations to team members and collaborate efficiently.
                </p>
              </div>
            </div>

            {/* Analytics & Flow Builder */}
            <div className="reveal relative" style={{ transitionDelay: '0.1s' }}>
              <div className="grid grid-cols-2 gap-6">
                {/* Campaign Analytics */}
                <div className="card p-6 col-span-2 sm:col-span-1 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold text-[var(--fg)]">Campaign Analytics</div>
                    <select className="text-[10px] bg-gray-50 border-0 rounded-md font-semibold text-[var(--muted)] focus:ring-0">
                      <option>7 Days</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'Delivered', value: '4,950', pct: '99%', color: 'bg-[var(--accent)]' },
                      { label: 'Read', value: '4,200', pct: '84%', color: 'bg-[var(--accent-2)]' },
                      { label: 'Replies', value: '1,120', pct: '22%', color: 'bg-[var(--accent-deep)]' },
                    ].map(({ label, value, pct, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[var(--muted)]">{label}</span>
                          <span className="font-bold text-[var(--fg)]">{value}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className={`h-full ${color} rounded-full`} style={{ width: pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-end gap-2 h-16 border-t border-gray-50 pt-3">
                    {['40%', '60%', '35%', '80%', '55%', '90%', '70%'].map((h) => (
                      <div
                        key={h}
                        className={`flex-1 bg-emerald-${100 + parseInt(h) / 10} rounded-t`}
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                </div>

                {/* New Campaign */}
                <div className="card p-6 col-span-2 sm:col-span-1 relative">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Send className="w-4 h-4 text-[var(--accent-2)]" />
                    </div>
                    <div className="text-sm font-bold text-[var(--fg)]">New Campaign</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Recipients</span>
                      <div className="flex-1 h-1 bg-emerald-200 rounded-full" />
                      <span className="text-[10px] font-bold text-[var(--accent-2)]">5000</span>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="text-[10px] text-gray-400 mb-1">Message</div>
                      <div className="text-xs text-[var(--fg)] leading-relaxed">
                        Flash Sale! Get 50% off on all services. Reply YES to book. 🛍️
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-white border border-emerald-200 rounded-md text-[10px] font-semibold text-[var(--accent-2)]">
                        + Image
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-emerald-200 rounded-md text-[10px] font-semibold text-[var(--accent-2)]">
                        + Button
                      </button>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white text-xs font-semibold rounded-lg">
                    Launch Campaign
                  </button>
                </div>

                {/* Automation Workflow */}
                <div className="card p-6 col-span-2 relative">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Workflow className="w-4 h-4 text-[var(--accent-2)]" />
                    </div>
                    <div className="text-sm font-bold text-[var(--fg)]">Automation Workflow</div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {workflowNodes.map(({ icon: Icon, title, sub }, idx, arr) => (
                      <Fragment key={title}>
                        <div className="flex flex-col items-center text-center w-24">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-2">
                            <Icon className="w-5 h-5 text-[var(--accent-2)]" />
                          </div>
                          <div className="text-[10px] font-semibold text-[var(--fg)]">{title}</div>
                          <div className="text-[9px] text-gray-400">{sub}</div>
                        </div>
                        {idx < arr.length - 1 && <div className="flow-line" />}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-display font-bold text-xl mb-1">Analytics &amp; Automation</h3>
                <p className="text-sm text-[var(--muted)]">
                  Track campaign performance and build powerful automated workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ AUTO DEALERS ═══════════ */}
      <section
        id="auto-dealers"
        className="relative py-20 md:py-28 bg-[var(--bg-soft)] overflow-hidden"
      >
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl floaty-slow" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-[var(--accent-deep)] text-xs font-semibold mb-5 shadow-sm">
                <Car className="w-3.5 h-3.5" /> Industry Focus
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
                Built for <span className="text-gradient">Automobile Dealerships</span>
              </h2>
              <p className="mt-5 text-[var(--muted)] text-base sm:text-lg">
                Generate more test drives, launch new models, and automate service reminders
                seamlessly. AllChat helps auto dealers engage buyers at every step of the journey.
              </p>

              <div className="mt-8 space-y-5">
                {autoDealerFeatures.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 group">
                    <div className="icon-tile w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 text-[var(--accent-2)]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-0.5">{title}</h3>
                      <p className="text-sm text-[var(--muted)]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={openModal}
                className="btn btn-primary mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
              >
                Get Auto Dealers Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right — phone mockup */}
            <div className="reveal relative" style={{ transitionDelay: '0.1s' }}>
              {/* Floating Card */}
              <div className="absolute -top-6 -left-4 z-20 bg-white rounded-2xl shadow-xl border border-emerald-100 p-3.5 w-64 floaty-slow hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                    <Car className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-[var(--muted)]">New Model Launched</div>
                    <div className="text-sm font-bold text-[var(--fg)]">Honda Elevate SUV</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">+342 Leads</span>
                </div>
              </div>

              {/* Phone Frame */}
              <div className="relative bg-[#075E54] rounded-[2.5rem] p-2.5 shadow-2xl shadow-emerald-900/40 max-w-sm mx-auto border border-emerald-900/20">
                <div className="bg-white rounded-[2rem] overflow-hidden relative">
                  
                  {/* Faux Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#075E54] rounded-b-2xl z-10"></div>
                  
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white px-4 pt-5 pb-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Honda City Dealers</div>
                      <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" /> Online
                      </div>
                    </div>
                    <Phone className="w-4 h-4 text-white/80" />
                    <Video className="w-4 h-4 text-white/80" />
                  </div>

                  {/* Chat Body - Height increased to fit all content */}
                  <div className="chat-doodle px-3 py-4 h-[460px] flex flex-col gap-3 overflow-y-auto">
                    
                    {/* Incoming Msg 1 */}
                    <div className="max-w-[75%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm shadow-sm self-start">
                      Hi, is the new Elevate available for a test drive?
                      <div className="text-[9px] text-gray-400 text-right mt-1">11:15 AM</div>
                    </div>

                    {/* Outgoing Interactive Car Card */}
                    <div className="max-w-[88%] self-end ml-auto bg-[var(--bubble)] rounded-2xl rounded-tr-sm p-2 shadow-sm border border-emerald-100/50">
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        {/* Image Area */}
                        <div className="relative">
                          <img
                            src="https://placehold.co/400x200/075E54/FFFFFF?text=Honda+Elevate"
                            alt="Honda Elevate"
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://placehold.co/400x200/075E54/FFFFFF?text=Honda+Elevate';
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[#075E54] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            NEW
                          </div>
                        </div>
                        
                        {/* Details Area */}
                        <div className="p-3">
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Honda Elevate</div>
                          <div className="text-sm font-bold text-gray-800 mt-0.5">CVT ZX Exclusive</div>
                          
                          {/* Tags */}
                          <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-1.5 mb-2">
                            <span className="flex items-center gap-1">
                              <Gauge className="w-3 h-3 text-emerald-500" /> 17.5 kmpl
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-emerald-500" /> 5 Seater
                            </span>
                          </div>

                          {/* Price Box */}
                          <div className="flex items-center justify-between bg-emerald-50/50 rounded-lg px-2 py-1.5 mb-2.5">
                            <span className="text-[10px] text-gray-500">Ex-Showroom</span>
                            <span className="text-sm font-bold text-[#075E54]">₹ 14.90 L</span>
                          </div>

                          {/* Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button className="bg-white text-[var(--accent-2)] text-[10px] font-semibold py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition">
                              View Specs
                            </button>
                            <button className="bg-[var(--accent)] text-white text-[10px] font-semibold py-1.5 rounded-lg hover:bg-[var(--accent-deep)] transition flex items-center justify-center gap-1">
                              <Car className="w-3 h-3" /> Test Drive
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] text-right text-gray-500 mt-1 pr-1">11:16 AM ✓✓</div>
                    </div>

                    {/* Incoming Msg 2 */}
                    <div className="max-w-[75%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-sm shadow-sm self-start">
                      Yes, book it for Saturday.
                      <div className="text-[9px] text-gray-400 text-right mt-1">11:18 AM</div>
                    </div>

                    {/* Outgoing Msg 2 */}
                    <div className="max-w-[75%] bg-[var(--bubble)] rounded-2xl rounded-tr-sm px-3 py-2 text-sm shadow-sm self-end ml-auto">
                      Awesome! 🎉 You&apos;re booked for Saturday at 11 AM. See you then!
                      <div className="text-[9px] text-gray-500 text-right mt-1">11:18 AM ✓✓</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section
        id="testimonials"
        className="relative py-20 md:py-28 bg-[var(--bg)] overflow-hidden"
      >
        <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl floaty-slow" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <Star className="w-3.5 h-3.5" /> Testimonials
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Loved by <span className="text-gradient">Indian Businesses</span>
            </h2>
            <p className="mt-5 text-[var(--muted)] text-base sm:text-lg">
              See what business owners and teams across India are saying about AllChat.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative h-[420px] sm:h-[360px] flex items-center justify-center">
            
            {/* Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {testimonials.map((t, i) => {
                // Calculate position relative to active index
                let position = i - activeTestimonial;
                if (position > testimonials.length / 2) position -= testimonials.length;
                if (position < -testimonials.length / 2) position += testimonials.length;

                let style: React.CSSProperties = {
                  transform: 'scale(0.5)',
                  opacity: 0,
                  zIndex: 0,
                  filter: 'blur(10px)',
                  pointerEvents: 'none',
                };

                if (position === 0) {
                  style = { transform: 'translateX(0) scale(1)', opacity: 1, zIndex: 10, filter: 'blur(0px)', pointerEvents: 'auto' };
                } else if (position === -1) {
                  style = { transform: 'translateX(-110%) scale(0.85)', opacity: 0.4, zIndex: 5, filter: 'blur(2px)', pointerEvents: 'none' };
                } else if (position === 1) {
                  style = { transform: 'translateX(110%) scale(0.85)', opacity: 0.4, zIndex: 5, filter: 'blur(2px)', pointerEvents: 'none' };
                } else if (position === -2) {
                  style = { transform: 'translateX(-200%) scale(0.7)', opacity: 0, zIndex: 1, filter: 'blur(4px)', pointerEvents: 'none' };
                } else if (position === 2) {
                  style = { transform: 'translateX(200%) scale(0.7)', opacity: 0, zIndex: 1, filter: 'blur(4px)', pointerEvents: 'none' };
                }

                return (
                  <div
                    key={i}
                    className="absolute w-[90%] sm:w-[450px] bg-white p-8 rounded-3xl border border-[var(--border)] shadow-xl transition-all duration-500 ease-in-out"
                    style={style}
                  >
                    {/* Card Content */}
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-deep)] flex items-center justify-center text-white text-xl font-bold shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-[var(--fg)]">{t.name}</h4>
                        <p className="text-sm text-[var(--muted)]">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-5 h-5 fill-[#FFB400] text-[#FFB400]" />
                      ))}
                    </div>
                    <p className="text-base text-[var(--muted)] leading-relaxed">
                      &ldquo;{t.message}&rdquo;
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Arrows */}
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-[var(--accent-2)] hover:bg-emerald-50 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-[var(--accent-2)] hover:bg-emerald-50 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeTestimonial === i ? 'w-8 bg-[var(--accent-2)]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>
      </section>
            {/* ═══════════ PRICING ═══════════ */}
      <section id="pricing" className="relative py-20 md:py-28 bg-[var(--bg-soft)] overflow-hidden">
        <div className="absolute inset-0 doodle-bg opacity-60 pointer-events-none" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl floaty-slow" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[var(--accent-deep)] text-xs font-semibold mb-4 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> Pricing
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              <span className="text-gradient">Plans</span>
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">

            {/* Basic Plan */}
            <div className="reveal card p-8 flex flex-col h-full">
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">Basic Plan</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-[var(--accent-deep)]">₹5999</span>
                  <span className="text-sm text-[var(--muted)] font-medium">yearly</span>
                </div>
                <p className="text-xs text-[var(--muted)]">For businesses getting started</p>
              </div>
              <div className="space-y-3 flex-1">
                {[
                  'WhatsApp Business API setup',
                  '1 WhatsApp number',
                  'WhatsApp live chat',
                  'WhatsApp templates',
                  'Basic campaign sending',
                  'Prepaid WhatsApp wallet',
                  'Delivery / Read / Reply tracking',
                  'Prepaid WhatsApp wallet',
                  'Email support',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[var(--accent-2)]" />
                    </div>
                    <span className="text-sm text-[var(--muted)]">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-[var(--muted)] text-center italic">
                  Best for Small businesses &amp; testing
                </p>
                <p className="text-xs text-[var(--accent-2)] text-center bg-emerald-50 py-2 px-3 rounded-lg">
                  Meta WhatsApp messaging charges are applicable separately.
                </p>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="reveal card p-8 flex flex-col h-full" style={{ transitionDelay: '0.1s' }}>
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">Growth Plan</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-extrabold text-[var(--accent-deep)]">₹12000</span>
                  <span className="text-sm text-[var(--muted)] font-medium">/yearly</span>
                </div>
                <p className="text-xs text-[var(--muted)] mb-1">₹7200/6 Months | ₹4500/Quarterly</p>
                <p className="text-xs text-[var(--muted)]">For businesses ready to generate leads</p>
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-semibold text-[var(--accent-deep)]">Everything in FREE, plus:</p>
                {[
                  '1 WhatsApp number',
                  'Bulk WhatsApp Campaigns',
                  'Campaign scheduling',
                  '5 Tags',
                  '5 Automation flows',
                  'Campaign reports',
                  'Higher campaign speed',
                  'Exportable reports',
                  'Priority support',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[var(--accent-2)]" />
                    </div>
                    <span className="text-sm text-[var(--muted)]">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--muted)] mt-6 text-center italic">
                Best for Dealers, D2C brands, agencies &amp; growing businesses
              </p>
            </div>

            {/* Pro Plan */}
            <div className="reveal card p-8 flex flex-col h-full" style={{ transitionDelay: '0.2s' }}>
              <div className="text-center mb-8">
                <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">Pro Plan</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-extrabold text-[var(--accent-deep)]">₹30000</span>
                  <span className="text-sm text-[var(--muted)] font-medium">/yearly</span>
                </div>
                <p className="text-xs text-[var(--muted)] mb-1">₹16800/6 Months | ₹9000/Quarterly</p>
                <p className="text-xs text-[var(--muted)]">For teams that want complete WhatsApp automation</p>
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm font-semibold text-[var(--accent-deep)]">Everything in GROWTH, plus:</p>
                {[
                  '5 Member',
                  'Advanced work flows',
                  'Worker/queue based campaign processing',
                  'High-volume campaigns',
                  'Advanced campaign analytics',
                  'Advanced reports',
                  'Role-based team access',
                  'Priority support on call',
                  'google sheet integration',
                  'Campaign with live data in google sheets',
                  'chat transfering to another user',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[var(--accent-2)]" />
                    </div>
                    <span className="text-sm text-[var(--muted)]">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-xs text-[var(--accent-2)] font-semibold text-center bg-emerald-50 py-2 px-3 rounded-lg">
                  Extra WhatsApp number: 1000 per number
                </p>
                <p className="text-xs text-[var(--muted)] text-center italic">
                  Best for Automobile dealers, education, real estate, D2C, enterprises &amp; marketing agencies
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ═══════════ COMPARISON TABLE ═══════════ */}
      <section id="why-choose" className="relative py-20 md:py-28 bg-[var(--bg-soft)]">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <Compare className="w-3.5 h-3.5" /> Comparison
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Why Businesses <span className="text-gradient">Choose AllChat</span>
            </h2>
          </div>
          <div className="reveal card overflow-hidden p-0 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white">
                    <th className="px-6 py-5 font-display font-bold text-base">Feature</th>
                    <th className="px-6 py-5 font-display font-bold text-base text-center">
                      <span className="inline-flex items-center gap-2">
                        <span className="wa-icon w-4 h-4">
                          <WhatsAppIcon />
                        </span>
                        AllChat
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparisonFeatures.map((feature) => (
                    <tr key={feature} className="cmp-row border-t border-emerald-100">
                      <td className="px-6 py-4 font-medium">{feature}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100">
                          <Check className="w-4 h-4 text-[var(--accent-2)]" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

            {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="relative py-20 md:py-28">
        <div className="absolute inset-0 doodle-bg opacity-50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8">
          <div className="reveal text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[var(--accent-deep)] text-xs font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="reveal">
                <div
                  className={`faq-item card p-0 overflow-hidden ${
                    openFaq === index ? 'open' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display font-bold text-base sm:text-lg">{item.q}</span>
                    <span className="faq-icon w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-[var(--accent-2)]" />
                    </span>
                  </button>
                  <div className="faq-body px-6">
                    <p className="pb-5 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="demo" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#044F46] via-[#075E54] to-[#128C7E]" />
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--accent)]/30 rounded-full blur-2xl floaty" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-300/20 rounded-full blur-3xl floaty-slow" />

        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="reveal cta-glass rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] pulse-ring" />
                Get Started Today
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                Ready to Automate Your
                <br />
                <span className="text-emerald-300">Customer Conversations?</span>
              </h2>
              <p className="mt-6 text-emerald-50/80 text-base sm:text-lg max-w-2xl mx-auto">
                Start using the official WhatsApp Business API with AI-powered automation and grow
                your business faster.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <button
                  onClick={openModal}
                  className="btn group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white text-[var(--accent-deep)] hover:shadow-2xl hover:shadow-emerald-900/40 transition-all"
                >
                  <CalendarCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Book Free Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="https://wa.me/919896052535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white/5 border border-white/30 text-white hover:bg-white/10 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  Talk to Sales
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-emerald-100/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> Official Meta Partner
                </div>
                <div className="flex items-center gap-2">
                  <Headset className="w-4 h-4 text-emerald-300" /> 24/7 Support
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-300" /> Instant Setup
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════
      <footer className="bg-[#052E25] text-emerald-100/80 py-10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="https://placehold.co/120x40/FFFFFF/075E54?text=AllChat&font=montserrat"
              alt="AllChat Logo"
              className="logo-img"
            />
          </div>
          <div className="text-xs text-emerald-200/60">
            © AllChat. Official Meta Tech Provider. Made in India 🇮🇳
          </div>
        </div>
      </footer> */}

      {/* ═══════════ FLOATING WHATSAPP BUTTON ═══════════ */}
      <a
        href="https://wa.me/919896052535"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#075E54] flex items-center justify-center shadow-2xl shadow-emerald-600/40 pulse-ring hover:scale-110 transition-transform"
      >
        <span className="wa-tooltip">Chat with us on WhatsApp</span>
        <span className="wa-icon w-7 h-7 text-white">
          <WhatsAppIcon />
        </span>
      </a>

      {/* ═══════════ MODAL OVERLAY ═══════════ */}
      <div
        className={`modal-overlay ${modalOpen ? 'show' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      />

      {/* ═══════════ MODAL ═══════════ */}
      <div className="modal-wrap" style={{ pointerEvents: modalOpen ? 'auto' : 'none' }}>
        <div className="modal-card">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#075E54] to-[#128C7E] px-6 py-6 text-white relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="wa-icon w-6 h-6">
                  <WhatsAppIcon />
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">Book Your Free Demo</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Our team will reach out within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Form / Success */}
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="John"
                    className="field-input"
                  />
                </div>
                <div>
                  <label className="field-label">
                    Last Name{' '}
                    <span className="text-emerald-400 text-[10px]">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="field-input"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">
                  Which service are you interested in? <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  required
                  className="field-input"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Official WhatsApp API</option>
                  <option>AI Chatbot &amp; Automation</option>
                  <option>Bulk WhatsApp Campaigns</option>
                  <option>Shared Team Inbox</option>
                  <option>CRM Integration</option>
                  <option>All of the above</option>
                </select>
              </div>
                           <div>
                <label className="field-label">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 text-[var(--muted)] text-sm font-medium pointer-events-none border-r border-gray-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="98765 43210"
                    className="field-input"
                    style={{ paddingLeft: '4rem' }}
                  />
                </div>
              </div>
              <div>
                <label className="field-label">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@business.com"
                  className="field-input"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit &amp; Book Demo
              </button>
              <p className="text-[11px] text-center text-[var(--muted)] leading-relaxed">
                By submitting, you agree to be contacted by AllChat regarding your demo request.
              </p>
            </form>
          ) : (
            <div className="p-8 text-center">
              <div className="success-check w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#128C7E"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path className="check-path" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--fg)] mb-2">
                Thank You! 🎉
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Your demo request has been received. Our team will contact you within 24 hours to
                schedule your personalized AllChat demo.
              </p>
              <button
                onClick={closeModal}
                className="btn btn-ghost px-6 py-3 rounded-full text-sm font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
