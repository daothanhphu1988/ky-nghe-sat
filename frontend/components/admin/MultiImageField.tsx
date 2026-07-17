"use client";

import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/Input";
import { ImageUploadField } from "./ImageUploadField";

export function MultiImageField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  const update = (i: number, url: string) => {
    const next = [...values];
    next[i] = url;
    onChange(next.filter(Boolean));
  };

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-3">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              <ImageUploadField label="" value={v} onChange={(url) => update(i, url)} />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-1 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-accent hover:text-accent"
        >
          <Plus size={16} /> Thêm ảnh
        </button>
      </div>
    </div>
  );
}
