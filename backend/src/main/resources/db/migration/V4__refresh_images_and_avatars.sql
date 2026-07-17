-- Swap in a fresh, different set of real ironwork photos + real people avatars
-- (replacing the V3 selection and the pravatar.cc placeholder avatars).

-- Banners
UPDATE banners SET media_url = 'https://images.pexels.com/photos/37276922/pexels-photo-37276922.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'HERO';
UPDATE banners SET media_url = 'https://images.pexels.com/photos/29386088/pexels-photo-29386088.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'CTA';

-- Services: cửa sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/5246957/pexels-photo-5246957.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/9963108/pexels-photo-9963108.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/9963109/pexels-photo-9963109.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/10618832/pexels-photo-10618832.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat';

-- Services: cầu thang sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/14764274/pexels-photo-14764274.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/12666699/pexels-photo-12666699.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/24702899/pexels-photo-24702899.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/34574592/pexels-photo-34574592.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cau-thang-sat';

-- Services: lan can sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/26939054/pexels-photo-26939054.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/10609264/pexels-photo-10609264.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/20125319/pexels-photo-20125319.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35013711/pexels-photo-35013711.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-sat';

-- Services: cổng sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/37276922/pexels-photo-37276922.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/18654635/pexels-photo-18654635.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/16639492/pexels-photo-16639492.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/32961547/pexels-photo-32961547.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cong-sat';

-- Services: mái che
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/8287570/pexels-photo-8287570.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/12762731/pexels-photo-12762731.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/10682522/pexels-photo-10682522.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/34006096/pexels-photo-34006096.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che';

-- Services: hàng rào sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/7475558/pexels-photo-7475558.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/10485438/pexels-photo-10485438.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/18416368/pexels-photo-18416368.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/31893562/pexels-photo-31893562.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'hang-rao-sat';

-- Projects
UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/18654635/pexels-photo-18654635.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/32961547/pexels-photo-32961547.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/37276922/pexels-photo-37276922.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/16639492/pexels-photo-16639492.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/9963108/pexels-photo-9963108.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/10618832/pexels-photo-10618832.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cong-sat-biet-thu-thao-dien';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/14764274/pexels-photo-14764274.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/24702899/pexels-photo-24702899.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/12666699/pexels-photo-12666699.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/34574592/pexels-photo-34574592.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/37040585/pexels-photo-37040585.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/28542169/pexels-photo-28542169.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cau-thang-sat-kinh-phu-nhuan';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/26939054/pexels-photo-26939054.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/10609264/pexels-photo-10609264.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/20125319/pexels-photo-20125319.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/35013711/pexels-photo-35013711.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-ban-cong-can-ho-landmark';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/5246957/pexels-photo-5246957.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/9963108/pexels-photo-9963108.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/9963109/pexels-photo-9963109.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/10618832/pexels-photo-10618832.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/23224209/pexels-photo-23224209.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat-cnc-nha-pho-go-vap';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/8287570/pexels-photo-8287570.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/12762731/pexels-photo-12762731.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/10682522/pexels-photo-10682522.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che-san-vuon-biet-thu-thu-duc';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/7475558/pexels-photo-7475558.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/18416368/pexels-photo-18416368.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/10485438/pexels-photo-10485438.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/31893562/pexels-photo-31893562.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/36443019/pexels-photo-36443019.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'hang-rao-sat-nha-xuong-binh-chanh';

-- News covers
UPDATE news SET cover_image_url = 'https://images.pexels.com/photos/16639492/pexels-photo-16639492.jpeg?auto=compress&cs=tinysrgb&w=1200'
    WHERE slug = '5-mau-cong-sat-dep-2026';
UPDATE news SET cover_image_url = 'https://images.pexels.com/photos/34574592/pexels-photo-34574592.jpeg?auto=compress&cs=tinysrgb&w=1200'
    WHERE slug = 'cach-bao-quan-cau-thang-sat';

-- Review avatars: swap pravatar.cc random faces for real people portraits
UPDATE reviews SET avatar_url = 'https://images.pexels.com/photos/4558592/pexels-photo-4558592.jpeg?auto=compress&cs=tinysrgb&w=150'
    WHERE customer_name = 'Anh Minh';
UPDATE reviews SET avatar_url = 'https://images.pexels.com/photos/4078393/pexels-photo-4078393.jpeg?auto=compress&cs=tinysrgb&w=150'
    WHERE customer_name = 'Chị Lan';
UPDATE reviews SET avatar_url = 'https://images.pexels.com/photos/17503453/pexels-photo-17503453.jpeg?auto=compress&cs=tinysrgb&w=150'
    WHERE customer_name = 'Anh Tuấn';
