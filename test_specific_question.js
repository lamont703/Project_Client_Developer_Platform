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

async function testSpecificQuestion() {
  console.log('🎯 TESTING SPECIFIC QUESTION');
  console.log('=' .repeat(40));

  try {
    const questionId = '9225a0df-70e8-4ed9-9964-7c6fe56a616b';
    const questionTitle = 'Test Authentication Fix - Who Am I?';
    
    console.log(`Testing question: "${questionTitle}"`);
    console.log(`Question ID: ${questionId}`);
    
    // Step 1: Check current state
    console.log('\n📊 Step 1: Current question state...');
    const questionResponse = await makeRequest('GET', `/questions/${questionId}`);
    console.log(`Question status: ${questionResponse.status}`);
    if (questionResponse.data && questionResponse.data.question) {
      const q = questionResponse.data.question;
      console.log(`Current answers: ${q.answers_count || 0}`);
      console.log(`Is AI generated: ${q.is_ai_generated}`);
    }
    
    // Step 2: Manually add an answer
    console.log('\n🤖 Step 2: Manually adding AI answer...');
    const answerResponse = await makeRequest('POST', `/questions/${questionId}/answers`, {
      content: 'This is a test answer from the monitoring service to verify answer creation works properly.',
      is_ai: true
    });
    
    console.log(`Answer creation status: ${answerResponse.status}`);
    console.log(`Answer creation response:`, JSON.stringify(answerResponse.data, null, 2));
    
    // Step 3: Verify answer was created
    console.log('\n✅ Step 3: Verifying answer was created...');
    const updatedQuestionResponse = await makeRequest('GET', `/questions/${questionId}`);
    if (updatedQuestionResponse.data && updatedQuestionResponse.data.question) {
      const q = updatedQuestionResponse.data.question;
      console.log(`Updated answers: ${q.answers_count || 0}`);
      if (q.answers_count > 0) {
        console.log('✅ SUCCESS: Answer was created successfully!');
      } else {
        console.log('❌ FAILURE: Answer was not created');
      }
    }
    
    // Step 4: Test monitoring service
    console.log('\n🚀 Step 4: Testing monitoring service...');
    const monitoringResponse = await makeRequest('POST', '/monitoring/force-engagement');
    console.log(`Monitoring response: ${monitoringResponse.status} - ${JSON.stringify(monitoringResponse.data)}`);
    
    // Step 5: Check stats
    console.log('\n📈 Step 5: Checking monitoring stats...');
    const statsResponse = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats:`, JSON.stringify(statsResponse.data, null, 2));

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testSpecificQuestion().catch(console.error);
