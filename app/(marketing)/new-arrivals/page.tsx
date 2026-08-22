"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

const PAGE_SIZE = 100;
const glass = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" as const } }),
};

const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ status: "PUBLISHED", sort: "newest", limit: String(PAGE_SIZE) });
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then(({ products: data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  const isNew = (createdAt?: string) =>
    createdAt ? Date.now() - new Date(createdAt).getTime() < TWO_WEEKS_MS : false;

  return (
    <>
      {/* Animated background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-pink-300/20 blur-[120px] animate-[drift_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-1/2 -left-60 h-[500px] w-[500px] rounded-full bg-purple-300/15 blur-[100px] animate-[drift_16s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-rose-200/20 blur-[90px] animate-[drift_10s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Header */}
      <section className="pt-28 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-[#EC4899]" />
              <Badge variant="secondary" className="tracking-widest uppercase text-xs">Just In</Badge>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight mb-3">New Arrivals</h1>
            <p className="text-muted-foreground text-base max-w-xl">
              The latest additions to our collection — fresh, honest, and ready to discover.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl sm:rounded-3xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground">Check back soon for new additions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, i) => (
                  <motion.div key={product._id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <Link href={`/products/${product.slug}`}>
                      <div className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] ${glass} shadow-xl transition-transform duration-500 hover:scale-[1.02]`}>
                        {product.product_images?.[0] ? (
                          <img
                            src={product.product_images[0].image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Package className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}

                        {/* New badge */}
                        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                          {isNew((product as any).createdAt) && (
                            <span className="text-xs bg-[#EC4899] text-white px-3 py-1 rounded-full font-medium">New</span>
                          )}
                          {product.featured && (
                            <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full font-medium">Featured</span>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                          {product.category && (
                            <p className="text-xs text-pink-300 font-semibold uppercase tracking-widest mb-0.5 hidden sm:block">
                              {product.category.name}
                            </p>
                          )}
                          <h3 className="font-playfair text-sm sm:text-xl font-bold text-white leading-tight mb-0.5">
                            {product.name}
                          </h3>
                          {product.price
                            ? <p className="text-white/90 font-semibold text-xs sm:text-base">${product.price.toFixed(2)}</p>
                            : <p className="text-white/70 text-xs">Price on request</p>
                          }
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }
      `}</style>
    </>
  );
}
