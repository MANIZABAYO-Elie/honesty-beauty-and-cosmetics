import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive product solutions — from design and manufacturing to global distribution and custom enterprise solutions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
