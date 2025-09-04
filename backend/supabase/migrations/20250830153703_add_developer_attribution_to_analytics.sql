-- Add developer attribution fields to analytics table
-- Migration: 20250830153703_add_developer_attribution_to_analytics.sql

-- Add developer reference and source tracking columns to analytics
DO $$
BEGIN
    -- Add developer_ref column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'developer_ref') THEN
        ALTER TABLE analytics ADD COLUMN developer_ref VARCHAR(255);
    END IF;

    -- Add source column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'source') THEN
        ALTER TABLE analytics ADD COLUMN source VARCHAR(100);
    END IF;

    -- Add attribution_chain column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'attribution_chain') THEN
        ALTER TABLE analytics ADD COLUMN attribution_chain VARCHAR(500);
    END IF;

    -- Add job_draft_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'job_draft_id') THEN
        ALTER TABLE analytics ADD COLUMN job_draft_id BIGINT;
    END IF;

    -- Add slot_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'slot_name') THEN
        ALTER TABLE analytics ADD COLUMN slot_name VARCHAR(100);
    END IF;

    -- Add completion_score column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'completion_score') THEN
        ALTER TABLE analytics ADD COLUMN completion_score INTEGER;
    END IF;

END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_developer_ref ON analytics(developer_ref);
CREATE INDEX IF NOT EXISTS idx_analytics_source ON analytics(source);
CREATE INDEX IF NOT EXISTS idx_analytics_job_draft_id ON analytics(job_draft_id);
CREATE INDEX IF NOT EXISTS idx_analytics_slot_name ON analytics(slot_name);

-- Add comments for documentation
COMMENT ON COLUMN analytics.developer_ref IS 'Developer reference for attribution tracking (e.g., "lamont_evans")';
COMMENT ON COLUMN analytics.source IS 'Source of the analytics event (e.g., "email", "ai_assistant", "manual")';
COMMENT ON COLUMN analytics.attribution_chain IS 'Chain of attribution (e.g., "lamont_evans → user → conversion")';
COMMENT ON COLUMN analytics.job_draft_id IS 'Reference to job_drafts table for job-specific analytics';
COMMENT ON COLUMN analytics.slot_name IS 'Name of the slot being filled (for slot_filled events)';
COMMENT ON COLUMN analytics.completion_score IS 'Completion score at time of event (0-100)';

-- Add foreign key constraint for job_draft_id
ALTER TABLE analytics ADD CONSTRAINT fk_analytics_job_draft_id 
    FOREIGN KEY (job_draft_id) REFERENCES job_drafts(id) ON DELETE SET NULL; 