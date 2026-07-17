import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl bg-white shadow-sm ring-1 ring-black/5", className)}>
      {children}
    </div>
  );
}
