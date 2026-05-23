"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-navy/70" />

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0 bg-navy/75 z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mb-6 inline-block rounded-full border border-gold/30 px-6 py-2 text-sm text-gold"
        >
          أكثر من 15 عاماً من التميز العقاري
        </motion.div>

        <motion.h1
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          نبني{" "}
          <span className="text-gold">المستقبل</span>
          <br />
          نصنع الأثر
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          الديار للتطوير العقاري — نحوّل الرؤى إلى معالم معمارية تُلهم الأجيال وتصنع مستقبلاً أفضل للمجتمع.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <Link
            href="/projects"
            className="rounded-full bg-gold px-8 py-3 text-sm font-bold text-navy transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
          >
            استكشف مشاريعنا
          </Link>
          <a
            href="https://wa.me/966112345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition-all hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
          >
            <FaWhatsapp size={18} />
            تواصل معنا
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
