"use client";

import { Plus, X } from "lucide-react";
import { Input, Label, Textarea } from "@/components/ui/Input";
import type { Faq } from "@/lib/types";

export function FaqsField({ values, onChange }: { values: Faq[]; onChange: (rows: Faq[]) => void }) {
  const update = (i: number, patch: Partial<Faq>) => {
    const next = [...values];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <Label>Câu hỏi thường gặp</Label>
      <div className="space-y-3">
        {values.map((faq, i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Câu hỏi"
                value={faq.question}
                onChange={(e) => update(i, { question: e.target.value })}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
            <Textarea
              className="mt-2"
              placeholder="Trả lời"
              value={faq.answer}
              onChange={(e) => update(i, { answer: e.target.value })}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, { question: "", answer: "" }])}
          className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 hover:border-accent hover:text-accent"
        >
          <Plus size={16} /> Thêm câu hỏi
        </button>
      </div>
    </div>
  );
}
