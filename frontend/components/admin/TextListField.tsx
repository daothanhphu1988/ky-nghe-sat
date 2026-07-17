"use client";

import { Plus, X } from "lucide-react";
import { Input, Label } from "@/components/ui/Input";

export function TextListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={v} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} />
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
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
          <Plus size={16} /> Thêm
        </button>
      </div>
    </div>
  );
}
