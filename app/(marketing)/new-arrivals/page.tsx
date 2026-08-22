"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { PRODUCT_GRID_CLASS } from "@/lib/product-grid";

const PAGE_SIZE = 100;
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ status: "PUBLISHED", sort: "newest", limit: String(PAGE_SIZE) });
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then(({ products: data }) => {
        setProducts(data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const newProducts = useMemo(
    () =>
      products.filter((p) => {
        if (!p.createdAt) return false;
        return Date.now() - new Date(p.createdAt).getTime() < TWO_WEEKS_MS;
      }),
    [products]
  );

  const displayProducts = newProducts.length > 0 ? newProducts : products.slice(0, 12);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 dark:bg-zinc-950">
      <section className="border-b border-zinc-200/80 px-2 py-8 sm:px-3 md:px-4 dark:border-zinc-800">
        <h1 className="font-playfair text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          New arrivals
        </h1>
        <p className="mt-2 max-w-lg text-sm text-zinc-500">
          {newProducts.length > 0
            ? "Added in the last two weeks."
            : "Our latest additions to the collection."}
        </p>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto w-full px-2 sm:px-3 md:px-4">
          {loading ? (
            <div className={PRODUCT_GRID_CLASS}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              ))}
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <Package className="mb-4 h-12 w-12 text-zinc-300" />
              <p className="text-sm text-zinc-500">No products yet. Check back soon.</p>
              <Button asChild className="mt-6 rounded-lg" variant="outline">
                <Link href="/products">Browse shop</Link>
              </Button>
            </div>
          ) : (
            <div className={PRODUCT_GRID_CLASS}>
              {displayProducts.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} size="lg" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
