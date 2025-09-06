// AI Community Member Controller
// Handles business logic for AI Community Member features

import { corsHeaders } from "../utils/cors.ts"
import { logger } from "../utils/logger.ts"
import { aiCommunityMemberService } from "../services/aiCommunityMemberService.ts"
import { aiMonitoringService } from "../services/aiMonitoringService.ts"
import { questionsService } from '../services/database/questionsService.ts'
import { answersService } from '../services/database/answersService.ts'
import { trendingTopicsService } from "../services/trendingTopicsService.ts"

export const aiCommunityMemberController = {
  // Get AI Community Member statistics
  async getStats(): Promise<Response> {
    try {
      logger.info('📊 Getting AI Community Member stats...')
      
      const stats = await aiMonitoringService.getStats()
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'AI Community Member stats retrieved',
          stats: stats,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    } catch (error) {
      logger.error('Error getting AI Community Member stats:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to get AI Community Member stats',
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }
  },

  // Test AI response generation
  async testResponse(req: Request): Promise<Response> {
    try {
      logger.info('🧪 Testing AI response generation...')
      
      const body = await req.json()
      const { questionId } = body
      
      if (!questionId) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question ID is required',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }

      const question = await questionsService.getQuestionById(questionId)
      if (!question) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question not found',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      const aiResponse = await aiCommunityMemberService.generateResponse(question)
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'AI response generated successfully',
          question: question,
          aiResponse: aiResponse,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    } catch (error) {
      logger.error('Error testing AI response:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to generate AI response',
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }
  },

  // Test AI personas
  async testPersonas(): Promise<Response> {
    try {
      logger.info('👥 Testing AI personas...')
      
      const personas = [
        { id: 'proto-bot-alex', name: 'Alex Chen', expertise: ['React', 'Figma', 'User Research'] },
        { id: 'proto-bot-maya', name: 'Maya Rodriguez', expertise: ['Design Systems', 'Figma', 'User Testing'] },
        { id: 'proto-bot-jordan', name: 'Jordan Kim', expertise: ['JavaScript', 'React', 'Node.js'] },
        { id: 'proto-bot-sam', name: 'Sam Taylor', expertise: ['Product Strategy', 'User Research', 'Analytics'] }
      ]
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'AI personas retrieved successfully',
          personas: personas,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    } catch (error) {
      logger.error('Error testing AI personas:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to get AI personas',
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }
  },

  // Get trending topics
  async getTrendingTopics(): Promise<Response> {
    try {
      logger.info("📈 Getting trending topics...")
      
      const trendingTopics = await trendingTopicsService.getTrendingTopics(10)
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Trending topics retrieved successfully",
          trending_topics: trendingTopics,
          count: trendingTopics.length,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      )
    } catch (error) {
      logger.error("Error getting trending topics:", error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to get trending topics",
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500
        }
      )
    }
  },

  // Generate AI response for a question
  async generateResponse(req: Request): Promise<Response> {
    try {
      logger.info('🤖 Generating AI response...')
      
      const body = await req.json()
      const { questionId, context } = body
      
      if (!questionId) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question ID is required',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(questionId)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question ID must be a valid UUID',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
          }
        )
      }

      const question = await questionsService.getQuestionById(questionId)
      if (!question) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Question not found',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404
          }
        )
      }

      const aiResponse = await aiCommunityMemberService.generateResponse(question, context)
      
      if (aiResponse) {
        // Save the response to the database
        const answerData = {
          question_id: questionId,
          content: aiResponse.content,
          author_id: aiResponse.authorId,
          is_ai: true
        }
        
        const createdAnswer = await answersService.createAnswer(answerData)
        
        return new Response(
          JSON.stringify({
            success: true,
            message: 'AI response generated and saved successfully',
            answer: createdAnswer,
            aiResponse: aiResponse,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to generate AI response',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    } catch (error) {
      logger.error('Error generating AI response:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to generate AI response',
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }
  },

  // Generate proactive engagement
  async generateProactiveEngagement(): Promise<Response> {
    try {
      logger.info('📢 Generating proactive engagement...')
      
      const engagement = await aiCommunityMemberService.generateProactiveEngagement()
      
      if (engagement) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Proactive engagement generated successfully',
            engagement: engagement,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
          }
        )
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to generate proactive engagement',
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }
    } catch (error) {
      logger.error('Error generating proactive engagement:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to generate proactive engagement',
          message: error.message,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }
  },

  // Start monitoring
  async startMonitoring(): Promise<Response> {
    try {
      logger.info('🔍 Starting AI monitoring...')
      
      await aiMonitoringService.start()
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'AI monitoring started successfully',
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    } catch (error) {
      logger.error('Error starting AI monitoring:', error)
      
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to start AI monitoring',
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
}
