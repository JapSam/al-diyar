"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/data/testimonials";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", loop: true });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="ماذا يقول عملاؤنا"
          subtitle="آراء عملائنا هي أثمن ما نملك"
        />

        <div className="relative">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {testimonials.map((t, i) => (
                <div key={i} className="embla__slide px-4">
                  <motion.div
                    className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4 flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <FaStar
                          key={si}
                          className={si < t.rating ? "text-gold" : "text-gray-300"}
                          size={18}
                        />
                      ))}
                    </div>
                    <p className="text-base leading-relaxed text-[var(--foreground)]">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="font-bold text-[var(--foreground)]">{t.name}</p>
                      <p className="text-sm text-[var(--muted)]">{t.role}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform hover:scale-110 max-sm:hidden"
            aria-label="السابق"
          >
            <HiChevronRight size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-transform hover:scale-110 max-sm:hidden"
            aria-label="التالي"
          >
            <HiChevronLeft size={20} />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === selected ? "w-8 bg-gold" : "w-2 bg-gold/30"
              }`}
              aria-label={`شهادة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
