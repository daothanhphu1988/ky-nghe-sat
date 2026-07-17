"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Review } from "@/lib/types";

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const review = reviews[index];
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section className="bg-bg py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Đánh giá</span>
        <h2 className="mt-2 font-heading text-4xl text-primary sm:text-5xl">Khách hàng nói gì</h2>

        <div className="relative mt-14 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-black/5"
            >
              <div className="mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-accent">
                <Image
                  src={review.avatarUrl ?? "https://images.pexels.com/photos/4558592/pexels-photo-4558592.jpeg?auto=compress&cs=tinysrgb&w=150"}
                  alt={review.customerName}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex justify-center gap-1 text-accent">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-lg italic text-gray-700">&ldquo;{review.content}&rdquo;</p>
              <p className="mt-4 font-heading text-lg text-primary">{review.customerName}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {reviews.length > 1 && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Đánh giá trước"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 hover:text-accent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Đánh giá sau"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 hover:text-accent"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
