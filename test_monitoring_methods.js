#!/usr/bin/env node

const https = require('https');

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

async function testMonitoringMethods() {
  console.log('🔍 TESTING MONITORING METHODS DIRECTLY');
  console.log('=' .repeat(50));

  try {
    // Test 1: Get questions with unanswered sort
    console.log('\n📋 Test 1: Database Query with sortBy=unanswered');
    const questions = await makeRequest('GET', '/questions?sortBy=unanswered&limit=10');
    console.log(`Status: ${questions.status}`);
    
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      console.log(`Total questions returned: ${allQuestions.length}`);
      
      allQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}"`);
        console.log(`     Answers: ${q.answers_count || 0}, is_answered: ${q.is_answered}, is_ai: ${q.is_ai_generated}`);
      });
      
      // Filter like the monitoring service does
      const filtered = allQuestions.filter(q => {
        const hasNoAnswers = !q.answers_count || q.answers_count === 0;
        const isNotAI = !q.is_ai_generated;
        return hasNoAnswers && isNotAI;
      });
      
      console.log(`\n🎯 After filtering (like monitoring service): ${filtered.length} questions`);
      filtered.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}"`);
      });
    }

    // Test 2: Force engagement and check logs
    console.log('\n🚀 Test 2: Force Engagement');
    const engagement = await makeRequest('POST', '/monitoring/force-engagement');
    console.log(`Status: ${engagement.status}`);
    console.log(`Response: ${JSON.stringify(engagement.data)}`);

    // Test 3: Check stats
    console.log('\n📊 Test 3: Check Stats');
    const stats = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats: ${JSON.stringify(stats.data, null, 2)}`);

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testMonitoringMethods().catch(console.error);
