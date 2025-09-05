-- Re-enable RLS on questions table
ALTER TABLE "public"."questions" ENABLE ROW LEVEL SECURITY;

-- Add policy to allow AI user to create questions
CREATE POLICY "AI user can create questions" ON "public"."questions" 
FOR INSERT WITH CHECK (author_id = '550e8400-e29b-41d4-a716-446655440003');

-- Add policy to allow AI user to read all questions
CREATE POLICY "AI user can read questions" ON "public"."questions" 
FOR SELECT USING (true);

-- Re-enable RLS on users table
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

-- Add policy to allow AI user to read users
CREATE POLICY "AI user can read users" ON "public"."users" 
FOR SELECT USING (true);
