"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Agasaro Rosine",
    role: "Verified Customer",
    // use a descriptive filename so you can drop the real photo at this path
    image: "/uploads/Agasaro Rosine.jpg",
    before: "Struggled with dull, uneven skin tone for years.",
    content:
      "After just 3 weeks using the brightening serum and moisturiser, my skin tone is so much more even and radiant. People keep asking what I'm doing differently!",
    rating: 5,
  },
  {
    name: "Ishimwe Doreen",
    role: "Verified Customer",
    image: "/uploads/Ishimwe Doreen.jpg",
    before: "Suffered from dry, flaky skin and brittle hair.",
    content:
      "The body butter and hair mask have completely transformed my routine. My skin stays hydrated all day and my hair has never looked this healthy and shiny.",
    rating: 5,
  },
  {
    name: "Uwase Kevine",
    role: "Verified Customer",
    image: "/uploads/uwase kevine.jpg",
    before: "Sensitive skin that reacted badly to most products.",
    content:
      "Finally found products that don't irritate my skin. The gentle cleanser and calming moisturiser have made such a difference — my skin feels calm, soft and glowing.",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

export function CustomerTestimonials() {
  return (
    <section className="border-t border-stone-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b5651d]">
            Real results
          </p>
          <h2 className="font-playfair text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            What our customers say
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-stone-600">
            Real skin transformations from real customers across Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-[#FDFAF7]"
            >
              <div className="relative">
                <img
                  src={t.image}
                  alt={`${t.name} transformation`}
                  className="h-64 w-full object-cover object-top"
                  onError={(e) => {
                    // fallback to a known safe image when the specific upload is missing or incorrect
                    (e.currentTarget as HTMLImageElement).src = "/uploads/company-logo.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <div className="mt-0.5 flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-800">
                    Verified
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 rounded-xl border border-stone-200/80 bg-white px-4 py-3">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                    Before
                  </p>
                  <p className="text-sm italic leading-relaxed text-stone-600">{t.before}</p>
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#b5651d]">
                    After
                  </p>
                  <Quote className="mb-2 h-4 w-4 text-stone-300" aria-hidden />
                  <p className="text-[15px] leading-relaxed text-stone-700">&ldquo;{t.content}&rdquo;</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
