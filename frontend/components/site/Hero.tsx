import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import type { Banner } from "@/lib/types";
import { HeroMotion } from "./HeroMotion";

export function Hero({ banner }: { banner: Banner | null }) {
  const imageUrl = banner?.mediaUrl ?? "https://images.pexels.com/photos/37550788/pexels-photo-37550788.jpeg?auto=compress&cs=tinysrgb&w=1920";
  const title = banner?.title ?? "Thi công Cửa Sắt - Cầu Thang - Lan Can - Cổng Sắt";
  const subtitle = banner?.subtitle ?? "Thiết kế theo yêu cầu, bền đẹp theo thời gian";

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />

      <HeroMotion title={title} subtitle={subtitle}>
        <ButtonLink href="/bao-gia" size="lg">
          Nhận báo giá
        </ButtonLink>
        <ButtonLink href="/du-an" variant="outline" size="lg">
          Xem công trình
        </ButtonLink>
      </HeroMotion>
    </section>
  );
}
