import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Nexus Labs — our story, mission, vision, values, and the team behind our premium tech products.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
