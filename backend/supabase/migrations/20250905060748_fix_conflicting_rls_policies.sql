-- Fix conflicting RLS policies for questions table
-- Drop the conflicting policy that requires auth.uid() = author_id
DROP POLICY IF EXISTS "Authenticated users can create questions" ON "public"."questions";

-- Create a new policy that allows both authenticated users and AI user to create questions
CREATE POLICY "Users and AI can create questions" ON "public"."questions" 
FOR INSERT WITH CHECK (
  (auth.uid() = author_id) OR 
  (author_id = '550e8400-e29b-41d4-a716-446655440003'::uuid)
);
