"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-semibold text-primary">{faq.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-accent transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && <p className="px-6 pb-6 text-sm text-gray-600">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
