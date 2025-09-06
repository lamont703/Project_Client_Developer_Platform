#!/usr/bin/env node

const REMOTE_API_URL = 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api'
const REMOTE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k'

const headers = {
  'Authorization': `Bearer ${REMOTE_ANON_KEY}`,
  'Content-Type': 'application/json'
}

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
}

async function makeRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
    }
    
    const response = await fetch(`${REMOTE_API_URL}${endpoint}`, options)
    const data = await response.json()
    
    return {
      success: response.ok,
      status: response.status,
      data
    }
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: { error: error.message }
    }
  }
}

function logTest(testName, result, details = '') {
  testResults.total++
  if (result.success) {
    testResults.passed++
    console.log(`✅ ${testName}`)
  } else {
    testResults.failed++
    console.log(`❌ ${testName} - Status: ${result.status}`)
    if (details) console.log(`   Details: ${details}`)
  }
  testResults.details.push({ testName, result, details })
}

async function testRemoteEndpoints() {
  console.log('🚀 Testing Remote Supabase Edge Functions...')
  console.log(`📍 API URL: ${REMOTE_API_URL}`)
  console.log('=' * 60)
  
  // Test health endpoint
  console.log('\n🏥 Testing Health Endpoint...')
  const health = await makeRequest('/health')
  logTest('Health Check', health)
  
  // Test AI Community Member endpoints
  console.log('\n🤖 Testing AI Community Member Endpoints...')
  const stats = await makeRequest('/ai-community-member/stats')
  logTest('AI Community Member Stats', stats)
  
  const personas = await makeRequest('/ai-community-member/personas')
  logTest('Get AI Personas', personas, `Found ${personas.data?.personas?.length || 0} personas`)
  
  const trendingTopics = await makeRequest('/ai-community-member/trending-topics')
  logTest('Get Trending Topics', trendingTopics, `Found ${trendingTopics.data?.trending_topics?.length || 0} topics`)
  
  // Test analytics endpoints
  console.log('\n📊 Testing Analytics Endpoints...')
  const analyticsSummary = await makeRequest('/analytics/summary')
  logTest('Get Analytics Summary', analyticsSummary)
  
  const analyticsEvents = await makeRequest('/analytics/events')
  logTest('Get Analytics Events', analyticsEvents, `Found ${analyticsEvents.data?.events?.length || 0} events`)
  
  // Test debug endpoints
  console.log('\n🔧 Testing Debug Endpoints...')
  const debugEnv = await makeRequest('/debug/env')
  logTest('Debug Environment Variables', debugEnv)
  
  const debugDatabase = await makeRequest('/debug/database')
  logTest('Debug Database Service', debugDatabase, `Found ${debugDatabase.data?.questions_count || 0} questions`)
  
  // Print summary
  console.log('\n' + '=' * 60)
  console.log('📊 Remote API Test Summary:')
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`📈 Total: ${testResults.total}`)
  console.log(`�� Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`)
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:')
    testResults.details
      .filter(test => !test.result.success)
      .forEach(test => {
        console.log(`   - ${test.testName}: ${test.result.data?.error || test.result.data?.message || 'Unknown error'}`)
      })
  }
  
  console.log('\n🏁 Remote API testing complete!')
  console.log(`\n🔗 Dashboard: https://supabase.com/dashboard/project/qhlzjrcidehlpmiimmfm/functions`)
  console.log(`\n🔑 API Keys:`)
  console.log(`   Anon Key: ${REMOTE_ANON_KEY}`)
  console.log(`   Service Role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjE3MTQwMywiZXhwIjoyMDcxNzQ3NDAzfQ.yG8qUb5DTj3pSXTB_Hi4hvomV_aFleIAtivTg7X8kzU`)
}

// Run the tests
testRemoteEndpoints().catch(console.error)
