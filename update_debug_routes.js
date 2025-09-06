const fs = require('fs');

const filePath = 'backend/supabase/functions/api/routes/debug.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add import for trending topics service
content = content.replace(
  /import { databaseService } from "\.\.\/services\/databaseService\.ts"/,
  'import { databaseService } from "../services/databaseService.ts"\nimport { trendingTopicsService } from "../services/trendingTopicsService.ts"'
);

// Update trending topics debug endpoint
const newTrendingTopicsEndpoint = `    // Trending topics debug endpoint
    if (path === '/api/debug/trending-topics') {
      const trendingTopics = await trendingTopicsService.getTrendingTopics(10);
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
    }`;

content = content.replace(
  /\/\/ Trending topics debug endpoint[\s\S]*?}\s*}/,
  newTrendingTopicsEndpoint
);

fs.writeFileSync(filePath, content);
console.log('✅ Updated debug routes to use new trending topics service');
