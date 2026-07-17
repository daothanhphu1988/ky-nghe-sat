"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Review } from "@/lib/types";
import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ButtonLink } from "@/components/ui/Button";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.reviews
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

  const handleDelete = async (item: Review) => {
    const session = getSession();
    if (!session) return;
    await adminApi.reviews.remove(session.token, item.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Đánh giá</h1>
          <p className="mt-1 text-gray-500">Quản lý đánh giá khách hàng</p>
        </div>
        <ButtonLink href="/admin/reviews/new" size="sm" className="!inline-flex gap-2">
          <Plus size={16} /> Thêm đánh giá
        </ButtonLink>
      </div>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên khách hàng, nội dung..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : (
        <>
          <DataTable
            rows={items}
            editHref={(row) => `/admin/reviews/${row.id}`}
            onDelete={handleDelete}
            columns={[
              { header: "Khách hàng", render: (row) => row.customerName },
              { header: "Đánh giá", render: (row) => `${row.rating} sao` },
              { header: "Hiển thị", render: (row) => (row.approved ? "Có" : "Ẩn") },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
