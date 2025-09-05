#!/usr/bin/env node

const https = require('https');

// Configuration
const API_BASE = 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'X-Test-User': 'ai-user' // Simulate AI user for testing
};

function log(message, data = null) {
  console.log(`\n🔍 ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'qhlzjrcidehlpmiimmfm.supabase.co',
      port: 443,
      path: `/functions/v1/api${path}`,
      method: method,
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function comprehensiveMonitoringDebug() {
  console.log('🚀 COMPREHENSIVE AI MONITORING DEBUG SESSION');
  console.log('=' .repeat(60));

  try {
    // Step 1: Check environment and configuration
    log('STEP 1: Environment Check');
    const envCheck = await makeRequest('GET', '/debug/env');
    console.log(`Status: ${envCheck.status}`);
    console.log('Environment:', envCheck.data);

    // Step 2: Get current monitoring stats
    log('STEP 2: Current Monitoring Stats');
    const stats = await makeRequest('GET', '/monitoring/stats');
    console.log(`Status: ${stats.status}`);
    console.log('Stats:', stats.data);

    // Step 3: Get monitoring configuration
    log('STEP 3: Monitoring Configuration');
    const config = await makeRequest('GET', '/monitoring/config');
    console.log(`Status: ${config.status}`);
    console.log('Config:', config.data);

    // Step 4: Check current questions
    log('STEP 4: Current Questions Analysis');
    const questions = await makeRequest('GET', '/questions');
    console.log(`Status: ${questions.status}`);
    
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      const unansweredQuestions = allQuestions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      const aiQuestions = allQuestions.filter(q => q.is_ai_generated);
      const humanQuestions = allQuestions.filter(q => !q.is_ai_generated);
      
      console.log(`📊 Question Analysis:`);
      console.log(`  Total questions: ${allQuestions.length}`);
      console.log(`  Human questions: ${humanQuestions.length}`);
      console.log(`  AI questions: ${aiQuestions.length}`);
      console.log(`  Unanswered human questions: ${unansweredQuestions.length}`);
      
      if (unansweredQuestions.length > 0) {
        console.log(`\n🎯 Unanswered Human Questions:`);
        unansweredQuestions.forEach((q, i) => {
          console.log(`  ${i + 1}. "${q.title}" (${q.tags?.join(', ') || 'no tags'})`);
          console.log(`     Created: ${q.created_at}`);
          console.log(`     Views: ${q.views || 0}, Answers: ${q.answers_count || 0}`);
        });
      }
    }

    // Step 5: Test AI response generation directly
    log('STEP 5: Direct AI Response Generation Test');
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      if (unansweredQuestions.length > 0) {
        const testQuestion = unansweredQuestions[0];
        console.log(`Testing AI response for: "${testQuestion.title}"`);
        
        const aiEngagement = await makeRequest('POST', '/questions/ai-engagement', {
          questionId: testQuestion.id,
          persona: 'proto-bot-alex'
        });
        
        console.log(`AI Engagement Status: ${aiEngagement.status}`);
        console.log('AI Engagement Response:', aiEngagement.data);
      } else {
        console.log('❌ No unanswered questions to test AI response generation');
      }
    }

    // Step 6: Force community analysis
    log('STEP 6: Force Community Analysis');
    const analysis = await makeRequest('POST', '/monitoring/force-analysis');
    console.log(`Status: ${analysis.status}`);
    console.log('Analysis Response:', analysis.data);

    // Step 7: Check monitoring history
    log('STEP 7: Monitoring History');
    const history = await makeRequest('GET', '/monitoring/history');
    console.log(`Status: ${history.status}`);
    console.log('History:', history.data);

    // Step 8: Force engagement (this should trigger the monitoring service)
    log('STEP 8: Force Engagement Execution');
    const engagement = await makeRequest('POST', '/monitoring/force-engagement');
    console.log(`Status: ${engagement.status}`);
    console.log('Engagement Response:', engagement.data);

    // Step 9: Check stats again to see if anything changed
    log('STEP 9: Post-Engagement Stats Check');
    const statsAfter = await makeRequest('GET', '/monitoring/stats');
    console.log(`Status: ${statsAfter.status}`);
    console.log('Stats After Engagement:', statsAfter.data);

    // Step 10: Check questions again to see if any were answered
    log('STEP 10: Post-Engagement Questions Check');
    const questionsAfter = await makeRequest('GET', '/questions');
    console.log(`Status: ${questionsAfter.status}`);
    
    if (questionsAfter.data && questionsAfter.data.questions) {
      const allQuestionsAfter = questionsAfter.data.questions;
      const unansweredAfter = allQuestionsAfter.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      console.log(`📊 Post-Engagement Question Analysis:`);
      console.log(`  Total questions: ${allQuestionsAfter.length}`);
      console.log(`  Unanswered human questions: ${unansweredAfter.length}`);
      
      // Check if any questions got new answers
      if (questions.data && questions.data.questions) {
        const beforeUnanswered = questions.data.questions.filter(q => 
          (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
        );
        
        if (unansweredAfter.length < beforeUnanswered.length) {
          console.log(`✅ SUCCESS: ${beforeUnanswered.length - unansweredAfter.length} questions were answered!`);
        } else {
          console.log(`❌ No questions were answered during engagement`);
        }
      }
    }

    // Step 11: Final diagnosis
    log('STEP 11: Final Diagnosis');
    console.log('\n🎯 DIAGNOSIS SUMMARY:');
    
    if (stats.data && stats.data.successfulEngagements === 0) {
      console.log('❌ ISSUE: Monitoring service shows 0 successful engagements');
      console.log('💡 Possible causes:');
      console.log('   1. Monitoring service not processing opportunities correctly');
      console.log('   2. Engagement limits being hit');
      console.log('   3. Error in findEngagementOpportunities() method');
      console.log('   4. Error in executeEngagement() method');
      console.log('   5. Error in recordEngagement() method');
    } else {
      console.log('✅ Monitoring service appears to be working');
    }

    if (config.data && Object.keys(config.data).length === 0) {
      console.log('❌ ISSUE: Monitoring configuration is empty');
      console.log('💡 This suggests the DEFAULT_CONFIG is malformed');
    } else {
      console.log('✅ Monitoring configuration loaded correctly');
    }

    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Check Supabase function logs for detailed error messages');
    console.log('2. Verify the enhanced logging is working in aiMonitoringService.ts');
    console.log('3. Test individual methods in the monitoring service');
    console.log('4. Check if the monitoring service is properly initialized');

  } catch (error) {
    console.error('💥 Error during comprehensive debug:', error);
  }
}

// Run the comprehensive debug
comprehensiveMonitoringDebug().catch(console.error);
