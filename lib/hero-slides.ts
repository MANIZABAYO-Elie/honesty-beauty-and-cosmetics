/** Curated Unsplash cosmetics imagery — https://unsplash.com/s/photos/cosmetics */

export type HeroSlide = {
  id: string;
  alt: string;
  /** Full-width hero, 2400px wide for sharp displays */
  src: string;
};

function unsplash(photoId: string, w = 2400) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&q=85`;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "skincare-flatlay",
    alt: "Minimal skincare bottles and jars on a soft neutral surface",
    src: unsplash("photo-1556228578-0d85b1a4d571"),
  },
  {
    id: "makeup-collection",
    alt: "Elegant makeup and beauty products arranged on marble",
    src: unsplash("photo-1596462502278-27bfdc403348"),
  },
  {
    id: "skincare-bottles",
    alt: "Minimal skincare bottles with soft natural light",
    src: unsplash("photo-1571781926291-c477ebfd024b"),
  },
  {
    id: "cosmetics-flatlay",
    alt: "Clean cosmetics and brushes flat lay",
    src: unsplash("photo-1522335789203-aabd1fc54bc9"),
  },
];
