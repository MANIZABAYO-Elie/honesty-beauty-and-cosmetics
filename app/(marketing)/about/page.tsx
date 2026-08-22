"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  return (
    <main className="bg-[#FDFAF7]">

      {/* ── HERO ── */}
      <section className="pt-28 pb-12 border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b5651d] font-semibold mb-5">
              Honest Beauty &amp; Cosmetics Ltd
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6">
              Beauty that earns<br />your trust.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              We believe beauty is about feeling confident and comfortable in your own skin —
              not about hiding behind products you can&apos;t pronounce. Quality you can read.
              Results you can feel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY — image left, text right ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Natural beauty ingredients laid out on a surface"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Pull quote card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white border border-stone-200 rounded-xl p-5 shadow-md max-w-[240px]">
                <p className="font-playfair text-sm italic text-stone-700 leading-snug mb-2">
                  &ldquo;I was tired of reading labels I couldn&apos;t trust. So I made products I could.&rdquo;
                </p>
                <p className="text-[11px] uppercase tracking-widest text-[#b5651d] font-semibold">— Founder</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="pt-8 lg:pt-0"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#b5651d] font-semibold mb-4">Our Story</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-6">
                From kitchen table<br />to full collection
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed text-[15px]">
                <p>
                  Honest Beauty and Cosmetics Ltd was born out of a personal frustration. Our founder,
                  tired of reading ingredient lists full of unpronounceable chemicals, decided to take
                  matters into her own hands — literally.
                </p>
                <p>
                  What started as small-batch formulations made at home quickly grew into a full product
                  range as friends and family fell in love with the results. Word spread, and the demand
                  for clean, honest beauty products was undeniable.
                </p>
                <p>
                  Today we offer a complete range of skin care, body care and hair care products — all
                  made with ethically sourced, natural ingredients, all dermatologist tested, and all
                  100% cruelty-free.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION — side by side, no cards ── */}
      <section className="py-14 sm:py-16 bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-stone-700">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="pr-0 sm:pr-14 pb-10 sm:pb-0"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#d4956a] font-semibold mb-4">Mission</p>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                Clean beauty,<br />accessible to everyone.
              </h3>
              <p className="text-stone-400 leading-relaxed text-[15px]">
                We believe you shouldn&apos;t have to choose between products that work and products
                that are safe — our formulas deliver both, every time, at a price that doesn&apos;t
                exclude anyone.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="pl-0 sm:pl-14 pt-10 sm:pt-0"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#d4956a] font-semibold mb-4">Vision</p>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                A beauty industry built<br />on transparency.
              </h3>
              <p className="text-stone-400 leading-relaxed text-[15px]">
                We envision a world where every product on your shelf is something you can feel
                genuinely good about using — for people and the planet, without compromise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER — text left, stacked list right ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#b5651d] font-semibold mb-4">Our Range</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
                Three categories,<br />one commitment.
              </h2>
              <p className="text-stone-500 text-[15px] leading-relaxed">
                Every product we make — whether it&apos;s for your face, body or hair — is held to
                the same standard: clean ingredients, real results, honest labelling.
              </p>
            </motion.div>
            <div className="space-y-0 divide-y divide-stone-200">
              {[
                {
                  num: "01",
                  title: "Skin Care",
                  desc: "From gentle cleansers and toners to rich moisturisers and serums — a complete routine for radiant, healthy skin.",
                },
                {
                  num: "02",
                  title: "Body Care",
                  desc: "Indulgent body butters, exfoliating scrubs, nourishing oils and lotions that keep your skin soft and glowing all day.",
                },
                {
                  num: "03",
                  title: "Hair Care",
                  desc: "Sulphate-free shampoos, deep conditioning masks and leave-in treatments that restore strength, shine and moisture.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex gap-6 py-6"
                >
                  <span className="font-playfair text-2xl font-bold text-[#b5651d] shrink-0 w-8">{item.num}</span>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES — asymmetric 2+2 with large numbers ── */}
      <section className="py-14 sm:py-16 bg-stone-50 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#b5651d] font-semibold mb-3">Core Values</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-stone-200">
            {[
              {
                title: "Honesty",
                desc: "We list every ingredient clearly. No hidden nasties, no misleading claims — ever.",
              },
              {
                title: "Safety",
                desc: "Every formula is dermatologist tested and approved for all skin types including sensitive.",
              },
              {
                title: "Sustainability",
                desc: "Ethically sourced ingredients, eco-conscious packaging and cruelty-free always.",
              },
              {
                title: "Efficacy",
                desc: "Beautiful packaging means nothing without results. Our products are formulated to actually work.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-[#FDFAF7] p-8 sm:p-10"
              >
                <span className="font-playfair text-5xl font-bold text-stone-100 select-none block mb-4 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-playfair text-xl font-bold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING STATEMENT ── */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900 leading-snug mb-6">
              Honest products. Quality beauty. Everyday confidence.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#b5651d] border-b border-[#b5651d] pb-0.5 hover:gap-3 transition-all"
            >
              Shop the collection →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
