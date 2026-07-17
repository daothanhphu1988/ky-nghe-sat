"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export function GalleryMasonry({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl break-inside-avoid"
            style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}
          >
            <Image
              src={src}
              alt={`Hình công trình ${i + 1}`}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>

      <Modal open={openIndex !== null} onClose={() => setOpenIndex(null)} className="max-w-4xl !p-2">
        {openIndex !== null && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={images[openIndex]}
              alt={`Hình công trình ${openIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
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
          </div>
        )}
      </Modal>
    </>
  );
}
