-- Test AI Project Assistant Tracking Functionality
-- Test script for Supabase CLI

-- Test 1: Create a test AI assistant session
INSERT INTO ai_assistant_sessions (
    session_id,
    developer_ref,
    source,
    session_data,
    current_slot_index,
    completion_score,
    is_active
) VALUES (
    'test_session_001',
    'lamont_evans',
    'email',
    '{"messages": [{"sender": "AI", "text": "Hello! I can help you create a job posting."}], "slots": {}}',
    0,
    0,
    true
);

-- Test 2: Create a test job draft with developer attribution
INSERT INTO job_drafts (
    title,
    category,
    target_audience,
    description,
    key_features,
    technology_stack,
    budget,
    timeline,
    success_criteria,
    potential_challenges,
    developer_ref,
    source,
    session_id,
    public_status,
    generated_title,
    generated_skills,
    generated_milestones,
    estimated_budget_range,
    estimated_timeline,
    completion_score
) VALUES (
    'AI Chatbot for E-commerce Store',
    'AI & Machine Learning',
    'E-commerce businesses',
    'Develop an AI-powered chatbot for customer support and sales assistance',
    'Natural language processing, product recommendations, order tracking',
    'Python, TensorFlow, React, Node.js',
    '$5000 - $10000',
    '3 - 6 months',
    'Improved customer satisfaction, reduced support tickets',
    'Integration complexity, training data requirements',
    'lamont_evans',
    'ai_assistant',
    'test_session_001',
    'draft',
    'AI-Powered E-commerce Chatbot Development',
    ARRAY['Python', 'TensorFlow', 'React', 'Node.js', 'NLP'],
    ARRAY['Milestone 1: Initial Setup', 'Milestone 2: Development Phase', 'Milestone 3: Testing and QA', 'Milestone 4: Deployment'],
    '{"min": 5000, "max": 10000}',
    '3 - 6 months',
    85
);

-- Test 3: Create test analytics events with developer attribution
INSERT INTO analytics (
    event_type,
    event_data,
    session_id,
    developer_ref,
    source,
    attribution_chain,
    job_draft_id,
    slot_name,
    completion_score
) VALUES 
-- Assistant started event
(
    'assistant_started',
    '{"developerRef": "lamont_evans", "source": "email", "hasDeveloperReferral": true}',
    'test_session_001',
    'lamont_evans',
    'email',
    'lamont_evans → user → conversion',
    NULL,
    NULL,
    0
),
-- Slot filled event
(
    'slot_filled',
    '{"slotName": "title", "value": "AI Chatbot for E-commerce Store"}',
    'test_session_001',
    'lamont_evans',
    'email',
    'lamont_evans → user → conversion',
    (SELECT id FROM job_drafts WHERE session_id = 'test_session_001' LIMIT 1),
    'title',
    10
),
-- Draft generated event
(
    'draft_generated',
    '{"completionScore": 85, "generatedTitle": "AI-Powered E-commerce Chatbot Development"}',
    'test_session_001',
    'lamont_evans',
    'email',
    'lamont_evans → user → conversion',
    (SELECT id FROM job_drafts WHERE session_id = 'test_session_001' LIMIT 1),
    NULL,
    85
);

-- Test 4: Create test GoHighLevel opportunity with developer attribution
INSERT INTO ghl_opportunities (
    opportunity_id,
    name,
    status,
    monetary_value,
    contact_id,
    pipeline_id,
    pipeline_stage_id,
    assigned_to,
    developer_ref,
    source,
    job_draft_id,
    session_id,
    attribution_chain
) VALUES (
    'ghl_opp_001',
    'AI-Powered E-commerce Chatbot Development',
    'Qualified Lead',
    7500.00,
    'contact_001',
    'pipeline_001',
    'stage_001',
    'lamont_evans',
    'lamont_evans',
    'ai_assistant',
    (SELECT id FROM job_drafts WHERE session_id = 'test_session_001' LIMIT 1),
    'test_session_001',
    'lamont_evans → user → conversion'
);

-- Test 5: Query to verify all tracking data is properly linked
SELECT 
    'Session Data' as test_type,
    s.session_id,
    s.developer_ref,
    s.source,
    s.completion_score,
    s.is_active
FROM ai_assistant_sessions s
WHERE s.session_id = 'test_session_001'

UNION ALL

SELECT 
    'Job Draft Data' as test_type,
    jd.session_id,
    jd.developer_ref,
    jd.source,
    jd.completion_score,
    CASE WHEN jd.public_status = 'draft' THEN true ELSE false END as is_active
FROM job_drafts jd
WHERE jd.session_id = 'test_session_001'

UNION ALL

SELECT 
    'Analytics Data' as test_type,
    a.session_id,
    a.developer_ref,
    a.source,
    a.completion_score,
    true as is_active
FROM analytics a
WHERE a.session_id = 'test_session_001'

UNION ALL

SELECT 
    'GHL Opportunity Data' as test_type,
    g.session_id,
    g.developer_ref,
    g.source,
    NULL as completion_score,
    true as is_active
FROM ghl_opportunities g
WHERE g.session_id = 'test_session_001';

-- Test 6: Verify foreign key relationships
SELECT 
    'Foreign Key Test' as test_type,
    COUNT(*) as total_records,
    COUNT(DISTINCT a.job_draft_id) as unique_job_drafts,
    COUNT(DISTINCT g.job_draft_id) as ghl_job_drafts
FROM analytics a
LEFT JOIN ghl_opportunities g ON a.job_draft_id = g.job_draft_id
WHERE a.session_id = 'test_session_001';

-- Test 7: Test developer attribution chain
SELECT 
    'Developer Attribution Chain' as test_type,
    developer_ref,
    source,
    attribution_chain,
    COUNT(*) as event_count
FROM analytics
WHERE developer_ref = 'lamont_evans'
GROUP BY developer_ref, source, attribution_chain;

-- Test 8: Test session completion tracking
SELECT 
    'Session Completion Tracking' as test_type,
    s.session_id,
    s.completion_score as session_score,
    jd.completion_score as draft_score,
    AVG(a.completion_score) as avg_analytics_score
FROM ai_assistant_sessions s
LEFT JOIN job_drafts jd ON s.session_id = jd.session_id
LEFT JOIN analytics a ON s.session_id = a.session_id
WHERE s.session_id = 'test_session_001'
GROUP BY s.session_id, s.completion_score, jd.completion_score; 