import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { prototypeController } from '../controllers/prototypeController.ts'

export async function handlePrototypesRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Prototypes route: ${method} ${path}`)
    analytics.trackEvent('prototypes_request', { method, path })

    // GET /api/prototypes - Get all prototypes with optional filtering
    if (method === 'GET' && path === '/api/prototypes') {
      return await prototypeController.getAllPrototypes(req, path, queryParams)
    }

    // GET /api/prototypes/:id - Get specific prototype
    if (method === 'GET' && path.match(/^\/api\/prototypes\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await prototypeController.getPrototypeById(req, path, id!)
    }

    // POST /api/prototypes - Create new prototype
    if (method === 'POST' && path === '/api/prototypes') {
      const prototypeData = await parseRequestBody(req)
      return await prototypeController.createPrototype(req, path, prototypeData)
    }

    // PUT /api/prototypes/:id - Update prototype
    if (method === 'PUT' && path.match(/^\/api\/prototypes\/[^\/]+$/)) {
      const id = path.split('/').pop()
      const updateData = await parseRequestBody(req)
      return await prototypeController.updatePrototype(req, path, id!, updateData)
    }

    // DELETE /api/prototypes/:id - Delete prototype
    if (method === 'DELETE' && path.match(/^\/api\/prototypes\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await prototypeController.deletePrototype(req, path, id!)
    }

    // POST /api/prototypes/:id/like - Like/unlike prototype
    if (method === 'POST' && path.match(/^\/api\/prototypes\/[^\/]+\/like$/)) {
      const id = path.split('/')[3]
      const likeData = await parseRequestBody(req)
      return await prototypeController.likePrototype(req, path, id!, likeData)
    }

    // POST /api/prototypes/:id/view - Record prototype view
    if (method === 'POST' && path.match(/^\/api\/prototypes\/[^\/]+\/view$/)) {
      const id = path.split('/')[3]
      return await prototypeController.recordPrototypeView(req, path, id!)
    }

    // POST /api/prototypes/:id/validate-url - Validate GitHub Pages URL
    if (method === 'POST' && path.match(/^\/api\/prototypes\/[^\/]+\/validate-url$/)) {
      const id = path.split('/')[3]
      const urlData = await parseRequestBody(req)
      return await prototypeController.validatePrototypeUrl(req, path, id!, urlData)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }, 405)

  } catch (error) {
    logger.error('Error in prototypes route:', error)
    
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