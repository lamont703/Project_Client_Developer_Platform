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
import { goHighLevelService } from "./services/goHighLevelService.ts"
import { analyticsMiddleware } from "./middleware/analytics.ts"
import { databaseService } from "./services/databaseService.ts"

// Main Edge Function handler
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    // Apply analytics middleware
    const analytics = analyticsMiddleware(req, path, method)

    logger.info(`Request: ${method} ${path}`)

    // Debug endpoint to check environment variables
    if (path === '/api/debug/env') {
      // Get all environment variables
      const envVars = Deno.env.toObject()
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
        all_env_vars: Object.keys(envVars).filter(key => !key.startsWith('SUPABASE_')),
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

    // Route requests based on path
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

    // ProtoHub routes
    if (path.startsWith('/api/questions')) {
      const result = await handleQuestionsRoute(req, path)
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