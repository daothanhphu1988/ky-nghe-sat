"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export function ImageLightboxGrid({
  images,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  images: string[];
  columns?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className={`grid grid-cols-2 gap-4 ${columns}`}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={`Hình ảnh ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <Modal open={openIndex !== null} onClose={() => setOpenIndex(null)} className="max-w-4xl !p-2">
        {openIndex !== null && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={images[openIndex]}
              alt={`Hình ảnh ${openIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Ảnh trước"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  aria-label="Ảnh sau"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
