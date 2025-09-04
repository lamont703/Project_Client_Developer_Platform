import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { databaseService } from '../services/databaseService.ts'
import { validationService } from '../services/validationService.ts'

export const analyticsController = {
  // Track event
  async trackEvent(req: Request, path: string, eventData: any): Promise<Response> {
    try {
      // Validate event data
      const validation = validationService.validateAnalyticsEvent(eventData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Get current user from auth (optional)
      const user = await databaseService.getCurrentUser()
      
      // Track event
      const event = await databaseService.trackEvent({
        ...eventData,
        userId: user?.id,
        sessionId: eventData.sessionId,
        userAgent: req.headers.get('user-agent'),
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
      })

      return createCorsResponse({
        success: true,
        eventId: event.id,
        message: 'Event tracked successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error tracking event:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to track event',
        message: error.message
      }, 500)
    }
  },

  // Get analytics events (admin only)
  async getEvents(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      const { eventType, userId, startDate, endDate, limit = '100', offset = '0' } = queryParams
      
      const events = await databaseService.getAnalyticsEvents({
        eventType,
        userId,
        startDate,
        endDate,
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      return createCorsResponse({
        success: true,
        events,
        count: events.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting analytics events:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve analytics events',
        message: error.message
      }, 500)
    }
  },

  // Get analytics summary (admin only)
  async getSummary(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      const { period = '30d' } = queryParams
      
      const summary = await databaseService.getAnalyticsSummary(period)

      return createCorsResponse({
        success: true,
        summary,
        period,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting analytics summary:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve analytics summary',
        message: error.message
      }, 500)
    }
  },

  // Get user analytics
  async getUserAnalytics(req: Request, path: string, userId: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      // Get current user from auth
      const currentUser = await databaseService.getCurrentUser()
      if (!currentUser) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user can view this analytics
      if (currentUser.id !== userId && !currentUser.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to view this analytics'
        }, 403)
      }

      const { period = '30d' } = queryParams
      
      const userAnalytics = await databaseService.getUserAnalytics(userId, period)

      return createCorsResponse({
        success: true,
        analytics: userAnalytics,
        userId,
        period,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting user analytics:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve user analytics',
        message: error.message
      }, 500)
    }
  },

  // Get popular content
  async getPopularContent(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { contentType, period = '7d', limit = '10' } = queryParams
      
      const popularContent = await databaseService.getPopularContent({
        contentType: contentType as 'questions' | 'answers' | 'prototypes',
        period,
        limit: parseInt(limit)
      })

      return createCorsResponse({
        success: true,
        popularContent,
        contentType,
        period,
        count: popularContent.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting popular content:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve popular content',
        message: error.message
      }, 500)
    }
  }
} 