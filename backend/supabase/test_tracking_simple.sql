-- Simple test script to verify AI Assistant tracking
-- Run this in Supabase Studio SQL Editor

-- Test 1: Check if tables exist and have the correct structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('ai_assistant_sessions', 'job_drafts', 'analytics', 'ghl_opportunities')
ORDER BY table_name, ordinal_position;

-- Test 2: Check if indexes exist
SELECT 
    indexname,
    tablename,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('ai_assistant_sessions', 'job_drafts', 'analytics', 'ghl_opportunities')
ORDER BY tablename, indexname;

-- Test 3: Check if foreign key constraints exist
SELECT 
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name IN ('analytics', 'ghl_opportunities');

-- Test 4: Insert test data to verify functionality
INSERT INTO ai_assistant_sessions (
    session_id,
    developer_ref,
    source,
    session_data,
    current_slot_index,
    completion_score,
    is_active
) VALUES (
    'test_session_cli_001',
    'lamont_evans',
    'email',
    '{"messages": [{"sender": "AI", "text": "Hello! I can help you create a job posting."}], "slots": {}}',
    0,
    0,
    true
) ON CONFLICT (session_id) DO NOTHING;

-- Test 5: Verify session was created
SELECT 
    'Session Created' as test_result,
    session_id,
    developer_ref,
    source,
    completion_score,
    is_active
FROM ai_assistant_sessions 
WHERE session_id = 'test_session_cli_001';

-- Test 6: Insert test job draft
INSERT INTO job_drafts (
    title,
    category,
    description,
    developer_ref,
    source,
    session_id,
    public_status,
    completion_score
) VALUES (
    'Test AI Chatbot Project',
    'AI & Machine Learning',
    'Develop an AI-powered chatbot for customer support',
    'lamont_evans',
    'ai_assistant',
    'test_session_cli_001',
    'draft',
    75
) ON CONFLICT DO NOTHING;

-- Test 7: Verify job draft was created
SELECT 
    'Job Draft Created' as test_result,
    id,
    title,
    developer_ref,
    source,
    session_id,
    public_status,
    completion_score
FROM job_drafts 
WHERE session_id = 'test_session_cli_001';

-- Test 8: Insert test analytics
INSERT INTO analytics (
    event_type,
    event_data,
    session_id,
    developer_ref,
    source,
    attribution_chain,
    job_draft_id,
    completion_score
) VALUES (
    'assistant_started',
    '{"developerRef": "lamont_evans", "source": "email"}',
    'test_session_cli_001',
    'lamont_evans',
    'email',
    'lamont_evans → user → conversion',
    (SELECT id FROM job_drafts WHERE session_id = 'test_session_cli_001' LIMIT 1),
    0
) ON CONFLICT DO NOTHING;

-- Test 9: Verify analytics was created
SELECT 
    'Analytics Created' as test_result,
    id,
    event_type,
    developer_ref,
    source,
    attribution_chain,
    job_draft_id,
    completion_score
FROM analytics 
WHERE session_id = 'test_session_cli_001';

-- Test 10: Test the complete tracking chain
SELECT 
    'Complete Tracking Chain' as test_result,
    s.session_id,
    s.developer_ref as session_dev_ref,
    jd.developer_ref as draft_dev_ref,
    a.developer_ref as analytics_dev_ref,
    s.source as session_source,
    jd.source as draft_source,
    a.source as analytics_source,
    jd.completion_score as draft_score,
    a.completion_score as analytics_score
FROM ai_assistant_sessions s
LEFT JOIN job_drafts jd ON s.session_id = jd.session_id
LEFT JOIN analytics a ON s.session_id = a.session_id
WHERE s.session_id = 'test_session_cli_001';

-- Test 11: Clean up test data
DELETE FROM analytics WHERE session_id = 'test_session_cli_001';
DELETE FROM job_drafts WHERE session_id = 'test_session_cli_001';
DELETE FROM ai_assistant_sessions WHERE session_id = 'test_session_cli_001';

SELECT 'Test completed successfully!' as final_result; 