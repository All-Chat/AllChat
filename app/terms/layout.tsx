// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat – WhatsApp Marketing and Automation Platform",
  description:
    "Read AllChat’s Terms and Conditions to understand your rights and responsibilities when using our AI-powered chat platform and related services.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
