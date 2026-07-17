-- Swap in a different set of images for banners and lan can sắt (service + project),
-- per user feedback requesting more variety for these two.

-- Banners
UPDATE banners SET media_url = 'https://images.pexels.com/photos/10643339/pexels-photo-10643339.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'HERO';
UPDATE banners SET media_url = 'https://images.pexels.com/photos/38165348/pexels-photo-38165348.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'CTA';

-- Service: lan can sắt
UPDATE service_items SET
    hero_image_url = 'https://images.pexels.com/photos/16902302/pexels-photo-16902302.jpeg?auto=compress&cs=tinysrgb&w=1600',
    gallery_image_urls = '["https://images.pexels.com/photos/874622/pexels-photo-874622.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/5092751/pexels-photo-5092751.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/8419077/pexels-photo-8419077.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-sat';

-- Project: lan can ban công căn hộ Landmark
UPDATE projects SET
    cover_image_url = 'https://images.pexels.com/photos/5092751/pexels-photo-5092751.jpeg?auto=compress&cs=tinysrgb&w=1200',
    after_image_urls = '["https://images.pexels.com/photos/874622/pexels-photo-874622.jpeg?auto=compress&cs=tinysrgb&w=800"]',
    gallery_image_urls = '["https://images.pexels.com/photos/16902302/pexels-photo-16902302.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/8419077/pexels-photo-8419077.jpeg?auto=compress&cs=tinysrgb&w=800"]'
    WHERE slug = 'lan-can-ban-cong-can-ho-landmark';
