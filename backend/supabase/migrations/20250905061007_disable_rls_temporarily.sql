-- Temporarily disable RLS on questions table to test AI engagement functionality
ALTER TABLE "public"."questions" DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on questions table
DROP POLICY IF EXISTS "Users and AI can create questions" ON "public"."questions";
DROP POLICY IF EXISTS "AI user can read questions" ON "public"."questions";
DROP POLICY IF EXISTS "Anyone can read questions" ON "public"."questions";
DROP POLICY IF EXISTS "Authors can update own questions" ON "public"."questions";
