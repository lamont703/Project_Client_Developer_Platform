import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { opportunityController } from '../controllers/opportunityController.ts'

export async function handleOpportunitiesRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Opportunities route: ${method} ${path}`)
    analytics.trackEvent('opportunities_request', { method, path })

    // GET /api/opportunities - Get all opportunities
    if (method === 'GET' && path === '/api/opportunities') {
      return await opportunityController.getAllOpportunities(req, path)
    }

    // GET /api/opportunities/:id - Get specific opportunity
    if (method === 'GET' && path.match(/^\/api\/opportunities\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await opportunityController.getOpportunityById(req, path, id!)
    }

    // PUT /api/opportunities/:id - Update opportunity
    if (method === 'PUT' && path.match(/^\/api\/opportunities\/[^\/]+$/)) {
      const id = path.split('/').pop()
      const updateData = await parseRequestBody(req)
      return await opportunityController.updateOpportunity(req, path, id!, updateData)
    }

    // DELETE /api/opportunities/:id - Delete opportunity
    if (method === 'DELETE' && path.match(/^\/api\/opportunities\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await opportunityController.deleteOpportunity(req, path, id!)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'PUT', 'DELETE']
    }, 405)

  } catch (error) {
    logger.error('Error in opportunities route:', error)
    
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