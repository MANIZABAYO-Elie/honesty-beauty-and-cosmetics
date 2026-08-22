import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of premium tech products — electronics, furniture, lighting, and accessories designed to last.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
