"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CategoryCard, type CategoryCardData } from "./CategoryCard";
import type { Category, Product } from "@/lib/types";

// Static tag map per category slug — extend as needed
const TAG_MAP: Record<string, string[]> = {
  skincare:                 ["Cleansers", "Moisturisers", "Serums", "Toners", "Eye Care"],
  makeup:                   ["Foundation", "Lipstick", "Eyeshadow", "Blush", "Mascara"],
  haircare:                 ["Shampoo", "Conditioner", "Hair Masks", "Scalp Care", "Oils"],
  perfumes:                 ["Eau de Parfum", "Body Mist", "Roll-On", "Gift Sets"],
  "health-and-personal-care": ["Vitamins", "Hygiene", "Wellness", "Body Wash", "Deodorant"],
};

const DESC_MAP: Record<string, string> = {
  skincare:                 "Cleansers, serums and moisturisers for radiant, healthy skin every day.",
  makeup:                   "Foundation, lipstick and eyeshadow to express your unique beauty boldly.",
  haircare:                 "Shampoos, conditioners and treatments that strengthen and add brilliant shine.",
  perfumes:                 "Captivating fragrances and body mists that leave a lasting impression.",
  "health-and-personal-care": "Vitamins, hygiene essentials and wellness products for your daily self-care.",
};

export function CategoryShowcase() {
  const [cards, setCards] = useState<CategoryCardData[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/products?status=PUBLISHED&limit=100").then((r) => r.json()),
    ]).then(([cats, { products }]: [Category[], { products: Product[] }]) => {
      const productList: Product[] = products ?? [];

      const built: CategoryCardData[] = cats.map((cat) => {
        // Pick the first product image that belongs to this category
        const match = productList.find(
          (p) => p.category?._id === cat._id || p.category_id === cat._id
        );
        const image = match?.product_images?.[0]?.image_url;

        return {
          id: cat._id,
          name: cat.name,
          image,
          description: cat.description || DESC_MAP[cat.slug] || `Explore our ${cat.name} collection.`,
          tags: TAG_MAP[cat.slug] ?? [],
          href: `/products?category=${cat.slug}`,
        };
      });

      setCards(built);
    });
  }, []);

  if (cards.length === 0) {
    return (
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
                <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <Badge variant="secondary" className="mb-3 tracking-widest uppercase text-xs">
            Shop by Category
          </Badge>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold tracking-tight text-[#111827]">
            Find your perfect routine
          </h2>
        </div>

        {/* Grid — 1 col mobile / 2 col tablet / 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {cards.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
