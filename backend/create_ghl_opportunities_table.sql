-- Create ghl_opportunities table with the correct schema
-- This matches the columns expected in db.js

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_opportunity_id ON ghl_opportunities(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_status ON ghl_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_pipeline_id ON ghl_opportunities(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_opportunities_created_at ON ghl_opportunities(created_at);

-- Add comments for documentation
COMMENT ON TABLE ghl_opportunities IS 'GoHighLevel opportunities synced from webhooks';
COMMENT ON COLUMN ghl_opportunities.opportunity_id IS 'Unique identifier from GoHighLevel';
COMMENT ON COLUMN ghl_opportunities.name IS 'Opportunity name from GoHighLevel';
COMMENT ON COLUMN ghl_opportunities.status IS 'Current status of the opportunity';
COMMENT ON COLUMN ghl_opportunities.monetary_value IS 'Value/amount of the opportunity';
COMMENT ON COLUMN ghl_opportunities.contact_id IS 'Associated contact ID from GoHighLevel';
COMMENT ON COLUMN ghl_opportunities.pipeline_id IS 'Pipeline ID from GoHighLevel';
COMMENT ON COLUMN ghl_opportunities.pipeline_stage_id IS 'Current pipeline stage ID';
COMMENT ON COLUMN ghl_opportunities.assigned_to IS 'User assigned to this opportunity';
COMMENT ON COLUMN ghl_opportunities.created_at IS 'When this record was created in our system';
COMMENT ON COLUMN ghl_opportunities.updated_at IS 'When this record was last updated'; 