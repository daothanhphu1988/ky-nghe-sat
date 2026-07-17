import type { Metadata } from "next";
import { PageBanner } from "@/components/site/PageBanner";
import { QuoteForm } from "@/components/site/QuoteForm";

export const metadata: Metadata = {
  title: "Nhận báo giá",
  description: "Nhận báo giá miễn phí cho công trình cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào.",
};

export default function QuotePage() {
  return (
    <>
      <PageBanner
        eyebrow="Báo giá"
        title="Nhận báo giá miễn phí"
        description="Điền thông tin bên dưới, chúng tôi sẽ liên hệ tư vấn và khảo sát trong 24 giờ."
      />

      <section className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <QuoteForm title="" />
      </section>
    </>
  );
}
