import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Honest Beauty and Cosmetics Ltd. We're happy to help with product questions and orders.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
