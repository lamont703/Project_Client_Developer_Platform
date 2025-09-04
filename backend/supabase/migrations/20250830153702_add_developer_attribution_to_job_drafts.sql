-- Add developer attribution fields to job_drafts table
-- Migration: 20250830153702_add_developer_attribution_to_job_drafts.sql

-- Add developer reference and source tracking columns
DO $$
BEGIN
    -- Add developer_ref column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'developer_ref') THEN
        ALTER TABLE job_drafts ADD COLUMN developer_ref VARCHAR(255);
    END IF;

    -- Add source column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'source') THEN
        ALTER TABLE job_drafts ADD COLUMN source VARCHAR(100);
    END IF;

    -- Add session_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'session_id') THEN
        ALTER TABLE job_drafts ADD COLUMN session_id VARCHAR(255);
    END IF;

    -- Add public_status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'public_status') THEN
        ALTER TABLE job_drafts ADD COLUMN public_status VARCHAR(50) DEFAULT 'draft';
    END IF;

    -- Add generated_title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'generated_title') THEN
        ALTER TABLE job_drafts ADD COLUMN generated_title TEXT;
    END IF;

    -- Add generated_skills column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'generated_skills') THEN
        ALTER TABLE job_drafts ADD COLUMN generated_skills TEXT[];
    END IF;

    -- Add generated_milestones column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'generated_milestones') THEN
        ALTER TABLE job_drafts ADD COLUMN generated_milestones TEXT[];
    END IF;

    -- Add estimated_budget_range column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'estimated_budget_range') THEN
        ALTER TABLE job_drafts ADD COLUMN estimated_budget_range JSONB;
    END IF;

    -- Add estimated_timeline column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'estimated_timeline') THEN
        ALTER TABLE job_drafts ADD COLUMN estimated_timeline VARCHAR(100);
    END IF;

    -- Add completion_score column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'completion_score') THEN
        ALTER TABLE job_drafts ADD COLUMN completion_score INTEGER DEFAULT 0;
    END IF;

    -- Add ghl_opportunity_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'ghl_opportunity_id') THEN
        ALTER TABLE job_drafts ADD COLUMN ghl_opportunity_id VARCHAR(255);
    END IF;

    -- Add wireframe_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'wireframe_url') THEN
        ALTER TABLE job_drafts ADD COLUMN wireframe_url VARCHAR(500);
    END IF;

    -- Add github_pages_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'job_drafts' AND column_name = 'github_pages_url') THEN
        ALTER TABLE job_drafts ADD COLUMN github_pages_url VARCHAR(500);
    END IF;

END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_drafts_developer_ref ON job_drafts(developer_ref);
CREATE INDEX IF NOT EXISTS idx_job_drafts_source ON job_drafts(source);
CREATE INDEX IF NOT EXISTS idx_job_drafts_session_id ON job_drafts(session_id);
CREATE INDEX IF NOT EXISTS idx_job_drafts_public_status ON job_drafts(public_status);
CREATE INDEX IF NOT EXISTS idx_job_drafts_created_at ON job_drafts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_drafts_ghl_opportunity_id ON job_drafts(ghl_opportunity_id);

-- Add comments for documentation
COMMENT ON COLUMN job_drafts.developer_ref IS 'Developer reference for attribution tracking (e.g., "lamont_evans")';
COMMENT ON COLUMN job_drafts.source IS 'Source of the job draft (e.g., "email", "ai_assistant", "manual")';
COMMENT ON COLUMN job_drafts.session_id IS 'Unique session identifier for analytics tracking';
COMMENT ON COLUMN job_drafts.public_status IS 'Current status of the job (draft, posted, in_progress, completed)';
COMMENT ON COLUMN job_drafts.generated_title IS 'AI-generated title for the job posting';
COMMENT ON COLUMN job_drafts.generated_skills IS 'AI-generated skills array for the job posting';
COMMENT ON COLUMN job_drafts.generated_milestones IS 'AI-generated milestones array for the project';
COMMENT ON COLUMN job_drafts.estimated_budget_range IS 'JSON object with min/max budget estimates';
COMMENT ON COLUMN job_drafts.estimated_timeline IS 'AI-estimated timeline for project completion';
COMMENT ON COLUMN job_drafts.completion_score IS 'Score indicating how complete the job draft is (0-100)';
COMMENT ON COLUMN job_drafts.ghl_opportunity_id IS 'GoHighLevel opportunity ID for CRM integration';
COMMENT ON COLUMN job_drafts.wireframe_url IS 'URL to generated wireframe/prototype';
COMMENT ON COLUMN job_drafts.github_pages_url IS 'URL to GitHub Pages deployment'; 