// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat – WhatsApp Marketing and Automation Platform",
  description:
    "Compare AllChat pricing plans and choose the best option for you. From free to advanced features, find a simple, transparent plan that fits your needs.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
