import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

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
    { href: "/contact", label: "Shipping Info" },
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
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Premium beauty and cosmetics for the modern individual. Discover curated
              collections that celebrate natural beauty and confidence.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>hello@honestbeauty.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>+1 (555) 010-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#EC4899] shrink-0" />
                <span>100 Fashion Ave, New York, NY 10001</span>
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
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Honest Beauty and Cosmetics Ltd. All rights reserved.
          </p>
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
