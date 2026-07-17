import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { CTASection } from "@/components/site/CTASection";
import { PageBanner } from "@/components/site/PageBanner";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: "Thi công cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào theo yêu cầu.",
};

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <>
      <PageBanner
        eyebrow="Dịch vụ"
        title="Danh mục dịch vụ"
        description="Xưởng sản xuất trực tiếp, thi công trọn gói từ thiết kế đến lắp đặt và bảo hành dài hạn."
      />
      <ServiceGrid services={services} showHeading={false} />
      <CTASection />
    </>
  );
}
