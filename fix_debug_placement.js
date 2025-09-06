const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the debug endpoints from their current location
content = content.replace(/\/\/ Test databaseService endpoint[\s\S]*?}\s*}/, '');
content = content.replace(/\/\/ Test GoHighLevel service endpoint[\s\S]*?}\s*}/, '');
content = content.replace(/\/\/ Test trending topics endpoint[\s\S]*?}\s*}/, '');

// Add all debug endpoints right after the environment debug endpoint
const debugEndpoints = `
    // Test databaseService endpoint
    if (path === '/api/debug/database') {
      try {
        const questions = await databaseService.getQuestions({ limit: 5 })
        const response = {
          success: true,
          message: 'Database service test',
          questions_count: questions.length,
          questions: questions,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(200, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        )
      } catch (error) {
        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Database service error',
            message: error.message,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // Test GoHighLevel service endpoint
    if (path === '/api/debug/ghl-status') {
      try {
        const tokenStatus = goHighLevelService.getTokenStatus()
        const response = {
          success: true,
          message: 'GoHighLevel service status',
          token_status: tokenStatus,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(200, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        )
      } catch (error) {
        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'GoHighLevel service error',
            message: error.message,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

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

// Insert debug endpoints right after the env debug endpoint
content = content.replace(
  /}\s*\/\/ Route requests based on path/,
  debugEndpoints + '\n    // Route requests based on path'
);

fs.writeFileSync(filePath, content);
console.log('✅ Moved debug endpoints to correct location');
