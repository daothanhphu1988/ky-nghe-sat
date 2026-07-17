"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, Wrench, Newspaper, Star, Mail, Bell } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

const CARDS = [
  { key: "projects", label: "Dự án", icon: FolderKanban, href: "/admin/projects" },
  { key: "services", label: "Dịch vụ", icon: Wrench, href: "/admin/services" },
  { key: "news", label: "Tin tức", icon: Newspaper, href: "/admin/news" },
  { key: "reviews", label: "Đánh giá", icon: Star, href: "/admin/reviews" },
  { key: "quoteRequests", label: "Yêu cầu báo giá", icon: Mail, href: "/admin/quote-requests" },
  { key: "newQuoteRequests", label: "Yêu cầu mới", icon: Bell, href: "/admin/quote-requests" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    adminApi.dashboard(session.token).then(setStats).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-heading text-3xl text-primary">Tổng quan</h1>
      <p className="mt-1 text-gray-500">Số liệu tổng hợp toàn hệ thống</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link key={card.key} href={card.href}>
            <Card className="flex items-center gap-4 p-6 transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <card.icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats[card.key] ?? "—"}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
