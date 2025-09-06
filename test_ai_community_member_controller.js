#!/usr/bin/env node

// AI Community Member Controller Test Script
// Tests all critical endpoints of the AI Community Member Controller

const BASE_URL = 'http://127.0.0.1:54321/functions/v1/api'
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
}

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
}

// Helper function to make HTTP requests
async function makeRequest(method, endpoint, body = null) {
  try {
    const url = `${BASE_URL}${endpoint}`
    const options = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
    }
    
    const response = await fetch(url, options)
    const data = await response.json()
    
    return {
      success: response.ok,
      status: response.status,
      data: data
    }
  } catch (error) {
    return {
      success: false,
      status: 0,
      error: error.message
    }
  }
}

// Test function wrapper
async function runTest(testName, testFunction) {
  console.log(`\n🧪 Testing: ${testName}`)
  console.log('=' .repeat(50))
  
  try {
    const result = await testFunction()
    if (result.success) {
      console.log(`✅ PASSED: ${testName}`)
      testResults.passed++
    } else {
      console.log(`❌ FAILED: ${testName}`)
      console.log(`   Status: ${result.status}`)
      console.log(`   Error: ${result.error || JSON.stringify(result.data)}`)
      testResults.failed++
      testResults.errors.push({ test: testName, error: result.error || result.data })
    }
  } catch (error) {
    console.log(`💥 ERROR: ${testName}`)
    console.log(`   Error: ${error.message}`)
    testResults.failed++
    testResults.errors.push({ test: testName, error: error.message })
  }
}

// Test 1: AI Community Member Stats
async function testStats() {
  const result = await makeRequest('GET', '/ai-community-member/stats')
  
  if (result.success) {
    console.log('📊 Stats Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success && result.data.stats) {
      console.log('✅ Stats structure is correct')
      return { success: true }
    } else {
      console.log('❌ Stats structure is incorrect')
      return { success: false, error: 'Invalid stats structure' }
    }
  }
  
  return result
}

// Test 2: AI Personas Test
async function testPersonas() {
  const result = await makeRequest('GET', '/ai-community-member/test-personas')
  
  if (result.success) {
    console.log('👥 Personas Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success && result.data.personas && Array.isArray(result.data.personas)) {
      console.log(`✅ Found ${result.data.personas.length} personas`)
      return { success: true }
    } else {
      console.log('❌ Personas structure is incorrect')
      return { success: false, error: 'Invalid personas structure' }
    }
  }
  
  return result
}

// Test 3: Test Response Generation
async function testResponseGeneration() {
  // First, get a question to test with
  const questionsResult = await makeRequest('GET', '/questions')
  
  if (!questionsResult.success || !questionsResult.data.length) {
    return { success: false, error: 'No questions available for testing' }
  }
  
  const question = questionsResult.data[0]
  console.log(`📝 Testing with question: "${question.title}"`)
  
  const result = await makeRequest('POST', '/ai-community-member/test-response', {
    questionId: question.id
  })
  
  if (result.success) {
    console.log('🤖 Test Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success && result.data.aiResponse) {
      console.log('✅ AI response generated successfully')
      return { success: true }
    } else {
      console.log('❌ AI response structure is incorrect')
      return { success: false, error: 'Invalid AI response structure' }
    }
  }
  
  return result
}

// Test 4: Generate AI Response
async function testGenerateResponse() {
  // First, get a question to test with
  const questionsResult = await makeRequest('GET', '/questions')
  
  if (!questionsResult.success || !questionsResult.data.length) {
    return { success: false, error: 'No questions available for testing' }
  }
  
  const question = questionsResult.data[0]
  console.log(`📝 Generating response for question: "${question.title}"`)
  
  const result = await makeRequest('POST', '/ai-community-member/generate-response', {
    questionId: question.id,
    context: {
      communityTrends: ['prototyping', 'user-research'],
      userInterests: ['design', 'development']
    }
  })
  
  if (result.success) {
    console.log('🤖 Generated Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success && result.data.answer) {
      console.log('✅ AI response generated and saved successfully')
      return { success: true }
    } else {
      console.log('❌ Generated response structure is incorrect')
      return { success: false, error: 'Invalid generated response structure' }
    }
  }
  
  return result
}

// Test 5: Proactive Engagement
async function testProactiveEngagement() {
  const result = await makeRequest('POST', '/ai-community-member/proactive-engagement')
  
  if (result.success) {
    console.log('📢 Proactive Engagement Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success && result.data.engagement) {
      console.log('✅ Proactive engagement generated successfully')
      return { success: true }
    } else {
      console.log('❌ Proactive engagement structure is incorrect')
      return { success: false, error: 'Invalid proactive engagement structure' }
    }
  }
  
  return result
}

// Test 6: Start Monitoring
async function testStartMonitoring() {
  const result = await makeRequest('POST', '/ai-community-member/start-monitoring')
  
  if (result.success) {
    console.log('🔍 Start Monitoring Response:')
    console.log(JSON.stringify(result.data, null, 2))
    
    // Verify expected structure
    if (result.data.success) {
      console.log('✅ Monitoring started successfully')
      return { success: true }
    } else {
      console.log('❌ Start monitoring structure is incorrect')
      return { success: false, error: 'Invalid start monitoring structure' }
    }
  }
  
  return result
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting AI Community Member Controller Tests')
  console.log('=' .repeat(60))
  
  // Check if Edge Functions are running
  console.log('🔍 Checking Edge Functions status...')
  const healthCheck = await makeRequest('GET', '/questions')
  if (!healthCheck.success) {
    console.log('❌ Edge Functions are not running or accessible')
    console.log('   Please ensure Supabase Edge Functions are started with: supabase functions serve')
    process.exit(1)
  }
  console.log('✅ Edge Functions are running')
  
  // Run all tests
  await runTest('AI Community Member Stats', testStats)
  await runTest('AI Personas Test', testPersonas)
  await runTest('Test Response Generation', testResponseGeneration)
  await runTest('Generate AI Response', testGenerateResponse)
  await runTest('Proactive Engagement', testProactiveEngagement)
  await runTest('Start Monitoring', testStartMonitoring)
  
  // Print summary
  console.log('\n' + '=' .repeat(60))
  console.log('📊 TEST SUMMARY')
  console.log('=' .repeat(60))
  console.log(`✅ Passed: ${testResults.passed}`)
  console.log(`❌ Failed: ${testResults.failed}`)
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`)
  
  if (testResults.errors.length > 0) {
    console.log('\n💥 ERRORS:')
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.test}: ${error.error}`)
    })
  }
  
  console.log('\n🎉 AI Community Member Controller testing complete!')
}

// Run the tests
runAllTests().catch(console.error)
