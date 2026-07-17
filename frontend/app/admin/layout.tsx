"use client";

import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { session, logout, isLoading } = useAdminAuth(isLoginPage);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading || !session) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-bg">
      <AdminSidebar username={session.username} onLogout={logout} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
