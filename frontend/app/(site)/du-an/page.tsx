import type { Metadata } from "next";
import { getProjects } from "@/lib/api";
import type { ServiceCategory } from "@/lib/types";
import { PageBanner } from "@/components/site/PageBanner";
import { ProjectFilterTabs } from "@/components/site/ProjectFilterTabs";
import { ProjectCard } from "@/components/site/ProjectCard";

export const metadata: Metadata = {
  title: "Dự án",
  description: "Các công trình cửa sắt, cầu thang, lan can, cổng sắt, mái che, hàng rào đã thi công.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cat = category as ServiceCategory | undefined;

  const projects = await getProjects({ category: cat, size: 24 }).catch(() => ({ content: [] }));

  return (
    <>
      <PageBanner eyebrow="Công trình" title="Dự án đã thi công" description="Hơn 500 công trình đã hoàn thành trên khắp cả nước." />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProjectFilterTabs active={cat} />

        {projects.content.length === 0 ? (
          <p className="mt-16 text-center text-gray-500">Chưa có dự án nào trong danh mục này.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.content.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
