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
        GHL_REDIRECT_URI: Deno.env.get('GHL_REDIRECT_URI'),
        GHL_LOCATION_ID: Deno.env.get('GHL_LOCATION_ID'),
        GHL_PIPELINE_ID: Deno.env.get('GHL_PIPELINE_ID'),
        GHL_PIPELINE_STAGE_ID: Deno.env.get('GHL_PIPELINE_STAGE_ID'),
      }
      const relevantVars = {
        GITHUB_TOKEN: envVars.GITHUB_TOKEN ? 'SET' : 'NOT_SET',
        GITHUB_USERNAME: envVars.GITHUB_USERNAME ? 'SET' : 'NOT_SET',
        GOOGLE_API_KEY: envVars.GOOGLE_API_KEY ? 'SET' : 'NOT_SET',
        GHL_ACCESS_TOKEN: envVars.GHL_ACCESS_TOKEN ? 'SET' : 'NOT_SET',
        GHL_REFRESH_TOKEN: envVars.GHL_REFRESH_TOKEN ? 'SET' : 'NOT_SET',
        GHL_CLIENT_ID: envVars.GHL_CLIENT_ID ? 'SET' : 'NOT_SET',
        GHL_CLIENT_SECRET: envVars.GHL_CLIENT_SECRET ? 'SET' : 'NOT_SET',
        GHL_REDIRECT_URI: envVars.GHL_REDIRECT_URI ? 'SET' : 'NOT_SET',
        GHL_LOCATION_ID: envVars.GHL_LOCATION_ID ? 'SET' : 'NOT_SET',
        GHL_PIPELINE_ID: envVars.GHL_PIPELINE_ID ? 'SET' : 'NOT_SET',
        GHL_PIPELINE_STAGE_ID: envVars.GHL_PIPELINE_STAGE_ID ? 'SET' : 'NOT_SET',
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

    // GoHighLevel token refresh test endpoint
    if (path === '/api/debug/ghl-refresh-test') {
      try {
        logger.info('🔄 Testing GoHighLevel token refresh...')
        
        const refreshToken = Deno.env.get('GHL_REFRESH_TOKEN')
        const clientId = Deno.env.get('GHL_CLIENT_ID')
        const clientSecret = Deno.env.get('GHL_CLIENT_SECRET')
        
        if (!refreshToken || !clientId || !clientSecret) {
          throw new Error('Missing refresh token, client ID, or client secret')
        }
        
        const formData = new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })

        const response = await fetch('https://services.leadconnectorhq.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: formData
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Token refresh failed: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        const { access_token, refresh_token: newRefreshToken, expires_in, scope } = data
        
        // Decode the new token to check scopes
        let tokenInfo: any = null
        if (access_token) {
          try {
            const parts = access_token.split('.')
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]))
              tokenInfo = {
                is_jwt: true,
                exp: payload.exp,
                exp_date: new Date(payload.exp * 1000).toISOString(),
                is_expired: Date.now() > (payload.exp * 1000),
                iat: payload.iat,
                iss: payload.iss,
                sub: payload.sub,
                scopes: payload.scope || 'No scopes found'
              }
            }
          } catch (e) {
            tokenInfo = {
              is_jwt: false,
              decode_error: e.message
            }
          }
        }
        
        const result = {
          success: true,
          message: 'Token refresh successful',
          new_token_info: tokenInfo,
          response_data: {
            has_access_token: !!access_token,
            has_refresh_token: !!newRefreshToken,
            expires_in: expires_in,
            scope: scope
          },
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(200, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(result),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        )
      } catch (error) {
        logger.error('❌ Token refresh test failed:', error)
        
        const response = {
          success: false,
          message: 'Token refresh test failed',
          error: error.message,
          error_type: error.constructor.name,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
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

    // GoHighLevel token inspection endpoint
    if (path === '/api/debug/ghl-token') {
      try {
        const accessToken = Deno.env.get('GHL_ACCESS_TOKEN')
        const refreshToken = Deno.env.get('GHL_REFRESH_TOKEN')
        
        // Try to decode the token to see its structure
        let tokenInfo: any = null
        if (accessToken) {
          try {
            const parts = accessToken.split('.')
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]))
              tokenInfo = {
                is_jwt: true,
                exp: payload.exp,
                exp_date: new Date(payload.exp * 1000).toISOString(),
                is_expired: Date.now() > (payload.exp * 1000),
                iat: payload.iat,
                iss: payload.iss,
                sub: payload.sub,
                scopes: payload.scope || 'No scopes found'
              }
            } else {
              tokenInfo = {
                is_jwt: false,
                length: accessToken.length,
                first_10_chars: accessToken.substring(0, 10)
              }
            }
          } catch (e) {
            tokenInfo = {
              is_jwt: false,
              decode_error: e.message,
              length: accessToken.length,
              first_10_chars: accessToken.substring(0, 10)
            }
          }
        }
        
        const response = {
          success: true,
          message: 'GoHighLevel token inspection',
          access_token_info: tokenInfo,
          refresh_token_set: !!refreshToken,
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
        logger.error('❌ Error inspecting token:', error)
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Token inspection failed',
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

    // Comprehensive GoHighLevel API test endpoint
    if (path === '/api/debug/ghl-comprehensive-test') {
      try {
        logger.info('🧪 Testing GoHighLevel API comprehensively...')
        
        const accessToken = Deno.env.get('GHL_ACCESS_TOKEN')
        const locationId = Deno.env.get('GHL_LOCATION_ID')
        
        if (!accessToken || !locationId) {
          throw new Error('Missing access token or location ID')
        }
        
        // Test different API endpoints and versions
        const endpoints = [
          // Current API endpoints
          {
            name: 'pipelines_current',
            url: `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          {
            name: 'pipelines_no_version',
            url: `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
            }
          },
          {
            name: 'pipelines_v2023',
            url: `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2023-06-01',
              'Accept': 'application/json'
            }
          },
          // Alternative endpoints
          {
            name: 'pipelines_alt',
            url: `https://services.leadconnectorhq.com/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          {
            name: 'opportunities',
            url: `https://services.leadconnectorhq.com/opportunities?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          // Test basic connectivity
          {
            name: 'locations',
            url: 'https://services.leadconnectorhq.com/locations',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          {
            name: 'locations_no_version',
            url: 'https://services.leadconnectorhq.com/locations',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
            }
          },
          // Test with different base URLs
          {
            name: 'pipelines_rest',
            url: `https://rest.gohighlevel.com/v1/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
            }
          }
        ]
        
        const results: any[] = []
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint.url, {
              method: 'GET',
              headers: endpoint.headers as HeadersInit
            })
            
            const responseText = await response.text()
            let responseData: any = null
            try {
              responseData = JSON.parse(responseText)
            } catch (e) {
              responseData = responseText
            }
            
            results.push({
              endpoint: endpoint.name,
              url: endpoint.url,
              status: response.status,
              statusText: response.statusText,
              success: response.ok,
              data: responseData,
              headers: Object.fromEntries(response.headers.entries())
            })
          } catch (error) {
            results.push({
              endpoint: endpoint.name,
              url: endpoint.url,
              error: error.message,
              success: false
            })
          }
        }
        
        const response = {
          success: true,
          message: 'GoHighLevel comprehensive API test completed',
          results: results,
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
        logger.error('❌ GoHighLevel comprehensive API test failed:', error)
        
        const response = {
          success: false,
          message: 'GoHighLevel comprehensive API test failed',
          error: error.message,
          error_type: error.constructor.name,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // GoHighLevel direct API test endpoint
    if (path === '/api/debug/ghl-direct-test') {
      try {
        logger.info('🧪 Testing GoHighLevel API directly...')
        
        const accessToken = Deno.env.get('GHL_ACCESS_TOKEN')
        const locationId = Deno.env.get('GHL_LOCATION_ID')
        
        if (!accessToken || !locationId) {
          throw new Error('Missing access token or location ID')
        }
        
        // Test different API endpoints
        const endpoints = [
          {
            name: 'pipelines',
            url: `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          {
            name: 'locations',
            url: 'https://services.leadconnectorhq.com/locations',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          },
          {
            name: 'pipelines_v2',
            url: `https://services.leadconnectorhq.com/pipelines?locationId=${locationId}`,
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Version': '2021-07-28',
              'Accept': 'application/json'
            }
          }
        ]
        
        const results: any[] = []
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint.url, {
              method: 'GET',
              headers: endpoint.headers as HeadersInit
            })
            
            const responseText = await response.text()
            let responseData: any = null
            try {
              responseData = JSON.parse(responseText)
            } catch (e) {
              responseData = responseText
            }
            
            results.push({
              endpoint: endpoint.name,
              url: endpoint.url,
              status: response.status,
              statusText: response.statusText,
              success: response.ok,
              data: responseData,
              headers: Object.fromEntries(response.headers.entries())
            })
          } catch (error) {
            results.push({
              endpoint: endpoint.name,
              url: endpoint.url,
              error: error.message,
              success: false
            })
          }
        }
        
        const response = {
          success: true,
          message: 'GoHighLevel direct API test completed',
          results: results,
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
        logger.error('❌ GoHighLevel direct API test failed:', error)
        
        const response = {
          success: false,
          message: 'GoHighLevel direct API test failed',
          error: error.message,
          error_type: error.constructor.name,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // GoHighLevel API test endpoint
    if (path === '/api/debug/ghl-test') {
      try {
        logger.info('🧪 Testing GoHighLevel API call...')
        
        // Test a simple API call to see what error we get
        const pipelines = await goHighLevelService.getAllPipelines()
        
        const response = {
          success: true,
          message: 'GoHighLevel API test successful',
          pipelines_count: pipelines.length,
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
        logger.error('❌ GoHighLevel API test failed:', error)
        
        const response = {
          success: false,
          message: 'GoHighLevel API test failed',
          error: error.message,
          error_type: error.constructor.name,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
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
          results: {
            existing_topics: existingTopics.length,
            analyzed_trends: analyzedTrends.length,
            updated_trends: updatedTrends.length
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

    // AI Community Member debug endpoint
    if (path === '/api/debug/ai-community-member') {
      try {
        logger.info('🧪 Testing AI Community Member service...')
        
        const testResult = await aiCommunityMemberController.testResponse(req)
        
        const response = {
          success: true,
          message: 'AI Community Member service test completed',
          test_result: testResult,
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
        logger.error('❌ Error testing AI Community Member service:', error)
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'AI Community Member service test failed',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // Questions service debug endpoint
    if (path === '/api/debug/questions-service') {
      try {
        logger.info('🧪 Testing questions service...')
        
        // Test getting questions
        const questions = await questionsService.getQuestions({ limit: 5 })
        logger.info(`📊 Found ${questions.length} questions`)
        
        const response = {
          success: true,
          message: 'Questions service test completed',
          questions_count: questions.length,
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
        logger.error('❌ Error testing questions service:', error)
        
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Questions service test failed',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // GoHighLevel OAuth exchange debug endpoint
    if (path === '/api/debug/ghl-oauth-debug') {
      try {
        logger.info('🔍 Debugging GoHighLevel OAuth exchange...')
        
        const clientId = Deno.env.get('GHL_CLIENT_ID')
        const clientSecret = Deno.env.get('GHL_CLIENT_SECRET')
        const redirectUri = Deno.env.get('GHL_REDIRECT_URI')
        const code = '8b0cec2824774a1ac3a082de2e035ac5a738cff3'
        
        logger.info(`Client ID: ${clientId}`)
        logger.info(`Redirect URI: ${redirectUri}`)
        logger.info(`Code: ${code.substring(0, 10)}...`)
        
        if (!clientId || !clientSecret || !redirectUri) {
          throw new Error('Missing OAuth configuration')
        }
        
        const formData = new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri
        })
        
        logger.info('Making OAuth request to GoHighLevel...')
        
        const response = await fetch('https://services.leadconnectorhq.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: formData
        })
        
        const responseText = await response.text()
        let responseData: any = null
        try {
          responseData = JSON.parse(responseText)
        } catch (e) {
          responseData = responseText
        }
        
        const result = {
          success: response.ok,
          status: response.status,
          statusText: response.statusText,
          response_data: responseData,
          request_info: {
            client_id: clientId,
            redirect_uri: redirectUri,
            code_length: code.length,
            form_data_keys: Array.from(formData.keys())
          },
          timestamp: new Date().toISOString()
        }
        
        analytics.trackRequest(response.ok ? 200 : 500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(result),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: response.ok ? 200 : 500
          }
        )
      } catch (error) {
        logger.error('❌ OAuth debug failed:', error)
        
        const response = {
          success: false,
          message: 'OAuth debug failed',
          error: error.message,
          error_type: error.constructor.name,
          timestamp: new Date().toISOString()
        }

        analytics.trackRequest(500, Date.now() - analytics.startTime)
        
        return new Response(
          JSON.stringify(response),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    }

    // Default debug response
    const response = {
      success: true,
      message: 'Debug endpoint reached',
      available_endpoints: [
        '/api/debug/env',
        '/api/debug/ghl-refresh-test',
        '/api/debug/ghl-status',
        '/api/debug/ghl-token',
        '/api/debug/ghl-comprehensive-test',
        '/api/debug/ghl-direct-test',
        '/api/debug/ghl-test',
        '/api/debug/test-trending-service',
        '/api/debug/ai-community-member',
        '/api/debug/questions-service'
      ],
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
    logger.error('Debug route error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Debug route error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
