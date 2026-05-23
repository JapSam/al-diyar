"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { HiOutlineTrophy } from "react-icons/hi2";
import type { Milestone, Award, Stat } from "@/data/achievements";

export default function AchievementsContent({ milestones, awards, stats }: { milestones: Milestone[]; awards: Award[]; stats: Stat[] }) {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="إنجازاتنا"
          subtitle="مسيرة حافلة بالإنجازات والتميز في عالم التطوير العقاري"
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute right-1/2 top-0 bottom-0 w-px translate-x-1/2 bg-gold/20" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              className={`relative mb-12 flex items-start gap-8 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
                  <span className="text-sm font-bold text-gold">{m.year}</span>
                  <h3 className="mt-2 text-lg font-bold text-[var(--foreground)]">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {m.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy font-bold text-sm">
                {m.year.slice(2)}
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 rounded-3xl bg-navy p-12">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">
            بالأرقام
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mt-20">
          <SectionHeading
            title="الجوائز والشهادات"
            subtitle="تقدير محلي وإقليمي لالتزامنا بالتميز والجودة"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, i) => (
              <motion.div
                key={award.name}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <HiOutlineTrophy size={28} />
                </div>
                <h3 className="font-bold text-[var(--foreground)]">{award.name}</h3>
                <p className="mt-1 text-sm text-gold">{award.year}</p>
                <p className="mt-2 text-xs text-[var(--muted)]">{award.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
