import { Globe } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const cols = [
    {
      title: "Product",
      links: ["Features", "Integrations", "API docs", "Changelog"], // Removed Pricing
    },
    {
      title: "Company",
      links: ["About us", "Careers", "Blog", "Press kit", "Contact"],
    },
    {
      title: "Resources",
      links: ["Help center", "Community", "Webinars", "Templates", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy policy", "Terms of service", "Cookie policy", "GDPR", "Security"],
    },
  ];

  return (
    <footer className="bg-[#0B1F1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo_black.svg" // Replace with your actual image path (e.g., /logo.png)
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
            <div className="flex gap-3 mt-5">
              {["X", "in", "f", "IG"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#25D366] flex items-center justify-center text-xs font-bold transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/60 hover:text-[#25D366] transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2025 AllChat, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Globe className="w-4 h-4" />
            <span>English (US)</span>
            <span className="mx-2">·</span>
            <span>Made with 💚 for businesses worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}