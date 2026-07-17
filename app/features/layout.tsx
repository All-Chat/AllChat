// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat Features – Smart Tools for Better Conversations",
  description:
    "Explore AllChat’s key features, including AI-powered chat, automation, integrations, and security options designed to make your daily communication easier.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
