import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { oauthController } from '../controllers/oauthController.ts'

export async function handleOAuthRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method

  try {
    logger.info(`OAuth route: ${method} ${path}`)
    analytics.trackEvent('oauth_request', { method, path })

    // GET /api/oauth - Handle OAuth flow
    if (method === 'GET' && path === '/api/oauth') {
      return await oauthController.handleOAuth(req, path)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET']
    }, 405)

  } catch (error) {
    logger.error('Error in OAuth route:', error)
    
    const duration = Date.now() - startTime
    analytics.trackRequest(method, path, 500, duration)
    
    return createCorsResponse({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, 500)
  }
} 