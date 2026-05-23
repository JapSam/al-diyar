"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { Stat } from "@/data/achievements";

export default function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
