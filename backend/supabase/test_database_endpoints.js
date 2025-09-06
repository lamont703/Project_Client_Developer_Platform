#!/usr/bin/env node

const API_BASE_URL = 'http://127.0.0.1:54321/functions/v1/api'
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
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
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
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

async function testHealthEndpoint() {
  console.log('\n🏥 Testing Health Endpoint...')
  const result = await makeRequest('/health')
  logTest('Health Check', result)
}

async function testQuestionsEndpoints() {
  console.log('\n❓ Testing Questions Endpoints...')
  
  // Test get questions
  const getQuestions = await makeRequest('/questions')
  logTest('Get Questions', getQuestions, `Found ${getQuestions.data?.questions?.length || 0} questions`)
  
  // Test get question by ID (using first question if available)
  if (getQuestions.success && getQuestions.data?.questions?.length > 0) {
    const questionId = getQuestions.data.questions[0].id
    const getQuestion = await makeRequest(`/questions/${questionId}`)
    logTest('Get Question by ID', getQuestion)
  }
  
  // Test create question
  const newQuestion = {
    title: 'Test Question from Database Test',
    content: 'This is a test question to verify database access',
    tags: ['testing', 'database'],
    author_id: '550e8400-e29b-41d4-a716-446655440001'
  }
  const createQuestion = await makeRequest('/questions', 'POST', newQuestion)
  logTest('Create Question', createQuestion)
}

async function testAnswersEndpoints() {
  console.log('\n💬 Testing Answers Endpoints...')
  
  // First get a question to answer
  const questions = await makeRequest('/questions')
  if (questions.success && questions.data?.questions?.length > 0) {
    const questionId = questions.data.questions[0].id
    
    // Test get answers for question
    const getAnswers = await makeRequest(`/questions/${questionId}/answers`)
    logTest('Get Answers for Question', getAnswers, `Found ${getAnswers.data?.answers?.length || 0} answers`)
    
    // Test create answer
    const newAnswer = {
      content: 'This is a test answer to verify database access',
      question_id: questionId,
      author_id: '550e8400-e29b-41d4-a716-446655440001'
    }
    const createAnswer = await makeRequest('/answers', 'POST', newAnswer)
    logTest('Create Answer', createAnswer)
  }
}

async function testUsersEndpoints() {
  console.log('\n👥 Testing Users Endpoints...')
  
  const getUsers = await makeRequest('/users')
  logTest('Get Users', getUsers, `Found ${getUsers.data?.users?.length || 0} users`)
  
  // Test get user by ID
  if (getUsers.success && getUsers.data?.users?.length > 0) {
    const userId = getUsers.data.users[0].id
    const getUser = await makeRequest(`/users/${userId}`)
    logTest('Get User by ID', getUser)
  }
}

async function testPrototypesEndpoints() {
  console.log('\n🚀 Testing Prototypes Endpoints...')
  
  const getPrototypes = await makeRequest('/prototypes')
  logTest('Get Prototypes', getPrototypes, `Found ${getPrototypes.data?.prototypes?.length || 0} prototypes`)
  
  // Test get prototype by ID
  if (getPrototypes.success && getPrototypes.data?.prototypes?.length > 0) {
    const prototypeId = getPrototypes.data.prototypes[0].id
    const getPrototype = await makeRequest(`/prototypes/${prototypeId}`)
    logTest('Get Prototype by ID', getPrototype)
  }
}

async function testAICommunityMemberEndpoints() {
  console.log('\n🤖 Testing AI Community Member Endpoints...')
  
  const getStats = await makeRequest('/ai-community-member/stats')
  logTest('AI Community Member Stats', getStats)
  
  const getPersonas = await makeRequest('/ai-community-member/personas')
  logTest('Get AI Personas', getPersonas, `Found ${getPersonas.data?.personas?.length || 0} personas`)
  
  const getTrendingTopics = await makeRequest('/ai-community-member/trending-topics')
  logTest('Get Trending Topics', getTrendingTopics, `Found ${getTrendingTopics.data?.trending_topics?.length || 0} topics`)
}

async function testAnalyticsEndpoints() {
  console.log('\n📊 Testing Analytics Endpoints...')
  
  const getAnalytics = await makeRequest('/analytics/summary')
  logTest('Get Analytics Summary', getAnalytics)
  
  const getEvents = await makeRequest('/analytics/events')
  logTest('Get Analytics Events', getEvents, `Found ${getEvents.data?.events?.length || 0} events`)
}

async function testDebugEndpoints() {
  console.log('\n🔧 Testing Debug Endpoints...')
  
  const debugEnv = await makeRequest('/debug/env')
  logTest('Debug Environment Variables', debugEnv)
  
  const debugDatabase = await makeRequest('/debug/database')
  logTest('Debug Database Service', debugDatabase, `Found ${debugDatabase.data?.questions_count || 0} questions`)
  
  const debugGHL = await makeRequest('/debug/ghl-status')
  logTest('Debug GoHighLevel Status', debugGHL)
  
  const debugTrending = await makeRequest('/debug/trending-topics')
  logTest('Debug Trending Topics', debugTrending, `Found ${debugTrending.data?.trending_topics_count || 0} topics`)
  
  const debugAIStats = await makeRequest('/debug/ai-community-member/stats')
  logTest('Debug AI Community Member Stats', debugAIStats)
}

async function runAllTests() {
  console.log('🧪 Starting Database Endpoint Tests...')
  console.log('=' * 50)
  
  await testHealthEndpoint()
  await testQuestionsEndpoints()
  await testAnswersEndpoints()
  await testUsersEndpoints()
  await testPrototypesEndpoints()
  await testAICommunityMemberEndpoints()
  await testAnalyticsEndpoints()
  await testDebugEndpoints()
  
  // Print summary
  console.log('\n' + '=' * 50)
  console.log('📊 Test Summary:')
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`📈 Total: ${testResults.total}`)
  console.log(`🎯 Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`)
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:')
    testResults.details
      .filter(test => !test.result.success)
      .forEach(test => {
        console.log(`   - ${test.testName}: ${test.result.data?.error || test.result.data?.message || 'Unknown error'}`)
      })
  }
  
  console.log('\n🏁 Database endpoint testing complete!')
}

// Run the tests
runAllTests().catch(console.error)
