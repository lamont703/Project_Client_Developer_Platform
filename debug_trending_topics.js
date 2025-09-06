const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add debug endpoint for trending topics
const debugEndpoint = `
    // Test trending topics endpoint
    if (path === '/api/debug/trending-topics') {
      try {
        const trendingTopics = await databaseService.getTrendingTopics(10);
        const response = {
          success: true,
          message: 'Trending topics test',
          trending_topics_count: trendingTopics.length,
          trending_topics: trendingTopics,
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
        analytics.trackRequest(500, Date.now() - analytics.startTime);
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Trending topics test error',
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

// Insert the debug endpoint before the health check endpoint
content = content.replace(
  /\/\/ Health check endpoint/,
  debugEndpoint + '\n    // Health check endpoint'
);

fs.writeFileSync(filePath, content);
console.log('✅ Added trending topics debug endpoint');
