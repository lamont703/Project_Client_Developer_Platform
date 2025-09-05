-- Create AI Learning Memory table for enhanced AI community member service
CREATE TABLE IF NOT EXISTS "public"."ai_learning_memory" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "persona_id" character varying(255) NOT NULL,
    "interactions_count" integer DEFAULT 0,
    "topics_discussed" text[] DEFAULT '{}'::text[],
    "relationships" text[] DEFAULT '{}'::text[],
    "expertise_areas" text[] DEFAULT '{}'::text[],
    "last_interaction" timestamp with time zone DEFAULT "now"(),
    "preferences" jsonb DEFAULT '{}'::jsonb,
    "learning_patterns" jsonb DEFAULT '{}'::jsonb,
    "engagement_score" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);

-- Set primary key
ALTER TABLE ONLY "public"."ai_learning_memory"
    ADD CONSTRAINT "ai_learning_memory_pkey" PRIMARY KEY ("id");

-- Create unique constraint on user_id + persona_id combination
ALTER TABLE ONLY "public"."ai_learning_memory"
    ADD CONSTRAINT "ai_learning_memory_user_persona_key" UNIQUE ("user_id", "persona_id");

-- Create indexes for performance
CREATE INDEX "idx_ai_learning_memory_user_id" ON "public"."ai_learning_memory" USING "btree" ("user_id");
CREATE INDEX "idx_ai_learning_memory_persona_id" ON "public"."ai_learning_memory" USING "btree" ("persona_id");
CREATE INDEX "idx_ai_learning_memory_last_interaction" ON "public"."ai_learning_memory" USING "btree" ("last_interaction" DESC);
CREATE INDEX "idx_ai_learning_memory_engagement_score" ON "public"."ai_learning_memory" USING "btree" ("engagement_score" DESC);
CREATE INDEX "idx_ai_learning_memory_topics" ON "public"."ai_learning_memory" USING "gin" ("topics_discussed");
CREATE INDEX "idx_ai_learning_memory_expertise" ON "public"."ai_learning_memory" USING "gin" ("expertise_areas");

-- Add foreign key constraints
ALTER TABLE ONLY "public"."ai_learning_memory"
    ADD CONSTRAINT "ai_learning_memory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."ai_learning_memory"
    ADD CONSTRAINT "ai_learning_memory_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "public"."ai_personas"("id") ON DELETE CASCADE;

-- Grant permissions
GRANT ALL ON TABLE "public"."ai_learning_memory" TO "anon";
GRANT ALL ON TABLE "public"."ai_learning_memory" TO "authenticated";
GRANT ALL ON TABLE "public"."ai_learning_memory" TO "service_role";

-- Add RLS policies
ALTER TABLE "public"."ai_learning_memory" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning memory" ON "public"."ai_learning_memory" FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can manage learning memory" ON "public"."ai_learning_memory" FOR ALL USING (auth.role() = 'service_role');
