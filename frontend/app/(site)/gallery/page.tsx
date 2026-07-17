import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import { PageBanner } from "@/components/site/PageBanner";
import { GalleryMasonry } from "@/components/site/GalleryMasonry";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Thư viện hình ảnh công trình cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào.",
};

export default async function GalleryPage() {
  const { content: projects } = await getProjects({ size: 50 }).catch(() => ({ content: [] }));

  const images = projects.flatMap((p) => [
    ...(p.coverImageUrl ? [p.coverImageUrl] : []),
    ...p.galleryImageUrls,
  ]);

  const beforeAfterPairs = projects.filter(
    (p) => p.beforeImageUrls.length > 0 && p.afterImageUrls.length > 0,
  );

  const videos = projects.filter((p) => p.videoUrl);

  return (
    <>
      <PageBanner
        eyebrow="Thư viện"
        title="Gallery"
        description="Toàn bộ hình ảnh thực tế các công trình đã thi công."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <GalleryMasonry images={images} />
      </section>

      {beforeAfterPairs.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Trước &amp; Sau</h2>
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              {beforeAfterPairs.map((p) => (
                <div key={p.id}>
                  <BeforeAfterSlider before={p.beforeImageUrls[0]} after={p.afterImageUrls[0]} />
                  <p className="mt-3 text-center text-sm font-medium text-gray-600">{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="bg-bg py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-heading text-3xl text-primary sm:text-4xl">Video công trình</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {videos.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl">
                  <video src={p.videoUrl!} controls className="aspect-video w-full object-cover" />
                  <p className="mt-3 text-center text-sm font-medium text-gray-600">{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
