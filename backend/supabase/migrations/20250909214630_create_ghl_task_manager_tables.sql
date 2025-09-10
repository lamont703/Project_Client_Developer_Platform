-- GHL Task Manager Tables Migration
-- Created: 2025-09-09 21:46:30
-- Description: Creates tables for GHL Task Manager system including cache and analytics

-- Create ghl_tasks_cache table for storing cached pipeline tasks
CREATE TABLE IF NOT EXISTS ghl_tasks_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id TEXT NOT NULL,
    pipeline_name TEXT NOT NULL,
    location_id TEXT NOT NULL,
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_tasks INTEGER DEFAULT 0,
    incomplete_tasks INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '5 minutes'),
    
    -- Constraints
    CONSTRAINT ghl_tasks_cache_pipeline_id_check CHECK (pipeline_id != ''),
    CONSTRAINT ghl_tasks_cache_pipeline_name_check CHECK (pipeline_name != ''),
    CONSTRAINT ghl_tasks_cache_location_id_check CHECK (location_id != ''),
    CONSTRAINT ghl_tasks_cache_tasks_check CHECK (jsonb_typeof(tasks) = 'array'),
    CONSTRAINT ghl_tasks_cache_total_tasks_check CHECK (total_tasks >= 0),
    CONSTRAINT ghl_tasks_cache_incomplete_tasks_check CHECK (incomplete_tasks >= 0),
    CONSTRAINT ghl_tasks_cache_completed_tasks_check CHECK (completed_tasks >= 0)
);

-- Create indexes for ghl_tasks_cache
CREATE INDEX IF NOT EXISTS idx_ghl_tasks_cache_pipeline_id ON ghl_tasks_cache(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_tasks_cache_location_id ON ghl_tasks_cache(location_id);
CREATE INDEX IF NOT EXISTS idx_ghl_tasks_cache_expires_at ON ghl_tasks_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_ghl_tasks_cache_created_at ON ghl_tasks_cache(created_at);
CREATE INDEX IF NOT EXISTS idx_ghl_tasks_cache_pipeline_location ON ghl_tasks_cache(pipeline_id, location_id);

-- Create ghl_task_analytics table for tracking task operations
CREATE TABLE IF NOT EXISTS ghl_task_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id TEXT NOT NULL,
    pipeline_name TEXT NOT NULL,
    location_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    opportunity_id TEXT,
    opportunity_name TEXT,
    action TEXT NOT NULL,
    user_id TEXT,
    user_email TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT ghl_task_analytics_pipeline_id_check CHECK (pipeline_id != ''),
    CONSTRAINT ghl_task_analytics_task_id_check CHECK (task_id != ''),
    CONSTRAINT ghl_task_analytics_action_check CHECK (action IN (
        'task_viewed', 'task_filtered', 'task_completed', 'task_uncompleted',
        'task_assigned', 'task_unassigned', 'task_due_date_updated',
        'pipeline_viewed', 'analytics_viewed', 'cache_hit', 'cache_miss',
        'api_call', 'error_occurred'
    )),
    CONSTRAINT ghl_task_analytics_metadata_check CHECK (jsonb_typeof(metadata) = 'object')
);

