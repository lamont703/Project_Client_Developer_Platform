-- Add unique constraint to ghl_tasks_cache table
-- Migration: 20250910220000_add_unique_constraint_to_ghl_tasks_cache.sql
-- Description: Adds unique constraint on pipeline_id to fix upsert operations

-- Add unique constraint to ghl_tasks_cache
ALTER TABLE ghl_tasks_cache 
ADD CONSTRAINT ghl_tasks_cache_pipeline_id_unique UNIQUE (pipeline_id);

-- Add comment for documentation
COMMENT ON CONSTRAINT ghl_tasks_cache_pipeline_id_unique ON ghl_tasks_cache 
IS 'Ensures only one cache entry per pipeline_id for proper upsert operations';
