import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { databaseService } from '../services/databaseService.ts'
import { aiCommunityMemberService } from '../services/aiCommunityMemberService.ts'
import { validationService } from '../services/validationService.ts'

export const questionController = {
  // Get all questions with optional filtering
  async getAllQuestions(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { searchTerm, tag, sortBy, limit = '20', offset = '0' } = queryParams
      
      const questions = await databaseService.getQuestions({
        searchTerm,
        tag,
        sortBy: sortBy as 'newest' | 'votes' | 'views' | 'unanswered',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      analytics.trackEvent('questions_retrieved', { count: questions.length })
      
      return createCorsResponse({
        success: true,
        questions,
        count: questions.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting questions:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve questions',
        message: error.message
      }, 500)
    }
  },

  // Get specific question with answers
  async getQuestionById(req: Request, path: string, questionId: string): Promise<Response> {
    try {
      const question = await databaseService.getQuestionById(questionId)
      if (!question) {
        return createCorsResponse({
          success: false,
          error: 'Question not found'
        }, 404)
      }

      const answers = await databaseService.getAnswersByQuestionId(questionId)
      
      // Increment view count
      await databaseService.incrementQuestionViews(questionId)
      
      analytics.trackEvent('question_viewed', { questionId })
      
      return createCorsResponse({
        success: true,
        question,
        answers,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting question:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve question',
        message: error.message
      }, 500)
    }
  },

  // Create new question
  async createQuestion(req: Request, path: string, questionData: any): Promise<Response> {
    try {
      // Validate question data
      const validation = validationService.validateQuestion(questionData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Create question
      const question = await databaseService.createQuestion({
        ...questionData,
        author_id: user.id
      })

      // Generate AI response if enabled
      if (questionData.generateAIResponse !== false) {
        const aiResponse = await aiCommunityMemberService.generateResponse(question)
        if (aiResponse) {
          await databaseService.createAnswer({
            question_id: question.id,
            content: aiResponse.content,
            author_id: aiResponse.authorId,
            is_ai: true
          })
        }
      }

      analytics.trackEvent('question_created', { 
        questionId: question.id,
        hasAIResponse: questionData.generateAIResponse !== false
      })
      
      return createCorsResponse({
        success: true,
        question,
        message: 'Question created successfully',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error creating question:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to create question',
        message: error.message
      }, 500)
    }
  },

  // Update question
  async updateQuestion(req: Request, path: string, questionId: string, updateData: any): Promise<Response> {
    try {
      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the question
      const question = await databaseService.getQuestionById(questionId)
      if (!question || question.author_id !== user.id) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to update this question'
        }, 403)
      }

      // Validate update data
      const validation = validationService.validateQuestionUpdate(updateData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      const updatedQuestion = await databaseService.updateQuestion(questionId, updateData)
      
      analytics.trackEvent('question_updated', { questionId })
      
      return createCorsResponse({
        success: true,
        question: updatedQuestion,
        message: 'Question updated successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating question:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update question',
        message: error.message
      }, 500)
    }
  },

  // Delete question
  async deleteQuestion(req: Request, path: string, questionId: string): Promise<Response> {
    try {
      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the question
      const question = await databaseService.getQuestionById(questionId)
      if (!question || question.author_id !== user.id) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to delete this question'
        }, 403)
      }

      await databaseService.deleteQuestion(questionId)
      
      analytics.trackEvent('question_deleted', { questionId })
      
      return createCorsResponse({
        success: true,
        message: 'Question deleted successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error deleting question:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to delete question',
        message: error.message
      }, 500)
    }
  },

  // Vote on question
  async voteOnQuestion(req: Request, path: string, questionId: string, voteData: any): Promise<Response> {
    try {
      const { direction } = voteData // 'up' or 'down'
      
      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      const result = await databaseService.voteOnQuestion(questionId, user.id, direction)
      
      analytics.trackEvent('question_voted', { 
        questionId, 
        direction,
        newVoteCount: result.votes
      })
      
      return createCorsResponse({
        success: true,
        votes: result.votes,
        message: 'Vote recorded successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error voting on question:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to record vote',
        message: error.message
      }, 500)
    }
  },

  // Get answers for a question
  async getQuestionAnswers(req: Request, path: string, questionId: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { sortBy = 'votes', limit = '50', offset = '0' } = queryParams
      
      const answers = await databaseService.getAnswersByQuestionId(questionId, {
        sortBy: sortBy as 'votes' | 'newest' | 'oldest',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      
      // Transform snake_case to camelCase for frontend compatibility
      const transformedAnswers = answers.map((answer: any) => ({
        id: answer.id,
        questionId: answer.question_id,
        content: answer.content,
        authorId: answer.author_id,
        votes: answer.votes,
        views: answer.views,
        isAccepted: answer.is_accepted,
        isAI: answer.is_ai,
        createdAt: answer.created_at,
        updatedAt: answer.updated_at,
        author: answer.author ? {
          id: answer.author_id,
          name: answer.author.name,
          avatar: answer.author.avatar,
          reputation: answer.author.reputation,
          isAI: answer.author.is_ai
        } : null
      }))
      
      return createCorsResponse({
        success: true,
        answers: transformedAnswers,
        count: transformedAnswers.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting answers:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve answers',
        message: error.message
      }, 500)
    }
  },

  // Add answer to question
  async addAnswer(req: Request, path: string, questionId: string, answerData: any): Promise<Response> {
    try {
      // Validate answer data
      const validation = validationService.validateAnswer(answerData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if question exists
      const question = await databaseService.getQuestionById(questionId)
      if (!question) {
        return createCorsResponse({
          success: false,
          error: 'Question not found'
        }, 404)
      }

      // Create answer
      const answer = await databaseService.createAnswer({
        question_id: questionId,
        content: answerData.content,
        author_id: user.id,
        is_ai: false
      })

      // Update question answer count and status
      await databaseService.updateQuestionAnswerCount(questionId)
      
      analytics.trackEvent('answer_created', { 
        questionId,
        answerId: answer.id
      })
      
      // Transform snake_case to camelCase for frontend compatibility
      const transformedAnswer = {
        id: answer.id,
        questionId: answer.question_id,
        content: answer.content,
        authorId: answer.author_id,
        votes: answer.votes,
        views: answer.views,
        isAccepted: answer.is_accepted,
        isAI: answer.is_ai,
        createdAt: answer.created_at,
        updatedAt: answer.updated_at,
        author: answer.author ? {
          id: answer.author_id,
          name: answer.author.name,
          avatar: answer.author.avatar,
          reputation: answer.author.reputation,
          isAI: answer.author.is_ai
        } : null
      }
      
      return createCorsResponse({
        success: true,
        answer: transformedAnswer,
        message: 'Answer added successfully',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error adding answer:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to add answer',
        message: error.message
      }, 500)
    }
  },

  // Vote on answer
  async voteOnAnswer(req: Request, path: string, questionId: string, answerId: string, voteData: any): Promise<Response> {
    try {
      const { direction } = voteData // 'up' or 'down'
      
      // Get current user from auth
      const user = await databaseService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      const result = await databaseService.voteOnAnswer(answerId, user.id, direction)
      
      analytics.trackEvent('answer_voted', { 
        questionId,
        answerId, 
        direction,
        newVoteCount: result.votes
      })
      
      return createCorsResponse({
        success: true,
        votes: result.votes,
        message: 'Vote recorded successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error voting on answer:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to record vote',
        message: error.message
      }, 500)
    }
  },

  // Record question view
  async recordQuestionView(req: Request, path: string, questionId: string): Promise<Response> {
    console.log('🔍 DEBUG: recordQuestionView controller called:', { questionId })
    try {
      console.log('🔍 DEBUG: Calling databaseService.incrementQuestionViews for questionId:', questionId)
      await databaseService.incrementQuestionViews(questionId)
      console.log('🔍 DEBUG: Question views incremented successfully')
      
      analytics.trackEvent('question_viewed', { 
        questionId
      })
      console.log('🔍 DEBUG: Analytics event tracked')
      
      return createCorsResponse({
        success: true,
        message: 'View recorded successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('🔍 DEBUG: Error recording question view:', error)
      logger.error('Error recording question view:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to record view',
        message: error.message
      }, 500)
    }
  }
} 