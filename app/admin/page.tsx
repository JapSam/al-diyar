"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineStar,
  HiOutlineChatAlt2,
} from "react-icons/hi";

interface Stats {
  projects: number;
  team: number;
  testimonials: number;
  milestones: number;
  awards: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/team").then((r) => r.json()),
      fetch("/api/admin/testimonials").then((r) => r.json()),
      fetch("/api/admin/achievements").then((r) => r.json()),
    ]).then(([projects, team, testimonials, achievements]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        team: Array.isArray(team) ? team.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        milestones: achievements?.milestones?.length || 0,
        awards: achievements?.awards?.length || 0,
      });
    });
  }, []);

  const cards = [
    { label: "المشاريع", value: stats?.projects ?? "—", icon: HiOutlineOfficeBuilding, href: "/admin/projects", color: "bg-blue-500/10 text-blue-400" },
    { label: "فريق العمل", value: stats?.team ?? "—", icon: HiOutlineUserGroup, href: "/admin/team", color: "bg-emerald-500/10 text-emerald-400" },
    { label: "شهادات العملاء", value: stats?.testimonials ?? "—", icon: HiOutlineChatAlt2, href: "/admin/testimonials", color: "bg-amber-500/10 text-amber-400" },
    { label: "الإنجازات والجوائز", value: (stats?.milestones ?? 0) + (stats?.awards ?? 0) || "—", icon: HiOutlineStar, href: "/admin/achievements", color: "bg-purple-500/10 text-purple-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">مرحباً بك في لوحة التحكم</h1>
        <p className="mt-1 text-sm text-white/40">إدارة محتوى موقع الديار للتطوير العقاري</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-navy-lighter bg-navy p-6 transition-all hover:border-gold/30"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon size={24} />
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="mt-1 text-sm text-white/50 group-hover:text-gold transition-colors">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-navy-lighter bg-navy p-6">
        <h2 className="mb-4 text-lg font-bold text-white">روابط سريعة</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/admin/projects" className="rounded-xl border border-navy-lighter p-4 text-sm text-white/60 transition-all hover:border-gold/30 hover:text-gold">
            + إضافة مشروع جديد
          </Link>
          <Link href="/admin/team" className="rounded-xl border border-navy-lighter p-4 text-sm text-white/60 transition-all hover:border-gold/30 hover:text-gold">
            + إضافة عضو فريق
          </Link>
          <Link href="/admin/achievements" className="rounded-xl border border-navy-lighter p-4 text-sm text-white/60 transition-all hover:border-gold/30 hover:text-gold">
            + إضافة إنجاز أو جائزة
          </Link>
          <Link href="/admin/testimonials" className="rounded-xl border border-navy-lighter p-4 text-sm text-white/60 transition-all hover:border-gold/30 hover:text-gold">
            + إضافة شهادة عميل
          </Link>
        </div>
      </div>
    </div>
  );
}
