"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Package, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product, Category } from "@/lib/types";

const PAGE_SIZE = 100;

const glass = "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.6, ease: "easeOut" as const } }),
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const search = searchParams.get("search") ?? "";
  const categorySlug = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "newest";

  const updateParams = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") params.set(key, value);
      else params.delete(key);
    });
    router.push(`/products?${params.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const cat = categories.find((c) => c.slug === categorySlug);
    const params = new URLSearchParams({ status: "PUBLISHED", sort, limit: String(PAGE_SIZE) });
    if (search) params.set("search", search);
    if (cat) params.set("category_id", cat._id);
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then(({ products: data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, [search, categorySlug, sort, categories]);

  return (
    <>
      {/* ── Animated gradient background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-pink-300/20 blur-[120px] animate-[drift_12s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-1/2 -left-60 h-[500px] w-[500px] rounded-full bg-purple-300/15 blur-[100px] animate-[drift_16s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-rose-200/20 blur-[90px] animate-[drift_10s_ease-in-out_infinite_alternate]" />
      </div>

      {/* ── Header ── */}
      <section className="pt-28 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-3 tracking-widest uppercase text-xs">Collection</Badge>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight mb-3">Our latest products</h1>
            <p className="text-muted-foreground text-base max-w-xl">Premium products crafted with ingredients you can trust.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                defaultValue={search}
                onChange={(e) => updateParams({ search: e.target.value })}
                className="pl-10 rounded-full"
              />
            </div>
            <Select value={categorySlug} onValueChange={(v) => updateParams({ category: v })}>
              <SelectTrigger className="sm:w-48 rounded-full">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => <SelectItem key={cat._id} value={cat.slug}>{cat.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => updateParams({ sort: v })}>
              <SelectTrigger className="sm:w-48 rounded-full"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl sm:rounded-3xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
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
                        {product.featured && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full font-medium">Featured</span>
                          </div>
                        )}
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
