"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Banner } from "@/lib/types";
import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ButtonLink } from "@/components/ui/Button";

export default function AdminBannersPage() {
  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.banners
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

  const handleDelete = async (item: Banner) => {
    const session = getSession();
    if (!session) return;
    await adminApi.banners.remove(session.token, item.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Banner</h1>
          <p className="mt-1 text-gray-500">Quản lý banner trang chủ &amp; CTA</p>
        </div>
        <ButtonLink href="/admin/banners/new" size="sm" className="!inline-flex gap-2">
          <Plus size={16} /> Thêm banner
        </ButtonLink>
      </div>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tiêu đề..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : (
        <>
          <DataTable
            rows={items}
            editHref={(row) => `/admin/banners/${row.id}`}
            onDelete={handleDelete}
            columns={[
              { header: "Tiêu đề", render: (row) => row.title },
              { header: "Vị trí", render: (row) => row.position },
              { header: "Kích hoạt", render: (row) => (row.active ? "Có" : "Ẩn") },
              { header: "Thứ tự", render: (row) => row.sortOrder },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
