// Monitoring Routes
// Handles AI monitoring service management and statistics

import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { monitoringController } from '../controllers/monitoringController.ts'

export async function handleMonitoringRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Monitoring route: ${method} ${path}`)
    analytics.trackEvent('monitoring_request', { method, path })

    // POST /api/monitoring/start - Start AI monitoring service
    if (method === 'POST' && path === '/api/monitoring/start') {
      return await monitoringController.startMonitoring(req, path)
    }

    // POST /api/monitoring/stop - Stop AI monitoring service
    if (method === 'POST' && path === '/api/monitoring/stop') {
      return await monitoringController.stopMonitoring(req, path)
    }

    // GET /api/monitoring/stats - Get monitoring statistics
    if (method === 'GET' && path === '/api/monitoring/stats') {
      return await monitoringController.getMonitoringStats(req, path)
    }

    // PUT /api/monitoring/config - Update monitoring configuration
    if (method === 'PUT' && path === '/api/monitoring/config') {
      const configData = await parseRequestBody(req)
      return await monitoringController.updateMonitoringConfig(req, path, configData)
    }

    // POST /api/monitoring/force-engagement - Force immediate AI engagement
    if (method === 'POST' && path === '/api/monitoring/force-engagement') {
      return await monitoringController.forceEngagement(req, path)
    }

    // POST /api/monitoring/force-analysis - Force immediate community analysis
    if (method === 'POST' && path === '/api/monitoring/force-analysis') {
      return await monitoringController.forceAnalysis(req, path)
    }

    // GET /api/monitoring/history - Get engagement history
    if (method === 'GET' && path === '/api/monitoring/history') {
      return await monitoringController.getEngagementHistory(req, path, queryParams)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'PUT']
    }, 405)

  } catch (error) {
    logger.error('Error in monitoring route:', error)
    
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
