-- Create Proto Hub Database Schema
-- Migration: 20250830153700_create_proto_hub_tables.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    reputation INTEGER DEFAULT 0,
    is_ai BOOLEAN DEFAULT FALSE,
    join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    questions_asked INTEGER DEFAULT 0,
    answers_provided INTEGER DEFAULT 0,
    prototypes_shared INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    votes INTEGER DEFAULT 0,
    answers_count INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    is_answered BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Answers Table
CREATE TABLE IF NOT EXISTS answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    votes INTEGER DEFAULT 0,
    is_accepted BOOLEAN DEFAULT FALSE,
    is_ai BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Prototypes Table
CREATE TABLE IF NOT EXISTS prototypes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    github_pages_url VARCHAR(500) NOT NULL,
    github_repo_url VARCHAR(500),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'development',
    is_featured BOOLEAN DEFAULT FALSE,
    thumbnail_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    content_id UUID NOT NULL,
    reason VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    moderator_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    session_id VARCHAR(255),
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. User Sessions Table
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_data JSONB,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_questions_author_id ON questions(author_id);
CREATE INDEX IF NOT EXISTS idx_questions_tags ON questions USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);

CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_author_id ON answers(author_id);
CREATE INDEX IF NOT EXISTS idx_answers_created_at ON answers(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_prototypes_author_id ON prototypes(author_id);
CREATE INDEX IF NOT EXISTS idx_prototypes_tags ON prototypes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_prototypes_technologies ON prototypes USING GIN(technologies);
CREATE INDEX IF NOT EXISTS idx_prototypes_status ON prototypes(status);
CREATE INDEX IF NOT EXISTS idx_prototypes_created_at ON prototypes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);

CREATE INDEX IF NOT EXISTS idx_reports_content_type ON reports(content_type);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Create Views for Common Queries
CREATE OR REPLACE VIEW questions_with_author AS
SELECT 
    q.*,
    u.name as author_name,
    u.avatar as author_avatar,
    u.reputation as author_reputation,
    u.is_ai as author_is_ai
FROM questions q
JOIN users u ON q.author_id = u.id;

CREATE OR REPLACE VIEW prototypes_with_author AS
SELECT 
    p.*,
    u.name as author_name,
    u.avatar as author_avatar,
    u.reputation as author_reputation,
    u.is_ai as author_is_ai
FROM prototypes p
JOIN users u ON p.author_id = u.id;

CREATE OR REPLACE VIEW answers_with_author AS
SELECT 
    a.*,
    u.name as author_name,
    u.avatar as author_avatar,
    u.reputation as author_reputation,
    u.is_ai as author_is_ai
FROM answers a
JOIN users u ON a.author_id = u.id;

-- Create Functions for Common Operations
CREATE OR REPLACE FUNCTION update_question_answer_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE questions SET answers_count = answers_count + 1 WHERE id = NEW.question_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE questions SET answers_count = answers_count - 1 WHERE id = OLD.question_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Update user stats based on content type
        IF TG_TABLE_NAME = 'questions' THEN
            UPDATE users SET questions_asked = questions_asked + 1 WHERE id = NEW.author_id;
        ELSIF TG_TABLE_NAME = 'answers' THEN
            UPDATE users SET answers_provided = answers_provided + 1 WHERE id = NEW.author_id;
        ELSIF TG_TABLE_NAME = 'prototypes' THEN
            UPDATE users SET prototypes_shared = prototypes_shared + 1 WHERE id = NEW.author_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update user stats when content is deleted
        IF TG_TABLE_NAME = 'questions' THEN
            UPDATE users SET questions_asked = questions_asked - 1 WHERE id = OLD.author_id;
        ELSIF TG_TABLE_NAME = 'answers' THEN
            UPDATE users SET answers_provided = answers_provided - 1 WHERE id = OLD.author_id;
        ELSIF TG_TABLE_NAME = 'prototypes' THEN
            UPDATE users SET prototypes_shared = prototypes_shared - 1 WHERE id = OLD.author_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers
DROP TRIGGER IF EXISTS trigger_update_answer_count ON answers;
CREATE TRIGGER trigger_update_answer_count
    AFTER INSERT OR DELETE ON answers
    FOR EACH ROW EXECUTE FUNCTION update_question_answer_count();

