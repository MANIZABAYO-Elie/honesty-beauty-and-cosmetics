import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "600", "700", "800"] });

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
      <body className={`${poppins.variable} ${inter.variable} ${playfair.variable} font-sans antialiased`}>
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
