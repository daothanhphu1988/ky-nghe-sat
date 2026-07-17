import { getBanners, getProjects, getReviews, getServices } from "@/lib/api";
import { Hero } from "@/components/site/Hero";
import { StatsCounter } from "@/components/site/StatsCounter";
import { ServiceGrid } from "@/components/site/ServiceGrid";
import { ProjectMasonry } from "@/components/site/ProjectMasonry";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ReviewCarousel } from "@/components/site/ReviewCarousel";
import { CTASection } from "@/components/site/CTASection";

export default async function HomePage() {
  const [banners, services, featuredProjects, reviews] = await Promise.all([
    getBanners("HERO").catch(() => []),
    getServices().catch(() => []),
    getProjects({ featured: true, size: 6 }).catch(() => ({ content: [] })),
    getReviews().catch(() => []),
  ]);

  return (
    <>
      <Hero banner={banners[0] ?? null} />
      <StatsCounter />
      <ServiceGrid services={services} />
      <ProjectMasonry projects={featuredProjects.content} />
      <WhyChooseUs />
      <ProcessTimeline />
      <ReviewCarousel reviews={reviews} />
      <CTASection />
    </>
  );
}
