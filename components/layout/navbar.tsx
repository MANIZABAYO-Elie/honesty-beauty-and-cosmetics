"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";

interface Category { _id: string; name: string; slug?: string; }

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCatOpen(false); }, [pathname]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg border-b border-[#E5E7EB] dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl container-px">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/company-logo.jpg"
              alt="Honest Beauty and Cosmetics Ltd"
              width={120}
              height={120}
              priority
            />
            <span className="font-bold text-sm leading-tight hidden sm:block">
              Honest Beauty<br />
              <span className="text-[#EC4899] font-semibold text-xs">and Cosmetics Ltd</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/categories")
                    ? "text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
                )}
              >
                Categories
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", catOpen && "rotate-180")} />
              </button>

              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-gray-950 border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg py-1.5 animate-fade-in">
                  <Link
                    href="/categories"
                    className="block px-4 py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899] font-medium"
                  >
                    All Categories
                  </Link>
                  {categories.length > 0 && (
                    <div className="my-1 border-t border-[#E5E7EB] dark:border-gray-800" />
                  )}
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categories/${cat.slug ?? cat._id}`}
                      className="block px-4 py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden md:inline-flex bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl">
              <Link href="/login">Admin Login</Link>
            </Button>
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] dark:border-gray-800 py-4 space-y-1 animate-fade-in bg-white dark:bg-gray-950">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-[#EC4899]/10 text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Categories Accordion */}
            <div>
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899] transition-colors"
              >
                Categories
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", mobileCatOpen && "rotate-180")} />
              </button>
              {mobileCatOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#EC4899]/20 pl-3">
                  <Link
                    href="/categories"
                    className="block py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] font-medium"
                  >
                    All Categories
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categories/${cat.slug ?? cat._id}`}
                      className="block py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-[#EC4899]/10 text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899]"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/login" className="block px-4 py-2.5 text-sm font-medium text-[#EC4899]">
              Admin Login →
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
