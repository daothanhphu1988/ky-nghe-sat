"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { SERVICE_CATEGORY_LABELS, type ServiceItem } from "@/lib/types";
import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ButtonLink } from "@/components/ui/Button";

export default function AdminServicesPage() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.services
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

  const handleDelete = async (item: ServiceItem) => {
    const session = getSession();
    if (!session) return;
    await adminApi.services.remove(session.token, item.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Dịch vụ</h1>
          <p className="mt-1 text-gray-500">Quản lý các trang landing dịch vụ</p>
        </div>
        <ButtonLink href="/admin/services/new" size="sm" className="!inline-flex gap-2">
          <Plus size={16} /> Thêm dịch vụ
        </ButtonLink>
      </div>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên, slug..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : (
        <>
          <DataTable
            rows={items}
            editHref={(row) => `/admin/services/${row.id}`}
            onDelete={handleDelete}
            columns={[
              { header: "Tên dịch vụ", render: (row) => row.name },
              { header: "Danh mục", render: (row) => SERVICE_CATEGORY_LABELS[row.category] },
              { header: "Slug", render: (row) => row.slug },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
