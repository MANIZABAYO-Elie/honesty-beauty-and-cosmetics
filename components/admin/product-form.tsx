"use client";

import { useState, useRef } from "react";
import { Loader2, X, ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Product, Category } from "@/lib/types";

type Props = {
  product: Product | null;
  categories: Category[];
  slugify: (text: string) => string;
  onSuccess: () => void;
};

export function ProductForm({ product, categories, slugify, onSuccess }: Props) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    product?.product_images?.sort((a, b) => a.position - b.position).map((img) => img.image_url) ?? []
  );
  const [newUrl, setNewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB).`);
        continue;
      }
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        toast.error(`Failed to upload ${file.name}.`);
        continue;
      }
      const { url } = await res.json();
      uploaded.push(url);
    }

    setImageUrls((prev) => [...prev, ...uploaded]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const addUrl = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    setImageUrls((prev) => [...prev, trimmed]);
    setNewUrl("");
  };

  const removeImage = (index: number) => setImageUrls((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const data = {
      name,
      slug: (formData.get("slug") as string) || slugify(name),
      description: (formData.get("description") as string) || undefined,
      brand: (formData.get("brand") as string) || undefined,
      price: formData.get("price") ? parseFloat(formData.get("price") as string) : undefined,
      stock: parseInt((formData.get("stock") as string) || "0"),
      sku: (formData.get("sku") as string) || undefined,
      featured: formData.get("featured") === "on",
      status: (formData.get("status") as string) || "DRAFT",
      category_id: (formData.get("category_id") as string) || undefined,
      product_images: imageUrls.map((url, i) => ({ image_url: url, position: i })),
    };

    const res = product
      ? await fetch(`/api/products/${product._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      : await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err.error ?? "Failed to save product.");
      setSaving(false);
      return;
    }

    toast.success(product ? "Product updated." : "Product created.");
    setSaving(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" defaultValue={product?.name ?? ""} required placeholder="Product name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={product?.slug ?? ""} placeholder="auto-generated" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product?.description ?? ""} rows={3} placeholder="Product description" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" name="brand" defaultValue={product?.brand ?? ""} placeholder="Brand name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category_id">Category</Label>
          <Select name="category_id" defaultValue={product?.category_id ?? ""}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price ?? ""} placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" defaultValue={product?.stock ?? 0} placeholder="0" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" name="sku" defaultValue={product?.sku ?? ""} placeholder="SKU" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={product?.status ?? "DRAFT"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 pt-7">
          <Switch id="featured" name="featured" defaultChecked={product?.featured ?? false} />
          <Label htmlFor="featured">Featured product</Label>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <Label>Product Images</Label>

        {/* Previews */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Browse button */}
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-2">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading..." : "Browse Files"}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        </div>

        {/* URL paste fallback */}
        <div className="flex gap-2">
          <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Or paste an image URL..." onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())} />
          <Button type="button" variant="outline" onClick={addUrl}><ImagePlus className="h-4 w-4" /></Button>
        </div>
        <p className="text-xs text-muted-foreground">Upload files (max 5MB each) or paste image URLs.</p>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={saving || uploading}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : product ? "Save Changes" : "Create Product"}
        </Button>
      </DialogFooter>
    </form>
  );
}
