"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const STATS = [
  { value: 500, suffix: "+", label: "Công trình" },
  { value: 15, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 30, suffix: "+", label: "Nhân sự" },
  { value: 100, suffix: "%", label: "Bảo hành" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-heading text-4xl text-accent sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm uppercase tracking-wide text-white/80">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
