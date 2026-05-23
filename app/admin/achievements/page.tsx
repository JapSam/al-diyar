"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import type { Milestone, Award } from "@/data/achievements";

export default function AdminAchievements() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [modal, setModal] = useState<"milestone" | "award" | null>(null);
  const [newMilestone, setNewMilestone] = useState<Milestone>({ year: "", title: "", description: "" });
  const [newAward, setNewAward] = useState<Award>({ name: "", year: "", issuer: "" });
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/achievements").then((r) => r.json()).then((d) => {
      setMilestones(d.milestones || []);
      setAwards(d.awards || []);
      setLoading(false);
    });
  };
  useEffect(load, []);

  const addMilestone = async () => {
    await fetch("/api/admin/achievements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "milestone", item: newMilestone }) });
    setModal(null); setNewMilestone({ year: "", title: "", description: "" }); load();
  };

  const addAward = async () => {
    await fetch("/api/admin/achievements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "award", item: newAward }) });
    setModal(null); setNewAward({ name: "", year: "", issuer: "" }); load();
  };

  const remove = async (type: string, index: number) => {
    if (!confirm("هل أنت متأكد؟")) return;
    await fetch("/api/admin/achievements", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, index }) });
    load();
  };

  if (loading) return <div className="text-white/40">جاري التحميل...</div>;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">إدارة الإنجازات والجوائز</h1>

      {/* Milestones */}
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">المحطات التاريخية ({milestones.length})</h2>
          <button onClick={() => setModal("milestone")} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-bold text-navy hover:bg-gold-light">
            <HiOutlinePlus size={16} /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-navy-lighter bg-navy p-4">
              <div className="flex items-center gap-4">
                <span className="rounded-lg bg-gold/10 px-3 py-1 text-sm font-bold text-gold">{m.year}</span>
                <div>
                  <p className="font-medium text-white">{m.title}</p>
                  <p className="text-xs text-white/40">{m.description}</p>
                </div>
              </div>
              <button onClick={() => remove("milestone", i)} className="rounded-lg p-2 text-white/30 hover:bg-red-500/10 hover:text-red-400">
                <HiOutlineTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">الجوائز والشهادات ({awards.length})</h2>
          <button onClick={() => setModal("award")} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-bold text-navy hover:bg-gold-light">
            <HiOutlinePlus size={16} /> إضافة
          </button>
        </div>
        <div className="space-y-3">
          {awards.map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-navy-lighter bg-navy p-4">
              <div>
                <p className="font-medium text-white">{a.name}</p>
                <p className="text-xs text-white/40">{a.issuer} — {a.year}</p>
              </div>
              <button onClick={() => remove("award", i)} className="rounded-lg p-2 text-white/30 hover:bg-red-500/10 hover:text-red-400">
                <HiOutlineTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Modal */}
      {modal === "milestone" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-navy-lighter bg-navy p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">إضافة محطة تاريخية</h2>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white"><HiOutlineX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">السنة</label>
                <input value={newMilestone.year} onChange={(e) => setNewMilestone({ ...newMilestone, year: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">العنوان</label>
                <input value={newMilestone.title} onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الوصف</label>
                <textarea value={newMilestone.description} onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })} rows={3} className="w-full resize-none rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="rounded-xl border border-navy-lighter px-6 py-2.5 text-sm text-white/60">إلغاء</button>
              <button onClick={addMilestone} className="rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-navy">إضافة</button>
            </div>
          </div>
        </div>
      )}

      {/* Award Modal */}
      {modal === "award" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-navy-lighter bg-navy p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">إضافة جائزة</h2>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white"><HiOutlineX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">اسم الجائزة</label>
                <input value={newAward.name} onChange={(e) => setNewAward({ ...newAward, name: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">السنة</label>
                <input value={newAward.year} onChange={(e) => setNewAward({ ...newAward, year: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الجهة المانحة</label>
                <input value={newAward.issuer} onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="rounded-xl border border-navy-lighter px-6 py-2.5 text-sm text-white/60">إلغاء</button>
              <button onClick={addAward} className="rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-navy">إضافة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
