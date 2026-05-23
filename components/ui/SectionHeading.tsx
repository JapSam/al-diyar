"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: Props) {
  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-3xl font-bold md:text-4xl ${
          light ? "text-white" : "text-[var(--foreground)]"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed ${
            light ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
