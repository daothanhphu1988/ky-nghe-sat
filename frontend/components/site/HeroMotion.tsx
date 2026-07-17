"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function HeroMotion({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-heading text-4xl leading-tight text-white sm:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        {children}
      </motion.div>
    </div>
  );
}
