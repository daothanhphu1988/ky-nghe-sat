"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: number }>({
  columns,
  rows,
  editHref,
  onDelete,
}: {
  columns: Column<T>[];
  rows: T[];
  editHref: (row: T) => string;
  onDelete: (row: T) => void;
}) {
  if (rows.length === 0) {
    return <p className="mt-6 text-center text-gray-500">Chưa có dữ liệu.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-5 py-3 font-semibold text-gray-600">
                {col.header}
              </th>
            ))}
            <th className="px-5 py-3 text-right font-semibold text-gray-600">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.header} className="px-5 py-3 text-text">
                  {col.render(row)}
                </td>
              ))}
              <td className="px-5 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={editHref(row)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-accent/10 hover:text-accent"
                    aria-label="Sửa"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Xác nhận xóa mục này?")) onDelete(row);
                    }}
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
