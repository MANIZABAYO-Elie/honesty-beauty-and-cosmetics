"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface CategoryCardData {
  id: string;
  name: string;
  image?: string;
  description: string;
  tags: string[];
  href: string;
}

interface Props {
  category: CategoryCardData;
  index?: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
  }),
};

export function CategoryCard({ category, index = 0 }: Props) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <Link href={category.href} className="group block">
        {/* Image */}
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-[#F5F0EB]">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-playfair text-lg font-bold text-[#111827] mb-2 group-hover:text-[#EC4899] transition-colors duration-200">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
          {category.description}
        </p>

        {/* Pill tags */}
        <div className="flex flex-wrap gap-1.5">
          {category.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border border-[#D1D5DB] text-[#374151] bg-white hover:border-[#EC4899] hover:text-[#EC4899] transition-colors duration-150 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
