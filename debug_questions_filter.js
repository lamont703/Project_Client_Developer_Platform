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

async function debugQuestionsFilter() {
  console.log('🔍 DEBUGGING QUESTIONS FILTER');
  console.log('=' .repeat(40));

  try {
    // Get all questions
    console.log('\n📋 Getting all questions...');
    const questions = await makeRequest('GET', '/questions?sortBy=created_at&limit=10');
    
    if (questions.data && questions.data.questions) {
      const allQuestions = questions.data.questions;
      console.log(`Total questions returned: ${allQuestions.length}`);
      
      console.log('\n📊 All questions:');
      allQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}"`);
        console.log(`     Answers: ${q.answers_count || 0}, is_ai: ${q.is_ai_generated}, is_answered: ${q.is_answered}`);
      });
      
      // Apply monitoring service filter
      const filtered = allQuestions.filter(q => {
        const hasNoAnswers = !q.answers_count || q.answers_count === 0;
        const isNotAI = !q.is_ai_generated;
        const shouldBeProcessed = hasNoAnswers && isNotAI;
        console.log(`\n  Filtering "${q.title}":`);
        console.log(`    hasNoAnswers: ${hasNoAnswers} (answers_count: ${q.answers_count})`);
        console.log(`    isNotAI: ${isNotAI} (is_ai_generated: ${q.is_ai_generated})`);
        console.log(`    shouldBeProcessed: ${shouldBeProcessed}`);
        return shouldBeProcessed;
      });
      
      console.log(`\n🎯 After filtering: ${filtered.length} unanswered human questions`);
      filtered.forEach((q, i) => {
        console.log(`  ${i + 1}. "${q.title}"`);
      });
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

debugQuestionsFilter().catch(console.error);
