"use client";

import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { HomeHero } from "@/components/sections/HomeHero";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?status=PUBLISHED&featured=true&limit=100&sort=newest")
      .then((r) => r.json())
      .then(({ products: data }) => {
        setProducts(data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <HomeHero />

      {/* ── PRODUCTS ── */}
      <section className="bg-[#FAFAFA] py-8 sm:py-12 dark:bg-zinc-950">
        <div className="mx-auto w-full px-2 sm:px-3 md:px-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:gap-x-3 sm:gap-y-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[4/5] animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package className="mb-4 h-12 w-12 text-zinc-300" />
              <p className="text-sm text-zinc-500">No featured products yet. Browse the full collection in the shop.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 auto-rows-fr items-stretch gap-x-2 gap-y-6 sm:gap-x-3 sm:gap-y-8 md:grid-cols-3 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} size="lg" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
