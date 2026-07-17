// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat Privacy Policy",
  description:
    "Review AllChat’s Privacy Policy to see how we collect, use, and protect your personal data while you use our secure AI chat platform.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
