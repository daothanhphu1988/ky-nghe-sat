import type {
  Banner,
  BannerPosition,
  NewsArticle,
  PageResponse,
  Project,
  QuoteRequest,
  QuoteRequestPayload,
  Review,
  ServiceCategory,
  ServiceItem,
  SiteSettings,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string; revalidate?: number } = {},
): Promise<T> {
  const { token, headers, revalidate, ...rest } = options;

  // Public GETs opt into ISR-style caching via `revalidate` so repeat visits
  // don't re-pay the network round trip to the database on every request.
  // Anything else (admin calls, mutations) stays uncached for freshness.
  const cacheOptions: RequestInit =
    revalidate !== undefined ? { next: { revalidate } } : { cache: rest.cache ?? "no-store" };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...cacheOptions,
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.message ?? message;
    } catch {
      // ignore non-json error bodies
    }
    throw new ApiError(message, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// ---- Public site data ----

export function getProjects(params?: {
  category?: ServiceCategory;
  featured?: boolean;
  page?: number;
  size?: number;
}) {
  const search = new URLSearchParams();
  if (params?.category) search.set("category", params.category);
  if (params?.featured) search.set("featured", "true");
  if (params?.page !== undefined) search.set("page", String(params.page));
  if (params?.size !== undefined) search.set("size", String(params.size));
  const qs = search.toString();
  return apiFetch<PageResponse<Project>>(`/api/projects${qs ? `?${qs}` : ""}`, { revalidate: 60 });
}

export function getProjectBySlug(slug: string) {
  return apiFetch<Project>(`/api/projects/${slug}`, { revalidate: 60 });
}

export function getServices() {
  return apiFetch<ServiceItem[]>("/api/services", { revalidate: 60 });
}

export function getServiceBySlug(slug: string) {
  return apiFetch<ServiceItem>(`/api/services/${slug}`, { revalidate: 60 });
}

export function getNews(params?: { page?: number; size?: number }) {
  const search = new URLSearchParams();
  if (params?.page !== undefined) search.set("page", String(params.page));
  if (params?.size !== undefined) search.set("size", String(params.size));
  const qs = search.toString();
  return apiFetch<PageResponse<NewsArticle>>(`/api/news${qs ? `?${qs}` : ""}`, { revalidate: 60 });
}

export function getNewsBySlug(slug: string) {
  return apiFetch<NewsArticle>(`/api/news/${slug}`, { revalidate: 60 });
}

export function getReviews() {
  return apiFetch<Review[]>("/api/reviews", { revalidate: 60 });
}

export function getBanners(position: BannerPosition) {
  return apiFetch<Banner[]>(`/api/banners?position=${position}`, { revalidate: 60 });
}

export function getSettings() {
  return apiFetch<SiteSettings>("/api/settings", { revalidate: 300 });
}

export function submitQuoteRequest(payload: QuoteRequestPayload) {
  return apiFetch<QuoteRequest>("/api/quote-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ---- Auth ----

export function login(username: string, password: string) {
  return apiFetch<{ token: string; username: string; role: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// ---- Admin ----

export const adminApi = {
  dashboard: (token: string) =>
    apiFetch<Record<string, number>>("/api/admin/dashboard", { token }),

  projects: {
    list: (token: string, page = 0, size = 10, search = "", category?: ServiceCategory) =>
      apiFetch<PageResponse<Project>>(
        `/api/admin/projects?page=${page}&size=${size}&search=${encodeURIComponent(search)}${category ? `&category=${category}` : ""}`,
        { token },
      ),
    get: (token: string, id: number) => apiFetch<Project>(`/api/admin/projects/${id}`, { token }),
    create: (token: string, data: Partial<Project>) =>
      apiFetch<Project>("/api/admin/projects", { method: "POST", body: JSON.stringify(data), token }),
    update: (token: string, id: number, data: Partial<Project>) =>
      apiFetch<Project>(`/api/admin/projects/${id}`, { method: "PUT", body: JSON.stringify(data), token }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/projects/${id}`, { method: "DELETE", token }),
  },

  services: {
    list: (token: string, page = 0, size = 10, search = "") =>
      apiFetch<PageResponse<ServiceItem>>(
        `/api/admin/services?page=${page}&size=${size}&search=${encodeURIComponent(search)}`,
        { token },
      ),
    get: (token: string, id: number) => apiFetch<ServiceItem>(`/api/admin/services/${id}`, { token }),
    create: (token: string, data: Partial<ServiceItem>) =>
      apiFetch<ServiceItem>("/api/admin/services", { method: "POST", body: JSON.stringify(data), token }),
    update: (token: string, id: number, data: Partial<ServiceItem>) =>
      apiFetch<ServiceItem>(`/api/admin/services/${id}`, { method: "PUT", body: JSON.stringify(data), token }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/services/${id}`, { method: "DELETE", token }),
  },

  news: {
    list: (token: string, page = 0, size = 10, search = "") =>
      apiFetch<PageResponse<NewsArticle>>(
        `/api/admin/news?page=${page}&size=${size}&search=${encodeURIComponent(search)}`,
        { token },
      ),
    get: (token: string, id: number) => apiFetch<NewsArticle>(`/api/admin/news/${id}`, { token }),
    create: (token: string, data: Partial<NewsArticle>) =>
      apiFetch<NewsArticle>("/api/admin/news", { method: "POST", body: JSON.stringify(data), token }),
    update: (token: string, id: number, data: Partial<NewsArticle>) =>
      apiFetch<NewsArticle>(`/api/admin/news/${id}`, { method: "PUT", body: JSON.stringify(data), token }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/news/${id}`, { method: "DELETE", token }),
  },

  reviews: {
    list: (token: string, page = 0, size = 10, search = "") =>
      apiFetch<PageResponse<Review>>(
        `/api/admin/reviews?page=${page}&size=${size}&search=${encodeURIComponent(search)}`,
        { token },
      ),
    get: (token: string, id: number) => apiFetch<Review>(`/api/admin/reviews/${id}`, { token }),
    create: (token: string, data: Partial<Review>) =>
      apiFetch<Review>("/api/admin/reviews", { method: "POST", body: JSON.stringify(data), token }),
    update: (token: string, id: number, data: Partial<Review>) =>
      apiFetch<Review>(`/api/admin/reviews/${id}`, { method: "PUT", body: JSON.stringify(data), token }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/reviews/${id}`, { method: "DELETE", token }),
  },

  banners: {
    list: (token: string, page = 0, size = 10, search = "") =>
      apiFetch<PageResponse<Banner>>(
        `/api/admin/banners?page=${page}&size=${size}&search=${encodeURIComponent(search)}`,
        { token },
      ),
    get: (token: string, id: number) => apiFetch<Banner>(`/api/admin/banners/${id}`, { token }),
    create: (token: string, data: Partial<Banner>) =>
      apiFetch<Banner>("/api/admin/banners", { method: "POST", body: JSON.stringify(data), token }),
    update: (token: string, id: number, data: Partial<Banner>) =>
      apiFetch<Banner>(`/api/admin/banners/${id}`, { method: "PUT", body: JSON.stringify(data), token }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/banners/${id}`, { method: "DELETE", token }),
  },

  quoteRequests: {
    list: (token: string, page = 0, size = 10, search = "") =>
      apiFetch<PageResponse<QuoteRequest>>(
        `/api/admin/quote-requests?page=${page}&size=${size}&search=${encodeURIComponent(search)}`,
        { token },
      ),
    updateStatus: (token: string, id: number, status: string) =>
      apiFetch<QuoteRequest>(`/api/admin/quote-requests/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        token,
      }),
    remove: (token: string, id: number) =>
      apiFetch<void>(`/api/admin/quote-requests/${id}`, { method: "DELETE", token }),
  },

  settings: {
    get: (token: string) => apiFetch<SiteSettings>("/api/admin/settings", { token }),
    update: (token: string, data: SiteSettings) =>
      apiFetch<SiteSettings>("/api/admin/settings", { method: "PUT", body: JSON.stringify(data), token }),
  },

  upload: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE_URL}/api/admin/uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new ApiError("Tải file thất bại", res.status);
    return res.json() as Promise<{ url: string }>;
  },
};
