import { Phone } from "lucide-react";

export function StickyContactButtons({
  hotline = "0909123456",
}: {
  hotline?: string;
  zalo?: string;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      <a
        href={`tel:${hotline.replace(/\s/g, "")}`}
        aria-label="Gọi điện"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-button text-white shadow-lg transition-transform hover:scale-110 animate-pulse"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
