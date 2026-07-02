import { Globe } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const cols = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "The Real Leads", href: "https://www.therealleads.com/", external: true },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Support", href: "/contact" },
        { label: "hello@allchat.in", href: "mailto:hello@allchat.in" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms", href: "/terms" },
        { label: "Data Deletion", href: "/data-deletion" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Acceptable Use", href: "/acceptable-use" },
      ],
    },
  ];

  const socials = [
    {
      name: "X",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full">
      {/* White Section Above Footer */}
      <div className="bg-white border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 text-center">
          <p className="text-sm md:text-base text-gray-500 font-medium">
            AllChat is a business communication platform developed by The Real Leads.
          </p>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-[#0B1F1A] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          {/* Responsive Grid: 2 cols on mobile, 4 on tablet, 6 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10 mb-12">
            
            {/* Brand Section - Full width on mobile, 2 cols on tablet/desktop */}
            <div className="col-span-2 lg:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo_black.svg" // Replace with your actual image path
                  alt="AllChat Logo"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </a>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                The all-in-one WhatsApp marketing and automation platform for
                growing businesses.
              </p>

              {/* Social Icons with Tooltips */}
              <div className="flex flex-wrap gap-3 mt-5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    title={s.name} // Native fallback tooltip
                    className="relative w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25D366] flex items-center justify-center transition-colors group"
                  >
                    {s.svg}

                    {/* Custom Tooltip */}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-bold mb-4">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map((l) => {
                    // Determine if the link is external (like The Real Leads website)
                    const isExternal = l.external === true;
                    
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-sm text-white/60 hover:text-[#25D366] transition"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-sm text-white/40">
                © 2026 The Real Leads, Inc. All rights reserved.
              </p>
              <p className="text-xs text-white/30 mt-1">
                Developer of AllChat:{" "}
                <a 
                  href="https://www.therealleads.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition"
                >
                  The Real Leads
                </a>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
              <span className="mx-2 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Made with 💚 for businesses worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
