// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact AllChat – Get Support or Ask Questions",
  description:
    "Need help with AllChat? Contact our team for support, partnership inquiries, or general questions and we’ll get back to you as quickly as possible.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
