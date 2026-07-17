CREATE TABLE admin_users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    year INTEGER,
    area VARCHAR(100),
    material VARCHAR(255),
    customer_name VARCHAR(255),
    duration_days INTEGER,
    description TEXT,
    cover_image_url VARCHAR(500),
    before_image_urls TEXT,
    after_image_urls TEXT,
    gallery_image_urls TEXT,
    video_url VARCHAR(500),
    panorama360_url VARCHAR(500),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);

CREATE TABLE service_items (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    short_description VARCHAR(500),
    content TEXT,
    advantages TEXT,
    hero_image_url VARCHAR(500),
    gallery_image_urls TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE service_material_rows (
    service_item_id BIGINT NOT NULL REFERENCES service_items(id) ON DELETE CASCADE,
    row_order INTEGER NOT NULL,
    material_name VARCHAR(255),
    material_spec VARCHAR(255),
    material_note VARCHAR(500),
    PRIMARY KEY (service_item_id, row_order)
);

CREATE TABLE service_faqs (
    service_item_id BIGINT NOT NULL REFERENCES service_items(id) ON DELETE CASCADE,
    faq_order INTEGER NOT NULL,
    question VARCHAR(500),
    answer VARCHAR(2000),
    PRIMARY KEY (service_item_id, faq_order)
);

CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content TEXT,
    cover_image_url VARCHAR(500),
    published_at TIMESTAMP,
    author VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    rating INTEGER NOT NULL,
    content TEXT,
    project_id BIGINT REFERENCES projects(id) ON DELETE SET NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE banners (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    cta_text VARCHAR(100),
    cta_link VARCHAR(500),
    position VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE quote_requests (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    service_category VARCHAR(50),
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);

CREATE TABLE site_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT
);
