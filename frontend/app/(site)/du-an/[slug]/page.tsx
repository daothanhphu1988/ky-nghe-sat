import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Ruler, User, Wrench } from "lucide-react";
import { ApiError, getProjectBySlug, getProjects } from "@/lib/api";
import { SERVICE_CATEGORY_LABELS } from "@/lib/types";
import { PageBanner } from "@/components/site/PageBanner";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { ImageLightboxGrid } from "@/components/site/ImageLightboxGrid";
import { QuoteForm } from "@/components/site/QuoteForm";

async function loadProject(slug: string) {
  try {
    return await getProjectBySlug(slug);
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
  const project = await loadProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description ?? undefined,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects({ size: 100 }).catch(() => ({ content: [] }));
  return projects.content.map((p) => ({ slug: p.slug }));
}

const INFO_ITEMS = (project: NonNullable<Awaited<ReturnType<typeof loadProject>>>) => [
  { icon: Ruler, label: "Diện tích", value: project.area },
  { icon: Wrench, label: "Vật liệu", value: project.material },
  { icon: User, label: "Khách hàng", value: project.customerName },
  { icon: Calendar, label: "Thời gian", value: project.durationDays ? `${project.durationDays} ngày` : null },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();

  const hasBeforeAfter = project.beforeImageUrls.length > 0 && project.afterImageUrls.length > 0;

  return (
    <>
      <PageBanner
        eyebrow={SERVICE_CATEGORY_LABELS[project.category]}
        title={project.title}
        description={project.location ?? undefined}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={project.coverImageUrl ?? "https://images.pexels.com/photos/37550788/pexels-photo-37550788.jpeg?auto=compress&cs=tinysrgb&w=1600"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {project.description && (
          <p className="mt-8 text-lg leading-relaxed text-gray-700">{project.description}</p>
        )}

        <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl bg-bg p-6 sm:grid-cols-4">
          {INFO_ITEMS(project)
            .filter((item) => item.value)
            .map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="mx-auto text-accent" size={22} />
                <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">{item.label}</p>
                <p className="mt-1 font-semibold text-text">{item.value}</p>
              </div>
            ))}
        </div>

        {project.videoUrl && (
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl">
            <video src={project.videoUrl} controls className="h-full w-full object-cover" />
          </div>
        )}

        {hasBeforeAfter && (
          <div className="mt-10">
            <h2 className="mb-4 text-center font-heading text-2xl text-primary">Trước &amp; Sau</h2>
            <BeforeAfterSlider before={project.beforeImageUrls[0]} after={project.afterImageUrls[0]} />
          </div>
        )}

        {project.galleryImageUrls.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-center font-heading text-2xl text-primary">Hình ảnh công trình</h2>
            <ImageLightboxGrid images={project.galleryImageUrls} />
          </div>
        )}

        {project.panorama360Url && (
          <div className="mt-10 text-center">
            <a
              href={project.panorama360Url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Xem ảnh 360°
            </a>
          </div>
        )}

        <div className="mt-16 flex items-center gap-2">
          <MapPin className="text-accent" size={18} />
          <span className="text-sm text-gray-600">{project.location}</span>
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <QuoteForm
            defaultCategory={project.category}
            title="Bạn muốn thi công công trình tương tự?"
          />
        </div>
      </section>
    </>
  );
}
