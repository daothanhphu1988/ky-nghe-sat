-- 1) Even nicer hero banner: warm golden-hour shot of an ornate iron gate.
UPDATE banners SET media_url = 'https://images.pexels.com/photos/34440939/pexels-photo-34440939.jpeg?auto=compress&cs=tinysrgb&w=1920'
    WHERE position = 'HERO';

-- 2) The seeded map_embed_url used a fabricated Google Maps "pb" parameter, which
-- Google rejects ("Invalid request. Invalid 'pb' parameter") since that encoding
-- is generated per-place by Google and can't be hand-crafted. Switch to the
-- documented `q=<address>&output=embed` embed format, which is always valid
-- for any address string without needing a place-specific pb code.
UPDATE site_settings
SET setting_value = 'https://www.google.com/maps?q=123%20Qu%E1%BB%91c%20l%E1%BB%99%201A%2C%20Qu%E1%BA%ADn%20B%C3%ACnh%20T%C3%A2n%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh&output=embed'
WHERE setting_key = 'map_embed_url';
