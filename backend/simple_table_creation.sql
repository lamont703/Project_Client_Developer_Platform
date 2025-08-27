-- Simple table creation for Supabase dashboard
-- Copy and paste this into your Supabase SQL Editor

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