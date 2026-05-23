"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, categories } from "@/data/projects";

export default function ProjectsPage() {
  const [active, setActive] = useState<string>("الكل");

  const filtered =
    active === "الكل"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="مشاريعنا"
          subtitle="اكتشف مجموعتنا المتنوعة من المشاريع العقارية الفاخرة في مختلف أنحاء المملكة"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-gold text-navy"
                  : "bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--card-border)] hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-[var(--muted)]">
            لا توجد مشاريع في هذا التصنيف حالياً
          </p>
        )}
      </div>
    </section>
  );
}
