"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, FolderTree, Mail, TrendingUp, ArrowUpRight, CheckCircle2, Clock, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product, ContactMessage } from "@/lib/types";

type Stats = { productCount: number; categoryCount: number; messageCount: number; unreadCount: number; publishedCount: number; featuredCount: number };

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products?limit=1000").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/messages").then((r) => r.json()),
      fetch("/api/products?limit=5&sort=newest").then((r) => r.json()),
    ]).then(([allProducts, cats, msgs, recentProds]) => {
      const products: Product[] = allProducts.products ?? [];
      const messages: ContactMessage[] = msgs ?? [];
      setStats({
        productCount: allProducts.total ?? 0,
        categoryCount: cats.length ?? 0,
        messageCount: messages.length,
        unreadCount: messages.filter((m) => !m.is_read).length,
        publishedCount: products.filter((p) => p.status === "PUBLISHED").length,
        featuredCount: products.filter((p) => p.featured).length,
      });
      setRecentMessages(messages.slice(0, 5));
      setRecentProducts(recentProds.products ?? []);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: "Total Products", value: stats?.productCount ?? 0, icon: Package, href: "/admin/products", color: "text-primary bg-primary/10" },
    { label: "Categories", value: stats?.categoryCount ?? 0, icon: FolderTree, href: "/admin/categories", color: "text-chart-2 bg-chart-2/10" },
    { label: "Messages", value: stats?.messageCount ?? 0, icon: Mail, href: "/admin/messages", color: "text-chart-3 bg-chart-3/10" },
    { label: "Unread", value: stats?.unreadCount ?? 0, icon: Clock, href: "/admin/messages", color: "text-destructive bg-destructive/10" },
  ];

  const formatDate = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "just now";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={stat.href}>
              <Card className="p-5 hover:shadow-lg transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-2xl font-bold">{loading ? <span className="inline-block w-12 h-7 bg-muted rounded animate-pulse" /> : stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="h-4 w-4 text-success" /><span className="text-sm font-medium">Published Products</span></div>
          <p className="text-2xl font-bold">{stats?.publishedCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">of {stats?.productCount ?? 0} total</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2"><Star className="h-4 w-4 text-warning" /><span className="text-sm font-medium">Featured Products</span></div>
          <p className="text-2xl font-bold">{stats?.featuredCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">marked as featured</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Total Messages</span></div>
          <p className="text-2xl font-bold">{stats?.messageCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">{stats?.unreadCount ?? 0} unread</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Products</h3>
            <Link href="/admin/products" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No products yet.</p>
            ) : recentProducts.map((p) => (
              <div key={p._id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0"><Package className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category?.name ?? "Uncategorized"} · {formatDate(p.createdAt)}</p>
                </div>
                <Badge variant={p.status === "PUBLISHED" ? "secondary" : "outline"} className="text-xs">{p.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Messages</h3>
            <Link href="/admin/messages" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No messages yet.</p>
            ) : recentMessages.map((m) => (
              <div key={m._id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">{m.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.subject ?? m.message.slice(0, 40)}</p>
                </div>
                {!m.is_read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
