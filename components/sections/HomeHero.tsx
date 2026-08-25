"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/hero-slides";

const SLIDE_MS = 6000;
const FADE_MS = 1400;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const preload = HERO_SLIDES.map(
      (slide) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = slide.src;
        })
    );
    Promise.all(preload).then(() => setReady(true));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-stone-900">
      <div className="relative min-h-[72vh] w-full sm:min-h-[78vh] lg:min-h-[90vh]">
        {/* Background slides */}
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              aria-hidden={!active}
              className="absolute inset-0 transition-opacity ease-in-out"
              style={{
                opacity: active ? 1 : 0,
                transitionDuration: `${FADE_MS}ms`,
              }}
            >
              <img
                src={slide.src}
                alt={active ? slide.alt : ""}
                className="h-full w-full object-cover object-center"
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
              />
            </div>
          );
        })}

        {!ready && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-800 to-stone-700" />
        )}

        {/* Readability overlays */}
        <div className="pointer-events-none absolute inset-0 bg-stone-900/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-950/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/10" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[72vh] flex-col justify-center px-0 pt-20 pb-16 sm:min-h-[78vh] sm:pt-24 lg:min-h-[90vh]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-xl lg:max-w-2xl"
            >
              <p className="mb-4 text-4xl font-semibold uppercase tracking-[0.25em] text-white/80">
                Honest Beauty &amp; Cosmetics
              </p>
              <h1 className="font-playfair text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Clean beauty,
                <br />
                <span className="text-white/95">crafted with care.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                Premium skincare, body care and hair care — honest ingredients, dermatologist-tested formulas,
                made for everyday confidence.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-white px-8 text-stone-900 hover:bg-white/90"
                >
                  <Link href="/products">
                    Shop the collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                >
                  <Link href="/about">Our story</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
