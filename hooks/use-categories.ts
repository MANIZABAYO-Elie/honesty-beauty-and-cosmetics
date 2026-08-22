"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/lib/types";

let cachedCategories: Category[] | null = null;
let inflight: Promise<Category[]> | null = null;

function fetchCategoriesOnce(): Promise<Category[]> {
  if (cachedCategories) return Promise.resolve(cachedCategories);
  if (!inflight) {
    inflight = fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => {
        cachedCategories = Array.isArray(data) ? data : [];
        return cachedCategories;
      })
      .catch(() => {
        cachedCategories = [];
        return [];
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** Shared category list — one network request per session */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(cachedCategories ?? []);
  const [ready, setReady] = useState(Boolean(cachedCategories));

  useEffect(() => {
    if (cachedCategories) {
      setCategories(cachedCategories);
      setReady(true);
      return;
    }
    let cancelled = false;
    fetchCategoriesOnce().then((data) => {
      if (!cancelled) {
        setCategories(data);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, ready };
}

export function invalidateCategoriesCache() {
  cachedCategories = null;
}
