#!/usr/bin/env node

/**
 * AI Monitoring Internals Debug Script
 * Tests the specific monitoring service methods to identify the exact failure point
 */

const API_BASE = 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`
};

function log(message, data = null) {
  console.log(`\n🔍 ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

async function makeRequest(url, options = {}) {
  const response = await fetch(url, { headers, ...options });
  return await response.json();
}

async function debugMonitoringInternals() {
  console.log('🔧 Debugging AI Monitoring Internals');
  console.log('=' .repeat(50));

  // Test 1: Check monitoring configuration
  log('Testing monitoring configuration...');
  const config = await makeRequest(`${API_BASE}/monitoring/config`);
  log('Monitoring config:', {
    maxEngagementsPerHour: config.config?.maxEngagementsPerHour,
    activePersonas: config.config?.activePersonas,
    engagementTypes: config.config?.engagementTypes
  });

  // Test 2: Force analysis to see if opportunities are found
  log('Testing force analysis (opportunity finding)...');
  const analysis = await makeRequest(`${API_BASE}/monitoring/force-analysis`, {
    method: 'POST'
  });
  log('Force analysis result:', analysis);

  // Test 3: Check engagement history
  log('Checking engagement history...');
  const history = await makeRequest(`${API_BASE}/monitoring/history`);
  log('Engagement history:', {
    historyCount: history.engagementHistory?.length || 0,
    recentHistory: history.engagementHistory?.slice(0, 3) || []
  });

  // Test 4: Try to manually trigger engagement with specific question
  log('Testing manual question engagement...');
  const questions = await makeRequest(`${API_BASE}/questions?sortBy=unanswered&limit=1`);
  const testQuestion = questions.questions.find(q => !q.is_ai_generated);
  
  if (testQuestion) {
    log('Found test question:', {
      id: testQuestion.id,
      title: testQuestion.title.substring(0, 50) + '...',
      isAI: testQuestion.is_ai_generated,
      answersCount: testQuestion.answers_count
    });

    // Try direct AI engagement on this question
    try {
      const directEngagement = await makeRequest(`${API_BASE}/questions/ai-engagement`, {
        method: 'POST',
        body: JSON.stringify({
          questionId: testQuestion.id,
          forceAnswer: true  // Try to force answering instead of creating new question
        })
      });
      log('Direct engagement result:', directEngagement);
    } catch (error) {
      log('Direct engagement failed:', { error: error.message });
    }

    // Check if the question was answered
    const updatedQuestion = await makeRequest(`${API_BASE}/questions/${testQuestion.id}`);
    log('Question after engagement:', {
      id: testQuestion.id,
      answersCountBefore: testQuestion.answers_count,
      answersCountAfter: updatedQuestion.question.answers_count,
      isAnswered: updatedQuestion.question.is_answered,
      answerAuthors: updatedQuestion.answers?.map(a => ({
        author: a.author.name,
        isAI: a.is_ai,
        content: a.content.substring(0, 50) + '...'
      })) || []
    });
  }

  // Test 5: Check database filtering logic
  log('Testing database filtering logic...');
  const allQuestions = await makeRequest(`${API_BASE}/questions?limit=10`);
  const unansweredQuestions = await makeRequest(`${API_BASE}/questions?sortBy=unanswered&limit=10`);
  
  log('Question filtering analysis:', {
    totalQuestions: allQuestions.count,
    unansweredQuestions: unansweredQuestions.count,
    humanUnanswered: unansweredQuestions.questions.filter(q => !q.is_ai_generated).length,
    aiGenerated: unansweredQuestions.questions.filter(q => q.is_ai_generated).length,
    breakdown: unansweredQuestions.questions.map(q => ({
      id: q.id.substring(0, 8) + '...',
      title: q.title.substring(0, 30) + '...',
      isAI: q.is_ai_generated,
      answers: q.answers_count,
      author: q.author.name
    }))
  });

  console.log('\n' + '='.repeat(50));
  console.log('🎯 DIAGNOSIS:');
  
  if (unansweredQuestions.questions.filter(q => !q.is_ai_generated).length === 0) {
    console.log('❌ No unanswered human questions found for AI to answer');
  } else {
    console.log('✅ Unanswered human questions exist');
    console.log('❌ Monitoring service is not processing them correctly');
    console.log('💡 Check the enhanced logging in aiMonitoringService.ts');
    console.log('💡 The issue is likely in findUnansweredQuestions() or executeEngagement()');
  }
}

debugMonitoringInternals().catch(console.error); 