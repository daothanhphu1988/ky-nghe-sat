# Kỹ Nghệ Sắt — Website Xưởng Cơ Khí & Kỹ Nghệ Sắt

Full-stack website cho xưởng cơ khí/kỹ nghệ sắt: trang marketing công khai (Next.js) + trang quản trị (Admin CMS) + backend API (Spring Boot/PostgreSQL/JWT).

## Cấu trúc

```
ky-nghe-sat/
  frontend/        Next.js 15 (App Router, TypeScript, Tailwind CSS v4, Motion)
  backend/         Spring Boot 3.3 (Java 21, Spring Security JWT, JPA, Flyway)
  docker-compose.yml   PostgreSQL cho local dev
```

## Yêu cầu

- Node.js 20+
- Java 21+, Maven
- Docker (chạy PostgreSQL local)

## Chạy dự án

### 1. Khởi động PostgreSQL

```bash
docker compose up -d
```

Postgres chạy ở cổng **5433** trên host (map vào 5432 trong container) để tránh xung đột với Postgres cài sẵn trên máy. Database: `kynghesat` / user: `kynghesat` / password: `kynghesat`.

### 2. Chạy Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Backend chạy ở `http://localhost:8080`. Flyway sẽ tự động tạo schema và seed dữ liệu mẫu khi khởi động lần đầu.

**Tài khoản admin mặc định:** `admin` / `admin123` (đổi ngay khi triển khai thật).

### 3. Chạy Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy ở `http://localhost:3000`. Trang quản trị: `http://localhost:3000/admin/login`.

## Kiến trúc API

- Public: `GET /api/projects`, `/api/services`, `/api/news`, `/api/reviews`, `/api/banners`, `/api/settings`, `POST /api/quote-requests`
- Auth: `POST /api/auth/login` → JWT (720 phút)
- Admin (yêu cầu `Authorization: Bearer <token>`, role ADMIN): CRUD đầy đủ dưới `/api/admin/**`
- Upload ảnh: `POST /api/admin/uploads` (multipart) — lưu vào `backend/uploads/`, phục vụ qua `/uploads/**`.
  Đây là giải pháp lưu trữ tạm thời cho local dev; khi triển khai thật nên thay bằng **Supabase Storage** (đổi `UploadController` để gọi Supabase Storage API thay vì ghi file cục bộ).

## Biến môi trường

**Backend** (`backend/src/main/resources/application.yml`, override qua env var):
- `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`, `UPLOADS_DIR`, `UPLOADS_PUBLIC_BASE_URL`

**Frontend** (`frontend/.env.local`):
- `NEXT_PUBLIC_API_URL` (mặc định `http://localhost:8080`)
- `NEXT_PUBLIC_SITE_URL` (dùng cho sitemap/OG, mặc định `https://kynghesat.vn`)

## Phạm vi đã hoàn thành (Phase 1 + 2 theo roadmap gốc)

- Trang công khai: Home, Giới thiệu, Dịch vụ (overview + 6 landing page theo slug SEO `/cua-sat`, `/cau-thang-sat`...), Dự án (list + filter + detail với before/after slider), Gallery (masonry + lightbox), Tin tức, Liên hệ, Nhận báo giá.
- Admin CMS: đăng nhập JWT, dashboard, CRUD Dự án/Dịch vụ/Tin tức/Đánh giá/Banner, hộp thư Yêu cầu báo giá, Cài đặt chung.
- SEO: metadata theo từng trang, sitemap.xml, robots.txt, JSON-LD (Organization), OpenGraph.

## Chưa triển khai (Phase 3 / ngoài phạm vi lần này)

- Tích hợp Supabase Storage thật cho upload ảnh (hiện dùng lưu trữ local).
- Chat trực tuyến, video gallery nâng cao, ảnh 360°/drone thật (đã có chỗ chứa URL nhưng chưa có pipeline xử lý).
- Deploy thật lên Vercel/Railway/Supabase.
