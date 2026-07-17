export type ServiceCategory =
  | "CUA_SAT"
  | "CAU_THANG"
  | "LAN_CAN"
  | "CONG_SAT"
  | "MAI_CHE"
  | "HANG_RAO";

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  CUA_SAT: "Cửa Sắt",
  CAU_THANG: "Cầu Thang",
  LAN_CAN: "Lan Can",
  CONG_SAT: "Cổng Sắt",
  MAI_CHE: "Mái Che",
  HANG_RAO: "Hàng Rào",
};

export type BannerPosition = "HERO" | "CTA";
export type MediaType = "IMAGE" | "VIDEO";
export type QuoteStatus = "NEW" | "CONTACTED" | "DONE";

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ServiceCategory;
  location: string | null;
  year: number | null;
  area: string | null;
  material: string | null;
  customerName: string | null;
  durationDays: number | null;
  description: string | null;
  coverImageUrl: string | null;
  beforeImageUrls: string[];
  afterImageUrls: string[];
  galleryImageUrls: string[];
  videoUrl: string | null;
  panorama360Url: string | null;
  featured: boolean;
  createdAt: string;
}

export interface MaterialRow {
  name: string;
  spec: string;
  note: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string | null;
  content: string | null;
  advantages: string[];
  materialsTable: MaterialRow[];
  heroImageUrl: string | null;
  galleryImageUrls: string[];
  faqs: Faq[];
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  author: string | null;
}

export interface Review {
  id: number;
  customerName: string;
  avatarUrl: string | null;
  rating: number;
  content: string | null;
  projectId: number | null;
  approved: boolean;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string | null;
  mediaUrl: string;
  mediaType: MediaType;
  ctaText: string | null;
  ctaLink: string | null;
  position: BannerPosition;
  active: boolean;
  sortOrder: number;
}

export interface QuoteRequestPayload {
  name: string;
  phone: string;
  email?: string;
  serviceCategory?: ServiceCategory;
  message?: string;
}

export interface QuoteRequest {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  serviceCategory: ServiceCategory | null;
  message: string | null;
  status: QuoteStatus;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface SiteSettings {
  hotline?: string;
  zalo?: string;
  address?: string;
  email?: string;
  map_embed_url?: string;
  facebook_url?: string;
  working_hours?: string;
  [key: string]: string | undefined;
}
