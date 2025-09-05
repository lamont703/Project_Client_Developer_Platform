#!/usr/bin/env node

const https = require('https');

// Configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`,
  'X-Test-User': 'ai-user'
};

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

async function debugMonitoringInternals() {
  console.log('🔍 MONITORING SERVICE INTERNAL DEBUG');
  console.log('=' .repeat(50));

  try {
    // Test 1: Check if monitoring service can find unanswered questions
    console.log('\n📋 Test 1: Finding Unanswered Questions');
    const questions = await makeRequest('GET', '/questions');
    
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      console.log(`Found ${unansweredQuestions.length} unanswered human questions:`);
      unansweredQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}" (ID: ${q.id})`);
        console.log(`     Tags: ${q.tags?.join(', ') || 'none'}`);
        console.log(`     Created: ${q.created_at}`);
        console.log(`     Views: ${q.views || 0}, Answers: ${q.answers_count || 0}`);
      });
    }

    // Test 2: Test individual monitoring methods
    console.log('\n🔧 Test 2: Testing Individual Monitoring Methods');
    
    // Test force-analysis first
    console.log('  Running force-analysis...');
    const analysis = await makeRequest('POST', '/monitoring/force-analysis');
    console.log(`  Analysis result: ${analysis.status} - ${JSON.stringify(analysis.data)}`);

    // Test force-engagement
    console.log('  Running force-engagement...');
    const engagement = await makeRequest('POST', '/monitoring/force-engagement');
    console.log(`  Engagement result: ${engagement.status} - ${JSON.stringify(engagement.data)}`);

    // Test 3: Check if any questions got answered
    console.log('\n📊 Test 3: Checking Results');
    const questionsAfter = await makeRequest('GET', '/questions');
    
    if (questionsAfter.data && questionsAfter.data.questions) {
      const unansweredAfter = questionsAfter.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      console.log(`Unanswered questions after engagement: ${unansweredAfter.length}`);
      
      if (questions.data && questions.data.questions) {
        const beforeUnanswered = questions.data.questions.filter(q => 
          (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
        );
        
        if (unansweredAfter.length < beforeUnanswered.length) {
          console.log(`✅ SUCCESS: ${beforeUnanswered.length - unansweredAfter.length} questions were answered!`);
        } else {
          console.log(`❌ FAILURE: No questions were answered`);
        }
      }
    }

    // Test 4: Check monitoring stats
    console.log('\n📈 Test 4: Monitoring Stats');
    const stats = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats: ${JSON.stringify(stats.data, null, 2)}`);

    // Test 5: Try to manually trigger engagement with specific question
    console.log('\n🎯 Test 5: Manual Question Engagement');
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      if (unansweredQuestions.length > 0) {
        const testQuestion = unansweredQuestions[0];
        console.log(`Testing manual engagement with: "${testQuestion.title}"`);
        
        // Try to add an answer manually
        const manualAnswer = await makeRequest('POST', `/questions/${testQuestion.id}/answers`, {
          content: 'This is a test answer from the monitoring service debug script.',
          is_ai: true
        });
        
        console.log(`Manual answer result: ${manualAnswer.status} - ${JSON.stringify(manualAnswer.data)}`);
      }
    }

    // Test 6: Check database filtering logic
    console.log('\n🔍 Test 6: Database Filtering Analysis');
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      
      console.log('Question filtering analysis:');
      allQuestions.forEach((q, i) => {
        const isUnanswered = !q.answers_count || q.answers_count === 0;
        const isHuman = !q.is_ai_generated;
        const shouldBeProcessed = isUnanswered && isHuman;
        
        console.log(`  ${i + 1}. "${q.title}"`);
        console.log(`     Answers: ${q.answers_count || 0} (unanswered: ${isUnanswered})`);
        console.log(`     AI Generated: ${q.is_ai_generated} (human: ${isHuman})`);
        console.log(`     Should be processed: ${shouldBeProcessed}`);
        console.log('');
      });
    }

    console.log('\n🎯 DIAGNOSIS:');
    if (questions.data.questions.filter(q => !q.is_ai_generated).length === 0) {
      console.log('❌ No unanswered human questions found for AI to answer');
    } else {
      console.log('✅ Unanswered human questions exist');
      console.log('❌ Monitoring service is not processing them correctly');
      console.log('💡 Check the enhanced logging in aiMonitoringService.ts');
      console.log('💡 The issue is likely in findUnansweredQuestions() or executeEngagement()');
    }

  } catch (error) {
    console.error('💥 Error during internal debug:', error);
  }
}

debugMonitoringInternals().catch(console.error);
