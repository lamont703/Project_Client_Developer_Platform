// CORS headers for Edge Function
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
}

// Helper function to create CORS response
export function createCorsResponse(data: any, status: number = 200): Response {
  return new Response(
    JSON.stringify(data),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: status
    }
  )
}

// Helper function to parse request body
export async function parseRequestBody(req: Request): Promise<any> {
  try {
    const contentType = req.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await req.json()
    }
    return null
  } catch (error) {
    console.error('Error parsing request body:', error)
    return null
  }
}

// Helper function to get query parameters
export function getQueryParams(url: URL): Record<string, string> {
  const params: Record<string, string> = {}
  url.searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
} 