-- Remove duplicate AI user policy since we now have a combined policy
DROP POLICY IF EXISTS "AI user can create questions" ON "public"."questions";
