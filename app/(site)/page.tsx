import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import { getProjects, getTestimonials, getStats } from "@/lib/get-data";

export const dynamic = "force-dynamic";

export default function Home() {
  const projects = getProjects().filter((p) => p.featured);
  const testimonials = getTestimonials();
  const stats = getStats();

  return (
    <>
      <Hero />
      <StatsSection stats={stats} />
      <FeaturedProjects projects={projects} />
      <Testimonials testimonials={testimonials} />
      <CTASection />
    </>
  );
}
