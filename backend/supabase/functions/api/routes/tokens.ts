import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { tokenController } from '../controllers/tokenController.ts'

export async function handleTokensRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method

  try {
    logger.info(`Tokens route: ${method} ${path}`)
    analytics.trackEvent('tokens_request', { method, path })

    // GET /api/tokens - Handle token operations
    if (method === 'GET' && path === '/api/tokens') {
      return await tokenController.handleTokens(req, path)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET']
    }, 405)

  } catch (error) {
    logger.error('Error in tokens route:', error)
    
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