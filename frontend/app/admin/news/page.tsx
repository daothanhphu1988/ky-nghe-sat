"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";
import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ButtonLink } from "@/components/ui/Button";

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.news
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

  const handleDelete = async (item: NewsArticle) => {
    const session = getSession();
    if (!session) return;
    await adminApi.news.remove(session.token, item.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Tin tức</h1>
          <p className="mt-1 text-gray-500">Quản lý bài viết tin tức</p>
        </div>
        <ButtonLink href="/admin/news/new" size="sm" className="!inline-flex gap-2">
          <Plus size={16} /> Thêm bài viết
        </ButtonLink>
      </div>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tiêu đề, tác giả..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : (
        <>
          <DataTable
            rows={items}
            editHref={(row) => `/admin/news/${row.id}`}
            onDelete={handleDelete}
            columns={[
              { header: "Tiêu đề", render: (row) => row.title },
              { header: "Tác giả", render: (row) => row.author ?? "—" },
              { header: "Ngày đăng", render: (row) => formatDate(row.publishedAt) || "—" },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
