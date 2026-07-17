// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat – WhatsApp Marketing and Automation Platform",
  description:
    "how to request deletion of your data from AllChat. We explain the steps, timelines, and how we protect your privacy and account information.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
