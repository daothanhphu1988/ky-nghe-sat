"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { adminApi } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { SERVICE_CATEGORY_LABELS, type Project } from "@/lib/types";
import { DataTable } from "@/components/admin/DataTable";
import { SearchInput } from "@/components/admin/SearchInput";
import { Pagination } from "@/components/admin/Pagination";
import { ButtonLink } from "@/components/ui/Button";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const load = () => {
    const session = getSession();
    if (!session) return;
    setLoading(true);
    adminApi.projects
      .list(session.token, page, 10, search)
      .then((res) => {
        setProjects(res.content);
        setTotalPages(res.totalPages);
        setTotalElements(res.totalElements);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [page, search]);
  useEffect(() => setPage(0), [search]);

  const handleDelete = async (project: Project) => {
    const session = getSession();
    if (!session) return;
    await adminApi.projects.remove(session.token, project.id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-primary">Dự án</h1>
          <p className="mt-1 text-gray-500">Quản lý các công trình đã thi công</p>
        </div>
        <ButtonLink href="/admin/projects/new" size="sm" className="!inline-flex gap-2">
          <Plus size={16} /> Thêm dự án
        </ButtonLink>
      </div>

      <div className="mt-6">
        <SearchInput value={search} onChange={setSearch} placeholder="Tìm theo tên, địa điểm, khách hàng..." />
      </div>

      {loading ? (
        <p className="mt-6 text-gray-500">Đang tải...</p>
      ) : (
        <>
          <DataTable
            rows={projects}
            editHref={(row) => `/admin/projects/${row.id}`}
            onDelete={handleDelete}
            columns={[
              { header: "Tên công trình", render: (row) => row.title },
              { header: "Danh mục", render: (row) => SERVICE_CATEGORY_LABELS[row.category] },
              { header: "Địa điểm", render: (row) => row.location ?? "—" },
              { header: "Nổi bật", render: (row) => (row.featured ? "Có" : "—") },
            ]}
          />
          <Pagination page={page} totalPages={totalPages} totalElements={totalElements} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
