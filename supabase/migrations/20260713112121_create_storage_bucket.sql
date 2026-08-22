/*
# Create product-images storage bucket

1. Creates a public storage bucket named "product-images" for uploading product images.
2. Adds storage policies allowing public read and authenticated write.
*/

-- Create product-images storage bucket


-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('product-images', 'product-images', true)
-- ON CONFLICT (id) DO NOTHING;

-- -- Enable RLS
-- ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- -- Allow public read
-- DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
-- CREATE POLICY "public_read_product_images" ON storage.objects
--   FOR SELECT TO anon, authenticated
--   USING (bucket_id = 'product-images');

-- -- Allow authenticated upload (with path restriction)
-- DROP POLICY IF EXISTS "auth_upload_product_images" ON storage.objects;
-- CREATE POLICY "auth_upload_product_images" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (
--     bucket_id = 'product-images'
--   );

-- -- Allow authenticated update
-- DROP POLICY IF EXISTS "auth_update_product_images" ON storage.objects;
-- CREATE POLICY "auth_update_product_images" ON storage.objects
--   FOR UPDATE TO authenticated
--   USING (bucket_id = 'product-images') 
--   WITH CHECK (bucket_id = 'product-images');

-- -- Allow authenticated delete
-- DROP POLICY IF EXISTS "auth_delete_product_images" ON storage.objects;
-- CREATE POLICY "auth_delete_product_images" ON storage.objects
--   FOR DELETE TO authenticated
--   USING (bucket_id = 'product-images');



-- Create product-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Allow public read
DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

-- Allow authenticated upload (with path restriction)
DROP POLICY IF EXISTS "auth_upload_product_images" ON storage.objects;
CREATE POLICY "auth_upload_product_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
  );

-- Allow authenticated update
DROP POLICY IF EXISTS "auth_update_product_images" ON storage.objects;
CREATE POLICY "auth_update_product_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images') 
  WITH CHECK (bucket_id = 'product-images');

-- Allow authenticated delete
DROP POLICY IF EXISTS "auth_delete_product_images" ON storage.objects;
CREATE POLICY "auth_delete_product_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-images');