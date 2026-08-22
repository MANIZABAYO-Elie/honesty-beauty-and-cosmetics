"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Star, Quote, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";

const testimonials = [
  {
    name: "Agasaro Rosine",
    role: "Verified Customer",
    image: "/Agasaro Rosine.jpg",
    before: "Struggled with dull, uneven skin tone for years.",
    content: "After just 3 weeks using the brightening serum and moisturiser, my skin tone is so much more even and radiant. People keep asking what I'm doing differently!",
    rating: 5,
  },
  {
    name: "Ishimwe Doreen",
    role: "Verified Customer",
    image: "/Ishimwe Doreen.jpg",
    before: "Suffered from dry, flaky skin and brittle hair.",
    content: "The body butter and hair mask have completely transformed my routine. My skin stays hydrated all day and my hair has never looked this healthy and shiny.",
    rating: 5,
  },
  {
    name: "Uwase Kevine",
    role: "Verified Customer",
    image: "/uwase kevine.jpg",
    before: "Sensitive skin that reacted badly to most products.",
    content: "Finally found products that don't irritate my skin. The gentle cleanser and calming moisturiser have made such a difference — my skin feels calm, soft and glowing.",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const } }),
};

/* Frosted glass utility applied inline so it works without Tailwind plugin */
const glass = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]); // parallax

  // Auto-advance hero slider once products are loaded
  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const slides = featuredProducts.slice(0, 4);
    const id = setInterval(() => setHeroIndex((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [featuredProducts]);

  useEffect(() => {
    fetch("/api/products?status=PUBLISHED&limit=6&sort=newest")
      .then((r) => r.json())
      .then(({ products }) => setFeaturedProducts(products ?? []));
  }, []);

  return (
    <>
      {/* ── Animated gradient background (fixed, behind everything) ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-pink-300/20 blur-[120px] animate-[drift_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-1/2 -left-60 h-[500px] w-[500px] rounded-full bg-purple-300/15 blur-[100px] animate-[drift_16s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-rose-200/20 blur-[90px] animate-[drift_10s_ease-in-out_infinite_alternate]" />
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ y: heroY }}
          className="w-full h-[60vh] sm:h-[75vh] lg:h-screen relative"
        >
            {/* Slider images from backend — cross-fade */}
            {featuredProducts.slice(0, 4).map((product, i) =>
              product.product_images?.[0] ? (
                <img
                  key={product._id}
                  src={product.product_images[0].image_url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: i === heroIndex ? 1 : 0 }}
                />
              ) : null
            )}
            {/* Fallback while loading */}
            {featuredProducts.length === 0 && (
              <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            {/* Dot indicators */}
            <div className="absolute bottom-8 inset-x-0 flex justify-center gap-2 z-10">
              {featuredProducts.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === heroIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
            {/* Active slide product info */}
            {featuredProducts[heroIndex] && (
              <div className="absolute bottom-0 inset-x-0 px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
                <div className="mx-auto max-w-7xl">
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-2 font-medium">{featuredProducts[heroIndex].category?.name}</p>
                  <p className="font-playfair text-2xl sm:text-4xl font-bold text-white mb-2">{featuredProducts[heroIndex].name}</p>
                  {featuredProducts[heroIndex].price && (
                    <p className="text-white/90 font-semibold text-base sm:text-xl">${featuredProducts[heroIndex].price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            )}
        </motion.div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <CategoryShowcase />

      {/* ── FEATURED PRODUCTS — Bento grid ── */}
      <section className="py-28 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <Badge variant="secondary" className="mb-4 tracking-widest uppercase text-xs">New Arrivals</Badge>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight">Our latest products</h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/products">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[3/4] rounded-3xl bg-muted animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProducts.map((product, i) => (
                <motion.div key={product._id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link href={`/products/${product.slug}`}>
                    <div className={`group relative overflow-hidden rounded-3xl aspect-[3/4] ${glass} shadow-xl transition-transform duration-500 hover:scale-[1.02]`}>
                      {product.product_images?.[0] ? (
                        <img src={product.product_images[0].image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted"><Package className="h-16 w-16 text-muted-foreground" /></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {product.category && <p className="text-xs text-pink-300 font-semibold uppercase tracking-widest mb-1">{product.category.name}</p>}
                        <h3 className="font-playfair text-xl font-bold text-white mb-1">{product.name}</h3>
                        {product.price && <p className="text-white/90 font-semibold text-base">${product.price.toFixed(2)}</p>}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 tracking-widest uppercase text-xs">Real Results</Badge>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight">What our customers say</h2>
            <p className="text-muted-foreground mt-4 text-base">Real skin transformations from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`overflow-hidden rounded-3xl h-full flex flex-col ${glass} shadow-xl transition-transform duration-400 hover:scale-[1.02]`}>
                  <div className="relative">
                    <img src={t.image} alt={`${t.name} transformation`} className="w-full h-72 object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-white font-semibold">{t.name}</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-warning text-warning" />)}
                        </div>
                      </div>
                      <span className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full font-medium">Verified</span>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-4 px-4 py-3 rounded-2xl bg-muted/50 border border-border/50">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Before</p>
                      <p className="text-sm text-muted-foreground italic">{t.before}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-pink-500 uppercase tracking-widest mb-2">After</p>
                      <Quote className="h-5 w-5 text-primary/20 mb-2" />
                      <p className="text-base text-foreground/80 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drift keyframe */}
      <style jsx global>{`
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }
      `}</style>
    </>
  );
}
