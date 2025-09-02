import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { jobController } from '../controllers/jobController.ts'

export async function handleJobsRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method

  try {
    logger.info(`Jobs route: ${method} ${path}`)
    analytics.trackEvent('jobs_request', { method, path })

    // POST /api/jobs - Create new job
    if (method === 'POST' && path === '/api/jobs') {
      return await jobController.createJob(req, path)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['POST']
    }, 405)

  } catch (error) {
    logger.error('Error in jobs route:', error)
    
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