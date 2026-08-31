"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Package, FolderTree, Mail, Settings, User,
  LogOut, Loader2, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
// import { PoweredByGorillaNexa } from "@/components/brand/PoweredByGorillaNexa";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/profile", label: "Profile", icon: User },
];

function AdminBrand({ compact }: { compact?: boolean }) {
  return (
      <Link href="/admin/dashboard" className="flex items-center gap-2.5 min-w-0">
      <Image
        src="/uploads/company-logo.jpg"
        alt="Honest Beauty and Cosmetics Ltd"
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className="rounded-full object-cover shrink-0"
      />
      {!compact && (
        <span className="min-w-0 leading-tight">
          <span className="block text-sm font-bold truncate">Honest Beauty</span>
          <span className="block text-[10px] font-semibold text-[#EC4899]">Admin</span>
        </span>
      )}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-background sticky top-0 z-50">
        <AdminBrand compact />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-background border-r border-border flex flex-col transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="hidden lg:flex items-center h-16 px-5 border-b border-border">
          <AdminBrand />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          {/* <PoweredByGorillaNexa className="px-1 text-center sm:text-left" /> */}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <div className="hidden lg:flex items-center justify-end h-16 px-8 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
          <ThemeToggle />
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        {/* <footer className="lg:hidden border-t border-border px-4 py-4 bg-background">
          <PoweredByGorillaNexa className="text-center" />
        </footer> */}
      </div>
    </div>
  );
}
