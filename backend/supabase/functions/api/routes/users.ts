import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { userController } from '../controllers/userController.ts'

export async function handleUsersRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Users route: ${method} ${path}`)
    analytics.trackEvent('users_request', { method, path })

    // GET /api/users - Get all users (with optional filtering)
    if (method === 'GET' && path === '/api/users') {
      return await userController.getAllUsers(req, path, queryParams)
    }

    // GET /api/users/:id - Get specific user profile
    if (method === 'GET' && path.match(/^\/api\/users\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await userController.getUserById(req, path, id!)
    }

    // GET /api/users/me - Get current user profile
    if (method === 'GET' && path === '/api/users/me') {
      return await userController.getCurrentUser(req, path)
    }

    // POST /api/users - Create new user
    if (method === 'POST' && path === '/api/users') {
      const userData = await parseRequestBody(req)
      return await userController.createUser(req, path, userData)
    }

    // PUT /api/users/:id - Update user profile
    if (method === 'PUT' && path.match(/^\/api\/users\/[^\/]+$/)) {
      const id = path.split('/').pop()
      const updateData = await parseRequestBody(req)
      return await userController.updateUser(req, path, id!, updateData)
    }

    // DELETE /api/users/:id - Delete user
    if (method === 'DELETE' && path.match(/^\/api\/users\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await userController.deleteUser(req, path, id!)
    }

    // GET /api/users/:id/questions - Get user's questions
    if (method === 'GET' && path.match(/^\/api\/users\/[^\/]+\/questions$/)) {
      const id = path.split('/')[3]
      return await userController.getUserQuestions(req, path, id!, queryParams)
    }

    // GET /api/users/:id/answers - Get user's answers
    if (method === 'GET' && path.match(/^\/api\/users\/[^\/]+\/answers$/)) {
      const id = path.split('/')[3]
      return await userController.getUserAnswers(req, path, id!, queryParams)
    }

    // GET /api/users/:id/prototypes - Get user's prototypes
    if (method === 'GET' && path.match(/^\/api\/users\/[^\/]+\/prototypes$/)) {
      const id = path.split('/')[3]
      return await userController.getUserPrototypes(req, path, id!, queryParams)
    }

    // POST /api/users/:id/reputation - Update user reputation
    if (method === 'POST' && path.match(/^\/api\/users\/[^\/]+\/reputation$/)) {
      const id = path.split('/')[3]
      const reputationData = await parseRequestBody(req)
      return await userController.updateUserReputation(req, path, id!, reputationData)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }, 405)

  } catch (error) {
    logger.error('Error in users route:', error)
    
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