// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "./utils/cors.ts"
import { logger } from "./utils/logger.ts"
import { handleJobsRoute } from "./routes/jobs.ts"
import { handleOpportunitiesRoute } from "./routes/opportunities.ts"
import { handleWebhooksRoute } from "./routes/webhooks.ts"
import { handleOAuthRoute } from "./routes/oauth.ts"
import { handleTokensRoute } from "./routes/tokens.ts"
import { handleQuestionsRoute } from "./routes/questions.ts"
import { handlePrototypesRoute } from "./routes/prototypes.ts"
import { handleUsersRoute } from "./routes/users.ts"
import { handleReportsRoute } from "./routes/reports.ts"
import { handleAnalyticsRoute } from "./routes/analytics.ts"
import { handleMonitoringRoute } from "./routes/monitoring.ts"
import { handleAnswersRoute } from "./routes/answers.ts"
import { handleDebugRoute } from "./routes/debug.ts"
import { handleAICommunityMemberRoute } from "./routes/aiCommunityMember.ts"
import { analyticsMiddleware } from "./middleware/analytics.ts"
import { handleTasksRoute } from "./routes/tasks.ts"// Main Edge Function handler
serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    // Apply analytics middleware
    const analytics = analyticsMiddleware(req, path, method)

    logger.info(`Request: ${method} ${path}`)

    // Debug routes (highest priority)
    if (path.startsWith('/api/debug')) {
      const result = await handleDebugRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    // AI Community Member routes

    // Task routes
    if (path.startsWith('/api/tasks')) {
      const result = await handleTasksRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/ai-community-member')) {
      const result = await handleAICommunityMemberRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }



    // Existing routes
    if (path.startsWith('/api/jobs')) {
      const result = await handleJobsRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/opportunities')) {
      const result = await handleOpportunitiesRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/webhooks')) {
      const result = await handleWebhooksRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/oauth')) {
      const result = await handleOAuthRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/tokens')) {
      const result = await handleTokensRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith("/api/questions")) {
      const result = await handleQuestionsRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith("/api/answers")) {
      const result = await handleAnswersRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }
    
    if (path.startsWith('/api/prototypes')) {
      const result = await handlePrototypesRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/users')) {
      const result = await handleUsersRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/reports')) {
      const result = await handleReportsRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/monitoring')) {
      const result = await handleMonitoringRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    if (path.startsWith('/api/analytics')) {
      const result = await handleAnalyticsRoute(req, path)
      analytics.trackRequest(result.status, Date.now() - analytics.startTime)
      return result
    }

    // Health check endpoint
    if (path === '/api/health') {
      const response = {
        success: true,
        message: 'API Edge Function is healthy',
        timestamp: new Date().toISOString(),
        environment: 'supabase-edge-function'
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

    // 404 for unknown routes
    analytics.trackRequest(404, Date.now() - analytics.startTime)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Route not found',
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
    logger.error('Edge Function error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
