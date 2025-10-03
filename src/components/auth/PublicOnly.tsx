"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type Props = {
  children: React.ReactNode;
  redirectAuthedTo?: (role?: string) => string;
};

type TokenPayload = { role?: string; exp?: number };

export default function PublicOnly({
  children,
  redirectAuthedTo = (role) => `/${(role ?? "user").toLowerCase()}/dashboard`,
}: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!token) {
      setReady(true);
      return;
    }

    try {
      const { role, exp } = jwtDecode<TokenPayload>(token);
      // if token expired, treat as guest
      if (exp && Date.now() >= exp * 1000) {
        localStorage.removeItem("access_token");
        setReady(true);
        return;
      }
      // logged-in → bounce forward (replace to avoid leaving /auth/sign-in in history)
      router.replace(redirectAuthedTo(role));
    } catch {
      // bad token → treat as guest
      setReady(true);
    }
  }, [router, redirectAuthedTo]);

  if (!ready) return null; // or a small spinner
  return <>{children}</>;
}
