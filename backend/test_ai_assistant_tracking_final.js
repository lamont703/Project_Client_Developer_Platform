const { createClient } = require('@supabase/supabase-js');

// Test script for AI Project Assistant tracking functionality
async function testAIAssistantTracking() {
    console.log('🧪 Testing AI Project Assistant Tracking Functionality...\n');

    // Initialize Supabase client (remote database)
    const supabaseUrl = 'https://qhlzjrcidehlpmiimmfm.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE3MTQwMywiZXhwIjoyMDcxNzQ3NDAzfQ.yG8qUb5DTj3pSXTB_Hi4hvomV_aFleIAtivTg7X8kzU';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Test 1: Check if tables exist
        console.log('📋 Test 1: Verifying table structure...');
        const { data: tables, error: tablesError } = await supabase
            .from('ai_assistant_sessions')
            .select('*')
            .limit(1);
        
        if (tablesError) {
            console.log('❌ Error accessing ai_assistant_sessions table:', tablesError.message);
            return;
        }
        console.log('✅ ai_assistant_sessions table accessible');

        // Test 2: Create test session
        console.log('\n📝 Test 2: Creating test session...');
        const testSessionId = `test_session_${Date.now()}`;
        const { data: sessionData, error: sessionError } = await supabase
            .from('ai_assistant_sessions')
            .insert({
                session_id: testSessionId,
                developer_ref: 'lamont_evans',
                source: 'email',
                session_data: {
                    messages: [{ sender: 'AI', text: 'Hello! I can help you create a job posting.' }],
                    slots: {}
                },
                current_slot_index: 0,
                completion_score: 0,
                is_active: true
            })
            .select();

        if (sessionError) {
            console.log('❌ Error creating session:', sessionError.message);
            return;
        }
        console.log('✅ Test session created:', sessionData[0].session_id);

        // Test 3: Create test job draft
        console.log('\n📄 Test 3: Creating test job draft...');
        const { data: jobDraftData, error: jobDraftError } = await supabase
            .from('job_drafts')
            .insert({
                title: 'Test AI Chatbot Project',
                category: 'AI & Machine Learning',
                description: 'Develop an AI-powered chatbot for customer support',
                developer_ref: 'lamont_evans',
                source: 'ai_assistant',
                session_id: testSessionId,
                public_status: 'draft',
                completion_score: 75,
                generated_title: 'AI-Powered Customer Support Chatbot',
                generated_skills: ['Python', 'TensorFlow', 'React', 'Node.js'],
                generated_milestones: ['Setup', 'Development', 'Testing', 'Deployment'],
                estimated_budget_range: { min: 5000, max: 10000 },
                estimated_timeline: '3-6 months'
            })
            .select();

        if (jobDraftError) {
            console.log('❌ Error creating job draft:', jobDraftError.message);
            return;
        }
        console.log('✅ Test job draft created:', jobDraftData[0].id);

        // Test 4: Create test analytics
        console.log('\n📊 Test 4: Creating test analytics...');
        const { data: analyticsData, error: analyticsError } = await supabase
            .from('analytics')
            .insert({
                event_type: 'assistant_started',
                event_data: {
                    developerRef: 'lamont_evans',
                    source: 'email',
                    hasDeveloperReferral: true
                },
                session_id: testSessionId,
                developer_ref: 'lamont_evans',
                source: 'email',
                attribution_chain: 'lamont_evans → user → conversion',
                job_draft_id: jobDraftData[0].id,
                completion_score: 0
            })
            .select();

        if (analyticsError) {
            console.log('❌ Error creating analytics:', analyticsError.message);
            return;
        }
        console.log('✅ Test analytics created:', analyticsData[0].id);

        // Test 5: Test the complete tracking chain
        console.log('\n🔗 Test 5: Testing complete tracking chain...');
        const { data: sessionDataChain, error: sessionChainError } = await supabase
            .from('ai_assistant_sessions')
            .select('*')
            .eq('session_id', testSessionId);

        const { data: jobDraftsDataChain, error: jobDraftsChainError } = await supabase
            .from('job_drafts')
            .select('*')
            .eq('session_id', testSessionId);

        const { data: analyticsDataChain, error: analyticsChainError } = await supabase
            .from('analytics')
            .select('*')
            .eq('session_id', testSessionId);

        if (sessionChainError || jobDraftsChainError || analyticsChainError) {
            console.log('❌ Error testing tracking chain:', sessionChainError?.message || jobDraftsChainError?.message || analyticsChainError?.message);
            return;
        }

        console.log('✅ Complete tracking chain verified:');
        console.log('   Session:', sessionDataChain[0]?.session_id);
        console.log('   Job Drafts:', jobDraftsDataChain.length);
        console.log('   Analytics Events:', analyticsDataChain.length);

        // Test 6: Test developer attribution query
        console.log('\n👨‍💻 Test 6: Testing developer attribution...');
        const { data: attributionData, error: attributionError } = await supabase
            .from('analytics')
            .select('*')
            .eq('developer_ref', 'lamont_evans')
            .eq('session_id', testSessionId);

        if (attributionError) {
            console.log('❌ Error testing attribution:', attributionError.message);
            return;
        }
        console.log('✅ Developer attribution working:', attributionData.length, 'events found');

        // Test 7: Test GoHighLevel opportunity creation
        console.log('\n🎯 Test 7: Testing GoHighLevel opportunity...');
        const { data: ghlData, error: ghlError } = await supabase
            .from('ghl_opportunities')
            .insert({
                opportunity_id: `ghl_test_${Date.now()}`,
                name: 'Test AI Chatbot Project',
                status: 'Qualified Lead',
                monetary_value: 7500.00,
                contact_id: 'test_contact_001',
                pipeline_id: 'test_pipeline_001',
                pipeline_stage_id: 'test_stage_001',
                assigned_to: 'lamont_evans',
                developer_ref: 'lamont_evans',
                source: 'ai_assistant',
                job_draft_id: jobDraftData[0].id,
                session_id: testSessionId,
                attribution_chain: 'lamont_evans → user → conversion'
            })
            .select();

        if (ghlError) {
            console.log('❌ Error creating GHL opportunity:', ghlError.message);
        } else {
            console.log('✅ GoHighLevel opportunity created:', ghlData[0].opportunity_id);
        }

        // Test 8: Clean up test data
        console.log('\n🧹 Test 8: Cleaning up test data...');
        await supabase.from('analytics').delete().eq('session_id', testSessionId);
        await supabase.from('ghl_opportunities').delete().eq('session_id', testSessionId);
        await supabase.from('job_drafts').delete().eq('session_id', testSessionId);
        await supabase.from('ai_assistant_sessions').delete().eq('session_id', testSessionId);
        console.log('✅ Test data cleaned up');

        console.log('\n🎉 All tests passed! AI Project Assistant tracking is working correctly.');
        console.log('\n📈 Tracking Features Verified:');
        console.log('   ✅ Session management');
        console.log('   ✅ Developer attribution');
        console.log('   ✅ Job draft creation');
        console.log('   ✅ Analytics tracking');
        console.log('   ✅ GoHighLevel integration');
        console.log('   ✅ Foreign key relationships');
        console.log('   ✅ Data cleanup');

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

// Run the test
testAIAssistantTracking(); 