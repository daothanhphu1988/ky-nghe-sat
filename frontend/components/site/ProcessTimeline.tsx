"use client";

import { motion } from "motion/react";

const STEPS = [
  { step: "01", title: "Tiếp nhận yêu cầu" },
  { step: "02", title: "Khảo sát" },
  { step: "03", title: "Thiết kế" },
  { step: "04", title: "Gia công" },
  { step: "05", title: "Lắp đặt" },
  { step: "06", title: "Bảo hành" },
];

export function ProcessTimeline() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Quy trình</span>
          <h2 className="mt-2 font-heading text-4xl text-primary sm:text-5xl">Quy trình làm việc</h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary font-heading text-2xl text-accent">
                {s.step}
              </div>
              {i < STEPS.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-px w-full -translate-y-1/2 bg-gray-200 lg:block" />
              )}
              <h3 className="relative mt-4 bg-white text-sm font-semibold uppercase tracking-wide text-text">
                {s.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
