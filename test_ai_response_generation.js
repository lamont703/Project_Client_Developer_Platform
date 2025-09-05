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

async function testAIResponseGeneration() {
  console.log('🤖 TESTING AI RESPONSE GENERATION');
  console.log('=' .repeat(50));

  try {
    // Get an unanswered question
    console.log('\n📋 Getting unanswered question...');
    const questions = await makeRequest('GET', '/questions?sortBy=unanswered&limit=5');
    
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      if (unansweredQuestions.length > 0) {
        const testQuestion = unansweredQuestions[0];
        console.log(`Testing with question: "${testQuestion.title}"`);
        console.log(`Question ID: ${testQuestion.id}`);
        
        // Test AI engagement endpoint
        console.log('\n🤖 Testing AI engagement...');
        const aiEngagement = await makeRequest('POST', '/questions/ai-engagement', {
          questionId: testQuestion.id,
          persona: 'proto-bot-alex'
        });
        
        console.log(`AI Engagement Status: ${aiEngagement.status}`);
        console.log(`AI Engagement Response:`, JSON.stringify(aiEngagement.data, null, 2));
        
        // Check if the question now has an answer
        console.log('\n📊 Checking if question was answered...');
        const updatedQuestions = await makeRequest('GET', '/questions');
        
        if (updatedQuestions.data && updatedQuestions.data.questions) {
          const updatedQuestion = updatedQuestions.data.questions.find(q => q.id === testQuestion.id);
          if (updatedQuestion) {
            console.log(`Updated question answers: ${updatedQuestion.answers_count || 0}`);
            if (updatedQuestion.answers_count > 0) {
              console.log('✅ SUCCESS: Question was answered!');
            } else {
              console.log('❌ FAILURE: Question was not answered');
            }
          }
        }
        
      } else {
        console.log('❌ No unanswered questions found');
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testAIResponseGeneration().catch(console.error);
