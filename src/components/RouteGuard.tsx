"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

const RouteGuard = ({ children, allowedRoles }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/auth/sign-in");
      return;
    }

    try {
      const decoded: { role: string } = jwtDecode(token);
      if (allowedRoles && !allowedRoles.includes(decoded.role.toLowerCase())) {
        router.push("/auth/sign-in");
        return;
      }

      setIsAuthorized(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid token";
      toast.error(`Authentication failed: ${errorMessage}`);
      localStorage.removeItem("access_token");
      router.push("/auth/sign-in");
    }
  }, [allowedRoles, router]);

  return isAuthorized ? <>{children}</> : null;
};

export default RouteGuard;