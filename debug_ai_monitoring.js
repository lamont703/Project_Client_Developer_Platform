#!/usr/bin/env node

/**
 * AI Monitoring Debug Script
 * Tests the complete AI monitoring flow with detailed logging
 */

const API_BASE = 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k';

const headers = {
  'Content-Type': 'application/json',
  'apikey': API_KEY,
  'Authorization': `Bearer ${API_KEY}`
};

function log(step, message, data = null) {
  console.log(`\n🔍 [${step}] ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function logError(step, error) {
  console.log(`\n❌ [${step}] ERROR: ${error.message || error}`);
}

function logSuccess(step, message) {
  console.log(`\n✅ [${step}] ${message}`);
}

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers,
      ...options
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.message || data.error || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

async function debugAIMonitoring() {
  console.log('🚀 Starting AI Monitoring Debug Script');
  console.log('=' .repeat(60));

  try {
    // Step 1: Check environment variables
    log('STEP 1', 'Checking environment variables...');
    const envCheck = await makeRequest(`${API_BASE}/debug/env`);
    logSuccess('STEP 1', 'Environment variables checked');
    log('STEP 1', 'Environment status:', {
      googleApiKey: envCheck.environment_variables?.GOOGLE_API_KEY || 'NOT SET',
      supabaseKey: envCheck.environment_variables?.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
    });

    // Step 2: Get current monitoring stats
    log('STEP 2', 'Getting current monitoring stats...');
    const initialStats = await makeRequest(`${API_BASE}/monitoring/stats`);
    logSuccess('STEP 2', 'Initial monitoring stats retrieved');
    log('STEP 2', 'Current stats:', {
      totalEngagements: initialStats.stats.totalEngagements,
      successfulEngagements: initialStats.stats.successfulEngagements,
      failedEngagements: initialStats.stats.failedEngagements,
      activePersonas: initialStats.stats.activePersonas
    });

    // Step 3: Check for unanswered questions
    log('STEP 3', 'Checking for unanswered questions...');
    const questions = await makeRequest(`${API_BASE}/questions?sortBy=unanswered&limit=10`);
    const humanQuestions = questions.questions.filter(q => !q.is_ai_generated);
    logSuccess('STEP 3', `Found ${humanQuestions.length} unanswered human questions`);
    
    humanQuestions.forEach((q, index) => {
      log('STEP 3', `Question ${index + 1}:`, {
        id: q.id,
        title: q.title.substring(0, 50) + '...',
        author: q.author.name,
        isAI: q.is_ai_generated,
        answersCount: q.answers_count
      });
    });

    if (humanQuestions.length === 0) {
      console.log('\n⚠️  No unanswered human questions found. Creating a test question...');
      
      const testQuestion = await makeRequest(`${API_BASE}/questions`, {
        method: 'POST',
        body: JSON.stringify({
          title: 'Debug Test Question - AI Monitoring Test',
          content: 'This is a test question created by the debug script to test AI monitoring. Please answer this question to verify the system is working.',
          tags: ['debug', 'test', 'ai-monitoring']
        })
      });
      
      logSuccess('STEP 3', 'Test question created');
      log('STEP 3', 'Test question:', {
        id: testQuestion.question.id,
        title: testQuestion.question.title,
        author: testQuestion.question.author.name
      });
      
      humanQuestions.push(testQuestion.question);
    }

    // Step 4: Test AI response generation
    log('STEP 4', 'Testing AI response generation...');
    const testQuestion = humanQuestions[0];
    
    try {
      const aiEngagement = await makeRequest(`${API_BASE}/questions/ai-engagement`, {
        method: 'POST',
        body: JSON.stringify({
          questionId: testQuestion.id
        })
      });
      
      logSuccess('STEP 4', 'AI engagement test successful');
      log('STEP 4', 'AI engagement result:', {
        questionCreated: aiEngagement.question?.id || 'None',
        authorId: aiEngagement.engagement?.authorId,
        persona: aiEngagement.engagement?.persona?.name,
        confidence: aiEngagement.engagement?.confidence
      });
    } catch (error) {
      logError('STEP 4', error);
    }

    // Step 5: Force AI monitoring engagement
    log('STEP 5', 'Forcing AI monitoring engagement...');
    const forceEngagement = await makeRequest(`${API_BASE}/monitoring/force-engagement`, {
      method: 'POST'
    });
    logSuccess('STEP 5', 'Force engagement executed');
    log('STEP 5', 'Force engagement result:', forceEngagement);

    // Step 6: Wait and check stats again
    log('STEP 6', 'Waiting 3 seconds and checking stats again...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const finalStats = await makeRequest(`${API_BASE}/monitoring/stats`);
    logSuccess('STEP 6', 'Final monitoring stats retrieved');
    
    const statsComparison = {
      before: {
        totalEngagements: initialStats.stats.totalEngagements,
        successfulEngagements: initialStats.stats.successfulEngagements,
        failedEngagements: initialStats.stats.failedEngagements
      },
      after: {
        totalEngagements: finalStats.stats.totalEngagements,
        successfulEngagements: finalStats.stats.successfulEngagements,
        failedEngagements: finalStats.stats.failedEngagements
      },
      changes: {
        totalEngagements: finalStats.stats.totalEngagements - initialStats.stats.totalEngagements,
        successfulEngagements: finalStats.stats.successfulEngagements - initialStats.stats.successfulEngagements,
        failedEngagements: finalStats.stats.failedEngagements - initialStats.stats.failedEngagements
      }
    };
    
    log('STEP 6', 'Stats comparison:', statsComparison);

    // Step 7: Check if any questions got answered
    log('STEP 7', 'Checking if questions got answered...');
    for (const question of humanQuestions.slice(0, 3)) {
      const updatedQuestion = await makeRequest(`${API_BASE}/questions/${question.id}`);
      log('STEP 7', `Question ${question.id}:`, {
        title: question.title.substring(0, 50) + '...',
        answersCountBefore: question.answers_count,
        answersCountAfter: updatedQuestion.question.answers_count,
        isAnswered: updatedQuestion.question.is_answered,
        newAnswers: updatedQuestion.question.answers_count - question.answers_count
      });
      
      if (updatedQuestion.answers && updatedQuestion.answers.length > 0) {
        updatedQuestion.answers.forEach((answer, index) => {
          log('STEP 7', `  Answer ${index + 1}:`, {
            id: answer.id,
            author: answer.author.name,
            isAI: answer.is_ai,
            content: answer.content.substring(0, 100) + '...'
          });
        });
      }
    }

    // Step 8: Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 DEBUG SUMMARY');
    console.log('='.repeat(60));
    
    if (statsComparison.changes.totalEngagements > 0) {
      logSuccess('SUMMARY', `AI monitoring system is working! ${statsComparison.changes.successfulEngagements} successful engagements recorded.`);
    } else {
      console.log('\n⚠️  AI monitoring system may have issues:');
      console.log('   - No engagements were recorded in the monitoring stats');
      console.log('   - Check the enhanced logging in the monitoring service');
      console.log('   - Verify that unanswered questions are being found and processed');
    }

  } catch (error) {
    logError('MAIN', error);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Check if the Supabase function is deployed correctly');
    console.log('   2. Verify the Google API key is set in Supabase');
    console.log('   3. Check the monitoring service logs');
    console.log('   4. Ensure the database has the correct user IDs');
  }
}

// Run the debug script
debugAIMonitoring().catch(console.error); 