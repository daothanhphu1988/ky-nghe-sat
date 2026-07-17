"use client";

import { Plus, X } from "lucide-react";
import { Input, Label } from "@/components/ui/Input";
import type { MaterialRow } from "@/lib/types";

export function MaterialsTableField({
  values,
  onChange,
}: {
  values: MaterialRow[];
  onChange: (rows: MaterialRow[]) => void;
}) {
  const update = (i: number, patch: Partial<MaterialRow>) => {
    const next = [...values];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <Label>Bảng vật liệu</Label>
      <div className="space-y-2">
        {values.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input placeholder="Vật liệu" value={row.name} onChange={(e) => update(i, { name: e.target.value })} />
            <Input placeholder="Quy cách" value={row.spec} onChange={(e) => update(i, { spec: e.target.value })} />
            <Input placeholder="Ghi chú" value={row.note} onChange={(e) => update(i, { note: e.target.value })} />
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
          onClick={() => onChange([...values, { name: "", spec: "", note: "" }])}
          className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-accent hover:text-accent"
        >
          <Plus size={16} /> Thêm dòng
        </button>
      </div>
    </div>
  );
}
