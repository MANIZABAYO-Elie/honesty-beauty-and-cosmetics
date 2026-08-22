"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight, Mail, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        if (data?.category_id) {
          fetch(`/api/products?status=PUBLISHED&category_id=${data.category_id}&limit=4`)
            .then((r) => r.json())
            .then(({ products }) => setRelated((products ?? []).filter((p: Product) => p._id !== data._id)));
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              <div className="h-32 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="mx-auto max-w-7xl container-px">
          <Package className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button asChild><Link href="/products">Back to Products</Link></Button>
        </div>
      </div>
    );
  }

  const images = product.product_images ?? [];

  return (
    <>
      <section className="pt-28 pb-4">
        <div className="mx-auto max-w-7xl container-px">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <motion.div key={activeImage} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                {images[activeImage] ? (
                  <img src={images[activeImage].image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package className="h-20 w-20" /></div>
                )}
              </motion.div>
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {images.map((img, i) => (
                    <button key={img._id} onClick={() => setActiveImage(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i ? "border-primary" : "border-border hover:border-primary/50"}`}>
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              {product.category && <Badge variant="secondary" className="mb-3">{product.category.name}</Badge>}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
              {product.brand && <p className="text-muted-foreground mb-4 flex items-center gap-2"><Tag className="h-4 w-4" /> by <span className="font-medium text-foreground">{product.brand}</span></p>}
              {product.price && <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>}
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              <Card className="p-6 mb-6">
                <h3 className="font-semibold mb-4">Specifications</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-muted-foreground mb-1">Brand</dt><dd className="font-medium">{product.brand ?? "Nexus Labs"}</dd></div>
                  <div><dt className="text-muted-foreground mb-1">SKU</dt><dd className="font-medium">{product.sku ?? "N/A"}</dd></div>
                  <div><dt className="text-muted-foreground mb-1">Stock</dt><dd className="font-medium">{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</dd></div>
                  <div><dt className="text-muted-foreground mb-1">Category</dt><dd className="font-medium">{product.category?.name ?? "Uncategorized"}</dd></div>
                </dl>
              </Card>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg"><Link href="/contact"><Mail className="mr-2 h-4 w-4" />Contact About This Product</Link></Button>
                <Button asChild size="lg" variant="outline"><Link href="/products">Back to Products</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="mx-auto max-w-7xl container-px">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Related products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/products/${p.slug}`}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-square overflow-hidden bg-muted">
                        {p.product_images?.[0] ? (
                          <img src={p.product_images[0].image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package className="h-12 w-12" /></div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                        {p.price && <p className="font-bold">${p.price.toFixed(2)}</p>}
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
