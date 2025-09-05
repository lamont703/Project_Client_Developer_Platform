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

async function testCanEngage() {
  console.log('🔍 TESTING canEngage() METHOD');
  console.log('=' .repeat(40));

  try {
    // Step 1: Check current monitoring stats and config
    console.log('\n📊 Step 1: Current monitoring stats...');
    const stats = await makeRequest('GET', '/monitoring/stats');
    console.log(`Stats status: ${stats.status}`);
    
    if (stats.data && stats.data.stats) {
      const monitoringStats = stats.data.stats;
      const config = stats.data.config;
      
      console.log('Current stats:');
      console.log(`  totalEngagements: ${monitoringStats.totalEngagements}`);
      console.log(`  successfulEngagements: ${monitoringStats.successfulEngagements}`);
      console.log(`  failedEngagements: ${monitoringStats.failedEngagements}`);
      console.log(`  lastEngagement: ${monitoringStats.lastEngagement}`);
      
      console.log('\nConfig:');
      console.log(`  maxEngagementsPerHour: ${config.maxEngagementsPerHour}`);
      console.log(`  engagementHistory length: ${stats.data.engagementHistory?.length || 0}`);
      
      // Step 2: Analyze canEngage() logic
      console.log('\n🔍 Step 2: Analyzing canEngage() logic...');
      
      const engagementHistory = stats.data.engagementHistory || [];
      const maxEngagementsPerHour = config.maxEngagementsPerHour || 5;
      
      console.log(`Engagement history: ${JSON.stringify(engagementHistory, null, 2)}`);
      
      // Simulate the canEngage() logic
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      
      const recentEngagements = engagementHistory.filter(e => {
        const engagementTime = new Date(e.timestamp);
        return engagementTime > oneHourAgo;
      });
      
      const recentCount = recentEngagements.length;
      const canEngage = recentCount < maxEngagementsPerHour;
      
      console.log(`\ncanEngage() analysis:`);
      console.log(`  Current time: ${now.toISOString()}`);
      console.log(`  One hour ago: ${oneHourAgo.toISOString()}`);
      console.log(`  Recent engagements (last hour): ${recentCount}`);
      console.log(`  Max engagements per hour: ${maxEngagementsPerHour}`);
      console.log(`  canEngage(): ${canEngage}`);
      
      if (!canEngage) {
        console.log(`❌ ISSUE FOUND: canEngage() returns false!`);
        console.log(`💡 This explains why the monitoring service is not processing opportunities`);
        console.log(`💡 Recent engagements: ${JSON.stringify(recentEngagements, null, 2)}`);
      } else {
        console.log(`✅ canEngage() returns true - this is not the issue`);
      }
      
      // Step 3: Test force engagement to see if it changes anything
      console.log('\n🚀 Step 3: Testing force engagement...');
      const engagement = await makeRequest('POST', '/monitoring/force-engagement');
      console.log(`Force engagement status: ${engagement.status}`);
      console.log(`Response: ${JSON.stringify(engagement.data)}`);
      
      // Step 4: Check stats again
      console.log('\n📊 Step 4: Checking stats after force engagement...');
      const statsAfter = await makeRequest('GET', '/monitoring/stats');
      
      if (statsAfter.data && statsAfter.data.stats) {
        const statsAfterData = statsAfter.data.stats;
        console.log('Stats after force engagement:');
        console.log(`  totalEngagements: ${statsAfterData.totalEngagements}`);
        console.log(`  successfulEngagements: ${statsAfterData.successfulEngagements}`);
        console.log(`  failedEngagements: ${statsAfterData.failedEngagements}`);
        console.log(`  lastEngagement: ${statsAfterData.lastEngagement}`);
        
        if (statsAfterData.successfulEngagements > monitoringStats.successfulEngagements) {
          console.log('✅ SUCCESS: Monitoring service processed opportunities!');
        } else {
          console.log('❌ FAILURE: Monitoring service still shows 0 engagements');
        }
      }
    }

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

testCanEngage().catch(console.error);
