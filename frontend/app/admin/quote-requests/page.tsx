"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { SERVICE_CATEGORY_LABELS, type QuoteRequest, type QuoteStatus } from "@/lib/types";
import { Select } from "@/components/ui/Input";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";

const STATUS_LABELS: Record<QuoteStatus, string> = {
  NEW: "Mới",
  CONTACTED: "Đã liên hệ",
  DONE: "Hoàn tất",
};

const STATUS_COLORS: Record<QuoteStatus, string> = {
  NEW: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export default function AdminQuoteRequestsPage() {
  const [items, setItems] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.quoteRequests
      .list(session.token, page, 10, search)
      .then((res) => {
        setItems(res.content);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElements);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);
  useEffect(() => setPage(0), [search]);

  const updateStatus = async (id: number, status: QuoteStatus) => {
    const session = getSession();
    if (!session) return;
    await adminApi.quoteRequests.updateStatus(session.token, id, status);
    load();
  };

  const remove = async (id: number) => {
    const session = getSession();
    if (!session) return;
    if (!confirm("Xóa yêu cầu này?")) return;
    await adminApi.quoteRequests.remove(session.token, id);
    load();
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-primary">Yêu cầu báo giá</h1>
      <p className="mt-1 text-gray-500">Danh sách khách hàng gửi yêu cầu qua website</p>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên, SĐT, email..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : items.length === 0 ? (
        <p className="mt-6 text-gray-500">Không tìm thấy yêu cầu nào.</p>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-primary">{item.name}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status]}`}>
                        {STATUS_LABELS[item.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {item.phone} {item.email && `· ${item.email}`}
                    </p>
                    {item.serviceCategory && (
                      <p className="mt-1 text-xs text-accent">{SERVICE_CATEGORY_LABELS[item.serviceCategory]}</p>
                    )}
                    {item.message && <p className="mt-2 text-sm text-gray-700">{item.message}</p>}
                    <p className="mt-2 text-xs text-gray-400">{formatDate(item.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value as QuoteStatus)}
                      className="w-40"
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                    <button
                      onClick={() => remove(item.id)}
                      className="rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
