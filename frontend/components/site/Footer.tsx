import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SERVICE_CATEGORY_LABELS, type SiteSettings } from "@/lib/types";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

const SERVICE_LINKS: Array<{ slug: string; category: keyof typeof SERVICE_CATEGORY_LABELS }> = [
  { slug: "cua-sat", category: "CUA_SAT" },
  { slug: "cau-thang-sat", category: "CAU_THANG" },
  { slug: "lan-can-sat", category: "LAN_CAN" },
  { slug: "cong-sat", category: "CONG_SAT" },
  { slug: "mai-che", category: "MAI_CHE" },
  { slug: "hang-rao-sat", category: "HANG_RAO" },
];

export function Footer({ settings = {} }: { settings?: SiteSettings }) {
  const {
    hotline = "0984 999 087",
    email = "lienhe@kynghesat.vn",
    address = "Số 1178 Thọ Tân, Xuân Thọ, Xuân Lộc, TP. Đồng Nai",
    facebook_url = "https://www.facebook.com/phu.thanh.5817",
  } = settings;

  return (
    <footer className="bg-primary text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed">
            Xưởng sản xuất trực tiếp, chuyên thi công cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào
            theo yêu cầu. Bền đẹp theo thời gian.
          </p>
          <a
            href={facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm hover:text-accent"
          >
            <FacebookIcon /> Facebook
          </a>
        </div>

        <div>
          <h3 className="font-heading text-lg tracking-wide text-white">Dịch vụ</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICE_LINKS.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-accent">
                  {SERVICE_CATEGORY_LABELS[s.category]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg tracking-wide text-white">Liên kết</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/gioi-thieu" className="hover:text-accent">Giới thiệu</Link></li>
            <li><Link href="/du-an" className="hover:text-accent">Dự án</Link></li>
            <li><Link href="/gallery" className="hover:text-accent">Gallery</Link></li>
            <li><Link href="/tin-tuc" className="hover:text-accent">Tin tức</Link></li>
            <li><Link href="/lien-he" className="hover:text-accent">Liên hệ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg tracking-wide text-white">Liên hệ</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              {address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-accent" />
              {hotline}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-accent" />
              {email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Kỹ Nghệ Sắt. All rights reserved.
      </div>
    </footer>
  );
}
