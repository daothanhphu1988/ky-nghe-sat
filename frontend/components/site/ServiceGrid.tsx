import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ServiceItem } from "@/lib/types";

export function ServiceGrid({
  services,
  showHeading = true,
}: {
  services: ServiceItem[];
  showHeading?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {showHeading && (
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Dịch vụ</span>
          <h2 className="mt-2 font-heading text-4xl text-primary sm:text-5xl">Danh mục dịch vụ</h2>
          <p className="mt-4 text-gray-600">
            Xưởng sản xuất trực tiếp, thi công trọn gói từ thiết kế đến lắp đặt và bảo hành.
          </p>
        </div>
      )}

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/${service.slug}`}
            className="group relative block h-80 overflow-hidden rounded-2xl"
          >
            <Image
              src={service.heroImageUrl ?? "https://images.pexels.com/photos/23224209/pexels-photo-23224209.jpeg?auto=compress&cs=tinysrgb&w=800"}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-heading text-2xl text-white">{service.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/80">{service.shortDescription}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Xem chi tiết <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
