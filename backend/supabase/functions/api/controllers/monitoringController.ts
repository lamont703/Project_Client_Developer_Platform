// Monitoring Controller
// Handles monitoring service management and statistics

import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { aiMonitoringService } from '../services/aiMonitoringService.ts'

export const monitoringController = {
  // Start the AI monitoring service
  async startMonitoring(req: Request, path: string): Promise<Response> {
    try {
      await aiMonitoringService.start()
      
      analytics.trackEvent('ai_monitoring_started')
      
      return createCorsResponse({
        success: true,
        message: 'AI Monitoring Service started successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error starting monitoring service:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to start monitoring service',
        message: error.message
      }, 500)
    }
  },

  // Stop the AI monitoring service
  async stopMonitoring(req: Request, path: string): Promise<Response> {
    try {
      await aiMonitoringService.stop()
      
      analytics.trackEvent('ai_monitoring_stopped')
      
      return createCorsResponse({
        success: true,
        message: 'AI Monitoring Service stopped successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error stopping monitoring service:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to stop monitoring service',
        message: error.message
      }, 500)
    }
  },

  // Get monitoring statistics
  async getMonitoringStats(req: Request, path: string): Promise<Response> {
    try {
      const stats = await aiMonitoringService.getStats()
      const config = aiMonitoringService.getConfig()
      const engagementHistory = aiMonitoringService.getEngagementHistory()
      
      analytics.trackEvent('monitoring_stats_retrieved')
      
      return createCorsResponse({
        success: true,
        stats,
        config,
        engagementHistory: engagementHistory.slice(-20), // Last 20 engagements
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting monitoring stats:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve monitoring statistics',
        message: error.message
      }, 500)
    }
  },

  // Update monitoring configuration
  async updateMonitoringConfig(req: Request, path: string, configData: any): Promise<Response> {
    try {
      aiMonitoringService.updateConfig(configData)
      
      analytics.trackEvent('monitoring_config_updated', configData)
      
      return createCorsResponse({
        success: true,
        message: 'Monitoring configuration updated successfully',
        config: aiMonitoringService.getConfig(),
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating monitoring config:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update monitoring configuration',
        message: error.message
      }, 500)
    }
  },

  // Force immediate engagement
  async forceEngagement(req: Request, path: string): Promise<Response> {
    try {
      await aiMonitoringService.forceEngagement()
      
      analytics.trackEvent('ai_engagement_forced')
      
      return createCorsResponse({
        success: true,
        message: 'Forced AI engagement executed',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error forcing engagement:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to force AI engagement',
        message: error.message
      }, 500)
    }
  },

  // Force immediate community analysis
  async forceAnalysis(req: Request, path: string): Promise<Response> {
    try {
      await aiMonitoringService.forceAnalysis()
      
      analytics.trackEvent('ai_analysis_forced')
      
      return createCorsResponse({
        success: true,
        message: 'Forced community analysis executed',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error forcing analysis:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to force community analysis',
        message: error.message
      }, 500)
    }
  },

  // Get engagement history
  async getEngagementHistory(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { limit = '50', offset = '0' } = queryParams
      const history = aiMonitoringService.getEngagementHistory()
      
      const startIndex = parseInt(offset)
      const endIndex = startIndex + parseInt(limit)
      const paginatedHistory = history.slice(startIndex, endIndex)
      
      analytics.trackEvent('engagement_history_retrieved', { 
        limit: parseInt(limit), 
        offset: parseInt(offset) 
      })
      
      return createCorsResponse({
        success: true,
        history: paginatedHistory,
        total: history.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting engagement history:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve engagement history',
        message: error.message
      }, 500)
    }
  }
}
