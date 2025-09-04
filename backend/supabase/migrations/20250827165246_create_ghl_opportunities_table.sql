-- Create ghl_opportunities table
-- This migration creates the base ghl_opportunities table

CREATE TABLE IF NOT EXISTS ghl_opportunities (
    id BIGSERIAL PRIMARY KEY,
    opportunity_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(500),
    status VARCHAR(100),
    monetary_value DECIMAL(15,2),
    contact_id VARCHAR(255),
    pipeline_id VARCHAR(255),
    pipeline_stage_id VARCHAR(255),
    assigned_to VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 