-- Create ai_assistant_sessions table for session tracking
-- Migration: 20250830153705_create_ai_assistant_sessions.sql

-- Create the ai_assistant_sessions table
CREATE TABLE IF NOT EXISTS ai_assistant_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    developer_ref VARCHAR(255),
    source VARCHAR(100),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_data JSONB DEFAULT '{}',
    current_slot_index INTEGER DEFAULT 0,
    completion_score INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_session_id ON ai_assistant_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_developer_ref ON ai_assistant_sessions(developer_ref);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_source ON ai_assistant_sessions(source);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_user_id ON ai_assistant_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_is_active ON ai_assistant_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_started_at ON ai_assistant_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_assistant_sessions_last_activity_at ON ai_assistant_sessions(last_activity_at DESC);

-- Add comments for documentation
COMMENT ON TABLE ai_assistant_sessions IS 'AI Project Assistant session tracking for developer attribution';
COMMENT ON COLUMN ai_assistant_sessions.session_id IS 'Unique session identifier';
COMMENT ON COLUMN ai_assistant_sessions.developer_ref IS 'Developer reference for attribution tracking (e.g., "lamont_evans")';
COMMENT ON COLUMN ai_assistant_sessions.source IS 'Source of the session (e.g., "email", "ai_assistant", "manual")';
COMMENT ON COLUMN ai_assistant_sessions.user_id IS 'Reference to users table (nullable for anonymous sessions)';
COMMENT ON COLUMN ai_assistant_sessions.session_data IS 'JSON data containing session state (slots, messages, etc.)';
COMMENT ON COLUMN ai_assistant_sessions.current_slot_index IS 'Current slot index in the conversation flow';
COMMENT ON COLUMN ai_assistant_sessions.completion_score IS 'Score indicating how complete the session is (0-100)';
COMMENT ON COLUMN ai_assistant_sessions.is_active IS 'Whether the session is currently active';
COMMENT ON COLUMN ai_assistant_sessions.started_at IS 'When the session started';
COMMENT ON COLUMN ai_assistant_sessions.last_activity_at IS 'Last activity timestamp';
COMMENT ON COLUMN ai_assistant_sessions.ended_at IS 'When the session ended (nullable)';

-- Enable Row Level Security
ALTER TABLE ai_assistant_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
DROP POLICY IF EXISTS "Users can view own sessions" ON ai_assistant_sessions;
CREATE POLICY "Users can view own sessions" ON ai_assistant_sessions
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can create sessions" ON ai_assistant_sessions;
CREATE POLICY "Users can create sessions" ON ai_assistant_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can update own sessions" ON ai_assistant_sessions;
CREATE POLICY "Users can update own sessions" ON ai_assistant_sessions
    FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Grant permissions
GRANT ALL ON TABLE ai_assistant_sessions TO anon;
GRANT ALL ON TABLE ai_assistant_sessions TO authenticated;
GRANT ALL ON TABLE ai_assistant_sessions TO service_role; 