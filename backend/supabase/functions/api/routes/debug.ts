// Debug Routes
// Handles all debug endpoints

import { corsHeaders } from "../utils/cors.ts"
import { logger } from "../utils/logger.ts"
import { analyticsMiddleware } from "../middleware/analytics.ts"
import { questionsService } from "../services/database/questionsService.ts"
import { trendingTopicsService } from "../services/trendingTopicsService.ts"
import { aiCommunityMemberController } from "../controllers/aiCommunityMemberController.ts"
import { goHighLevelService } from "../services/goHighLevelService.ts"

export async function handleDebugRoute(req: Request, path: string): Promise<Response> {
  const method = req.method
  const analytics = analyticsMiddleware(req, path, method)

  try {
    logger.info(`Debug Route: ${method} ${path}`)

    // Environment variables debug endpoint
    if (path === '/api/debug/env') {
      const envVars = {
        GITHUB_TOKEN: Deno.env.get('GITHUB_TOKEN'),
        GITHUB_USERNAME: Deno.env.get('GITHUB_USERNAME'),
        GOOGLE_API_KEY: Deno.env.get('GOOGLE_API_KEY'),
        GHL_ACCESS_TOKEN: Deno.env.get('GHL_ACCESS_TOKEN'),
        GHL_REFRESH_TOKEN: Deno.env.get('GHL_REFRESH_TOKEN'),
        GHL_CLIENT_ID: Deno.env.get('GHL_CLIENT_ID'),
        GHL_CLIENT_SECRET: Deno.env.get('GHL_CLIENT_SECRET'),
      }
      const relevantVars = {
        GITHUB_TOKEN: envVars.GITHUB_TOKEN ? 'SET' : 'NOT_SET',
        GITHUB_USERNAME: envVars.GITHUB_USERNAME ? 'SET' : 'NOT_SET',
        GOOGLE_API_KEY: envVars.GOOGLE_API_KEY ? 'SET' : 'NOT_SET',
        GHL_ACCESS_TOKEN: envVars.GHL_ACCESS_TOKEN ? 'SET' : 'NOT_SET',
        GHL_REFRESH_TOKEN: envVars.GHL_REFRESH_TOKEN ? 'SET' : 'NOT_SET',
        GHL_CLIENT_ID: envVars.GHL_CLIENT_ID ? 'SET' : 'NOT_SET',
        GHL_CLIENT_SECRET: envVars.GHL_CLIENT_SECRET ? 'SET' : 'NOT_SET',
      }
      
      const response = {
        success: true,
        message: 'Environment variables check',
        environment_variables: relevantVars,
        all_env_vars: Object.keys(envVars).filter(key => envVars[key] !== undefined),
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
    }

    // Database service debug endpoint
    if (path === '/api/debug/database') {
      const questions = await questionsService.getQuestions({ limit: 5 })
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
    }

    // GoHighLevel service debug endpoint
    if (path === '/api/debug/ghl-status') {
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
    }

    // Test trending topics service endpoint
    if (path === '/api/debug/test-trending-service') {
      try {
        logger.info('🧪 Testing trending topics service...')
        
        // Test 1: Get existing trending topics
        const existingTopics = await trendingTopicsService.getTrendingTopics(10);
        logger.info(`📊 Found ${existingTopics.length} existing trending topics`)
        
        // Test 2: Analyze community trends
        const analyzedTrends = await trendingTopicsService.analyzeCommunityTrends();
        logger.info(`📈 Analyzed ${analyzedTrends.length} community trends`)
        
        // Test 3: Update trending topics (analyze and save)
        const updatedTrends = await trendingTopicsService.updateTrendingTopics();
        logger.info(`💾 Updated ${updatedTrends.length} trending topics`)
        
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

    // Trending topics debug endpoint
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
      )
    }

    // AI Community Member debug endpoints
    if (path === '/api/debug/ai-community-member/stats') {
      const result = await aiCommunityMemberController.getStats()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/debug/ai-community-member/test-response') {
      const result = await aiCommunityMemberController.testResponse(req)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/debug/ai-community-member/test-personas') {
      const result = await aiCommunityMemberController.testPersonas()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    // 404 for unknown debug routes
    analytics.trackRequest(404, Date.now() - analytics.startTime)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Debug route not found',
        path: path,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      }
    )

  } catch (error) {
    logger.error('Debug route error:', error)
    analytics.trackRequest(500, Date.now() - analytics.startTime)
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
