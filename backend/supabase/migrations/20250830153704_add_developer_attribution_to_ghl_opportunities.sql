-- Add developer attribution fields to ghl_opportunities table
-- Migration: 20250830153704_add_developer_attribution_to_ghl_opportunities.sql

-- Add developer reference and source tracking columns to ghl_opportunities
DO $$
BEGIN
    -- Add developer_ref column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'developer_ref') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN developer_ref VARCHAR(255);
    END IF;

    -- Add source column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'source') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN source VARCHAR(100);
    END IF;

    -- Add job_draft_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'job_draft_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN job_draft_id BIGINT;
    END IF;

    -- Add session_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'session_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN session_id VARCHAR(255);
    END IF;

    -- Add attribution_chain column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'attribution_chain') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN attribution_chain VARCHAR(500);
    END IF;

END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_developer_ref ON ghl_opportunities(developer_ref);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_source ON ghl_opportunities(source);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_job_draft_id ON ghl_opportunities(job_draft_id);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_session_id ON ghl_opportunities(session_id);

-- Add comments for documentation
COMMENT ON COLUMN ghl_opportunities.developer_ref IS 'Developer reference for attribution tracking (e.g., "lamont_evans")';
COMMENT ON COLUMN ghl_opportunities.source IS 'Source of the opportunity (e.g., "email", "ai_assistant", "manual")';
COMMENT ON COLUMN ghl_opportunities.job_draft_id IS 'Reference to job_drafts table for job-specific opportunities';
COMMENT ON COLUMN ghl_opportunities.session_id IS 'Unique session identifier for analytics tracking';
COMMENT ON COLUMN ghl_opportunities.attribution_chain IS 'Chain of attribution (e.g., "lamont_evans → user → conversion")';

-- Add foreign key constraint for job_draft_id
ALTER TABLE ghl_opportunities ADD CONSTRAINT fk_ghl_opportunities_job_draft_id 
    FOREIGN KEY (job_draft_id) REFERENCES job_drafts(id) ON DELETE SET NULL; 