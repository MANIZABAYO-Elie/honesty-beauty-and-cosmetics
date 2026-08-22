"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Pencil, Trash2, FolderTree, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Category } from "@/lib/types";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const params = search ? `?search=${encodeURIComponent(search)}` : "";
    const cats: Category[] = await fetch(`/api/categories${params}`).then((r) => r.json());
    setCategories(cats);

    if (cats.length > 0) {
      const counts: Record<string, number> = {};
      await Promise.all(cats.map(async (cat) => {
        const { total } = await fetch(`/api/products?category_id=${cat._id}&limit=1`).then((r) => r.json());
        counts[cat._id] = total ?? 0;
      }));
      setProductCounts(counts);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => fetchCategories(), 300);
    return () => clearTimeout(t);
  }, [fetchCategories]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Failed to delete category."); return; }
    toast.success("Category deleted.");
    setDeleteId(null);
    fetchCategories();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const data = {
      name,
      slug: (formData.get("slug") as string) || slugify(name),
      description: (formData.get("description") as string) || undefined,
      icon: (formData.get("icon") as string) || undefined,
    };

    const res = editing
      ? await fetch(`/api/categories/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      : await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (!res.ok) { toast.error("Failed to save category."); return; }
    toast.success(editing ? "Category updated." : "Category created.");
    setFormOpen(false);
    setEditing(null);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">Organize your products into categories.</p>
        </div>
        <Dialog open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}><Plus className="h-4 w-4 mr-2" />Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="name">Name *</Label><Input id="name" name="name" defaultValue={editing?.name ?? ""} required placeholder="Category name" /></div>
              <div className="space-y-2"><Label htmlFor="slug">Slug</Label><Input id="slug" name="slug" defaultValue={editing?.slug ?? ""} placeholder="auto-generated" /></div>
              <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={editing?.description ?? ""} rows={3} placeholder="Category description" /></div>
              <div className="space-y-2"><Label htmlFor="icon">Icon</Label><Input id="icon" name="icon" defaultValue={editing?.icon ?? ""} placeholder="Lucide icon name (e.g. Cpu)" /></div>
              <DialogFooter><Button type="submit">{editing ? "Save Changes" : "Create Category"}</Button></DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : categories.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <FolderTree className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold mb-1">No categories found</h3>
          <p className="text-sm text-muted-foreground">Add your first category to get started.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Card key={cat._id} className="p-5 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><FolderTree className="h-5 w-5" /></div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(cat); setFormOpen(true); }}><Pencil className="h-4 w-4 text-muted-foreground" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => setDeleteId(cat._id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <h3 className="font-semibold mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{cat.description ?? "No description"}</p>
              <Badge variant="secondary" className="text-xs">{productCounts[cat._id] ?? 0} products</Badge>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this category?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the category. Products in this category will become uncategorized.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
