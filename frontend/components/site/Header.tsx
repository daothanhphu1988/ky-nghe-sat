"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/gallery", label: "Gallery" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header({ hotline = "0984 999 087" }: { hotline?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-primary/95 shadow-lg backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-white/90 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm font-semibold text-white">
            <Phone size={16} className="text-accent" />
            {hotline}
          </a>
          <ButtonLink href="/bao-gia" size="sm">
            Nhận báo giá
          </ButtonLink>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-primary px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-wide text-white/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/bao-gia" size="sm" className="mt-3 w-full">
              Nhận báo giá
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
