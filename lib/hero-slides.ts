/** Curated Unsplash cosmetics imagery — https://unsplash.com/s/photos/cosmetics */

export type HeroSlide = {
  id: string;
  alt: string;
  /** Full-width hero, 2400px wide for sharp displays */
  src: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  { id: "cidella", alt: "Cidella product flatlay", src: "/uploads/hero%20images/cidella.webp" },
  { id: "colgate-charcoal", alt: "Colgate charcoal", src: "/uploads/hero%20images/colgate%20charcoal.webp" },
  { id: "queen-elizabeth", alt: "Queen Elizabeth lotion", src: "/uploads/hero%20images/gueen%20elizabeth%20lotion.webp" },
  { id: "maybelline-color", alt: "Maybelline color collection", src: "/uploads/hero%20images/maybelline%20color%20%20.jpg" },
  { id: "maybelline-22", alt: "Maybelline 22", src: "/uploads/hero%20images/maybelline22.jpg" },
  { id: "sun-cream", alt: "Sun cream", src: "/uploads/hero%20images/sun%20cream.jpg" },
  { id: "top-crem-faces", alt: "Top crem faces", src: "/uploads/hero%20images/top%20crem%20faces.jpg" },
  { id: "top-crem", alt: "Top crem", src: "/uploads/hero%20images/top%20crem.jpg" },
  { id: "tress-hair", alt: "Tress hair products", src: "/uploads/hero%20images/TRESS%20hair%20products.jpg" },
  { id: "vaseline", alt: "Vaseline", src: "/uploads/hero%20images/vaseline.webp" },
];
