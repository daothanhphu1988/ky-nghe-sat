"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Banner, BannerPosition, MediaType } from "@/lib/types";
import { Input, Label, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const EMPTY: Partial<Banner> = {
  title: "",
  subtitle: "",
  mediaUrl: "",
  mediaType: "IMAGE",
  ctaText: "Nhận báo giá",
  ctaLink: "/bao-gia",
  position: "HERO",
  active: true,
  sortOrder: 0,
};

export default function AdminBannerFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [form, setForm] = useState<Partial<Banner>>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    const session = getSession();
    if (!session) return;
    adminApi.banners.get(session.token, Number(params.id)).then(setForm).finally(() => setLoading(false));
  }, [isNew, params.id]);

  const set = <K extends keyof Banner>(key: K, value: Banner[K]) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await adminApi.banners.create(session.token, form);
      } else {
        await adminApi.banners.update(session.token, Number(params.id), form);
      }
      router.push("/admin/banners");
    } catch {
      setError("Lưu thất bại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl text-primary">{isNew ? "Thêm banner" : "Sửa banner"}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="title">Tiêu đề *</Label>
          <Input id="title" required value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="subtitle">Mô tả phụ</Label>
          <Input id="subtitle" value={form.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} />
        </div>

        <ImageUploadField label="Ảnh / Video" value={form.mediaUrl ?? ""} onChange={(url) => set("mediaUrl", url)} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mediaType">Loại media</Label>
            <Select id="mediaType" value={form.mediaType ?? "IMAGE"} onChange={(e) => set("mediaType", e.target.value as MediaType)}>
              <option value="IMAGE">Ảnh</option>
              <option value="VIDEO">Video</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Select id="position" value={form.position ?? "HERO"} onChange={(e) => set("position", e.target.value as BannerPosition)}>
              <option value="HERO">Hero (Trang chủ)</option>
              <option value="CTA">CTA (Kêu gọi hành động)</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ctaText">Nút bấm - Nhãn</Label>
            <Input id="ctaText" value={form.ctaText ?? ""} onChange={(e) => set("ctaText", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ctaLink">Nút bấm - Liên kết</Label>
            <Input id="ctaLink" value={form.ctaLink ?? ""} onChange={(e) => set("ctaLink", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="sortOrder">Thứ tự hiển thị</Label>
          <Input
            id="sortOrder"
            type="number"
            value={form.sortOrder ?? 0}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" checked={form.active ?? false} onChange={(e) => set("active", e.target.checked)} />
          Kích hoạt hiển thị
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu banner"}
        </Button>
      </form>
    </div>
  );
}
