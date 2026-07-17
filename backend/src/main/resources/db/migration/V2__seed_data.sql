-- Default admin user: username "admin" / password "admin123" (CHANGE IN PRODUCTION)
INSERT INTO admin_users (username, password_hash, role, created_at, updated_at)
VALUES ('admin', '$2a$10$ZZrTJUq08KGvMRk2peG0Ku0R/4brkmQ9ghUIzJ4yJegb9kLUv/YQe', 'ADMIN', now(), now());

INSERT INTO site_settings (setting_key, setting_value) VALUES
    ('hotline', '0909 123 456'),
    ('zalo', '0909123456'),
    ('address', '123 Quốc lộ 1A, Quận Bình Tân, TP. Hồ Chí Minh'),
    ('email', 'lienhe@kynghesat.vn'),
    ('map_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125387.65!2d106.6!3d10.75'),
    ('facebook_url', 'https://facebook.com/kynghesat'),
    ('working_hours', '7:30 - 17:30, Thứ 2 - Thứ 7');

INSERT INTO banners (title, subtitle, media_url, media_type, cta_text, cta_link, position, active, sort_order, created_at, updated_at) VALUES
    ('Thi công Cửa Sắt - Cầu Thang - Lan Can - Cổng Sắt', 'Thiết kế theo yêu cầu, bền đẹp theo thời gian', 'https://picsum.photos/seed/hero1/1920/1080', 'IMAGE', 'Nhận báo giá', '/lien-he', 'HERO', true, 1, now(), now()),
    ('Bạn cần thi công cửa sắt?', 'Liên hệ ngay để được khảo sát miễn phí', 'https://picsum.photos/seed/cta1/1920/800', 'IMAGE', 'Nhận báo giá', '/lien-he', 'CTA', true, 1, now(), now());

