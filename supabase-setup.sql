-- 1. Create the expertise_images table
CREATE TABLE IF NOT EXISTS expertise_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT DEFAULT 'Expertise project',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE expertise_images ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to read images (Public Read)
DROP POLICY IF EXISTS "Allow public read-only access" ON expertise_images;
CREATE POLICY "Allow public read-only access" 
ON expertise_images FOR SELECT 
TO public 
USING (true);

-- 4. Create a policy to allow authenticated users to perform all operations (Admin Access)
DROP POLICY IF EXISTS "Allow authenticated users to manage images" ON expertise_images;
CREATE POLICY "Allow authenticated users to manage images" 
ON expertise_images FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- =================================================================
-- STORAGE PERMISSIONS (RUN THESE IN SQL EDITOR)
-- =================================================================
-- IMPORTANT: You must first create a bucket named 'projects' 
-- manually in the Supabase Dashboard -> Storage section.
-- Make sure to set the bucket to "Public".

-- 5. Allow users to upload files to the 'projects' bucket
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'projects');

-- 6. Allow users to update their own files
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'projects');

-- 7. Allow users to delete files
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'projects');

-- 8. Allow public to view files in the 'projects' bucket
CREATE POLICY "Allow public viewing"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'projects');
