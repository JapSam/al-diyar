"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCube,
  HiOutlineStatusOnline,
  HiArrowRight,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import type { Project } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectDetail({ project, allProjects }: { project: Project | undefined; allProjects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            المشروع غير موجود
          </h1>
          <Link
            href="/projects"
            className="mt-4 inline-block text-gold hover:underline"
          >
            العودة للمشاريع
          </Link>
        </div>
      </div>
    );
  }

  const related = allProjects.filter(
    (p) => p.category === project.category && p.id !== project.id
  ).slice(0, 3);

  const info = [
    { icon: HiOutlineLocationMarker, label: "الموقع", value: project.location },
    { icon: HiOutlineCube, label: "المساحة", value: project.area },
    { icon: HiOutlineCalendar, label: "سنة التسليم", value: project.year },
    { icon: HiOutlineStatusOnline, label: "الحالة", value: project.status },
  ];

  return (
    <section className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-gold"
        >
          <HiArrowRight />
          العودة للمشاريع
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Gallery */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {project.images.map((img, i) => (
                  <div key={i} className="embla__slide">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={img}
                        alt={`${project.name} - ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur-sm transition hover:bg-navy/80"
              aria-label="السابق"
            >
              <HiChevronRight size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-navy/60 text-white backdrop-blur-sm transition hover:bg-navy/80"
              aria-label="التالي"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === selectedIndex ? "w-8 bg-gold" : "w-2 bg-white/50"
                  }`}
                  aria-label={`صورة ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "مكتمل"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-sm text-[var(--muted)]">{project.category}</span>
              </div>
              <h1 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {project.name}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">{item.label}</p>
                    <p className="font-bold text-[var(--foreground)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">الموقع على الخريطة</h2>
            <div className="overflow-hidden rounded-2xl border border-[var(--card-border)]">
              <iframe
                src={`https://maps.google.com/maps?q=${project.coordinates.lat},${project.coordinates.lng}&z=14&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`موقع ${project.name}`}
              />
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 text-2xl font-bold text-[var(--foreground)]">
                مشاريع مشابهة
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