INSERT INTO service_items (slug, name, category, short_description, content, advantages, hero_image_url, gallery_image_urls, created_at, updated_at) VALUES
    ('cua-sat', 'Cửa Sắt', 'CUA_SAT', 'Cửa sắt nghệ thuật, cửa sắt CNC bền đẹp, an toàn cho mọi công trình.',
     'Xưởng chúng tôi chuyên gia công cửa sắt nghệ thuật, cửa sắt CNC theo yêu cầu với đa dạng mẫu mã, phù hợp cho nhà phố, biệt thự, căn hộ.',
     '["Thiết kế đa dạng theo yêu cầu","Vật liệu sắt hộp, sắt mỹ thuật cao cấp","Sơn tĩnh điện chống gỉ sét","Bảo hành dài hạn"]',
     'https://picsum.photos/seed/cuasat-hero/1600/900',
     '["https://picsum.photos/seed/cuasat-1/800/600","https://picsum.photos/seed/cuasat-2/800/600","https://picsum.photos/seed/cuasat-3/800/600"]',
     now(), now()),
    ('cau-thang-sat', 'Cầu Thang Sắt', 'CAU_THANG', 'Cầu thang sắt hiện đại, chắc chắn, tối ưu không gian sống.',
     'Cầu thang sắt kết hợp kính cường lực hoặc gỗ, thiết kế hiện đại, thi công nhanh gọn và an toàn.',
     '["Kết cấu chịu lực tốt","Kết hợp đa dạng vật liệu: kính, gỗ, inox","Thi công nhanh, ít ảnh hưởng kết cấu nhà","Phong cách hiện đại, sang trọng"]',
     'https://picsum.photos/seed/cauthang-hero/1600/900',
     '["https://picsum.photos/seed/cauthang-1/800/600","https://picsum.photos/seed/cauthang-2/800/600","https://picsum.photos/seed/cauthang-3/800/600"]',
     now(), now()),
    ('lan-can-sat', 'Lan Can Sắt', 'LAN_CAN', 'Lan can sắt mỹ thuật an toàn cho ban công, cầu thang, sân thượng.',
     'Lan can sắt được gia công tỉ mỉ, đảm bảo an toàn tuyệt đối cho gia đình bạn với nhiều mẫu hoa văn tinh xảo.',
     '["An toàn, chắc chắn","Hoa văn mỹ thuật tinh xảo","Chống gỉ sét theo thời gian","Giá thành hợp lý"]',
     'https://picsum.photos/seed/lancan-hero/1600/900',
     '["https://picsum.photos/seed/lancan-1/800/600","https://picsum.photos/seed/lancan-2/800/600","https://picsum.photos/seed/lancan-3/800/600"]',
     now(), now()),
    ('cong-sat', 'Cổng Sắt', 'CONG_SAT', 'Cổng sắt nghệ thuật, cổng sắt CNC đẳng cấp cho biệt thự, nhà phố.',
     'Cổng sắt là điểm nhấn đầu tiên của ngôi nhà, chúng tôi mang đến các mẫu cổng sắt nghệ thuật sang trọng, bền vững.',
     '["Thiết kế theo phong thủy gia chủ","Chất liệu sắt hộp mạ kẽm cao cấp","Sơn tĩnh điện 2 lớp chống ăn mòn","Lắp đặt hệ thống cổng tự động theo yêu cầu"]',
     'https://picsum.photos/seed/congsat-hero/1600/900',
     '["https://picsum.photos/seed/congsat-1/800/600","https://picsum.photos/seed/congsat-2/800/600","https://picsum.photos/seed/congsat-3/800/600"]',
     now(), now()),
    ('mai-che', 'Mái Che', 'MAI_CHE', 'Mái che di động, mái xếp, mái polycarbonate chống nắng mưa hiệu quả.',
     'Mái che khung sắt kết hợp tôn hoặc polycarbonate, giải pháp che nắng mưa tối ưu cho sân vườn, ban công, bãi xe.',
     '["Khung sắt chắc chắn, chịu lực tốt","Vật liệu lấy sáng cao cấp","Thi công nhanh trong 1-2 ngày","Chống nóng, chống ồn hiệu quả"]',
     'https://picsum.photos/seed/maiche-hero/1600/900',
     '["https://picsum.photos/seed/maiche-1/800/600","https://picsum.photos/seed/maiche-2/800/600","https://picsum.photos/seed/maiche-3/800/600"]',
     now(), now()),
    ('hang-rao-sat', 'Hàng Rào Sắt', 'HANG_RAO', 'Hàng rào sắt bảo vệ khuôn viên, biệt thự, nhà xưởng chắc chắn.',
     'Hàng rào sắt được thiết kế đa dạng kiểu dáng, đảm bảo an ninh và thẩm mỹ cho khuôn viên nhà bạn.',
     '["Đa dạng kiểu dáng, chiều cao","Khả năng chống trộm cao","Kết hợp hài hòa với kiến trúc tổng thể","Chi phí thi công hợp lý"]',
     'https://picsum.photos/seed/hangrao-hero/1600/900',
     '["https://picsum.photos/seed/hangrao-1/800/600","https://picsum.photos/seed/hangrao-2/800/600","https://picsum.photos/seed/hangrao-3/800/600"]',
     now(), now());

INSERT INTO service_material_rows (service_item_id, row_order, material_name, material_spec, material_note) VALUES
    (1, 0, 'Sắt hộp mạ kẽm', '20x20 - 40x80mm', 'Chống gỉ sét tốt'),
    (1, 1, 'Sắt mỹ thuật CNC', 'Dày 2-3mm', 'Cắt CNC theo mẫu thiết kế'),
    (1, 2, 'Sơn tĩnh điện', '2 lớp', 'Đa dạng màu sắc'),
    (2, 0, 'Sắt hộp', '40x80 - 50x100mm', 'Khung chịu lực chính'),
    (2, 1, 'Kính cường lực', 'Dày 10-12mm', 'Tùy chọn thêm'),
    (2, 2, 'Tay vịn inox/gỗ', 'Phi 42-49mm', 'Tùy chọn thêm');

