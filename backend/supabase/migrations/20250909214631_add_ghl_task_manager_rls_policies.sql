-- GHL Task Manager RLS Policies Migration
-- Created: 2025-09-09 21:46:31
-- Description: Adds Row Level Security policies for GHL Task Manager tables

-- Enable RLS on all GHL Task Manager tables
ALTER TABLE ghl_tasks_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghl_task_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghl_pipeline_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghl_task_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ghl_task_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies for ghl_tasks_cache
-- Allow authenticated users to read cache data
CREATE POLICY "Allow authenticated users to read task cache" ON ghl_tasks_cache
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role to manage cache data
CREATE POLICY "Allow service role to manage task cache" ON ghl_tasks_cache
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for ghl_task_analytics
-- Allow authenticated users to insert analytics data
CREATE POLICY "Allow authenticated users to insert analytics" ON ghl_task_analytics
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to read their own analytics
CREATE POLICY "Allow users to read own analytics" ON ghl_task_analytics
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        (user_id = auth.uid()::text OR user_id IS NULL)
    );

-- Allow service role to manage all analytics
CREATE POLICY "Allow service role to manage analytics" ON ghl_task_analytics
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for ghl_pipeline_cache
-- Allow authenticated users to read pipeline cache
CREATE POLICY "Allow authenticated users to read pipeline cache" ON ghl_pipeline_cache
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role to manage pipeline cache
CREATE POLICY "Allow service role to manage pipeline cache" ON ghl_pipeline_cache
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for ghl_task_assignments
-- Allow authenticated users to read assignments
CREATE POLICY "Allow authenticated users to read assignments" ON ghl_task_assignments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to read their own assignments
CREATE POLICY "Allow users to read own assignments" ON ghl_task_assignments
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        (assigned_to_user_id = auth.uid()::text OR assigned_to_user_id IS NULL)
    );

-- Allow authenticated users to insert assignments
CREATE POLICY "Allow authenticated users to insert assignments" ON ghl_task_assignments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own assignments
CREATE POLICY "Allow users to update own assignments" ON ghl_task_assignments
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        assigned_to_user_id = auth.uid()::text
    );

-- Allow service role to manage all assignments
CREATE POLICY "Allow service role to manage assignments" ON ghl_task_assignments
    FOR ALL USING (auth.role() = 'service_role');

-- Create policies for ghl_task_status_history
-- Allow authenticated users to read status history
CREATE POLICY "Allow authenticated users to read status history" ON ghl_task_status_history
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert status history
CREATE POLICY "Allow authenticated users to insert status history" ON ghl_task_status_history
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow service role to manage all status history
CREATE POLICY "Allow service role to manage status history" ON ghl_task_status_history
    FOR ALL USING (auth.role() = 'service_role');

-- Create a view for task summary statistics (read-only)
CREATE OR REPLACE VIEW ghl_task_summary_stats AS
SELECT 
    tc.pipeline_id,
    tc.pipeline_name,
    tc.location_id,
    tc.total_tasks,
    tc.completed_tasks,
    tc.incomplete_tasks,
    CASE 
        WHEN tc.total_tasks > 0 THEN ROUND((tc.completed_tasks::numeric / tc.total_tasks::numeric) * 100, 2)
        ELSE 0
    END as completion_rate,
    tc.created_at as cache_created_at,
    tc.expires_at as cache_expires_at
FROM ghl_tasks_cache tc
WHERE tc.expires_at > NOW();

-- Create RLS policy for the view
ALTER VIEW ghl_task_summary_stats SET (security_invoker = true);

-- Create a view for user task activity summary
CREATE OR REPLACE VIEW ghl_user_task_activity AS
SELECT 
    ta.user_id,
    ta.user_email,
    ta.action,
    COUNT(*) as action_count,
    MAX(ta.created_at) as last_action,
    MIN(ta.created_at) as first_action
FROM ghl_task_analytics ta
WHERE ta.user_id IS NOT NULL
GROUP BY ta.user_id, ta.user_email, ta.action
ORDER BY ta.user_id, action_count DESC;

-- Create RLS policy for the user activity view
ALTER VIEW ghl_user_task_activity SET (security_invoker = true);

