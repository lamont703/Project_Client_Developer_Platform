import { createCorsResponse, parseRequestBody, getQueryParams } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { questionController } from '../controllers/questionController.ts'

export async function handleQuestionsRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method
  const url = new URL(req.url)
  const queryParams = getQueryParams(url)

  try {
    logger.info(`Questions route: ${method} ${path}`)
    analytics.trackEvent('questions_request', { method, path })

    // GET /api/questions - Get all questions with optional filtering
    if (method === 'GET' && path === '/api/questions') {
      return await questionController.getAllQuestions(req, path, queryParams)
    }

    // GET /api/questions/:id - Get specific question with answers
    if (method === 'GET' && path.match(/^\/api\/questions\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await questionController.getQuestionById(req, path, id!)
    }

    // POST /api/questions - Create new question
    if (method === 'POST' && path === '/api/questions') {
      const questionData = await parseRequestBody(req)
      return await questionController.createQuestion(req, path, questionData)
    }

    // PUT /api/questions/:id - Update question
    if (method === 'PUT' && path.match(/^\/api\/questions\/[^\/]+$/)) {
      const id = path.split('/').pop()
      const updateData = await parseRequestBody(req)
      return await questionController.updateQuestion(req, path, id!, updateData)
    }

    // DELETE /api/questions/:id - Delete question
    if (method === 'DELETE' && path.match(/^\/api\/questions\/[^\/]+$/)) {
      const id = path.split('/').pop()
      return await questionController.deleteQuestion(req, path, id!)
    }

    // POST /api/questions/:id/vote - Vote on question
    if (method === 'POST' && path.match(/^\/api\/questions\/[^\/]+\/vote$/)) {
      const id = path.split('/')[3]
      const voteData = await parseRequestBody(req)
      return await questionController.voteOnQuestion(req, path, id!, voteData)
    }

    // GET /api/questions/:id/answers - Get answers for a question
    if (method === 'GET' && path.match(/^\/api\/questions\/[^\/]+\/answers$/)) {
      const id = path.split('/')[3]
      return await questionController.getQuestionAnswers(req, path, id!, queryParams)
    }

    // POST /api/questions/:id/answers - Add answer to question
    if (method === 'POST' && path.match(/^\/api\/questions\/[^\/]+\/answers$/)) {
      const id = path.split('/')[3]
      const answerData = await parseRequestBody(req)
      return await questionController.addAnswer(req, path, id!, answerData)
    }

    // POST /api/questions/:id/answers/:answerId/vote - Vote on answer
    if (method === 'POST' && path.match(/^\/api\/questions\/[^\/]+\/answers\/[^\/]+\/vote$/)) {
      const questionId = path.split('/')[3]
      const answerId = path.split('/')[5]
      const voteData = await parseRequestBody(req)
      return await questionController.voteOnAnswer(req, path, questionId!, answerId!, voteData)
    }

    // POST /api/questions/:id/answers/:answerId/view - Record answer view
    if (method === 'POST' && path.match(/^\/api\/questions\/[^\/]+\/answers\/[^\/]+\/view$/)) {
      const questionId = path.split('/')[3]
      const answerId = path.split('/')[5]
      return await questionController.recordAnswerView(req, path, questionId!, answerId!)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }, 405)

  } catch (error) {
    logger.error('Error in questions route:', error)
    
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