"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/data/projects";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24" style={{ background: "var(--section-alt)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="مشاريعنا المميزة"
          subtitle="نقدم مشاريع عقارية استثنائية تجمع بين الفخامة والابتكار في أرقى المواقع بالمملكة"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-block rounded-full border-2 border-gold px-8 py-3 text-sm font-bold text-gold transition-all hover:bg-gold hover:text-navy"
          >
            عرض جميع المشاريع
          </Link>
        </div>
      </div>
    </section>
  );
}
