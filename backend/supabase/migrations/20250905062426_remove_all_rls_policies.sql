-- Remove all RLS policies and disable RLS on all tables
-- This migration removes all Row Level Security policies from the database

-- Drop all policies on questions table
DROP POLICY IF EXISTS "Users and AI can create questions" ON "public"."questions";
DROP POLICY IF EXISTS "AI user can create questions" ON "public"."questions";
DROP POLICY IF EXISTS "AI user can read questions" ON "public"."questions";
DROP POLICY IF EXISTS "Anyone can read questions" ON "public"."questions";
DROP POLICY IF EXISTS "Authenticated users can create questions" ON "public"."questions";
DROP POLICY IF EXISTS "Authors can update own questions" ON "public"."questions";

-- Drop all policies on users table
DROP POLICY IF EXISTS "AI user can read users" ON "public"."users";
DROP POLICY IF EXISTS "Users can view all profiles" ON "public"."users";
DROP POLICY IF EXISTS "Users can update own profile" ON "public"."users";

-- Drop all policies on answers table
DROP POLICY IF EXISTS "Anyone can read answers" ON "public"."answers";
DROP POLICY IF EXISTS "Authenticated users can create answers" ON "public"."answers";
DROP POLICY IF EXISTS "Authors can update own answers" ON "public"."answers";

-- Drop all policies on prototypes table
DROP POLICY IF EXISTS "Anyone can read prototypes" ON "public"."prototypes";
DROP POLICY IF EXISTS "Authenticated users can create prototypes" ON "public"."prototypes";
DROP POLICY IF EXISTS "Authors can update own prototypes" ON "public"."prototypes";

-- Drop all policies on reports table
DROP POLICY IF EXISTS "Users can create reports" ON "public"."reports";
DROP POLICY IF EXISTS "Users can view own reports" ON "public"."reports";

-- Drop all policies on analytics table
DROP POLICY IF EXISTS "Users can create analytics" ON "public"."analytics";

-- Drop all policies on user_sessions table
DROP POLICY IF EXISTS "Users can manage own sessions" ON "public"."user_sessions";

-- Drop all policies on ai_assistant_sessions table
DROP POLICY IF EXISTS "Users can view own sessions" ON "public"."ai_assistant_sessions";
DROP POLICY IF EXISTS "Users can create sessions" ON "public"."ai_assistant_sessions";
DROP POLICY IF EXISTS "Users can update own sessions" ON "public"."ai_assistant_sessions";

-- Drop all policies on tags table
DROP POLICY IF EXISTS "Anyone can read tags" ON "public"."tags";

-- Drop all policies on ai_personas table
DROP POLICY IF EXISTS "Anyone can read AI personas" ON "public"."ai_personas";
DROP POLICY IF EXISTS "Service role can manage AI personas" ON "public"."ai_personas";

-- Drop all policies on ai_learning_memory table
DROP POLICY IF EXISTS "Users can view own learning memory" ON "public"."ai_learning_memory";
DROP POLICY IF EXISTS "Service role can manage learning memory" ON "public"."ai_learning_memory";

-- Disable RLS on all tables
ALTER TABLE "public"."questions" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."users" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."answers" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."prototypes" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reports" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."analytics" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_sessions" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ai_assistant_sessions" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."tags" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ai_personas" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ai_learning_memory" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."job_drafts" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ghl_opportunities" DISABLE ROW LEVEL SECURITY;
