import type { MaterialRow } from "@/lib/types";

export function MaterialsTable({ rows }: { rows: MaterialRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-6 py-4 font-heading text-base tracking-wide">Vật liệu</th>
            <th className="px-6 py-4 font-heading text-base tracking-wide">Quy cách</th>
            <th className="px-6 py-4 font-heading text-base tracking-wide">Ghi chú</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="px-6 py-4 font-medium text-text">{row.name}</td>
              <td className="px-6 py-4 text-gray-600">{row.spec}</td>
              <td className="px-6 py-4 text-gray-600">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
