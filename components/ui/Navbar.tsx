"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";
import { BsSun, BsMoon } from "react-icons/bs";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/projects", label: "المشاريع" },
  { href: "/achievements", label: "الإنجازات" },
  { href: "/about", label: "عن الشركة" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-navy font-bold text-xl">
              د
            </div>
            <span className="text-lg font-bold text-white">الديار</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-white/80 hover:text-gold"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 right-0 left-0 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
            <button
              onClick={toggle}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-gold"
              aria-label="تبديل الوضع"
            >
              {theme === "dark" ? <BsSun size={18} /> : <BsMoon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white md:hidden"
            aria-label="القائمة"
          >
            {mobileOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-navy/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-gold/10 text-gold"
                      : "text-white/80 hover:bg-white/5 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggle}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-gold"
              >
                {theme === "dark" ? <BsSun size={16} /> : <BsMoon size={16} />}
                {theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
