"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/data/team";
import {
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
} from "react-icons/hi";

const values = [
  { icon: HiOutlineShieldCheck, title: "الجودة", desc: "نلتزم بأعلى معايير الجودة في كل تفاصيل مشاريعنا" },
  { icon: HiOutlineLightBulb, title: "الابتكار", desc: "نتبنى أحدث التقنيات والأساليب المعمارية العالمية" },
  { icon: HiOutlineUserGroup, title: "الشراكة", desc: "نؤمن بأن نجاحنا مرتبط بنجاح عملائنا وشركائنا" },
  { icon: HiOutlineSparkles, title: "التميز", desc: "نسعى دائماً لتجاوز التوقعات وتقديم الأفضل" },
  { icon: HiOutlineGlobeAlt, title: "الاستدامة", desc: "نطور مشاريع صديقة للبيئة تحقق التنمية المستدامة" },
  { icon: HiOutlineHeart, title: "المسؤولية", desc: "نساهم في بناء مجتمعات حيوية ومزدهرة" },
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Company Story */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-gold">قصتنا</span>
            <h1 className="mt-2 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
              نبني المستقبل منذ عام ٢٠١٠
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
              تأسست الديار للتطوير العقاري عام 2010 برؤية طموحة لإعادة تعريف مفهوم التطوير العقاري في المملكة العربية السعودية. بدأنا بمشروع سكني واحد في الرياض، واليوم نفخر بمحفظة مشاريع متنوعة تمتد عبر أرجاء المملكة.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              نؤمن بأن كل مبنى نشيّده هو أكثر من مجرد هيكل خرساني — إنه مساحة تُلهم الحياة وتصنع الذكريات وتبني المجتمعات. هذا الإيمان هو ما يدفعنا للتميز في كل مشروع نقوم به.
            </p>
          </motion.div>

          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
              alt="مقر الديار"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-block rounded-lg bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              رؤيتنا
            </div>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              أن نكون الشركة الرائدة في التطوير العقاري بالمملكة العربية السعودية، ونساهم في تحقيق رؤية 2030 من خلال مشاريع مبتكرة ومستدامة ترتقي بجودة الحياة.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 inline-block rounded-lg bg-gold/10 px-4 py-2 text-sm font-bold text-gold">
              رسالتنا
            </div>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              تطوير مشاريع عقارية استثنائية تجمع بين الفخامة والاستدامة، مع الالتزام بأعلى معايير الجودة وخدمة العملاء لبناء مجتمعات حيوية ومزدهرة.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <SectionHeading title="قيمنا" subtitle="المبادئ التي تقود مسيرتنا نحو التميز" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 text-center transition-all hover:border-gold/30 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <v.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">{v.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24">
          <SectionHeading title="فريق القيادة" subtitle="كفاءات وطنية تقود مسيرة التميز" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-4 right-4 left-4">
                      <p className="text-xs text-white/80">{member.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-[var(--foreground)]">{member.name}</h3>
                  <p className="text-sm text-gold">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
