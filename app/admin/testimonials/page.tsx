"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import type { Testimonial } from "@/data/testimonials";

const empty: Testimonial = { name: "", role: "", text: "", rating: 5 };

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/testimonials").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    await fetch("/api/admin/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null); load();
  };

  const remove = async (index: number) => {
    if (!confirm("هل أنت متأكد؟")) return;
    await fetch("/api/admin/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ index }) });
    load();
  };

  if (loading) return <div className="text-white/40">جاري التحميل...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">شهادات العملاء</h1>
          <p className="text-sm text-white/40">{items.length} شهادة</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:bg-gold-light">
          <HiOutlinePlus size={18} /> إضافة شهادة
        </button>
      </div>

      <div className="space-y-4">
        {items.map((t, i) => (
          <div key={i} className="rounded-2xl border border-navy-lighter bg-navy p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <FaStar key={si} className={si < t.rating ? "text-gold" : "text-white/10"} size={14} />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-3">
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
              <button onClick={() => remove(i)} className="rounded-lg p-2 text-white/30 hover:bg-red-500/10 hover:text-red-400">
                <HiOutlineTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-navy-lighter bg-navy p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">إضافة شهادة عميل</h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white"><HiOutlineX size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">اسم العميل</label>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الصفة / المنصب</label>
                <input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الشهادة / الرأي</label>
                <textarea value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} rows={4} className="w-full resize-none rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">التقييم</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button key={v} onClick={() => setEditing({ ...editing, rating: v })} className="p-1">
                      <FaStar size={22} className={v <= editing.rating ? "text-gold" : "text-white/10"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-navy-lighter px-6 py-2.5 text-sm text-white/60">إلغاء</button>
              <button onClick={save} className="rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-navy">إضافة</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