INSERT INTO service_faqs (service_item_id, faq_order, question, answer) VALUES
    (1, 0, 'Thời gian thi công cửa sắt mất bao lâu?', 'Thông thường từ 5-10 ngày tùy độ phức tạp của mẫu thiết kế.'),
    (1, 1, 'Có bảo hành sản phẩm không?', 'Có, chúng tôi bảo hành từ 12-24 tháng tùy hạng mục.'),
    (2, 0, 'Cầu thang sắt có ồn khi đi lại không?', 'Không, chúng tôi xử lý kỹ thuật giảm rung và tiếng ồn khi thi công.'),
    (4, 0, 'Có làm cổng sắt tự động không?', 'Có, chúng tôi nhận thi công cổng sắt tích hợp motor tự động theo yêu cầu.');

INSERT INTO projects (title, slug, category, location, year, area, material, customer_name, duration_days, description, cover_image_url, before_image_urls, after_image_urls, gallery_image_urls, video_url, panorama360_url, featured, created_at, updated_at) VALUES
    ('Cổng sắt nghệ thuật biệt thự Thảo Điền', 'cong-sat-biet-thu-thao-dien', 'CONG_SAT', 'Quận 2, TP.HCM', 2025, '25m2', 'Sắt hộp mạ kẽm, sơn tĩnh điện', 'Anh Minh', 12,
     'Công trình cổng sắt nghệ thuật kết hợp hàng rào cho biệt thự phong cách tân cổ điển.',
     'https://picsum.photos/seed/proj1-cover/1200/800',
     '["https://picsum.photos/seed/proj1-before1/800/600"]',
     '["https://picsum.photos/seed/proj1-after1/800/600","https://picsum.photos/seed/proj1-after2/800/600"]',
     '["https://picsum.photos/seed/proj1-g1/800/600","https://picsum.photos/seed/proj1-g2/800/600","https://picsum.photos/seed/proj1-g3/800/600"]',
     null, null, true, now(), now()),
    ('Cầu thang sắt kính nhà phố Phú Nhuận', 'cau-thang-sat-kinh-phu-nhuan', 'CAU_THANG', 'Quận Phú Nhuận, TP.HCM', 2025, '15m2', 'Sắt hộp, kính cường lực 12mm', 'Chị Lan', 7,
     'Cầu thang sắt kính hiện đại tối ưu ánh sáng cho nhà phố 4 tầng.',
     'https://picsum.photos/seed/proj2-cover/1200/800',
     '["https://picsum.photos/seed/proj2-before1/800/600"]',
     '["https://picsum.photos/seed/proj2-after1/800/600","https://picsum.photos/seed/proj2-after2/800/600"]',
     '["https://picsum.photos/seed/proj2-g1/800/600","https://picsum.photos/seed/proj2-g2/800/600"]',
     null, null, true, now(), now()),
    ('Lan can ban công căn hộ Landmark', 'lan-can-ban-cong-can-ho-landmark', 'LAN_CAN', 'Quận Bình Thạnh, TP.HCM', 2024, '8m2', 'Sắt mỹ thuật CNC', 'Anh Tuấn', 3,
     'Lan can ban công hoa văn mỹ thuật cho căn hộ cao cấp.',
     'https://picsum.photos/seed/proj3-cover/1200/800',
     '[]', '["https://picsum.photos/seed/proj3-after1/800/600"]',
     '["https://picsum.photos/seed/proj3-g1/800/600","https://picsum.photos/seed/proj3-g2/800/600"]',
     null, null, true, now(), now()),
    ('Cửa sắt CNC nhà phố Gò Vấp', 'cua-sat-cnc-nha-pho-go-vap', 'CUA_SAT', 'Quận Gò Vấp, TP.HCM', 2024, '12m2', 'Sắt hộp, sắt mỹ thuật CNC', 'Anh Hùng', 8,
     'Cửa sắt cổng chính kết hợp hoa văn CNC hiện đại.',
     'https://picsum.photos/seed/proj4-cover/1200/800',
     '["https://picsum.photos/seed/proj4-before1/800/600"]',
     '["https://picsum.photos/seed/proj4-after1/800/600"]',
     '["https://picsum.photos/seed/proj4-g1/800/600","https://picsum.photos/seed/proj4-g2/800/600"]',
     null, null, false, now(), now()),
    ('Mái che sân vườn biệt thự Thủ Đức', 'mai-che-san-vuon-biet-thu-thu-duc', 'MAI_CHE', 'TP. Thủ Đức', 2024, '40m2', 'Khung sắt, mái polycarbonate', 'Chị Hoa', 5,
     'Mái che sân vườn lấy sáng, chống nóng cho khu vực sinh hoạt ngoài trời.',
     'https://picsum.photos/seed/proj5-cover/1200/800',
     '[]', '["https://picsum.photos/seed/proj5-after1/800/600"]',
     '["https://picsum.photos/seed/proj5-g1/800/600"]',
     null, null, false, now(), now()),
    ('Hàng rào sắt nhà xưởng Bình Chánh', 'hang-rao-sat-nha-xuong-binh-chanh', 'HANG_RAO', 'Huyện Bình Chánh, TP.HCM', 2023, '120m2', 'Sắt hộp mạ kẽm', 'Công ty TNHH Phát Đạt', 15,
     'Hàng rào bảo vệ khuôn viên nhà xưởng quy mô lớn.',
     'https://picsum.photos/seed/proj6-cover/1200/800',
     '["https://picsum.photos/seed/proj6-before1/800/600"]',
     '["https://picsum.photos/seed/proj6-after1/800/600"]',
     '["https://picsum.photos/seed/proj6-g1/800/600","https://picsum.photos/seed/proj6-g2/800/600"]',
     null, null, false, now(), now());

