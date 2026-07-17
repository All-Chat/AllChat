// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat – WhatsApp Marketing and Automation Platform",
  description:
    "Our Acceptable Use Policy to understand the rules for using our AI chat platform safely, responsibly, and in line with legal and ethical standards.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