DROP TRIGGER IF EXISTS trigger_update_user_stats_questions ON questions;
CREATE TRIGGER trigger_update_user_stats_questions
    AFTER INSERT OR DELETE ON questions
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

DROP TRIGGER IF EXISTS trigger_update_user_stats_answers ON answers;
CREATE TRIGGER trigger_update_user_stats_answers
    AFTER INSERT OR DELETE ON answers
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

DROP TRIGGER IF EXISTS trigger_update_user_stats_prototypes ON prototypes;
CREATE TRIGGER trigger_update_user_stats_prototypes
    AFTER INSERT OR DELETE ON prototypes
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE prototypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Users Table Policies
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
CREATE POLICY "Users can view all profiles" ON users
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Questions Table Policies
DROP POLICY IF EXISTS "Anyone can read questions" ON questions;
CREATE POLICY "Anyone can read questions" ON questions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create questions" ON questions;
CREATE POLICY "Authenticated users can create questions" ON questions
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update own questions" ON questions;
CREATE POLICY "Authors can update own questions" ON questions
    FOR UPDATE USING (auth.uid() = author_id);

-- Answers Table Policies
DROP POLICY IF EXISTS "Anyone can read answers" ON answers;
CREATE POLICY "Anyone can read answers" ON answers
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create answers" ON answers;
CREATE POLICY "Authenticated users can create answers" ON answers
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update own answers" ON answers;
CREATE POLICY "Authors can update own answers" ON answers
    FOR UPDATE USING (auth.uid() = author_id);

-- Prototypes Table Policies
DROP POLICY IF EXISTS "Anyone can read prototypes" ON prototypes;
CREATE POLICY "Anyone can read prototypes" ON prototypes
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create prototypes" ON prototypes;
CREATE POLICY "Authenticated users can create prototypes" ON prototypes
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update own prototypes" ON prototypes;
CREATE POLICY "Authors can update own prototypes" ON prototypes
    FOR UPDATE USING (auth.uid() = author_id);

-- Reports Table Policies
DROP POLICY IF EXISTS "Users can create reports" ON reports;
CREATE POLICY "Users can create reports" ON reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

DROP POLICY IF EXISTS "Users can view own reports" ON reports;
CREATE POLICY "Users can view own reports" ON reports
    FOR SELECT USING (auth.uid() = reporter_id);

-- Analytics Table Policies
DROP POLICY IF EXISTS "Users can create analytics" ON analytics;
CREATE POLICY "Users can create analytics" ON analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Sessions Table Policies
DROP POLICY IF EXISTS "Users can manage own sessions" ON user_sessions;
CREATE POLICY "Users can manage own sessions" ON user_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Tags Table Policies
DROP POLICY IF EXISTS "Anyone can read tags" ON tags;
CREATE POLICY "Anyone can read tags" ON tags
    FOR SELECT USING (true);

