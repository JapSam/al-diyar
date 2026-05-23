"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-gold/5 to-transparent" />

      <motion.div
        className="relative mx-auto max-w-3xl px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          جاهز لتملّك <span className="text-gold">منزل أحلامك</span>؟
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
          فريقنا مستعد لمساعدتك في إيجاد العقار المثالي الذي يناسب احتياجاتك وتطلعاتك.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/966112345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#20bd5a] hover:shadow-lg"
          >
            <FaWhatsapp size={20} />
            تواصل عبر واتساب
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition-all hover:border-gold hover:text-gold"
          >
            نموذج التواصل
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
