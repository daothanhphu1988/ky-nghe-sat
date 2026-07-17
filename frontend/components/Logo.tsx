import { cn } from "@/lib/utils";

function EmblemMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Dark plate keeps the mark legible on any ground, mirroring a badge/crest lockup. */}
      <rect width="40" height="40" rx="9" fill="#111827" stroke="#FFFFFF" strokeOpacity="0.08" />
      {/* Roof pediment: the house/gate silhouette the brand builds. */}
      <path
        d="M8.5 17.5L20 7.5L31.5 17.5"
        stroke="#D1D5DB"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* TP monogram */}
      <text
        x="20"
        y="29.5"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="17"
        letterSpacing="-0.5"
      >
        <tspan fill="#F59E0B">T</tspan>
        <tspan fill="#F3F4F6">P</tspan>
      </text>
      {/* Gate-post hint at the base */}
      <path d="M12 34V30M28 34V30" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  variant = "light",
  size = "md",
  className,
}: {
  /** "light" = white wordmark for dark grounds, "dark" = ink wordmark for light grounds */
  variant?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  const wordColor = variant === "light" ? "text-white" : "text-primary";

  return (
    <span className={cn("inline-flex items-center", size === "sm" ? "gap-2" : "gap-2.5", className)}>
      <EmblemMark className={cn("shrink-0", size === "sm" ? "h-8 w-8" : "h-10 w-10")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading tracking-wider",
            wordColor,
            size === "sm" ? "text-lg" : "text-2xl",
          )}
        >
          KỸ NGHỆ <span className="text-accent">SẮT</span>
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-oswald)] font-medium uppercase text-accent",
            size === "sm" ? "text-[9px] tracking-[0.35em]" : "text-[10px] tracking-[0.4em]",
          )}
        >
          Thanh Phong
        </span>
      </span>
    </span>
  );
}
