import type { MetadataRoute } from "next";
import { getNews, getProjects, getServices } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kynghesat.vn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/dich-vu",
    "/du-an",
    "/gallery",
    "/tin-tuc",
    "/lien-he",
    "/bao-gia",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [services, projects, news] = await Promise.all([
    getServices().catch(() => []),
    getProjects({ size: 100 }).catch(() => ({ content: [] })),
    getNews({ size: 100 }).catch(() => ({ content: [] })),
  ]);

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.content.map((p) => ({
    url: `${SITE_URL}/du-an/${p.slug}`,
    lastModified: new Date(p.createdAt),
  }));

  const newsRoutes = news.content.map((n) => ({
    url: `${SITE_URL}/tin-tuc/${n.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...newsRoutes];
}
