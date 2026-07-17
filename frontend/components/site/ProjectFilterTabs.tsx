import Link from "next/link";
import { SERVICE_CATEGORY_LABELS, type ServiceCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectFilterTabs({ active }: { active?: ServiceCategory }) {
  const tabs: Array<{ label: string; value?: ServiceCategory }> = [
    { label: "Tất cả" },
    ...Object.entries(SERVICE_CATEGORY_LABELS).map(([value, label]) => ({
      label,
      value: value as ServiceCategory,
    })),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.value ? `/du-an?category=${tab.value}` : "/du-an"}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
            active === tab.value
              ? "bg-button text-white"
              : "bg-white text-text ring-1 ring-gray-200 hover:ring-accent",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
