"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaWhatsapp, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const inquiryTypes = [
  "استفسار عام",
  "شراء عقار",
  "استثمار",
  "شراكة تجارية",
  "توظيف",
  "أخرى",
];

const contactInfo = [
  { icon: HiOutlinePhone, label: "الهاتف", value: "+966 11 234 5678", dir: "ltr" as const },
  { icon: HiOutlineMail, label: "البريد", value: "info@aldiyar.sa", dir: undefined },
  { icon: HiOutlineLocationMarker, label: "العنوان", value: "الرياض، حي العليا، طريق الملك فهد", dir: undefined },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="تواصل معنا"
          subtitle="نسعد بتواصلكم ونرحب باستفساراتكم في أي وقت"
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="mt-2 text-[var(--muted)]">
                  سنتواصل معك في أقرب وقت ممكن
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", type: "", message: "" });
                  }}
                  className="mt-6 rounded-full bg-gold px-6 py-2 text-sm font-bold text-navy"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-gold"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                      رقم الجوال
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-gold"
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    نوع الاستفسار
                  </label>
                  <select
                    required
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-gold"
                  >
                    <option value="">اختر نوع الاستفسار</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    الرسالة
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-gold"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gold py-3 text-sm font-bold text-navy transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25 sm:w-auto sm:px-12"
                >
                  إرسال الرسالة
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <c.icon size={22} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">{c.label}</p>
                  <p className="font-bold text-[var(--foreground)]" dir={c.dir}>
                    {c.value}
                  </p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/966112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] p-4 text-sm font-bold text-white transition-all hover:bg-[#20bd5a]"
            >
              <FaWhatsapp size={22} />
              تواصل عبر واتساب
            </a>

            <div>
              <p className="mb-3 text-sm font-medium text-[var(--foreground)]">
                تابعنا
              </p>
              <div className="flex gap-3">
                {[FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--muted)] transition-all hover:border-gold hover:text-gold"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          className="mt-16 overflow-hidden rounded-2xl border border-[var(--card-border)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://maps.google.com/maps?q=24.7136,46.6753&z=14&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع مكتب الديار"
          />
        </motion.div>
      </div>
    </section>
  );
}
