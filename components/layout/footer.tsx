import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
// import { PoweredByGorillaNexa } from "@/components/brand/PoweredByGorillaNexa";

const footerLinks = {
  "Quick Links": [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  "Customer Service": [
    { href: "/contact", label: "Help Center" },
    { href: "/contact", label: "Returns & Exchanges" },
    { href: "/contact", label: "Size Guide" },
  ],
  "Collections": [
    { href: "/products?category=new-arrivals", label: "New Arrivals" },
    { href: "/products?category=trending", label: "Trending" },
    { href: "/products?category=sale", label: "Sale" },
    { href: "/products", label: "All Products" },
  ],
};

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300">
      <div className="mx-auto max-w-7xl container-px py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/company-logo.jpg"
                alt="Honest Beauty and Cosmetics Ltd"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="font-bold text-white text-sm">Honest Beauty</p>
                <p className="text-[#EC4899] text-xs font-medium">and Cosmetics Ltd</p>
              </div>
            </Link>
            <p className="text-lg text-gray-400 max-w-sm leading-relaxed">
              Premium beauty and cosmetics for the modern individual. Discover curated
              collections that celebrate natural beauty and confidence.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>niyigenasabira132@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>+250 795055771</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/250728959122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-500 hover:text-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path d="M20.52 3.48A11.89 11.89 0 0012 .5C6.21.5 1.93 4.65 1 9.9c-.13.6.01 1.21.39 1.73L.1 18.53l6.98-1.82c.47.13.96.2 1.47.2 5.79 0 10.07-4.15 10.99-9.4.46-2.07.18-4.17-.42-5.73zm-8.5 15.64c-.44 0-.88-.06-1.3-.17l-1.9.47.47-1.86c-.82-1.2-1.26-2.64-1.26-4.12 0-3.86 3.14-7 7-7 1.86 0 3.61.72 4.93 2.04 1.31 1.31 2.04 3.07 2.04 4.93 0 3.86-3.14 7-7 7zm3.94-4.13c-.19-.1-1.11-.55-1.28-.62-.17-.06-.29-.1-.41.1-.12.2-.47.62-.58.74-.12.12-.23.14-.42.05-.19-.1-.81-.29-1.54-.95-.57-.52-.95-1.16-1.06-1.36-.11-.2-.01-.31.09-.41.1-.1.22-.26.33-.39.11-.13.14-.22.21-.36.07-.14.03-.24-.02-.34-.05-.1-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48-.16-.01-.33-.01-.5-.01-.17 0-.44.06-.67.28-.23.22-.88.83-.88 2.02 0 1.18.9 2.32 1.03 2.49.13.17 2.07 3.17 5.02 4.55 2.95 1.38 2.95.92 3.28.86.33-.06 1.07-.44 1.22-.98.15-.54.15-1 .11-1.1-.04-.1-.28-.16-.47-.26z" />
                  </svg>
                  <span className="text-sm">+250 728 959 122</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>Musanze ,Muhoza sector, near GOICO Plaza</span>
              </div>
            </div>
          </div>


          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-2">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Honest Beauty and Cosmetics Ltd. All rights reserved.
            </p>
            {/* <PoweredByGorillaNexa variant="dark" className="text-gray-500" /> */}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-[#EC4899] hover:border-[#EC4899] transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
