// AI Community Member Routes
// Handles routing for AI Community Member features

import { corsHeaders } from "../utils/cors.ts"
import { logger } from "../utils/logger.ts"
import { analyticsMiddleware } from "../middleware/analytics.ts"
import { aiCommunityMemberController } from "../controllers/aiCommunityMemberController.ts"

export async function handleAICommunityMemberRoute(req: Request, path: string): Promise<Response> {
  const method = req.method
  const analytics = analyticsMiddleware(req, path, method)

  try {
    logger.info(`AI Community Member Route: ${method} ${path}`)


    // Main AI Community Member endpoints
    if (path === '/api/ai-community-member/stats') {
      const result = await aiCommunityMemberController.getStats()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }
    if (path === '/api/ai-community-member/generate-response') {
      const result = await aiCommunityMemberController.generateResponse(req)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/ai-community-member/proactive-engagement') {
      const result = await aiCommunityMemberController.generateProactiveEngagement()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/ai-community-member/monitor') {
      const result = await aiCommunityMemberController.startMonitoring()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/ai-community-member/personas') {
      const result = await aiCommunityMemberController.testPersonas()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path === '/api/ai-community-member/trending-topics') {
      const result = await aiCommunityMemberController.getTrendingTopics()
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    // 404 for unknown AI Community Member routes
    analytics.trackRequest(404, Date.now() - analytics.startTime)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'AI Community Member route not found',
        path: path,
        method: method,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      }
    )

  } catch (error) {
    logger.error('AI Community Member route error:', error)
    analytics.trackRequest(500, Date.now() - analytics.startTime)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'AI Community Member route error',
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
