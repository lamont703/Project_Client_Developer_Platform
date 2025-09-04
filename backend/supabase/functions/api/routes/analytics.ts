import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { analyticsController } from '../controllers/analyticsController.ts'

export async function handleAnalyticsRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Analytics route: ${method} ${path}`)
    analytics.trackEvent('analytics_request', { method, path })

    // POST /api/analytics - Track event
    if (method === 'POST' && path === '/api/analytics') {
      const eventData = await parseRequestBody(req)
      return await analyticsController.trackEvent(req, path, eventData)
    }

    // GET /api/analytics/events - Get analytics events (admin only)
    if (method === 'GET' && path === '/api/analytics/events') {
      return await analyticsController.getEvents(req, path, queryParams)
    }

    // GET /api/analytics/summary - Get analytics summary (admin only)
    if (method === 'GET' && path === '/api/analytics/summary') {
      return await analyticsController.getSummary(req, path, queryParams)
    }

    // GET /api/analytics/user/:userId - Get user analytics
    if (method === 'GET' && path.match(/^\/api\/analytics\/user\/[^\/]+$/)) {
      const userId = path.split('/').pop()
      return await analyticsController.getUserAnalytics(req, path, userId!, queryParams)
    }

    // GET /api/analytics/popular - Get popular content
    if (method === 'GET' && path === '/api/analytics/popular') {
      return await analyticsController.getPopularContent(req, path, queryParams)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST']
    }, 405)

  } catch (error) {
    logger.error('Error in analytics route:', error)
    
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