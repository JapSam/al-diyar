"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import type { TeamMember } from "@/data/team";

const emptyMember: TeamMember = { name: "", title: "", image: "", bio: "" };

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/team").then((r) => r.json()).then((d) => { setTeam(d); setLoading(false); });
  };
  useEffect(load, []);

  const openNew = () => { setEditing({ ...emptyMember }); setEditIndex(-1); };
  const close = () => { setEditing(null); setEditIndex(-1); };

  const save = async () => {
    if (!editing) return;
    if (editIndex === -1) {
      await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    } else {
      await fetch("/api/admin/team", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ index: editIndex, ...editing }) });
    }
    close(); load();
  };

  const remove = async (index: number) => {
    if (!confirm("هل أنت متأكد؟")) return;
    await fetch("/api/admin/team", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ index }) });
    load();
  };

  if (loading) return <div className="text-white/40">جاري التحميل...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة الفريق</h1>
          <p className="text-sm text-white/40">{team.length} عضو</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:bg-gold-light">
          <HiOutlinePlus size={18} /> إضافة عضو
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <div key={i} className="rounded-2xl border border-navy-lighter bg-navy p-5">
            <div className="flex items-start gap-4">
              <img src={m.image} alt="" className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold text-white">{m.name}</p>
                <p className="text-sm text-gold">{m.title}</p>
                <p className="mt-2 text-xs text-white/40 line-clamp-2">{m.bio}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button onClick={() => { setEditing({ ...m }); setEditIndex(i); }} className="rounded-lg px-3 py-1.5 text-xs text-white/40 hover:bg-white/5 hover:text-gold">
                تعديل
              </button>
              <button onClick={() => remove(i)} className="rounded-lg px-3 py-1.5 text-xs text-white/40 hover:bg-red-500/10 hover:text-red-400">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-navy-lighter bg-navy p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editIndex === -1 ? "إضافة عضو" : "تعديل العضو"}</h2>
              <button onClick={close} className="text-white/40 hover:text-white"><HiOutlineX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الاسم</label>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">المنصب</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">رابط الصورة</label>
                <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">نبذة</label>
                <textarea value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={3} className="w-full resize-none rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={close} className="rounded-xl border border-navy-lighter px-6 py-2.5 text-sm text-white/60 hover:text-white">إلغاء</button>
              <button onClick={save} className="rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-navy hover:bg-gold-light">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
