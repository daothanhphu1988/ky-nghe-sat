"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getSession, type AdminSession } from "./auth";

export function useAdminAuth(skipRedirect = false) {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null | undefined>(undefined);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      if (!skipRedirect) router.replace("/admin/login");
    } else {
      setSession(s);
    }
  }, [router, skipRedirect]);

  const logout = () => {
    clearSession();
    router.replace("/admin/login");
  };

  return { session, logout, isLoading: session === undefined };
}
