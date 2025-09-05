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

async function finalMonitoringTest() {
  console.log('🎯 FINAL MONITORING SERVICE TEST');
  console.log('=' .repeat(50));

  try {
    // Step 1: Get all questions with higher limit
    console.log('\n📋 Step 1: Getting all questions (limit 50)...');
    const questions = await makeRequest('GET', '/questions?sortBy=created_at&limit=50');
    
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      console.log(`Total questions returned: ${allQuestions.length}`);
      
      // Find unanswered human questions
      const unansweredHumanQuestions = allQuestions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      console.log(`\n🎯 Unanswered human questions found: ${unansweredHumanQuestions.length}`);
      unansweredHumanQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}" (ID: ${q.id})`);
        console.log(`     Answers: ${q.answers_count || 0}, Created: ${q.created_at}`);
      });
      
      if (unansweredHumanQuestions.length > 0) {
        // Step 2: Test monitoring service
        console.log('\n🚀 Step 2: Testing monitoring service force engagement...');
        const monitoringResponse = await makeRequest('POST', '/monitoring/force-engagement');
        console.log(`Monitoring response: ${monitoringResponse.status}`);
        console.log(`Response: ${JSON.stringify(monitoringResponse.data)}`);
        
        // Step 3: Check stats immediately after
        console.log('\n📊 Step 3: Checking monitoring stats...');
        const statsResponse = await makeRequest('GET', '/monitoring/stats');
        console.log(`Stats:`, JSON.stringify(statsResponse.data, null, 2));
        
        // Step 4: Check if any questions were answered
        console.log('\n🔍 Step 4: Checking if questions were answered...');
        const updatedQuestions = await makeRequest('GET', '/questions?sortBy=created_at&limit=50');
        
        if (updatedQuestions.data && updatedQuestions.data.questions) {
          const updatedUnanswered = updatedQuestions.data.questions.filter(q => 
            (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
          );
          
          console.log(`Unanswered human questions after monitoring: ${updatedUnanswered.length}`);
          
          if (updatedUnanswered.length < unansweredHumanQuestions.length) {
            const answeredCount = unansweredHumanQuestions.length - updatedUnanswered.length;
            console.log(`✅ SUCCESS: ${answeredCount} questions were answered by the monitoring service!`);
          } else {
            console.log(`❌ FAILURE: No questions were answered by the monitoring service`);
            console.log(`💡 The monitoring service is not processing opportunities correctly`);
          }
        }
        
      } else {
        console.log('❌ No unanswered human questions found to test with');
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

finalMonitoringTest().catch(console.error);
