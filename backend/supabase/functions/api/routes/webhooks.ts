import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { webhookController } from '../controllers/webhookController.ts'

export async function handleWebhooksRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method

  try {
    logger.info(`Webhooks route: ${method} ${path}`)
    analytics.trackEvent('webhooks_request', { method, path })

    // POST /api/webhooks/ghl/opportunities-update - Process GoHighLevel webhook
    if (method === 'POST' && path === '/api/webhooks/ghl/opportunities-update') {
      return await webhookController.processWebhook(req, path)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['POST']
    }, 405)

  } catch (error) {
    logger.error('Error in webhooks route:', error)
    
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