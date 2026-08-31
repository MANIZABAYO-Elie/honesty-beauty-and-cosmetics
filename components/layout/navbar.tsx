"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/use-categories";

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
  const { categories } = useCategories();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeProductCategory = searchParams.get("category");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCatOpen(false); }, [pathname]);

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

  const overHero = pathname === "/" && !scrolled;

  const onProductsPage = pathname === "/products";
  const filtersActive = Boolean(activeProductCategory || searchParams.get("search"));
  const categoriesNavActive = onProductsPage && filtersActive;

  const isLinkActive = (href: string) => {
    if (href === "/products") {
      return onProductsPage && !filtersActive;
    }
    return pathname === href;
  };

  const desktopNavLink = (href: string, active: boolean) =>
    cn(
      "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
      overHero
        ? active
          ? "text-white font-semibold"
          : "text-white/85 hover:text-white"
        : active
          ? "text-[#EC4899] font-semibold"
          : "text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
    );

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
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <Image
              src="/uploads/company-logo.jpg"
              alt="Honest Beauty and Cosmetics Ltd"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
              priority
            />
            <span
              className={cn(
                "hidden font-bold text-sm leading-tight sm:block",
                overHero ? "text-white" : "text-foreground"
              )}
            >
              Honest Beauty<br />
              <span className={cn("font-semibold text-xs", overHero ? "text-pink-300" : "text-[#EC4899]")}> 
                and Cosmetics Ltd
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={desktopNavLink(link.href, isLinkActive(link.href))}
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
                  overHero
                    ? categoriesNavActive
                      ? "text-white font-semibold"
                      : "text-white/85 hover:text-white"
                    : categoriesNavActive
                      ? "text-[#EC4899] font-semibold"
                      : "text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] dark:hover:text-[#EC4899]"
                )}
              >
                Products
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", catOpen && "rotate-180")} />
              </button>

              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-950 border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-lg p-3 animate-fade-in">
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899] font-medium rounded-md"
                  >
                    All products
                  </Link>

                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        href={`/products?category=${cat.slug ?? cat._id}`}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md text-left truncate",
                          pathname === "/products" && activeProductCategory === cat.slug
                            ? "text-[#EC4899] font-medium bg-[#EC4899]/5"
                            : "text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899]"
                        )}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={desktopNavLink(link.href, isLinkActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/250728959122"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <Phone className="h-4 w-4" />
            </a>
            <ThemeToggle
              className={overHero ? "text-white hover:bg-white/10 hover:text-white" : undefined}
            />
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden rounded-xl md:inline-flex",
                overHero
                  ? "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
              )}
            >
              <Link href="/login">Admin Login</Link>
            </Button>
            <button
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg md:hidden",
                overHero ? "text-white" : "text-foreground"
              )}
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
                  isLinkActive(link.href)
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
                    href="/products"
                    className="block py-2 text-sm text-[#1F2937] dark:text-gray-200 hover:text-[#EC4899] font-medium"
                  >
                    All products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/products?category=${cat.slug ?? cat._id}`}
                      className={cn(
                        "block py-2 text-sm hover:text-[#EC4899]",
                        pathname === "/products" && activeProductCategory === cat.slug
                          ? "text-[#EC4899] font-medium"
                          : "text-[#1F2937] dark:text-gray-200"
                      )}
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
                  isLinkActive(link.href)
                    ? "bg-[#EC4899]/10 text-[#EC4899] font-semibold"
                    : "text-[#1F2937] dark:text-gray-200 hover:bg-[#EC4899]/5 hover:text-[#EC4899]"
                )}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://wa.me/250728959122"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 text-sm font-medium text-green-600"
            >
              WhatsApp →
            </a>

            <Link href="/login" className="block px-4 py-2.5 text-sm font-medium text-[#EC4899]">
              Admin Login →
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
