-- Enhance answers table for AI response metadata
ALTER TABLE "public"."answers" 
ADD COLUMN IF NOT EXISTS "confidence" numeric(3,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "reasoning" text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "persona_id" character varying(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "follow_up_questions" text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS "emotional_tone" character varying(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "ai_model_used" character varying(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "response_metadata" jsonb DEFAULT '{}'::jsonb;

-- Add check constraint for confidence (0.0 to 1.0)
ALTER TABLE "public"."answers" 
ADD CONSTRAINT "answers_confidence_check" CHECK (confidence IS NULL OR (confidence >= 0.0 AND confidence <= 1.0));

-- Add check constraint for emotional tone
ALTER TABLE "public"."answers" 
ADD CONSTRAINT "answers_emotional_tone_check" CHECK (emotional_tone IS NULL OR emotional_tone IN ('encouraging', 'curious', 'excited', 'supportive', 'analytical'));

-- Create indexes for AI-specific fields
CREATE INDEX "idx_answers_persona_id" ON "public"."answers" USING "btree" ("persona_id");
CREATE INDEX "idx_answers_confidence" ON "public"."answers" USING "btree" ("confidence");
CREATE INDEX "idx_answers_emotional_tone" ON "public"."answers" USING "btree" ("emotional_tone");
CREATE INDEX "idx_answers_ai_model_used" ON "public"."answers" USING "btree" ("ai_model_used");
CREATE INDEX "idx_answers_follow_up_questions" ON "public"."answers" USING "gin" ("follow_up_questions");

-- Add foreign key constraint for persona_id
ALTER TABLE ONLY "public"."answers"
    ADD CONSTRAINT "answers_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."ai_personas"("id") ON DELETE SET NULL;

-- Add comments for new columns
COMMENT ON COLUMN "public"."answers"."confidence" IS 'AI confidence score for the response (0.0 to 1.0)';
COMMENT ON COLUMN "public"."answers"."reasoning" IS 'AI reasoning behind the response';
COMMENT ON COLUMN "public"."answers"."persona_id" IS 'Reference to AI persona that generated this response';
COMMENT ON COLUMN "public"."answers"."follow_up_questions" IS 'Follow-up questions suggested by AI';
COMMENT ON COLUMN "public"."answers"."emotional_tone" IS 'Emotional tone of the AI response';
COMMENT ON COLUMN "public"."answers"."ai_model_used" IS 'AI model used to generate the response (e.g., gemini-1.5-pro)';
COMMENT ON COLUMN "public"."answers"."response_metadata" IS 'Additional metadata about the AI response';
