-- Replace placeholder (picsum.photos) images with real, relevant, high-resolution
-- ironwork photography from Pexels (free-to-use stock photos).

-- Banners
UPDATE banners SET media_url = 'https://images.pexels.com/photos/37550788/pexels-photo-37550788.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'HERO';
UPDATE banners SET media_url = 'https://images.pexels.com/photos/5845980/pexels-photo-5845980.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'CTA';

-- Services: cửa sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/23224209/pexels-photo-23224209.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/17166735/pexels-photo-17166735.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/6387820/pexels-photo-6387820.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/32443466/pexels-photo-32443466.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat';

-- Services: cầu thang sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/5410796/pexels-photo-5410796.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/13005094/pexels-photo-13005094.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/37593216/pexels-photo-37593216.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cau-thang-sat';

-- Services: lan can sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/4045609/pexels-photo-4045609.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/19132785/pexels-photo-19132785.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/6562398/pexels-photo-6562398.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/4983378/pexels-photo-4983378.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-sat';

-- Services: cổng sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/37550788/pexels-photo-37550788.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/33388021/pexels-photo-33388021.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/8125961/pexels-photo-8125961.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/22590809/pexels-photo-22590809.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cong-sat';

-- Services: mái che
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/33652618/pexels-photo-33652618.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/10682523/pexels-photo-10682523.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/7561178/pexels-photo-7561178.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29239234/pexels-photo-29239234.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che';

-- Services: hàng rào sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/19368851/pexels-photo-19368851.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/36443019/pexels-photo-36443019.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/18717828/pexels-photo-18717828.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/18477122/pexels-photo-18477122.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'hang-rao-sat';

-- Projects
UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/33388021/pexels-photo-33388021.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/32443466/pexels-photo-32443466.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/37550788/pexels-photo-37550788.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/8125961/pexels-photo-8125961.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/22590809/pexels-photo-22590809.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/29134783/pexels-photo-29134783.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cong-sat-biet-thu-thao-dien';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/13005094/pexels-photo-13005094.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/12802936/pexels-photo-12802936.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/37593216/pexels-photo-37593216.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/5410796/pexels-photo-5410796.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/19132785/pexels-photo-19132785.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cau-thang-sat-kinh-phu-nhuan';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/4045609/pexels-photo-4045609.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/9825643/pexels-photo-9825643.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/6562398/pexels-photo-6562398.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/4983378/pexels-photo-4983378.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-ban-cong-can-ho-landmark';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/23224209/pexels-photo-23224209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/13316866/pexels-photo-13316866.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/6387820/pexels-photo-6387820.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/17166735/pexels-photo-17166735.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/32443466/pexels-photo-32443466.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat-cnc-nha-pho-go-vap';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/33652618/pexels-photo-33652618.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/10682523/pexels-photo-10682523.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/7561178/pexels-photo-7561178.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che-san-vuon-biet-thu-thu-duc';

UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/19368851/pexels-photo-19368851.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/220620/pexels-photo-220620.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/36443019/pexels-photo-36443019.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/18717828/pexels-photo-18717828.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/18477122/pexels-photo-18477122.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'hang-rao-sat-nha-xuong-binh-chanh';

-- News covers
UPDATE news SET cover_image_url = 'https://images.pexels.com/photos/8125961/pexels-photo-8125961.jpeg?auto=compress&cs=tinysrgb&w=1200'
    WHERE slug = '5-mau-cong-sat-dep-2026';
UPDATE news SET cover_image_url = 'https://images.pexels.com/photos/37593216/pexels-photo-37593216.jpeg?auto=compress&cs=tinysrgb&w=1200'
    WHERE slug = 'cach-bao-quan-cau-thang-sat';
