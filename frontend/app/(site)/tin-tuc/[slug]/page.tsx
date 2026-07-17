import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ApiError, getNews, getNewsBySlug } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { PageBanner } from "@/components/site/PageBanner";
import { CTASection } from "@/components/site/CTASection";

async function loadArticle(slug: string) {
  try {
    return await getNewsBySlug(slug);
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
  const article = await loadArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
}

export async function generateStaticParams() {
  const { content } = await getNews({ size: 100 }).catch(() => ({ content: [] }));
  return content.map((a) => ({ slug: a.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageBanner
        eyebrow={article.author ?? "Tin tức"}
        title={article.title}
        description={article.publishedAt ? formatDate(article.publishedAt) : undefined}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={article.coverImageUrl ?? "https://images.pexels.com/photos/8125961/pexels-photo-8125961.jpeg?auto=compress&cs=tinysrgb&w=1200"}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="mt-10 max-w-none whitespace-pre-line text-lg leading-relaxed text-gray-700">
          {article.content}
        </div>
      </article>

      <CTASection />
    </>
  );
}
