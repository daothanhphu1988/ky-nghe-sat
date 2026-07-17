"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { SERVICE_CATEGORY_LABELS, type ServiceItem, type ServiceCategory } from "@/lib/types";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageField } from "@/components/admin/MultiImageField";
import { TextListField } from "@/components/admin/TextListField";
import { MaterialsTableField } from "@/components/admin/MaterialsTableField";
import { FaqsField } from "@/components/admin/FaqsField";

const EMPTY: Partial<ServiceItem> = {
  slug: "",
  name: "",
  category: "CUA_SAT",
  shortDescription: "",
  content: "",
  advantages: [],
  materialsTable: [],
  heroImageUrl: "",
  galleryImageUrls: [],
  faqs: [],
};

export default function AdminServiceFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [form, setForm] = useState<Partial<ServiceItem>>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    const session = getSession();
    if (!session) return;
    adminApi.services.get(session.token, Number(params.id)).then(setForm).finally(() => setLoading(false));
  }, [isNew, params.id]);

  const set = <K extends keyof ServiceItem>(key: K, value: ServiceItem[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await adminApi.services.create(session.token, form);
      } else {
        await adminApi.services.update(session.token, Number(params.id), form);
      }
      router.push("/admin/services");
    } catch {
      setError("Lưu thất bại. Vui lòng kiểm tra lại thông tin (slug phải là duy nhất).");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl text-primary">{isNew ? "Thêm dịch vụ" : "Sửa dịch vụ"}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Tên dịch vụ *</Label>
            <Input id="name" required value={form.name ?? ""} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" required value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} />
          </div>
        </div>

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
          <Label htmlFor="shortDescription">Mô tả ngắn</Label>
          <Input
            id="shortDescription"
            value={form.shortDescription ?? ""}
            onChange={(e) => set("shortDescription", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="content">Nội dung giới thiệu</Label>
          <Textarea id="content" value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} />
        </div>

        <ImageUploadField label="Ảnh banner" value={form.heroImageUrl ?? ""} onChange={(url) => set("heroImageUrl", url)} />

        <TextListField label="Ưu điểm" values={form.advantages ?? []} onChange={(v) => set("advantages", v)} placeholder="Ưu điểm..." />

        <MaterialsTableField values={form.materialsTable ?? []} onChange={(v) => set("materialsTable", v)} />

        <MultiImageField label="Ảnh mẫu / gallery" values={form.galleryImageUrls ?? []} onChange={(v) => set("galleryImageUrls", v)} />

        <FaqsField values={form.faqs ?? []} onChange={(v) => set("faqs", v)} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu dịch vụ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
