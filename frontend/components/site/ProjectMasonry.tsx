import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Project } from "@/lib/types";
import { SERVICE_CATEGORY_LABELS } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";

export function ProjectMasonry({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Công trình</span>
          <h2 className="mt-2 font-heading text-4xl text-primary sm:text-5xl">Dự án nổi bật</h2>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/du-an/${project.slug}`}
              className={`group relative block overflow-hidden rounded-2xl break-inside-avoid ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={project.coverImageUrl ?? "https://images.pexels.com/photos/33388021/pexels-photo-33388021.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {SERVICE_CATEGORY_LABELS[project.category]}
                </span>
                <h3 className="mt-1 font-heading text-xl text-white">{project.title}</h3>
                {project.location && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                    <MapPin size={12} /> {project.location}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <ButtonLink href="/du-an" variant="outline" className="!border-primary !text-primary">
            Xem tất cả dự án
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
