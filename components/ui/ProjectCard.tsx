"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineLocationMarker } from "react-icons/hi";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <div className="overflow-hidden rounded-2xl bg-[var(--card-bg)] shadow-md transition-all duration-300 hover:shadow-xl border border-[var(--card-border)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <span
              className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${
                project.status === "مكتمل"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-amber-500/90 text-white"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-gold transition-colors">
              {project.name}
            </h3>
            <div className="mt-2 flex items-center gap-1 text-sm text-[var(--muted)]">
              <HiOutlineLocationMarker className="shrink-0" />
              <span>{project.location}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{project.category}</span>
              <span>{project.area}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
