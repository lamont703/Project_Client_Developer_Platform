-- Populate pipeline_stage_name field with data from pipeline_stage_id for existing opportunities
-- This migration copies the stage names that are currently stored in pipeline_stage_id to pipeline_stage_name

UPDATE ghl_opportunities 
SET pipeline_stage_name = pipeline_stage_id 
WHERE pipeline_stage_name IS NULL 
AND pipeline_stage_id IS NOT NULL;

-- Add comment to document the change
COMMENT ON COLUMN ghl_opportunities.pipeline_stage_id IS 'Pipeline stage identifier (can be ID or name)';
COMMENT ON COLUMN ghl_opportunities.pipeline_stage_name IS 'Human-readable name of the pipeline stage (e.g., "Qualified Lead", "Proposal Sent")';
