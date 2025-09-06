const fs = require('fs');

const filePath = 'backend/supabase/functions/api/routes/debug.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add test endpoint for trending topics service
const testEndpoint = `
    // Test trending topics service endpoint
    if (path === '/api/debug/test-trending-service') {
      try {
        logger.info('🧪 Testing trending topics service...')
        
        // Test 1: Get existing trending topics
        const existingTopics = await trendingTopicsService.getTrendingTopics(10);
        logger.info(\`📊 Found \${existingTopics.length} existing trending topics\`)
        
        // Test 2: Analyze community trends
        const analyzedTrends = await trendingTopicsService.analyzeCommunityTrends();
        logger.info(\`📈 Analyzed \${analyzedTrends.length} community trends\`)
        
        // Test 3: Update trending topics (analyze and save)
        const updatedTrends = await trendingTopicsService.updateTrendingTopics();
        logger.info(\`💾 Updated \${updatedTrends.length} trending topics\`)
        
        const response = {
          success: true,
          message: 'Trending topics service test completed',
          test_results: {
            existing_topics_count: existingTopics.length,
            analyzed_trends_count: analyzedTrends.length,
            updated_trends_count: updatedTrends.length,
            existing_topics: existingTopics,
            analyzed_trends: analyzedTrends,
            updated_trends: updatedTrends
          },
          timestamp: new Date().toISOString()
        };

        analytics.trackRequest(200, Date.now() - analytics.startTime);
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        );
      } catch (error) {
        logger.error('❌ Error testing trending topics service:', error);
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Trending topics service test failed',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        );
      }
    }
`;

// Insert before the existing trending topics endpoint
content = content.replace(
  /\/\/ Trending topics debug endpoint/,
  testEndpoint + '\n    // Trending topics debug endpoint'
);

fs.writeFileSync(filePath, content);
console.log('✅ Added trending topics service test endpoint');
