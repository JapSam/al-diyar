import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedProjects />
      <Testimonials />
      <CTASection />
    </>
  );
}
