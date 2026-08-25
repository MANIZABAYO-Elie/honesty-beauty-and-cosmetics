import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

// Using system-local font stacks via CSS variables (defined in globals.css)
// to avoid remote Google Fonts fetch during production builds.

export const metadata: Metadata = {
  metadataBase: new URL("https://honestbeauty.com"),
  title: {
    default: "Honest Beauty and Cosmetics Ltd — Premium Beauty & Skincare",
    template: "%s | Honest Beauty and Cosmetics Ltd",
  },
  description:
    "Discover premium beauty and cosmetics collections at Honest Beauty and Cosmetics Ltd. Shop skincare, makeup, and more.",
  keywords: ["beauty", "cosmetics", "skincare", "makeup", "premium", "natural beauty"],
  authors: [{ name: "Honest Beauty and Cosmetics Ltd" }],
  openGraph: {
    title: "Honest Beauty and Cosmetics Ltd",
    description: "Premium beauty and cosmetics collections.",
    type: "website",
    locale: "en_US",
    siteName: "Honest Beauty and Cosmetics Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Honest Beauty and Cosmetics Ltd",
    description: "Premium beauty and cosmetics collections.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
