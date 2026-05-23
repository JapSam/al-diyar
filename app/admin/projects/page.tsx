"use client";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import type { Project } from "@/data/projects";

const emptyProject: Omit<Project, "id"> & { id: string } = {
  id: "",
  name: "",
  category: "سكني",
  location: "",
  status: "تحت الإنشاء",
  year: "",
  area: "",
  description: "",
  images: [""],
  coordinates: { lat: 24.7136, lng: 46.6753 },
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) => { setProjects(d); setLoading(false); });
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing({ ...emptyProject, id: Date.now().toString(36) });
    setIsNew(true);
  };

  const openEdit = (p: Project) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const close = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    await fetch("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    close();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const updateField = <K extends keyof Project>(key: K, value: Project[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  if (loading) return <div className="text-white/40">جاري التحميل...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">إدارة المشاريع</h1>
          <p className="text-sm text-white/40">{projects.length} مشروع</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:bg-gold-light"
        >
          <HiOutlinePlus size={18} />
          إضافة مشروع
        </button>
      </div>

      {/* Projects table */}
      <div className="overflow-hidden rounded-2xl border border-navy-lighter bg-navy">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-lighter text-white/40">
              <th className="px-6 py-4 text-right font-medium">المشروع</th>
              <th className="px-6 py-4 text-right font-medium">التصنيف</th>
              <th className="px-6 py-4 text-right font-medium">الحالة</th>
              <th className="px-6 py-4 text-right font-medium">الموقع</th>
              <th className="px-6 py-4 text-right font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-navy-lighter last:border-0 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-white">{p.name}</p>
                      <p className="text-xs text-white/30">{p.area}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/60">{p.category}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    p.status === "مكتمل" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/60">{p.location}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-gold">
                      <HiOutlinePencil size={16} />
                    </button>
                    <button onClick={() => remove(p.id)} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400">
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-20">
          <div className="w-full max-w-2xl rounded-2xl border border-navy-lighter bg-navy p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {isNew ? "إضافة مشروع جديد" : "تعديل المشروع"}
              </h2>
              <button onClick={close} className="text-white/40 hover:text-white">
                <HiOutlineX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">اسم المشروع</label>
                  <input value={editing.name} onChange={(e) => updateField("name", e.target.value)} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">الموقع</label>
                  <input value={editing.location} onChange={(e) => updateField("location", e.target.value)} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">التصنيف</label>
                  <select value={editing.category} onChange={(e) => updateField("category", e.target.value as Project["category"])} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold">
                    <option value="سكني">سكني</option>
                    <option value="تجاري">تجاري</option>
                    <option value="فلل">فلل</option>
                    <option value="مجمعات">مجمعات</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">الحالة</label>
                  <select value={editing.status} onChange={(e) => updateField("status", e.target.value as Project["status"])} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold">
                    <option value="تحت الإنشاء">تحت الإنشاء</option>
                    <option value="مكتمل">مكتمل</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">سنة التسليم</label>
                  <input value={editing.year} onChange={(e) => updateField("year", e.target.value)} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">المساحة</label>
                  <input value={editing.area} onChange={(e) => updateField("area", e.target.value)} placeholder="50,000 م²" className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 text-sm text-white/60">
                    <input type="checkbox" checked={editing.featured || false} onChange={(e) => updateField("featured", e.target.checked)} className="h-4 w-4 rounded accent-gold" />
                    عرض في الصفحة الرئيسية
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">الوصف</label>
                <textarea value={editing.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className="w-full resize-none rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-white/50">روابط الصور (رابط لكل سطر)</label>
                <textarea
                  value={editing.images.join("\n")}
                  onChange={(e) => updateField("images", e.target.value.split("\n").filter(Boolean))}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
                  dir="ltr"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">خط العرض (Lat)</label>
                  <input type="number" step="any" value={editing.coordinates.lat} onChange={(e) => updateField("coordinates", { ...editing.coordinates, lat: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-white/50">خط الطول (Lng)</label>
                  <input type="number" step="any" value={editing.coordinates.lng} onChange={(e) => updateField("coordinates", { ...editing.coordinates, lng: parseFloat(e.target.value) || 0 })} className="w-full rounded-xl border border-navy-lighter bg-[#080f1e] px-4 py-2.5 text-sm text-white outline-none focus:border-gold" dir="ltr" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={close} className="rounded-xl border border-navy-lighter px-6 py-2.5 text-sm text-white/60 hover:text-white">
                إلغاء
              </button>
              <button onClick={save} className="rounded-xl bg-gold px-6 py-2.5 text-sm font-bold text-navy hover:bg-gold-light">
                {isNew ? "إضافة" : "حفظ التعديلات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
