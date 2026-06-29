import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "AllChat — WhatsApp Marketing & Automation Platform",
  description:
    "Launch WhatsApp campaigns, automate conversations, and grow your business with AllChat. Broadcasts, chatbots, team inbox, and analytics — all in one place.",
  alternates: {
    canonical: "https://www.allchat.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable}`}>
      <body className="font-sans antialiased bg-[#FBFBF8] text-[#0B1F1A]">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XLD73GSYRG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XLD73GSYRG');
          `}
        </Script>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
