// Answers Routes
// Handles all answer-related endpoints

import { corsHeaders } from "../utils/cors.ts"
import { logger } from "../utils/logger.ts"
import { analyticsMiddleware } from "../middleware/analytics.ts"
import { answersService } from "../services/database/answersService.ts"
import { questionsService } from "../services/database/questionsService.ts"
import { usersService } from "../services/database/usersService.ts"

export async function handleAnswersRoute(req: Request, path: string): Promise<Response> {
  const method = req.method
  const analytics = analyticsMiddleware(req, path, method)

  try {
    logger.info(`Answers Route: ${method} ${path}`)

    // GET /api/answers - Get all answers (with optional filters)
    if (method === 'GET' && path === '/api/answers') {
      const url = new URL(req.url)
      const filters = {
        limit: parseInt(url.searchParams.get('limit') || '20'),
        offset: parseInt(url.searchParams.get('offset') || '0'),
        sortBy: url.searchParams.get('sortBy') || 'newest'
      }

      const answers = await answersService.getAnswers(filters)
      
      const response = {
        success: true,
        answers: answers,
        count: answers.length,
        filters: filters,
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(200, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // GET /api/answers/:id - Get answer by ID
    if (method === 'GET' && path.match(/^\/api\/answers\/[^\/]+$/)) {
      const answerId = path.split('/')[3]
      const answer = await answersService.getAnswerById(answerId)
      
      if (!answer) {
        analytics.trackRequest(404, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Answer not found',
            answerId: answerId
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      const response = {
        success: true,
        answer: answer,
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(200, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // POST /api/answers - Create new answer
    if (method === 'POST' && path === '/api/answers') {
      const user = await usersService.getCurrentUser(req)
      
      if (!user) {
        analytics.trackRequest(401, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Authentication required'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401
          }
        )
      }

      const body = await req.json()
      const { content, question_id } = body

      if (!content || !question_id) {
        analytics.trackRequest(400, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Content and question_id are required'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }

      // Verify question exists
      const question = await questionsService.getQuestionById(question_id)
      if (!question) {
        analytics.trackRequest(404, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question not found'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      const answerData = {
        content,
        question_id,
        author_id: user.id,
        created_at: new Date().toISOString()
      }

      const answer = await answersService.createAnswer(answerData)
      
      // Update question answer count
      await answersService.updateQuestionAnswerCount(question_id)

      const response = {
        success: true,
        answer: answer,
        message: 'Answer created successfully',
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(201, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201
        }
      )
    }

    // PUT /api/answers/:id - Update answer
    if (method === 'PUT' && path.match(/^\/api\/answers\/[^\/]+$/)) {
      const user = await usersService.getCurrentUser(req)
      
      if (!user) {
        analytics.trackRequest(401, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Authentication required'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401
          }
        )
      }

      const answerId = path.split('/')[3]
      const body = await req.json()
      
      // Check if answer exists and user owns it
      const existingAnswer = await answersService.getAnswerById(answerId)
      if (!existingAnswer) {
        analytics.trackRequest(404, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Answer not found'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      if (existingAnswer.author_id !== user.id && !user.isAdmin) {
        analytics.trackRequest(403, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Not authorized to update this answer'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 403
          }
        )
      }

      const updateData = {
        ...body,
        updated_at: new Date().toISOString()
      }

      const updatedAnswer = await answersService.updateAnswer(answerId, updateData)

      const response = {
        success: true,
        answer: updatedAnswer,
        message: 'Answer updated successfully',
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(200, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // DELETE /api/answers/:id - Delete answer
    if (method === 'DELETE' && path.match(/^\/api\/answers\/[^\/]+$/)) {
      const user = await usersService.getCurrentUser(req)
      
      if (!user) {
        analytics.trackRequest(401, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Authentication required'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401
          }
        )
      }

      const answerId = path.split('/')[3]
      
      // Check if answer exists and user owns it
      const existingAnswer = await answersService.getAnswerById(answerId)
      if (!existingAnswer) {
        analytics.trackRequest(404, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Answer not found'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      if (existingAnswer.author_id !== user.id && !user.isAdmin) {
        analytics.trackRequest(403, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Not authorized to delete this answer'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 403
          }
        )
      }

      await answersService.deleteAnswer(answerId)

      const response = {
        success: true,
        message: 'Answer deleted successfully',
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(200, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // POST /api/answers/:id/vote - Vote on answer
    if (method === 'POST' && path.match(/^\/api\/answers\/[^\/]+\/vote$/)) {
      const user = await usersService.getCurrentUser(req)
      
      if (!user) {
        analytics.trackRequest(401, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Authentication required'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401
          }
        )
      }

      const answerId = path.split('/')[3]
      const body = await req.json()
      const { direction } = body

      if (!direction || !['up', 'down'].includes(direction)) {
        analytics.trackRequest(400, Date.now() - analytics.startTime)
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Direction must be "up" or "down"'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }

      const result = await answersService.voteOnAnswer(answerId, user.id, direction)

      const response = {
        success: true,
        votes: result.votes,
        message: `Answer ${direction}voted successfully`,
        timestamp: new Date().toISOString()
      }

      analytics.trackRequest(200, Date.now() - analytics.startTime)
      
      return new Response(
        JSON.stringify(response),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // 404 for unknown answer routes
    analytics.trackRequest(404, Date.now() - analytics.startTime)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Answer route not found',
        path: path,
        method: method,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      }
    )

  } catch (error) {
    logger.error('Answers route error:', error)
    analytics.trackRequest(500, Date.now() - analytics.startTime)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
}
