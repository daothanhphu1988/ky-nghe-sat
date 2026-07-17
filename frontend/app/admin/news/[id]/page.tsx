"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { NewsArticle } from "@/lib/types";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const EMPTY: Partial<NewsArticle> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  publishedAt: new Date().toISOString(),
  author: "Kỹ Nghệ Sắt",
};

export default function AdminNewsFormPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";

  const [form, setForm] = useState<Partial<NewsArticle>>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    const session = getSession();
    if (!session) return;
    adminApi.news.get(session.token, Number(params.id)).then(setForm).finally(() => setLoading(false));
  }, [isNew, params.id]);

  const set = <K extends keyof NewsArticle>(key: K, value: NewsArticle[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        await adminApi.news.create(session.token, form);
      } else {
        await adminApi.news.update(session.token, Number(params.id), form);
      }
      router.push("/admin/news");
    } catch {
      setError("Lưu thất bại. Vui lòng kiểm tra lại thông tin (slug phải là duy nhất).");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl text-primary">{isNew ? "Thêm bài viết" : "Sửa bài viết"}</h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input id="title" required value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" required value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="excerpt">Mô tả ngắn</Label>
          <Input id="excerpt" value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="content">Nội dung</Label>
          <Textarea id="content" className="min-h-[240px]" value={form.content ?? ""} onChange={(e) => set("content", e.target.value)} />
        </div>

        <ImageUploadField label="Ảnh bìa" value={form.coverImageUrl ?? ""} onChange={(url) => set("coverImageUrl", url)} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Tác giả</Label>
            <Input id="author" value={form.author ?? ""} onChange={(e) => set("author", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="publishedAt">Ngày đăng</Label>
            <Input
              id="publishedAt"
              type="date"
              value={form.publishedAt ? form.publishedAt.slice(0, 10) : ""}
              onChange={(e) => set("publishedAt", new Date(e.target.value).toISOString())}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu bài viết"}
          </Button>
        </div>
      </form>
    </div>
  );
}