INSERT INTO reviews (customer_name, avatar_url, rating, content, project_id, approved, created_at, updated_at) VALUES
    ('Anh Minh', 'https://i.pravatar.cc/150?img=12', 5, 'Xưởng thi công rất chuyên nghiệp, đúng tiến độ, chất lượng cổng sắt vượt mong đợi.', 1, true, now(), now()),
    ('Chị Lan', 'https://i.pravatar.cc/150?img=32', 5, 'Cầu thang sắt kính đẹp, đội thợ làm việc sạch sẽ, tư vấn nhiệt tình.', 2, true, now(), now()),
    ('Anh Tuấn', 'https://i.pravatar.cc/150?img=51', 4, 'Lan can chắc chắn, giá cả hợp lý, sẽ giới thiệu cho bạn bè.', 3, true, now(), now());

INSERT INTO news (slug, title, excerpt, content, cover_image_url, published_at, author, created_at, updated_at) VALUES
    ('5-mau-cong-sat-dep-2026', '5 Mẫu Cổng Sắt Đẹp Được Ưa Chuộng Nhất 2026', 'Tổng hợp các mẫu cổng sắt nghệ thuật đang là xu hướng được nhiều gia chủ lựa chọn.',
     'Nội dung chi tiết về các mẫu cổng sắt đẹp, xu hướng thiết kế, chất liệu phù hợp cho từng phong cách kiến trúc...',
     'https://picsum.photos/seed/news1/1200/700', now(), 'Kỹ Nghệ Sắt', now(), now()),
    ('cach-bao-quan-cau-thang-sat', 'Cách Bảo Quản Cầu Thang Sắt Bền Đẹp Theo Thời Gian', 'Hướng dẫn bảo dưỡng cầu thang sắt đúng cách để tránh gỉ sét, xuống cấp.',
     'Nội dung chi tiết hướng dẫn vệ sinh, sơn dặm, kiểm tra định kỳ cho cầu thang sắt...',
     'https://picsum.photos/seed/news2/1200/700', now(), 'Kỹ Nghệ Sắt', now(), now());
