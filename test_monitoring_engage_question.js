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

async function testMonitoringEngageQuestion() {
  console.log('🔍 TESTING MONITORING SERVICE ENGAGE QUESTION');
  console.log('=' .repeat(60));

  try {
    // Step 1: Get an unanswered question
    console.log('\n📋 Step 1: Getting unanswered question...');
    const questions = await makeRequest('GET', '/questions?sortBy=created_at&limit=5');
    
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      if (unansweredQuestions.length > 0) {
        const testQuestion = unansweredQuestions[0];
        console.log(`Selected question: "${testQuestion.title}"`);
        console.log(`Question ID: ${testQuestion.id}`);
        console.log(`Current answers: ${testQuestion.answers_count || 0}`);
        
        // Step 2: Manually add an answer to simulate what the monitoring service should do
        console.log('\n🤖 Step 2: Manually adding AI answer...');
        const answerResponse = await makeRequest('POST', `/questions/${testQuestion.id}/answers`, {
          content: 'This is a test answer from the monitoring service to verify the answer creation works.',
          is_ai: true
        });
        
        console.log(`Answer creation status: ${answerResponse.status}`);
        console.log(`Answer creation response:`, JSON.stringify(answerResponse.data, null, 2));
        
        // Step 3: Check if the question now has an answer
        console.log('\n📊 Step 3: Verifying answer was created...');
        const updatedQuestions = await makeRequest('GET', '/questions');
        
        if (updatedQuestions.data && updatedQuestions.data.questions) {
          const updatedQuestion = updatedQuestions.data.questions.find(q => q.id === testQuestion.id);
          if (updatedQuestion) {
            console.log(`Updated question answers: ${updatedQuestion.answers_count || 0}`);
            if (updatedQuestion.answers_count > 0) {
              console.log('✅ SUCCESS: Answer was created successfully!');
            } else {
              console.log('❌ FAILURE: Answer was not created');
            }
          }
        }
        
        // Step 4: Now test the monitoring service
        console.log('\n🚀 Step 4: Testing monitoring service force engagement...');
        const monitoringResponse = await makeRequest('POST', '/monitoring/force-engagement');
        console.log(`Monitoring response: ${monitoringResponse.status} - ${JSON.stringify(monitoringResponse.data)}`);
        
        // Step 5: Check stats after monitoring
        console.log('\n📈 Step 5: Checking monitoring stats...');
        const statsResponse = await makeRequest('GET', '/monitoring/stats');
        console.log(`Stats:`, JSON.stringify(statsResponse.data, null, 2));
        
      } else {
        console.log('❌ No unanswered questions found');
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testMonitoringEngageQuestion().catch(console.error);
