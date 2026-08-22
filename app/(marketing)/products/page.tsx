"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Package, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/sections/ProductCard";
import { PRODUCT_GRID_CLASS } from "@/lib/product-grid";
import { useCategories } from "@/hooks/use-categories";

const PAGE_SIZE = 100;

function ProductGridSkeleton() {
  return (
    <div className={PRODUCT_GRID_CLASS}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[4/5] animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { categories, ready: categoriesReady } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(() => searchParams.get("search") ?? "");

  const search = searchParams.get("search") ?? "";
  const categorySlug = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "newest";

  const categoryId = useMemo(() => {
    if (categorySlug === "all") return null;
    return categories.find((c) => c.slug === categorySlug)?._id ?? null;
  }, [categories, categorySlug]);

  const activeCategoryName = useMemo(
    () => categories.find((c) => c.slug === categorySlug)?.name,
    [categories, categorySlug]
  );

  const pageTitle = useMemo(() => {
    if (activeCategoryName) return activeCategoryName;
    if (search) return "Search";
    return "Shop";
  }, [activeCategoryName, search]);

  const hasFilters = categorySlug !== "all" || Boolean(search);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") params.set(key, value);
        else params.delete(key);
      });
      const qs = params.toString();
      router.push(qs ? `/products?${qs}` : "/products", { scroll: false });
    },
    [searchParams, router]
  );

  const clearFilters = () => {
    setSearchInput("");
    router.push("/products", { scroll: false });
  };

  // Sync URL → input when user navigates (e.g. category from navbar)
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounced search — only when user types (not on URL-driven sync)
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      updateParams({ search: value });
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (categorySlug !== "all" && !categoriesReady) return;

    if (categorySlug !== "all" && categoriesReady && !categoryId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const params = new URLSearchParams({ status: "PUBLISHED", sort, limit: String(PAGE_SIZE) });
    if (search) params.set("search", search);
    if (categoryId) params.set("category_id", categoryId);

    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then((r) => r.json())
      .then(({ products: data }) => {
        setProducts(data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [search, categorySlug, sort, categoryId, categoriesReady]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 dark:bg-zinc-950">
      <section className="sticky top-16 z-30 border-b border-zinc-200/80 bg-[#FAFAFA]/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto w-full space-y-3 px-2 py-4 sm:px-3 md:px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate font-playfair text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {pageTitle}
              </h1>
              {!loading && (
                <p className="mt-0.5 text-xs text-zinc-500">
                  {products.length} {products.length === 1 ? "product" : "products"}
                  {search ? ` · “${search}”` : ""}
                </p>
              )}
            </div>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="shrink-0 text-zinc-600 hover:text-zinc-900"
              >
                <X className="mr-1 h-3.5 w-3.5" />
                Clear
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-10 rounded-lg border-zinc-200 bg-white pl-9 dark:border-zinc-800 dark:bg-zinc-900"
              />
            </div>
            <Select value={categorySlug} onValueChange={(v) => updateParams({ category: v })}>
              <SelectTrigger className="h-10 w-full rounded-lg border-zinc-200 bg-white sm:w-44 dark:border-zinc-800 dark:bg-zinc-900">
                <SlidersHorizontal className="mr-2 h-4 w-4 shrink-0 text-zinc-400" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => updateParams({ sort: v })}>
              <SelectTrigger className="h-10 w-full rounded-lg border-zinc-200 bg-white sm:w-40 dark:border-zinc-800 dark:bg-zinc-900">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: low to high</SelectItem>
                <SelectItem value="price-high">Price: high to low</SelectItem>
                <SelectItem value="name">Name: A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="mx-auto w-full px-2 sm:px-3 md:px-4">
          {loading || (categorySlug !== "all" && !categoriesReady) ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package className="mb-4 h-12 w-12 text-zinc-300" />
              <h2 className="font-playfair text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                No products found
              </h2>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                Try another search or browse all products.
              </p>
              <Button asChild variant="outline" className="mt-6 rounded-lg">
                <Link href="/products">View all products</Link>
              </Button>
            </div>
          ) : (
            <div className={PRODUCT_GRID_CLASS}>
              {products.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} size="lg" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
