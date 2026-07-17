// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AllChat Data Deletion Request",
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
