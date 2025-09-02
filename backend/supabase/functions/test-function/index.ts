import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    console.log(`[${new Date().toISOString()}] ${method} ${path}`)

    // Extract the actual endpoint path (remove function name)
    const pathParts = path.split('/')
    const endpoint = pathParts[pathParts.length - 1] || ''

    // Test endpoint - simple GET request
    if (endpoint === 'test' && method === 'GET') {
      const testData = {
        message: 'Hello from Supabase Edge Function!',
        timestamp: new Date().toISOString(),
        method: method,
        path: path,
        endpoint: endpoint,
        environment: 'serverless',
        features: [
          'Deno runtime',
          'TypeScript support',
          'Global edge locations',
          'Built-in CORS handling'
        ]
      }

      return new Response(JSON.stringify(testData, null, 2), {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }

    // Health check endpoint
    if (endpoint === 'health' && method === 'GET') {
      const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: 'running',
        version: '1.0.0'
      }

      return new Response(JSON.stringify(healthData, null, 2), {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }

    // Echo endpoint - returns whatever you send
    if (endpoint === 'echo' && method === 'POST') {
      const body = await req.text()
      
      const echoData = {
        message: 'Echo response',
        timestamp: new Date().toISOString(),
        received: {
          method: method,
          path: path,
          endpoint: endpoint,
          body: body,
          headers: Object.fromEntries(req.headers.entries())
        }
      }

      return new Response(JSON.stringify(echoData, null, 2), {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      })
    }

    // Database test endpoint
    if (endpoint === 'db-test' && method === 'GET') {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (!supabaseUrl || !supabaseServiceKey) {
          throw new Error('Missing Supabase environment variables')
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Test database connection by querying users table
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, reputation')
          .limit(5)

        if (error) {
          throw error
        }

        const dbTestData = {
          message: 'Database connection successful!',
          timestamp: new Date().toISOString(),
          table: 'users',
          recordCount: data.length,
          sampleData: data
        }

        return new Response(JSON.stringify(dbTestData, null, 2), {
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        })
      } catch (error) {
        const errorData = {
          message: 'Database connection failed',
          timestamp: new Date().toISOString(),
          error: error.message,
          details: 'Check your Supabase environment variables and database connection'
        }

        return new Response(JSON.stringify(errorData, null, 2), {
          status: 500,
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        })
      }
    }

    // Default response for unknown endpoints
    const notFoundData = {
      message: 'Endpoint not found',
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        'GET /test - Basic test endpoint',
        'GET /health - Health check',
        'POST /echo - Echo back request data',
        'GET /db-test - Test database connection'
      ],
      request: {
        method: method,
        path: path,
        endpoint: endpoint
      }
    }

    return new Response(JSON.stringify(notFoundData, null, 2), {
      status: 404,
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Error:', error)
    
    const errorData = {
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    }

    return new Response(JSON.stringify(errorData, null, 2), {
      status: 500,
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
}) 