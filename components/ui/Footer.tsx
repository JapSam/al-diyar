"use client";

import Link from "next/link";
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaSnapchat } from "react-icons/fa6";

const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "تويتر" },
  { icon: FaInstagram, href: "#", label: "انستغرام" },
  { icon: FaLinkedinIn, href: "#", label: "لينكدإن" },
  { icon: FaSnapchat, href: "#", label: "سناب شات" },
];

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/projects", label: "المشاريع" },
  { href: "/achievements", label: "الإنجازات" },
  { href: "/about", label: "عن الشركة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-navy font-bold text-xl">
                د
              </div>
              <span className="text-lg font-bold">الديار للتطوير العقاري</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              نبني المستقبل، نصنع الأثر. شركة رائدة في التطوير العقاري بالمملكة العربية السعودية منذ عام 2010.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-gold">روابط سريعة</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-gold">تواصل معنا</h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>الرياض، حي العليا، طريق الملك فهد</p>
              <p dir="ltr" className="text-left">+966 11 234 5678</p>
              <p>info@aldiyar.sa</p>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-gold hover:text-navy"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} الديار للتطوير العقاري. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
