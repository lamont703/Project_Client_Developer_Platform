import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { aiCommunityMemberService } from '../services/aiCommunityMemberService.ts'
import { validationService } from '../services/validationService.ts'
import { questionsService } from '../services/database/questionsService.ts'
import { answersService } from '../services/database/answersService.ts'
import { usersService } from '../services/database/usersService.ts'

export const questionController = {
  // Get all questions with optional filtering
  async getAllQuestions(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { searchTerm, tag, sortBy, limit = '20', offset = '0' } = queryParams
      
      const questions = await questionsService.getQuestions({
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
      const question = await questionsService.getQuestionById(questionId)
      if (!question) {
        return createCorsResponse({
          success: false,
          error: 'Question not found'
        }, 404)
      }

      const answers = await answersService.getAnswersByQuestionId(questionId)
      
      // Increment view count
      await questionsService.incrementQuestionViews(questionId)
      
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
      const user = await usersService.getCurrentUser(req)
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Create question (filter out generateAIResponse since it's not a database field)
      const { generateAIResponse, ...dbQuestionData } = questionData
      const question = await questionsService.createQuestion({
        ...dbQuestionData,
        author_id: user.id
      })

      // Generate AI response if enabled
      if (questionData.generateAIResponse !== false) {
        try {
          // Create conversation context for better AI responses
          const context = {
            questionId: question.id,
            questionContent: question.content,
            questionAuthor: user.id,
            previousResponses: [],
            communityTrends: [], // TODO: Implement getCommunityTrends in databaseService
            userInterests: [],
            conversationHistory: []
          }
          
          const aiResponse = await aiCommunityMemberService.generateResponse(question, context)
          if (aiResponse) {
            // Create answer with enhanced AI response data
            await answersService.createAnswer({
              question_id: question.id,
              content: aiResponse.content,
              author_id: aiResponse.authorId,
              is_ai: true,
              metadata: {
                persona: aiResponse.persona?.name,
                confidence: aiResponse.confidence,
                emotionalTone: aiResponse.emotionalTone,
                followUpQuestions: aiResponse.followUpQuestions
              }
            })
            
            // Update learning memory
            await aiCommunityMemberService.updateLearningMemory(user.id, {
              questionId: question.id,
              interaction: 'question_answered',
              timestamp: new Date()
            })
            
            logger.info(`AI Community Member ${aiResponse.persona?.name} responded to question ${question.id}`)
          }
        } catch (aiError) {
          logger.error('AI response generation failed:', aiError)
          // Continue without AI response - don't fail the question creation
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
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the question
      const question = await questionsService.getQuestionById(questionId)
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

      const updatedQuestion = await questionsService.updateQuestion(questionId, updateData)
      
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
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the question
      const question = await questionsService.getQuestionById(questionId)
      if (!question || question.author_id !== user.id) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to delete this question'
        }, 403)
      }

      await questionsService.deleteQuestion(questionId)
      
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
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      const result = await questionsService.voteOnQuestion(questionId, user.id, direction)
      
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
      
      const answers = await answersService.getAnswersByQuestionId(questionId, {
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
      const user = await usersService.getCurrentUser(req)
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if question exists
      const question = await questionsService.getQuestionById(questionId)
      if (!question) {
        return createCorsResponse({
          success: false,
          error: 'Question not found'
        }, 404)
      }

      // Create answer
      const answer = await answersService.createAnswer({
        question_id: questionId,
        content: answerData.content,
        author_id: user.id,
        is_ai: false
      })

      // Update question answer count and status
      await answersService.updateQuestionAnswerCount(questionId)
      
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
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      const result = await answersService.voteOnAnswer(answerId, user.id, direction)
      
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
      console.log('🔍 DEBUG: Calling questionsService.incrementQuestionViews for questionId:', questionId)
      await questionsService.incrementQuestionViews(questionId)
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
  },

  // Generate proactive AI engagement
  async generateProactiveEngagement(req: Request, path: string): Promise<Response> {
    try {
      const engagement = await aiCommunityMemberService.generateProactiveEngagement()
      
      if (!engagement) {
        return createCorsResponse({
          success: false,
          error: 'Failed to generate proactive engagement'
        }, 500)
      }

      // Create a question from the AI engagement
      const question = await questionsService.createQuestion({
        title: engagement.content.substring(0, 100) + '...',
        content: engagement.content,
        tags: ['ai-engagement', 'community'],
        author_id: await aiCommunityMemberService.getAIUserId(),
        is_ai_generated: true
      })

      analytics.trackEvent('ai_proactive_engagement', { 
        questionId: question.id,
        persona: engagement.persona?.name,
        engagementType: engagement.reasoning
      })
      
      return createCorsResponse({
        success: true,
        question,
        engagement,
        message: 'Proactive AI engagement created',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error generating proactive engagement:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to generate proactive engagement',
        message: error.message
      }, 500)
    }
  },

  // Get AI community member personas
  async getAIPersonas(req: Request, path: string): Promise<Response> {
    try {
      const personas = [
        {
          id: 'proto-bot-alex',
          name: 'Alex Chen',
          username: 'alex_prototype',
          background: 'Former startup founder turned prototyping enthusiast',
          expertise: ['React', 'Figma', 'User Research', 'MVP Development'],
          experienceLevel: 'advanced'
        },
        {
          id: 'proto-bot-maya',
          name: 'Maya Rodriguez',
          username: 'maya_designs',
          background: 'UI/UX designer who discovered prototyping as a way to validate designs',
          expertise: ['Design Systems', 'Figma', 'Adobe XD', 'User Testing'],
          experienceLevel: 'intermediate'
        },
        {
          id: 'proto-bot-jordan',
          name: 'Jordan Kim',
          username: 'jordan_builds',
          background: 'Full-stack developer who uses prototyping to communicate ideas',
          expertise: ['JavaScript', 'React', 'Node.js', 'Database Design'],
          experienceLevel: 'advanced'
        },
        {
          id: 'proto-bot-sam',
          name: 'Sam Taylor',
          username: 'sam_explores',
          background: 'Product manager who learned prototyping to understand user needs',
          expertise: ['Product Strategy', 'User Research', 'Analytics', 'Stakeholder Management'],
          experienceLevel: 'intermediate'
        }
      ]
      
      return createCorsResponse({
        success: true,
        personas,
        count: personas.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting AI personas:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve AI personas',
        message: error.message
      }, 500)
    }
  },

  // TEMPORARY: Run migration to add generate_ai_response column
  async runMigration(req: Request, path: string): Promise<Response> {
    try {
      // Import supabase from databaseService
      const { supabase } = await import('../services/databaseService.ts')
      
      // Run the migration SQL
      const { error } = await supabase.rpc('exec', {
        sql: `
          ALTER TABLE "public"."questions" 
          ADD COLUMN IF NOT EXISTS "generate_ai_response" boolean DEFAULT true;
          
          CREATE INDEX IF NOT EXISTS "idx_questions_generate_ai_response" 
          ON "public"."questions" USING "btree" ("generate_ai_response");
          
          UPDATE "public"."questions" SET "generate_ai_response" = true 
          WHERE "generate_ai_response" IS NULL;
        `
      })

      if (error) {
        throw error
      }

      return createCorsResponse({
        success: true,
        message: 'Migration completed successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error running migration:', error)
      return createCorsResponse({
        success: false,
        error: 'Migration failed',
        message: error.message
      }, 500)
    }
  }
} 