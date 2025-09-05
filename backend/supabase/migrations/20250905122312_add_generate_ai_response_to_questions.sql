-- Add generateAIResponse field to questions table for controlling AI response generation
-- Migration: 20250905122312_add_generate_ai_response_to_questions.sql

ALTER TABLE "public"."questions" 
ADD COLUMN IF NOT EXISTS "generate_ai_response" boolean DEFAULT true;

-- Create index for generate_ai_response field
CREATE INDEX "idx_questions_generate_ai_response" ON "public"."questions" USING "btree" ("generate_ai_response");

-- Add comment for the new column
COMMENT ON COLUMN "public"."questions"."generate_ai_response" IS 'Controls whether AI should automatically generate a response to this question';

-- Update existing questions to have generate_ai_response = true by default
UPDATE "public"."questions" SET "generate_ai_response" = true WHERE "generate_ai_response" IS NULL; 