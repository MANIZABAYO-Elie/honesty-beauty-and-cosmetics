"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Flower2, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace("/admin/dashboard");
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      toast.error("Invalid email or password.");
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    await refreshUser();
    router.push("/admin/dashboard");
  };

  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 relative">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Flower2 className="h-6 w-6" />
          </div>
          <div className="text-center leading-tight">
            <p className="font-bold text-sm">Honest Beauty</p>
            <p className="text-[#EC4899] font-semibold text-xs">and Cosmetics Ltd</p>
          </div>
        </Link>
        <Card className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center mb-1">Admin Login</h1>
            <p className="text-sm text-muted-foreground text-center">Sign in to access the admin dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="admin@nexuslabs.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold text-foreground">Demo credentials:</span><br />
              admin@honestbeauty.com / Admin12345!
            </p>
          </div>
        </Card>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">← Back to home</Link>
        </p>
      </motion.div>
    </div>
  );
}
