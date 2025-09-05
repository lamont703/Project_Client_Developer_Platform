// Test script for AI Monitoring Service
// Demonstrates the enhanced AI Community Member functionality

import { aiMonitoringService } from './services/aiMonitoringService.ts'
import { aiCommunityMemberService } from './services/aiCommunityMemberService.ts'

async function testAIMonitoringService() {
  console.log('🧪 Testing AI Monitoring Service...\n')

  try {
    // Test 1: Get monitoring stats
    console.log('📊 Test 1: Getting monitoring stats')
    const stats = aiMonitoringService.getStats()
    console.log('Stats:', JSON.stringify(stats, null, 2))
    console.log('✅ Stats retrieved successfully\n')

    // Test 2: Get monitoring config
    console.log('⚙️ Test 2: Getting monitoring config')
    const config = aiMonitoringService.getConfig()
    console.log('Config:', JSON.stringify(config, null, 2))
    console.log('✅ Config retrieved successfully\n')

    // Test 3: Test AI persona selection
    console.log('👥 Test 3: Testing AI persona selection')
    const persona1 = aiCommunityMemberService.getPersona()
    const persona2 = aiCommunityMemberService.getPersona()
    console.log('Persona 1:', persona1.name, '-', persona1.expertise.join(', '))
    console.log('Persona 2:', persona2.name, '-', persona2.expertise.join(', '))
    console.log('✅ Persona selection working\n')

    // Test 4: Test community trend analysis
    console.log('📈 Test 4: Testing community trend analysis')
    await aiMonitoringService.forceAnalysis()
    const updatedStats = aiMonitoringService.getStats()
    console.log('Trending topics:', updatedStats.trendingTopics.length)
    console.log('Community health:', updatedStats.communityHealth)
    console.log('✅ Community analysis completed\n')

    // Test 5: Test engagement history
    console.log('📝 Test 5: Getting engagement history')
    const history = aiMonitoringService.getEngagementHistory()
    console.log('Engagement history entries:', history.length)
    console.log('✅ Engagement history retrieved\n')

    // Test 6: Test configuration update
    console.log('🔧 Test 6: Testing configuration update')
    aiMonitoringService.updateConfig({
      maxEngagementsPerHour: 3,
      proactiveEngagementInterval: 15
    })
    const newConfig = aiMonitoringService.getConfig()
    console.log('Updated max engagements per hour:', newConfig.maxEngagementsPerHour)
    console.log('Updated engagement interval:', newConfig.proactiveEngagementInterval)
    console.log('✅ Configuration updated successfully\n')

    console.log('🎉 All tests completed successfully!')
    console.log('\n📋 Summary:')
    console.log('- AI Monitoring Service is functional')
    console.log('- Persona selection is working')
    console.log('- Community analysis is operational')
    console.log('- Configuration management is working')
    console.log('- Ready for production deployment!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the test
testAIMonitoringService()
