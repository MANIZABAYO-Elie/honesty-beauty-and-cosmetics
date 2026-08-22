"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthUser = { email: string; role: string };
type AuthContextType = { user: AuthUser | null; loading: boolean; signOut: () => Promise<void>; refreshUser: () => Promise<void> };

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {}, refreshUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setUser(data ?? null); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const refreshUser = async () => {
    const data = await fetch("/api/auth/me").then((r) => r.ok ? r.json() : null).catch(() => null);
    setUser(data ?? null);
  };

  const signOut = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
