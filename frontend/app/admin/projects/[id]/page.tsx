"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { SERVICE_CATEGORY_LABELS, type Project, type ServiceCategory } from "@/lib/types";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageField } from "@/components/admin/MultiImageField";

const EMPTY: Partial<Project> = {
  title: "",
  slug: "",
  category: "CUA_SAT",
  location: "",
  year: new Date().getFullYear(),
  area: "",
  material: "",
  customerName: "",
  durationDays: undefined,
  description: "",
  coverImageUrl: "",
  beforeImageUrls: [],
  afterImageUrls: [],
  galleryImageUrls: [],
  videoUrl: "",
  panorama360Url: "",
  featured: false,
};

export default function AdminProjectFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [form, setForm] = useState<Partial<Project>>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    const session = getSession();
    if (!session) return;
    adminApi.projects
      .get(session.token, Number(params.id))
      .then(setForm)
      .finally(() => setLoading(false));
  }, [isNew, params.id]);

  const set = <K extends keyof Project>(key: K, value: Project[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await adminApi.projects.create(session.token, form);
      } else {
        await adminApi.projects.update(session.token, Number(params.id), form);
      }
      router.push("/admin/projects");
    } catch {
      setError("Lưu thất bại. Vui lòng kiểm tra lại thông tin (slug phải là duy nhất).");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl text-primary">{isNew ? "Thêm dự án" : "Sửa dự án"}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Tên công trình *</Label>
            <Input id="title" required value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" required value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Danh mục *</Label>
            <Select
              id="category"
              value={form.category ?? "CUA_SAT"}
              onChange={(e) => set("category", e.target.value as ServiceCategory)}
            >
              {Object.entries(SERVICE_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="location">Địa điểm</Label>
            <Input id="location" value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label htmlFor="year">Năm</Label>
            <Input
              id="year"
              type="number"
              value={form.year ?? ""}
              onChange={(e) => set("year", Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="area">Diện tích</Label>
            <Input id="area" value={form.area ?? ""} onChange={(e) => set("area", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="customerName">Khách hàng</Label>
            <Input id="customerName" value={form.customerName ?? ""} onChange={(e) => set("customerName", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="durationDays">Số ngày TC</Label>
            <Input
              id="durationDays"
              type="number"
              value={form.durationDays ?? ""}
              onChange={(e) => set("durationDays", Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="material">Vật liệu</Label>
          <Input id="material" value={form.material ?? ""} onChange={(e) => set("material", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="description">Mô tả</Label>
          <Textarea id="description" value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} />
        </div>

        <ImageUploadField label="Ảnh bìa" value={form.coverImageUrl ?? ""} onChange={(url) => set("coverImageUrl", url)} />

        <MultiImageField label="Ảnh trước thi công" values={form.beforeImageUrls ?? []} onChange={(v) => set("beforeImageUrls", v)} />
        <MultiImageField label="Ảnh sau thi công" values={form.afterImageUrls ?? []} onChange={(v) => set("afterImageUrls", v)} />
        <MultiImageField label="Ảnh gallery" values={form.galleryImageUrls ?? []} onChange={(v) => set("galleryImageUrls", v)} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input id="videoUrl" value={form.videoUrl ?? ""} onChange={(e) => set("videoUrl", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="panorama360Url">Ảnh 360° URL</Label>
            <Input id="panorama360Url" value={form.panorama360Url ?? ""} onChange={(e) => set("panorama360Url", e.target.value)} />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={form.featured ?? false}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Hiển thị ở mục &quot;Dự án nổi bật&quot;
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu dự án"}
          </Button>
        </div>
      </form>
    </div>
  );
}
