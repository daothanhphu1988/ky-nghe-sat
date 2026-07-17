"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Project, Review } from "@/lib/types";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const EMPTY: Partial<Review> = {
  customerName: "",
  avatarUrl: "",
  rating: 5,
  content: "",
  approved: true,
};

export default function AdminReviewFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [form, setForm] = useState<Partial<Review>>(EMPTY);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    adminApi.projects.list(session.token, 0, 100).then((res) => setProjects(res.content));
  }, []);

  useEffect(() => {
    if (isNew) return;
    const session = getSession();
    if (!session) return;
    adminApi.reviews.get(session.token, Number(params.id)).then(setForm).finally(() => setLoading(false));
  }, [isNew, params.id]);

  const set = <K extends keyof Review>(key: K, value: Review[K]) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await adminApi.reviews.create(session.token, form);
      } else {
        await adminApi.reviews.update(session.token, Number(params.id), form);
      }
      router.push("/admin/reviews");
    } catch {
      setError("Lưu thất bại.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl text-primary">{isNew ? "Thêm đánh giá" : "Sửa đánh giá"}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="customerName">Tên khách hàng *</Label>
          <Input id="customerName" required value={form.customerName ?? ""} onChange={(e) => set("customerName", e.target.value)} />
        </div>

        <ImageUploadField label="Ảnh đại diện" value={form.avatarUrl ?? ""} onChange={(url) => set("avatarUrl", url)} />

        <div>
          <Label htmlFor="rating">Số sao</Label>
          <Select id="rating" value={form.rating ?? 5} onChange={(e) => set("rating", Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} sao
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Nội dung đánh giá</Label>
          <Textarea id="content" value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="projectId">Dự án liên quan</Label>
          <Select
            id="projectId"
            value={form.projectId ?? ""}
            onChange={(e) => set("projectId", e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">-- Không liên kết --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </Select>
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" checked={form.approved ?? false} onChange={(e) => set("approved", e.target.checked)} />
          Hiển thị công khai trên website
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu đánh giá"}
        </Button>
      </form>
    </div>
  );
}
