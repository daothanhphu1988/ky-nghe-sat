"use client";

import { useState } from "react";
import Image from "next/image";

export function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-video w-full select-none overflow-hidden rounded-2xl">
      <Image src={after} alt="Sau khi hoàn thành" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={before} alt="Trước khi thi công" fill className="object-cover" sizes="100vw" />
      </div>

      <div
        className="absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow"
        style={{ left: `${position}%` }}
      />

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-x-0 bottom-4 mx-auto w-[90%] accent-accent"
        aria-label="So sánh trước và sau"
      />

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
        Trước
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
        Sau
      </span>
    </div>
  );
}