-- Create indexes for ghl_task_analytics
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_pipeline_id ON ghl_task_analytics(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_task_id ON ghl_task_analytics(task_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_action ON ghl_task_analytics(action);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_user_id ON ghl_task_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_created_at ON ghl_task_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_pipeline_task ON ghl_task_analytics(pipeline_id, task_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_analytics_action_date ON ghl_task_analytics(action, created_at);

-- Create ghl_pipeline_cache table for storing pipeline information
CREATE TABLE IF NOT EXISTS ghl_pipeline_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id TEXT NOT NULL,
    pipeline_id TEXT NOT NULL UNIQUE,
    pipeline_name TEXT NOT NULL,
    pipeline_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    stages JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 hour'),
    
    -- Constraints
    CONSTRAINT ghl_pipeline_cache_location_id_check CHECK (location_id != ''),
    CONSTRAINT ghl_pipeline_cache_pipeline_id_check CHECK (pipeline_id != ''),
    CONSTRAINT ghl_pipeline_cache_pipeline_name_check CHECK (pipeline_name != ''),
    CONSTRAINT ghl_pipeline_cache_pipeline_data_check CHECK (jsonb_typeof(pipeline_data) = 'object'),
    CONSTRAINT ghl_pipeline_cache_stages_check CHECK (jsonb_typeof(stages) = 'array')
);

-- Create indexes for ghl_pipeline_cache
CREATE INDEX IF NOT EXISTS idx_ghl_pipeline_cache_location_id ON ghl_pipeline_cache(location_id);
CREATE INDEX IF NOT EXISTS idx_ghl_pipeline_cache_pipeline_id ON ghl_pipeline_cache(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_pipeline_cache_expires_at ON ghl_pipeline_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_ghl_pipeline_cache_is_active ON ghl_pipeline_cache(is_active);

-- Create ghl_task_assignments table for tracking task assignments
CREATE TABLE IF NOT EXISTS ghl_task_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id TEXT NOT NULL UNIQUE,
    pipeline_id TEXT NOT NULL,
    opportunity_id TEXT NOT NULL,
    assigned_to_user_id TEXT,
    assigned_to_email TEXT,
    assigned_by_user_id TEXT,
    assigned_by_email TEXT,
    assignment_reason TEXT,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unassigned_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT ghl_task_assignments_task_id_check CHECK (task_id != ''),
    CONSTRAINT ghl_task_assignments_pipeline_id_check CHECK (pipeline_id != ''),
    CONSTRAINT ghl_task_assignments_opportunity_id_check CHECK (opportunity_id != '')
);

-- Create indexes for ghl_task_assignments
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_task_id ON ghl_task_assignments(task_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_pipeline_id ON ghl_task_assignments(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_assigned_to ON ghl_task_assignments(assigned_to_user_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_is_active ON ghl_task_assignments(is_active);
CREATE INDEX IF NOT EXISTS idx_ghl_task_assignments_assigned_at ON ghl_task_assignments(assigned_at);

-- Create ghl_task_status_history table for tracking task status changes
CREATE TABLE IF NOT EXISTS ghl_task_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id TEXT NOT NULL,
    pipeline_id TEXT NOT NULL,
    opportunity_id TEXT NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by_user_id TEXT,
    changed_by_email TEXT,
    change_reason TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT ghl_task_status_history_task_id_check CHECK (task_id != ''),
    CONSTRAINT ghl_task_status_history_pipeline_id_check CHECK (pipeline_id != ''),
    CONSTRAINT ghl_task_status_history_opportunity_id_check CHECK (opportunity_id != ''),
    CONSTRAINT ghl_task_status_history_new_status_check CHECK (new_status IN (
        'completed', 'incomplete', 'in_progress', 'pending', 'cancelled'
    )),
    CONSTRAINT ghl_task_status_history_metadata_check CHECK (jsonb_typeof(metadata) = 'object')
);

-- Create indexes for ghl_task_status_history
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_task_id ON ghl_task_status_history(task_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_pipeline_id ON ghl_task_status_history(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_changed_at ON ghl_task_status_history(changed_at);
CREATE INDEX IF NOT EXISTS idx_ghl_task_status_history_new_status ON ghl_task_status_history(new_status);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_ghl_tasks_cache_updated_at 
    BEFORE UPDATE ON ghl_tasks_cache 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ghl_pipeline_cache_updated_at 
    BEFORE UPDATE ON ghl_pipeline_cache 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ghl_task_assignments_updated_at 
    BEFORE UPDATE ON ghl_task_assignments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up expired cache entries (fixed syntax)
CREATE OR REPLACE FUNCTION cleanup_expired_ghl_cache()
RETURNS INTEGER AS $$
DECLARE
    task_deleted_count INTEGER;
    pipeline_deleted_count INTEGER;
    total_deleted_count INTEGER;
BEGIN
    -- Clean up expired task cache
    DELETE FROM ghl_tasks_cache WHERE expires_at < NOW();
    GET DIAGNOSTICS task_deleted_count = ROW_COUNT;
    
    -- Clean up expired pipeline cache
    DELETE FROM ghl_pipeline_cache WHERE expires_at < NOW();
    GET DIAGNOSTICS pipeline_deleted_count = ROW_COUNT;
    
    total_deleted_count := task_deleted_count + pipeline_deleted_count;
    RETURN total_deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get task statistics for a pipeline
CREATE OR REPLACE FUNCTION get_pipeline_task_stats(pipeline_id_param TEXT)
RETURNS TABLE (
    total_tasks BIGINT,
    completed_tasks BIGINT,
    incomplete_tasks BIGINT,
    completion_rate NUMERIC,
    avg_tasks_per_opportunity NUMERIC,
    most_active_assignee TEXT,
    oldest_incomplete_task TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    WITH task_stats AS (
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE (tasks->>'completed')::boolean = true) as completed,
            COUNT(*) FILTER (WHERE (tasks->>'completed')::boolean = false OR (tasks->>'completed') IS NULL) as incomplete
        FROM ghl_tasks_cache 
        WHERE pipeline_id = pipeline_id_param 
        AND expires_at > NOW()
    ),
    opportunity_stats AS (
        SELECT 
            AVG(jsonb_array_length(tasks)) as avg_tasks
        FROM ghl_tasks_cache 
        WHERE pipeline_id = pipeline_id_param 
        AND expires_at > NOW()
    ),
    assignee_stats AS (
        SELECT 
            tasks->>'assignedTo' as assignee,
            COUNT(*) as task_count
        FROM ghl_tasks_cache, 
             jsonb_array_elements(tasks) as tasks
        WHERE pipeline_id = pipeline_id_param 
        AND expires_at > NOW()
        AND tasks->>'assignedTo' IS NOT NULL
        GROUP BY tasks->>'assignedTo'
        ORDER BY task_count DESC
        LIMIT 1
    ),
    oldest_task AS (
        SELECT 
            MIN((tasks->>'dueDate')::timestamp with time zone) as oldest_due
        FROM ghl_tasks_cache, 
             jsonb_array_elements(tasks) as tasks
        WHERE pipeline_id = pipeline_id_param 
        AND expires_at > NOW()
        AND (tasks->>'completed')::boolean = false
        AND tasks->>'dueDate' IS NOT NULL
    )
    SELECT 
        ts.total,
        ts.completed,
        ts.incomplete,
        CASE 
            WHEN ts.total > 0 THEN ROUND((ts.completed::numeric / ts.total::numeric) * 100, 2)
            ELSE 0
        END as completion_rate,
        COALESCE(os.avg_tasks, 0) as avg_tasks_per_opportunity,
        COALESCE(ass.assignee, 'Unassigned') as most_active_assignee,
        ot.oldest_due as oldest_incomplete_task
    FROM task_stats ts
    CROSS JOIN opportunity_stats os
    CROSS JOIN assignee_stats ass
    CROSS JOIN oldest_task ot;
END;
$$ LANGUAGE plpgsql;

-- Create function to get user task activity
CREATE OR REPLACE FUNCTION get_user_task_activity(user_id_param TEXT, days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    action TEXT,
    action_count BIGINT,
    last_action TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ta.action,
        COUNT(*) as action_count,
        MAX(ta.created_at) as last_action
    FROM ghl_task_analytics ta
    WHERE ta.user_id = user_id_param
    AND ta.created_at >= NOW() - INTERVAL '1 day' * days_back
    GROUP BY ta.action
    ORDER BY action_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Add comments to tables for documentation
COMMENT ON TABLE ghl_tasks_cache IS 'Cache table for storing GHL pipeline tasks with 5-minute TTL';
COMMENT ON TABLE ghl_task_analytics IS 'Analytics table for tracking all task-related user actions';
COMMENT ON TABLE ghl_pipeline_cache IS 'Cache table for storing GHL pipeline information with 1-hour TTL';
COMMENT ON TABLE ghl_task_assignments IS 'Table for tracking task assignments and reassignments';
COMMENT ON TABLE ghl_task_status_history IS 'Audit trail for task status changes';

-- Add comments to key columns
COMMENT ON COLUMN ghl_tasks_cache.tasks IS 'JSONB array of task objects from GHL API';
COMMENT ON COLUMN ghl_tasks_cache.expires_at IS 'Cache expiration timestamp (5 minutes from creation)';
COMMENT ON COLUMN ghl_task_analytics.action IS 'Type of action performed (viewed, completed, assigned, etc.)';
COMMENT ON COLUMN ghl_task_analytics.metadata IS 'Additional context data for the action';
COMMENT ON COLUMN ghl_pipeline_cache.expires_at IS 'Cache expiration timestamp (1 hour from creation)';
COMMENT ON COLUMN ghl_task_assignments.is_active IS 'Whether the assignment is currently active';
COMMENT ON COLUMN ghl_task_status_history.new_status IS 'The new status after the change';
