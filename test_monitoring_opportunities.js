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

async function testMonitoringOpportunities() {
  console.log('🔍 TESTING MONITORING OPPORTUNITIES');
  console.log('=' .repeat(50));

  try {
    // Test 1: Check if monitoring service can find opportunities
    console.log('\n📋 Test 1: Checking monitoring service opportunities...');
    
    // First, let's manually test the database query that the monitoring service uses
    console.log('  Testing database query with sortBy=unanswered...');
    const questions = await makeRequest('GET', '/questions?sortBy=unanswered&limit=50');
    
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      console.log(`  Database returned ${allQuestions.length} questions`);
      
      // Apply the same filtering logic as the monitoring service
      const filteredQuestions = allQuestions.filter(q => {
        const hasNoAnswers = !q.answers_count || q.answers_count === 0;
        const isNotAI = !q.is_ai_generated;
        return hasNoAnswers && isNotAI;
      });
      
      console.log(`  After filtering: ${filteredQuestions.length} unanswered human questions`);
      
      if (filteredQuestions.length > 0) {
        console.log('  Unanswered questions:');
        filteredQuestions.forEach((q, i) => {
          console.log(`    ${i + 1}. "${q.title}"`);
        });
        
        // Test 2: Force engagement and check if it processes these questions
        console.log('\n🚀 Test 2: Force engagement...');
        const engagement = await makeRequest('POST', '/monitoring/force-engagement');
        console.log(`  Engagement response: ${engagement.status} - ${JSON.stringify(engagement.data)}`);
        
        // Test 3: Check stats
        console.log('\n📊 Test 3: Check stats...');
        const stats = await makeRequest('GET', '/monitoring/stats');
        console.log(`  Stats:`, JSON.stringify(stats.data, null, 2));
        
        // Test 4: Check if questions were answered
        console.log('\n🔍 Test 4: Check if questions were answered...');
        const updatedQuestions = await makeRequest('GET', '/questions?sortBy=unanswered&limit=50');
        
        if (updatedQuestions.data && updatedQuestions.data.questions) {
          const updatedFiltered = updatedQuestions.data.questions.filter(q => {
            const hasNoAnswers = !q.answers_count || q.answers_count === 0;
            const isNotAI = !q.is_ai_generated;
            return hasNoAnswers && isNotAI;
          });
          
          console.log(`  Unanswered questions after engagement: ${updatedFiltered.length}`);
          
          if (updatedFiltered.length < filteredQuestions.length) {
            console.log(`  ✅ SUCCESS: ${filteredQuestions.length - updatedFiltered.length} questions were answered!`);
          } else {
            console.log(`  ❌ FAILURE: No questions were answered`);
            console.log(`  💡 The monitoring service is not processing opportunities correctly`);
          }
        }
        
      } else {
        console.log('  ❌ No unanswered human questions found');
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testMonitoringOpportunities().catch(console.error);
