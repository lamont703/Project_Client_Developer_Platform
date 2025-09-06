-- Create monitoring_stats table to store AI monitoring statistics
-- This replaces in-memory stats with persistent database storage

CREATE TABLE monitoring_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_engagements INTEGER DEFAULT 0,
  successful_engagements INTEGER DEFAULT 0,
  failed_engagements INTEGER DEFAULT 0,
  active_personas INTEGER DEFAULT 0,
  last_engagement TIMESTAMP WITH TIME ZONE,
  community_health DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a single row for the current stats (singleton pattern)
INSERT INTO monitoring_stats (id) VALUES ('00000000-0000-0000-0000-000000000001');

-- Create index for fast lookups
CREATE INDEX idx_monitoring_stats_singleton ON monitoring_stats (id);

-- Add comment
COMMENT ON TABLE monitoring_stats IS 'Stores AI monitoring service statistics and engagement metrics';

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_monitoring_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trigger_update_monitoring_stats_updated_at
  BEFORE UPDATE ON monitoring_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_monitoring_stats_updated_at();
