# Clear zume_postmeta_lang_transfer
TRUNCATE zume_postmeta_lang_transfer;

# Move language to transfer

# Activities
INSERT INTO zume_postmeta_lang_transfer
SELECT pm.meta_id, pm1.meta_value as source, pm.meta_value as translation
FROM zume_postmeta pm
         JOIN zume_posts p ON p.ID=pm.post_id AND p.post_type = 'zume_activities'
         LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'title_','en' )
WHERE pm.meta_key = CONCAT( 'title_', 'es' )
UNION ALL
SELECT pm.meta_id, pm1.meta_value as source, pm.meta_value as translation
FROM zume_postmeta pm
         JOIN zume_posts p ON p.ID=pm.post_id AND p.post_type = 'zume_activities'
         LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'content_','en' )
WHERE pm.meta_key = CONCAT( 'content_', 'es' );


# Edit HTML entities
UPDATE zume_postmeta pm
SET pm.meta_value = REPLACE( pm.meta_value, '&rsquo;', '’' )
WHERE pm.meta_value LIKE '%&rsquo;%';

UPDATE zume_postmeta pm
SET pm.meta_value = REPLACE( pm.meta_value, '&ldquo;', '”' )
WHERE pm.meta_value LIKE '%&ldquo;%';

UPDATE zume_postmeta pm
SET pm.meta_value = REPLACE( pm.meta_value, '&ndash;', '–' )
WHERE pm.meta_value LIKE '%&ndash;%';

UPDATE zume_postmeta pm
SET pm.meta_value = REPLACE( pm.meta_value, '&rdquo;', '”' )
WHERE pm.meta_value LIKE '%&rdquo;%';






# Messages
INSERT INTO zume_postmeta_lang_transfer
SELECT pm.meta_id, pm1.meta_value as source, pm.meta_value as translation
FROM zume_postmeta pm
         JOIN zume_posts p ON p.ID=pm.post_id AND p.post_type = 'zume_messages'
         LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'subject_','en' )
WHERE pm.meta_key = CONCAT( 'subject_','es' )
UNION ALL
SELECT pm.meta_id, pm1.meta_value as source, pm.meta_value as translation
FROM zume_postmeta pm
         JOIN zume_posts p ON p.ID=pm.post_id AND p.post_type = 'zume_messages'
         LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'body_','en' )
WHERE pm.meta_key = CONCAT( 'body_','es' );




# INSERT INTO zume_postmeta_lang_transfer
INSERT INTO zume_postmeta_lang_transfer
SELECT t.meta_id, s.source, t.translation
FROM (
         SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as source
         FROM zume_posts p
                  JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'en'
                  JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                  LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_piece_h1'
         WHERE p.post_type = 'zume_pieces'
     ) as s
         JOIN (
    SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as translation
    FROM zume_posts p
             JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'es'
             JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
             LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_piece_h1'
    WHERE p.post_type = 'zume_pieces'
) t ON t.piece=s.piece
UNION ALL
SELECT t.meta_id, s.source, t.translation
FROM (
         SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as source
         FROM zume_posts p
                  JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'en'
                  JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                  LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_pre_video_content'
         WHERE p.post_type = 'zume_pieces'
     ) as s
         JOIN (
    SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as translation
    FROM zume_posts p
             JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'es'
             JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
             LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_pre_video_content'
    WHERE p.post_type = 'zume_pieces'
) t ON t.piece=s.piece
UNION ALL
SELECT t.meta_id, s.source, t.translation
FROM (
         SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as source
         FROM zume_posts p
                  JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'en'
                  JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                  LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_post_video_content'
         WHERE p.post_type = 'zume_pieces'
     ) as s
         JOIN (
    SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as translation
    FROM zume_posts p
             JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'es'
             JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
             LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_post_video_content'
    WHERE p.post_type = 'zume_pieces'
) t ON t.piece=s.piece
UNION ALL
SELECT t.meta_id, s.source, t.translation
FROM (
         SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as source
         FROM zume_posts p
                  JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'en'
                  JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                  LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_ask_content'
         WHERE p.post_type = 'zume_pieces'
     ) as s
         JOIN (
    SELECT pm2.meta_id, pm.post_id, pm1.meta_value as piece, pm2.meta_value as translation
    FROM zume_posts p
             JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = 'es'
             JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
             LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'zume_ask_content'
    WHERE p.post_type = 'zume_pieces'
) t ON t.piece=s.piece;






# Update postmeta from transfer
UPDATE zume_postmeta
    INNER JOIN zume_postmeta_lang_transfer ON zume_postmeta_lang_transfer.meta_id=zume_postmeta.meta_id
SET zume_postmeta.meta_value = zume_postmeta_lang_transfer.translation;
