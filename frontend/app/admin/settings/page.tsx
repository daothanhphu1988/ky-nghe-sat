"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { SiteSettings } from "@/lib/types";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const FIELDS: Array<{ key: string; label: string; multiline?: boolean }> = [
  { key: "hotline", label: "Hotline" },
  { key: "zalo", label: "Số Zalo" },
  { key: "email", label: "Email" },
  { key: "address", label: "Địa chỉ" },
  { key: "working_hours", label: "Giờ làm việc" },
  { key: "facebook_url", label: "Link Facebook" },
  { key: "map_embed_url", label: "Google Maps Embed URL", multiline: true },
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) return;
    adminApi.settings.get(session.token).then(setForm).finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = getSession();
    if (!session) return;
    setSaving(true);
    setSaved(false);
    try {
      await adminApi.settings.update(session.token, form);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-3xl text-primary">Cài đặt chung</h1>
      <p className="mt-1 text-gray-500">Thông tin liên hệ hiển thị trên toàn website</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.multiline ? (
              <Textarea
                id={field.key}
                value={form[field.key] ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              />
            ) : (
              <Input
                id={field.key}
                value={form[field.key] ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
              />
            )}
          </div>
        ))}

        {saved && <p className="text-sm text-green-600">Đã lưu thành công.</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </Button>
      </form>
    </div>
  );
}
