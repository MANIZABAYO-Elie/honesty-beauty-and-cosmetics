"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.04, 0.4), duration: 0.45, ease: "easeOut" as const },
  }),
};

type ProductCardProps = {
  product: Product;
  index?: number;
  /** Slightly larger padding and type — used on the home product grid */
  size?: "default" | "lg";
};

export function ProductCard({ product, index = 0, size = "default" }: ProductCardProps) {
  const isLg = size === "lg";
  const subtitle = product.brand ?? product.category?.name;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-24px" }}
      variants={fadeUp}
      className="flex min-w-0 flex-col"
    >
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "group flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950",
          isLg ? "gap-2.5 p-2.5 sm:gap-3 sm:p-3.5 md:p-4" : "gap-3 p-3 sm:p-4"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900",
            isLg ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/5]"
          )}
        >
          {product.product_images?.[0] ? (
            <img
              src={product.product_images[0].image_url}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-400">
              <Package className="h-10 w-10" />
            </div>
          )}
          {/* {product.featured && (
            <span className="absolute left-2 top-2 rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              New
            </span>
          )} */}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1">
          {subtitle && (
            <p className="line-clamp-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              {subtitle}
            </p>
          )}
          <h3
            className={cn(
              "line-clamp-2 font-semibold leading-snug text-zinc-900 transition group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300",
              isLg ? "text-[13px] sm:text-sm md:text-[15px]" : "text-sm"
            )}
          >
            {product.name}
          </h3>
          <p className="mt-auto whitespace-nowrap font-medium text-zinc-900 dark:text-zinc-100">
            {product.price != null ? (
              <>
                <span className="text-[10px] uppercase text-zinc-500">USD</span>
                <span className="text-sm"> </span>
                <span className={cn(isLg && "text-sm sm:text-base")}>${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm text-zinc-500">Price on request</span>
            )}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
