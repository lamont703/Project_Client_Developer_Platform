-- Add missing columns to existing ghl_opportunities table
-- This migration adds the columns that db.js expects but are missing from the current table

-- Add opportunity_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'opportunity_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN opportunity_id VARCHAR(255);
    END IF;
END $$;

-- Add name column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'name') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN name VARCHAR(500);
    END IF;
END $$;

-- Add status column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'status') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN status VARCHAR(100);
    END IF;
END $$;

-- Add monetary_value column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'monetary_value') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN monetary_value DECIMAL(15,2);
    END IF;
END $$;

-- Add contact_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'contact_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN contact_id VARCHAR(255);
    END IF;
END $$;

-- Add pipeline_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'pipeline_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN pipeline_id VARCHAR(255);
    END IF;
END $$;

-- Add pipeline_stage_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'pipeline_stage_id') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN pipeline_stage_id VARCHAR(255);
    END IF;
END $$;

-- Add assigned_to column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'assigned_to') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN assigned_to VARCHAR(255);
    END IF;
END $$;

-- Add created_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'created_at') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ghl_opportunities' AND column_name = 'updated_at') THEN
        ALTER TABLE ghl_opportunities ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_opportunity_id ON ghl_opportunities(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_status ON ghl_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_pipeline_id ON ghl_opportunities(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_created_at ON ghl_opportunities(created_at);
