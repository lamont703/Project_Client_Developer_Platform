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

async function testDebugOutput() {
  console.log('🔍 TESTING DEBUG OUTPUT FROM MONITORING SERVICE');
  console.log('=' .repeat(60));

  try {
    // Step 1: Check current state
    console.log('\n📊 Step 1: Current monitoring stats...');
    const stats = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats:`, JSON.stringify(stats.data, null, 2));
    
    // Step 2: Get unanswered questions
    console.log('\n📋 Step 2: Getting unanswered questions...');
    const questions = await makeRequest('GET', '/questions?sortBy=unanswered&limit=50');
    
    if (questions.data && questions.data.questions) {
      const unansweredQuestions = questions.data.questions.filter(q => 
        (!q.answers_count || q.answers_count === 0) && !q.is_ai_generated
      );
      
      console.log(`Found ${unansweredQuestions.length} unanswered human questions:`);
      unansweredQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}" (ID: ${q.id})`);
      });
    }
    
    // Step 3: Force engagement with enhanced logging
    console.log('\n🚀 Step 3: Force engagement (with enhanced debug logging)...');
    console.log('This should show detailed step-by-step processing in the Supabase logs');
    const engagement = await makeRequest('POST', '/monitoring/force-engagement');
    console.log(`Engagement response: ${engagement.status} - ${JSON.stringify(engagement.data)}`);
    
    // Step 4: Check stats after engagement
    console.log('\n📊 Step 4: Stats after engagement...');
    const statsAfter = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats after:`, JSON.stringify(statsAfter.data, null, 2));
    
    // Step 5: Check if questions were answered
    console.log('\n🔍 Step 5: Checking if questions were answered...');
    const questionsAfter = await makeRequest('GET', '/questions?sortBy=unanswered&limit=50');
    
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
          console.log(`💡 Check the Supabase function logs for detailed debug output`);
          console.log(`💡 The enhanced logging should show exactly where the process fails`);
        }
      }
    }
    
    console.log('\n📝 NOTE: The enhanced debug logging is now active in the monitoring service.');
    console.log('📝 Check the Supabase function logs in the dashboard to see the detailed step-by-step processing.');
    console.log('📝 The logs should show exactly where the monitoring service fails to process opportunities.');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testDebugOutput().catch(console.error);
