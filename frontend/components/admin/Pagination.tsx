"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  totalElements,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}) {
  if (totalElements === 0) return null;

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
      <p>
        Trang {page + 1} / {Math.max(totalPages, 1)} &middot; {totalElements} kết quả
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 0}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-text hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Trước
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-text hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sau <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
