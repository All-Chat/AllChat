// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AllChat – Our Mission and Story",
  description:
    "AllChat is building a secure, user-friendly AI chat platform to simplify communication, automate workflows, and support businesses of all sizes..",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