-- Insert sample data for testing
INSERT INTO users (id, name, email, avatar, reputation, is_ai, join_date) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Sarah Chen', 'sarah@example.com', '👩‍💻', 320, false, '2024-01-01T00:00:00Z'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Alex Thompson', 'alex@example.com', '👨‍💼', 180, false, '2024-01-01T00:00:00Z'),
    ('550e8400-e29b-41d4-a716-446655440003', 'ProtoBot', 'protobot@example.com', '🤖', 1250, true, '2024-01-01T00:00:00Z'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Maria Rodriguez', 'maria@example.com', '👩‍🎨', 95, false, '2024-01-01T00:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- Insert sample questions
INSERT INTO questions (id, title, content, author_id, tags, votes, answers_count, views, is_answered, is_featured, status) VALUES
    ('660e8400-e29b-41d4-a716-446655440001', 'What are the best prototyping tools for mobile app development?', 'I''m new to mobile app development and want to create a prototype before diving into full development. What tools would you recommend for someone just starting out?', '550e8400-e29b-41d4-a716-446655440001', ARRAY['mobile', 'prototyping', 'tools'], 15, 2, 245, true, true, 'active'),
    ('660e8400-e29b-41d4-a716-446655440002', 'How do I validate my SaaS idea before building a full MVP?', 'I have an idea for a SaaS product but want to make sure there''s market demand before investing time and money. What validation methods have worked for you?', '550e8400-e29b-41d4-a716-446655440002', ARRAY['saas', 'validation', 'mvp'], 12, 1, 189, true, false, 'active'),
    ('660e8400-e29b-41d4-a716-446655440003', 'What''s the difference between wireframes, mockups, and prototypes?', 'I keep hearing these terms but I''m not sure about the differences. Can someone explain when to use each one in the design process?', '550e8400-e29b-41d4-a716-446655440003', ARRAY['design', 'wireframes', 'mockups'], 8, 1, 156, true, false, 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample answers
INSERT INTO answers (id, question_id, content, author_id, votes, is_accepted, is_ai) VALUES
    ('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'For mobile app prototyping, I recommend starting with Figma or Adobe XD for design, then using tools like InVision or Marvel for interactive prototypes. For more advanced prototyping, consider Framer or ProtoPie.', '550e8400-e29b-41d4-a716-446655440003', 12, true, true),
    ('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'For SaaS validation, start with customer interviews and surveys. Create a landing page to gauge interest, use tools like Typeform for surveys, and consider building a simple MVP with no-code tools like Bubble or Webflow.', '550e8400-e29b-41d4-a716-446655440003', 8, false, true),
    ('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'Wireframes are basic layouts showing structure, mockups are visual designs without interactivity, and prototypes are interactive versions that simulate the final product. Use wireframes for planning, mockups for design approval, and prototypes for user testing.', '550e8400-e29b-41d4-a716-446655440003', 6, false, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample prototypes
INSERT INTO prototypes (id, title, description, github_pages_url, github_repo_url, author_id, tags, technologies, likes, views, status, is_featured) VALUES
    ('880e8400-e29b-41d4-a716-446655440001', 'E-commerce Mobile App Prototype', 'A fully functional mobile e-commerce app built with React Native. Features include product browsing, cart management, and checkout process.', 'https://username.github.io/ecommerce-prototype', 'https://github.com/username/ecommerce-prototype', '550e8400-e29b-41d4-a716-446655440001', ARRAY['ecommerce', 'mobile', 'react-native'], ARRAY['React Native', 'Redux', 'Firebase'], 45, 234, 'live', true),
    ('880e8400-e29b-41d4-a716-446655440002', 'SaaS Dashboard Prototype', 'A comprehensive dashboard for a SaaS platform with analytics, user management, and billing features.', 'https://username.github.io/saas-dashboard', 'https://github.com/username/saas-dashboard', '550e8400-e29b-41d4-a716-446655440002', ARRAY['saas', 'dashboard', 'analytics'], ARRAY['React', 'TypeScript', 'Chart.js'], 32, 189, 'live', false),
    ('880e8400-e29b-41d4-a716-446655440003', 'Real-time Chat Application', 'A real-time chat application with WebSocket integration, user authentication, and message history.', 'https://username.github.io/chat-app', NULL, '550e8400-e29b-41d4-a716-446655440003', ARRAY['chat', 'realtime', 'websockets'], ARRAY['Vue.js', 'Socket.io', 'Node.js'], 28, 156, 'development', false)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tags
INSERT INTO tags (name, description, usage_count) VALUES
    ('mobile', 'Mobile app development topics', 1),
    ('prototyping', 'Prototyping tools and techniques', 1),
    ('tools', 'Development tools and software', 1),
    ('saas', 'Software as a Service topics', 1),
    ('validation', 'Product validation methods', 1),
    ('mvp', 'Minimum Viable Product concepts', 1),
    ('design', 'Design principles and practices', 1),
    ('wireframes', 'Wireframing techniques', 1),
    ('mockups', 'Mockup creation and tools', 1),
    ('ecommerce', 'E-commerce development', 1),
    ('react-native', 'React Native framework', 1),
    ('dashboard', 'Dashboard design and development', 1),
    ('analytics', 'Analytics and data visualization', 1),
    ('chat', 'Chat application development', 1),
    ('realtime', 'Real-time features and WebSockets', 1),
    ('websockets', 'WebSocket implementation', 1)
ON CONFLICT (name) DO NOTHING; 