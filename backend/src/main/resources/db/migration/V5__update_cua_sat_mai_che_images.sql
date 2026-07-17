-- Swap in a different, sharper set of images specifically for cửa sắt and mái che
-- (services + matching projects), per user feedback that these two needed variety.

-- Services: cửa sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/32573103/pexels-photo-32573103.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/31193549/pexels-photo-31193549.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/8397573/pexels-photo-8397573.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/28542156/pexels-photo-28542156.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat';

-- Services: mái che
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/33874417/pexels-photo-33874417.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/36923544/pexels-photo-36923544.png?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/33181595/pexels-photo-33181595.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/9800008/pexels-photo-9800008.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che';

-- Project: cửa sắt CNC Gò Vấp
UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/32573103/pexels-photo-32573103.jpeg?auto=compress&cs=tinysrgb&w=1200',
    before_image_urls = '["https://images.pexels.com/photos/8397573/pexels-photo-8397573.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    after_image_urls = '["https://images.pexels.com/photos/31193549/pexels-photo-31193549.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/28542156/pexels-photo-28542156.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'cua-sat-cnc-nha-pho-go-vap';

-- Project: mái che sân vườn Thủ Đức
UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/33874417/pexels-photo-33874417.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/36923544/pexels-photo-36923544.png?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/33181595/pexels-photo-33181595.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'mai-che-san-vuon-biet-thu-thu-duc';
