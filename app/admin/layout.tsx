"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineStar,
  HiOutlineChatAlt2,
  HiOutlineLogout,
  HiOutlineExternalLink,
} from "react-icons/hi";

const navItems = [
  { href: "/admin", label: "الرئيسية", icon: HiOutlineHome },
  { href: "/admin/projects", label: "المشاريع", icon: HiOutlineOfficeBuilding },
  { href: "/admin/team", label: "الفريق", icon: HiOutlineUserGroup },
  { href: "/admin/achievements", label: "الإنجازات", icon: HiOutlineStar },
  { href: "/admin/testimonials", label: "الشهادات", icon: HiOutlineChatAlt2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthed(false);
      return;
    }
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/admin/login");
        else setAuthed(true);
      });
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-gold">جاري التحميل...</div>
      </div>
    );
  }

  if (!authed) return null;

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#080f1e]" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 bottom-0 z-30 flex w-64 flex-col border-l border-navy-lighter bg-navy">
        <div className="flex items-center gap-3 border-b border-navy-lighter px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-navy font-bold">
            د
          </div>
          <div>
            <p className="text-sm font-bold text-white">لوحة التحكم</p>
            <p className="text-xs text-white/40">الديار للتطوير العقاري</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                pathname === item.href
                  ? "bg-gold/10 text-gold"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-navy-lighter px-3 py-4 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/40 transition-all hover:bg-white/5 hover:text-white"
          >
            <HiOutlineExternalLink size={18} />
            عرض الموقع
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-red-400/70 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <HiOutlineLogout size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="mr-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
