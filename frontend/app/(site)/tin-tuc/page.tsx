import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { PageBanner } from "@/components/site/PageBanner";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Cập nhật tin tức, mẫu thiết kế và kinh nghiệm thi công cửa sắt, cầu thang, lan can.",
};

export default async function NewsPage() {
  const { content: articles } = await getNews({ size: 20 }).catch(() => ({ content: [] }));

  return (
    <>
      <PageBanner eyebrow="Tin tức" title="Tin tức & Kiến thức" description="Cập nhật xu hướng thiết kế và kinh nghiệm thi công." />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/tin-tuc/${article.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.coverImageUrl ?? "https://images.pexels.com/photos/8125961/pexels-photo-8125961.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  {article.publishedAt && (
                    <span className="text-xs uppercase tracking-wide text-accent">
                      {formatDate(article.publishedAt)}
                    </span>
                  )}
                  <h3 className="mt-2 font-heading text-xl text-primary line-clamp-2">{article.title}</h3>
                  {article.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{article.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
