"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

type GuardMode = "private" | "public";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[]; // for private pages
  mode?: GuardMode; // "private" (default) | "public"
  // where to send logged-in users from public pages (e.g., sign-in)
  redirectAuthedTo?: string | ((role?: string) => string);
  fallback?: React.ReactNode; // optional loading/skeleton
}

const RouteGuard = ({
  children,
  allowedRoles,
  mode = "private",
  redirectAuthedTo = (role?: string) =>
    `/${(role ?? "user").toLowerCase()}/dashboard`,
  fallback = null,
}: Props) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }, []);

  useEffect(() => {
    // Helper to resolve redirect target
    const resolve = (
      target: string | ((role?: string) => string),
      role?: string
    ) => (typeof target === "function" ? target(role) : target);

    try {
      if (mode === "public") {
        // public page (e.g., /auth/sign-in): if authed, bounce forward
        if (token) {
          const { role } = jwtDecode<{ role?: string }>(token);
          router.replace(resolve(redirectAuthedTo, role));
          return;
        }
        setOk(true); // not authed → can view public page
        return;
      }

      // private mode (protected pages)
      if (!token) {
        router.replace("/auth/sign-in");
        return;
      }

      const { role } = jwtDecode<{ role?: string }>(token);
      if (
        allowedRoles &&
        role &&
        !allowedRoles.map((r) => r.toLowerCase()).includes(role.toLowerCase())
      ) {
        router.replace("/auth/sign-in");
        return;
      }

      setOk(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Invalid token";
      toast.error(`Authentication failed: ${msg}`);
      localStorage.removeItem("access_token");
      router.replace("/auth/sign-in");
    }
  }, [mode, allowedRoles, redirectAuthedTo, router, token]);

  return ok ? <>{children}</> : <>{fallback}</>;
};

export default RouteGuard;
