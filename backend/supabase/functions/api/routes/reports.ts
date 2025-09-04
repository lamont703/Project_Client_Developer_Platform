import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { reportController } from '../controllers/reportController.ts'

export async function handleReportsRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Reports route: ${method} ${path}`)
    analytics.trackEvent('reports_request', { method, path })

    // GET /api/reports - Get all reports (admin only)
    if (method === 'GET' && path === '/api/reports') {
      return await reportController.getAllReports(req, path, queryParams)
    }

    // GET /api/reports/:id - Get specific report
    if (method === 'GET' && path.match(/^\/api\/reports\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await reportController.getReportById(req, path, id!)
    }

    // POST /api/reports - Create new report
    if (method === 'POST' && path === '/api/reports') {
      const reportData = await parseRequestBody(req)
      return await reportController.createReport(req, path, reportData)
    }

    // PUT /api/reports/:id - Update report status (admin only)
    if (method === 'PUT' && path.match(/^\/api\/reports\/[^\/]+$/)) {
      const id = path.split('/').pop()
      const updateData = await parseRequestBody(req)
      return await reportController.updateReport(req, path, id!, updateData)
    }

    // DELETE /api/reports/:id - Delete report (admin only)
    if (method === 'DELETE' && path.match(/^\/api\/reports\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await reportController.deleteReport(req, path, id!)
    }

    // GET /api/reports/pending - Get pending reports (admin only)
    if (method === 'GET' && path === '/api/reports/pending') {
      return await reportController.getPendingReports(req, path, queryParams)
    }

    // POST /api/reports/:id/resolve - Resolve report (admin only)
    if (method === 'POST' && path.match(/^\/api\/reports\/[^\/]+\/resolve$/)) {
      const id = path.split('/')[3]
      const resolveData = await parseRequestBody(req)
      return await reportController.resolveReport(req, path, id!, resolveData)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }, 405)

  } catch (error) {
    logger.error('Error in reports route:', error)
    
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