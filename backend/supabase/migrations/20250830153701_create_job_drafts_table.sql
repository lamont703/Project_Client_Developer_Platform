-- Create job_drafts table
-- This migration creates the base job_drafts table

CREATE TABLE IF NOT EXISTS job_drafts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500),
    description TEXT,
    skills TEXT[],
    budget_min DECIMAL(15,2),
    budget_max DECIMAL(15,2),
    timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 