import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/api";
import { ApiError } from "@/lib/api";
import { PageBanner } from "@/components/site/PageBanner";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { MaterialsTable } from "@/components/site/MaterialsTable";
import { ImageLightboxGrid } from "@/components/site/ImageLightboxGrid";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { QuoteForm } from "@/components/site/QuoteForm";

async function loadService(slug: string) {
  try {
    return await getServiceBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await loadService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription ?? undefined,
  };
}

export async function generateStaticParams() {
  const services = await getServices().catch(() => []);
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await loadService(slug);
  if (!service) notFound();

  return (
    <>
      <PageBanner eyebrow="Dịch vụ" title={service.name} description={service.shortDescription ?? undefined} />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={service.heroImageUrl ?? "https://images.pexels.com/photos/23224209/pexels-photo-23224209.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            alt={service.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-gray-700">{service.content}</p>
      </section>

      {service.advantages.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Ưu điểm</h2>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-bg p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
                  <span className="text-text">{adv}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ProcessTimeline />

      {service.materialsTable.length > 0 && (
        <section className="bg-bg py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Bảng vật liệu</h2>
            <div className="mt-10">
              <MaterialsTable rows={service.materialsTable} />
            </div>
          </div>
        </section>
      )}

      {service.galleryImageUrls.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Mẫu &amp; Hình ảnh thực tế</h2>
            <div className="mt-10">
              <ImageLightboxGrid images={service.galleryImageUrls} />
            </div>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="bg-bg py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Câu hỏi thường gặp</h2>
            <div className="mt-10">
              <FaqAccordion faqs={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <QuoteForm defaultCategory={service.category} title={`Nhận báo giá ${service.name}`} />
        </div>
      </section>
    </>
  );
}
