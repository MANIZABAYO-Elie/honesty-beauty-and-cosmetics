import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Honest Beauty and Cosmetics Ltd — our story, mission, and commitment to clean beauty.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