-- Create a view for pipeline performance metrics
CREATE OR REPLACE VIEW ghl_pipeline_performance AS
SELECT 
    pc.pipeline_id,
    pc.pipeline_name,
    pc.location_id,
    COUNT(DISTINCT tc.id) as cache_entries,
    AVG(tc.total_tasks) as avg_tasks_per_cache,
    MAX(tc.created_at) as last_updated,
    COUNT(DISTINCT ta.id) as total_analytics_events,
    COUNT(DISTINCT ta.user_id) as unique_users
FROM ghl_pipeline_cache pc
LEFT JOIN ghl_tasks_cache tc ON pc.pipeline_id = tc.pipeline_id
LEFT JOIN ghl_task_analytics ta ON pc.pipeline_id = ta.pipeline_id
WHERE pc.is_active = true
GROUP BY pc.pipeline_id, pc.pipeline_name, pc.location_id
ORDER BY total_analytics_events DESC;

-- Create RLS policy for the pipeline performance view
ALTER VIEW ghl_pipeline_performance SET (security_invoker = true);

-- Create indexes for better performance on analytics queries
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_user_action ON ghl_task_analytics(user_id, action);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_pipeline_action ON ghl_task_analytics(pipeline_id, action);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_date_range ON ghl_task_analytics(created_at DESC);

-- Create indexes for assignment queries
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_user_active ON ghl_task_assignments(assigned_to_user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_pipeline_active ON ghl_task_assignments(pipeline_id, is_active);

-- Create indexes for status history queries
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_task_date ON ghl_task_status_history(task_id, changed_at DESC);
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_pipeline_date ON ghl_task_status_history(pipeline_id, changed_at DESC);

-- Add comments to policies for documentation
COMMENT ON POLICY "Allow authenticated users to read task cache" ON ghl_tasks_cache IS 'Allows authenticated users to read cached task data';
COMMENT ON POLICY "Allow service role to manage task cache" ON ghl_tasks_cache IS 'Allows service role full access to task cache for API operations';
COMMENT ON POLICY "Allow authenticated users to insert analytics" ON ghl_task_analytics IS 'Allows authenticated users to track their task interactions';
COMMENT ON POLICY "Allow users to read own analytics" ON ghl_task_analytics IS 'Users can only see their own analytics data';
COMMENT ON POLICY "Allow service role to manage analytics" ON ghl_task_analytics IS 'Allows service role full access to analytics for reporting';
COMMENT ON POLICY "Allow authenticated users to read pipeline cache" ON ghl_pipeline_cache IS 'Allows authenticated users to read cached pipeline data';
COMMENT ON POLICY "Allow service role to manage pipeline cache" ON ghl_pipeline_cache IS 'Allows service role full access to pipeline cache for API operations';
COMMENT ON POLICY "Allow authenticated users to read assignments" ON ghl_task_assignments IS 'Allows authenticated users to read task assignments';
COMMENT ON POLICY "Allow users to read own assignments" ON ghl_task_assignments IS 'Users can see assignments where they are the assignee';
COMMENT ON POLICY "Allow authenticated users to insert assignments" ON ghl_task_assignments IS 'Allows authenticated users to create new task assignments';
COMMENT ON POLICY "Allow users to update own assignments" ON ghl_task_assignments IS 'Users can update assignments where they are the assignee';
COMMENT ON POLICY "Allow service role to manage assignments" ON ghl_task_assignments IS 'Allows service role full access to assignments for API operations';
COMMENT ON POLICY "Allow authenticated users to read status history" ON ghl_task_status_history IS 'Allows authenticated users to read task status change history';
COMMENT ON POLICY "Allow authenticated users to insert status history" ON ghl_task_status_history IS 'Allows authenticated users to log status changes';
COMMENT ON POLICY "Allow service role to manage status history" ON ghl_task_status_history IS 'Allows service role full access to status history for API operations';

-- Add comments to views
COMMENT ON VIEW ghl_task_summary_stats IS 'Summary statistics for task completion rates by pipeline';
COMMENT ON VIEW ghl_user_task_activity IS 'User activity summary for task interactions';
COMMENT ON VIEW ghl_pipeline_performance IS 'Pipeline performance metrics including user engagement';
