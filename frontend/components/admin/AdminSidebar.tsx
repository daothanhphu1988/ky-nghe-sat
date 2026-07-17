"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderKanban,
  Newspaper,
  Star,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Dự án", icon: FolderKanban },
  { href: "/admin/services", label: "Dịch vụ", icon: Wrench },
  { href: "/admin/news", label: "Tin tức", icon: Newspaper },
  { href: "/admin/reviews", label: "Đánh giá", icon: Star },
  { href: "/admin/banners", label: "Banner", icon: ImageIcon },
  { href: "/admin/quote-requests", label: "Yêu cầu báo giá", icon: Mail },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
];

export function AdminSidebar({ username, onLogout }: { username?: string; onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-primary text-white">
      <div className="p-6">
        <Logo variant="light" size="sm" />
        <p className="mt-1 text-xs text-white/50">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {LINKS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-accent text-primary" : "text-white/80 hover:bg-white/10",
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="px-3 text-xs text-white/50">Đăng nhập: {username}</p>
        <button
          onClick={onLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
