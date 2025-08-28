-- Add pipeline_stage_name column to ghl_opportunities table
-- This will store the human-readable name of the pipeline stage

-- Add pipeline_stage_name column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'pipeline_stage_name') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN pipeline_stage_name VARCHAR(255);
    END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN ghl_opportunities.pipeline_stage_name IS 'Human-readable name of the pipeline stage (e.g., "Qualified Lead", "Proposal Sent")';
