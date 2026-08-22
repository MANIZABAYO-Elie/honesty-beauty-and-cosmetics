"use client";

import Link from "next/link";
import { CustomerTestimonials } from "@/components/sections/CustomerTestimonials";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-20 dark:bg-zinc-950">
      <section className="border-b border-zinc-200/80 px-2 py-10 sm:px-3 md:px-4 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            About us
          </p>
          <h1 className="font-playfair text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Beauty that earns your trust
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Honest Beauty and Cosmetics Ltd creates clean skincare, body care, and hair care you can
            read about with confidence — dermatologist-tested, cruelty-free, and made for real results.
          </p>
        </div>
      </section>

      <section className="px-2 py-12 sm:px-3 md:px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
            <img
              src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Natural beauty ingredients"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-playfair text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Our story
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>
                We started with a simple frustration: too many products hide what&apos;s inside the bottle.
                Our founder began making small-batch formulas at home — ones she would use on her own skin.
              </p>
              <p>
                Friends and family loved the results. Word spread. Today we offer a full range of honest,
                clearly labelled products for skin, body, and hair — still guided by the same promise:
                quality you can read, results you can feel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200/80 bg-white px-2 py-12 sm:px-3 md:px-4 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 sm:gap-12">
          <div>
            <h2 className="font-playfair text-xl font-bold text-zinc-900 dark:text-zinc-50">Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Clean beauty that works — safe ingredients, fair pricing, and formulas designed for every
              skin type, including sensitive.
            </p>
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-zinc-900 dark:text-zinc-50">Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A beauty industry built on transparency — where every product on your shelf is something you
              feel good about, for you and the planet.
            </p>
          </div>
        </div>
      </section>

      <CustomerTestimonials />

      <section className="px-2 py-12 sm:px-3 md:px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-playfair text-xl font-semibold text-zinc-900 sm:text-2xl dark:text-zinc-50">
            Ready to find your routine?
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-semibold text-[#b5651d] underline-offset-4 hover:underline"
          >
            Shop all products
          </Link>
        </div>
      </section>
    </main>
  );
}
