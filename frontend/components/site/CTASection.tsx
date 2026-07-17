import { ButtonLink } from "@/components/ui/Button";

export function CTASection({
  title = "Bạn cần thi công cửa sắt?",
  subtitle = "Liên hệ ngay để được khảo sát miễn phí",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.15),transparent_50%)]" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-4xl text-white sm:text-5xl">{title}</h2>
        <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        <div className="mt-8">
          <ButtonLink href="/bao-gia" size="lg">
            Nhận báo giá
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
