import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SERVICE_CATEGORY_LABELS, type Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/du-an/${project.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.coverImageUrl ?? "https://images.pexels.com/photos/33388021/pexels-photo-33388021.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {SERVICE_CATEGORY_LABELS[project.category]}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg text-primary line-clamp-1">{project.title}</h3>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {project.location}
            </span>
          )}
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </Link>
  );
}
