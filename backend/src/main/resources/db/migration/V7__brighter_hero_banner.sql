-- Swap the hero banner for a brighter, more visually appealing photo
-- (previous choice read as too dark/moody per user feedback).
UPDATE banners SET media_url = 'https://images.pexels.com/photos/31530650/pexels-photo-31530650.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'HERO';
