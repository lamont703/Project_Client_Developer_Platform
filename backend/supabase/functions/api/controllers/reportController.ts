import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { databaseService } from '../services/databaseService.ts'
import { validationService } from '../services/validationService.ts'

export const reportController = {
  // Get all reports (admin only)
  async getAllReports(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      const { status, contentType, limit = '50', offset = '0' } = queryParams
      
      const reports = await databaseService.getReports({
        status: status as 'pending' | 'resolved' | 'dismissed',
        contentType: contentType as 'question' | 'answer' | 'prototype' | 'user',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      analytics.trackEvent('reports_retrieved', { count: reports.length })
      
      return createCorsResponse({
        success: true,
        reports,
        count: reports.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting reports:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve reports',
        message: error.message
      }, 500)
    }
  },

  // Get specific report
  async getReportById(req: Request, path: string, reportId: string): Promise<Response> {
    try {
      const report = await databaseService.getReportById(reportId)
      if (!report) {
        return createCorsResponse({
          success: false,
          error: 'Report not found'
        }, 404)
      }

      // Check if user can view this report
      const user = await databaseService.getCurrentUser()
      if (!user || (user.id !== report.reporterId && !user.isAdmin)) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to view this report'
        }, 403)
      }

      return createCorsResponse({
        success: true,
        report,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting report:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve report',
        message: error.message
      }, 500)
    }
  },

  // Create new report
  async createReport(req: Request, path: string, reportData: any): Promise<Response> {
    try {
      // Validate report data
      const validation = validationService.validateReport(reportData)
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

      // Check if content exists
      const contentExists = await databaseService.checkContentExists(
        reportData.contentType,
        reportData.contentId
      )
      if (!contentExists) {
        return createCorsResponse({
          success: false,
          error: 'Reported content not found'
        }, 404)
      }

      // Check if user already reported this content
      const existingReport = await databaseService.getReportByUserAndContent(
        user.id,
        reportData.contentType,
        reportData.contentId
      )
      if (existingReport) {
        return createCorsResponse({
          success: false,
          error: 'You have already reported this content'
        }, 409)
      }

      // Create report
      const report = await databaseService.createReport({
        ...reportData,
        reporterId: user.id
      })

      analytics.trackEvent('report_created', { 
        reportId: report.id,
        contentType: reportData.contentType,
        contentId: reportData.contentId
      })
      
      return createCorsResponse({
        success: true,
        report,
        message: 'Report submitted successfully',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error creating report:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to create report',
        message: error.message
      }, 500)
    }
  },

  // Update report status (admin only)
  async updateReport(req: Request, path: string, reportId: string, updateData: any): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      // Validate update data
      const validation = validationService.validateReportUpdate(updateData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      const updatedReport = await databaseService.updateReport(reportId, {
        ...updateData,
        moderatorId: user.id
      })
      
      analytics.trackEvent('report_updated', { 
        reportId,
        status: updateData.status
      })
      
      return createCorsResponse({
        success: true,
        report: updatedReport,
        message: 'Report updated successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating report:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update report',
        message: error.message
      }, 500)
    }
  },

  // Delete report (admin only)
  async deleteReport(req: Request, path: string, reportId: string): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      await databaseService.deleteReport(reportId)
      
      analytics.trackEvent('report_deleted', { reportId })
      
      return createCorsResponse({
        success: true,
        message: 'Report deleted successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error deleting report:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to delete report',
        message: error.message
      }, 500)
    }
  },

  // Get pending reports (admin only)
  async getPendingReports(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      const { limit = '20', offset = '0' } = queryParams
      
      const reports = await databaseService.getPendingReports({
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      
      return createCorsResponse({
        success: true,
        reports,
        count: reports.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting pending reports:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve pending reports',
        message: error.message
      }, 500)
    }
  },

  // Resolve report (admin only)
  async resolveReport(req: Request, path: string, reportId: string, resolveData: any): Promise<Response> {
    try {
      const { action, reason } = resolveData // 'dismiss', 'remove_content', 'warn_user', 'ban_user'
      
      // Check admin permissions
      const user = await databaseService.getCurrentUser()
      if (!user || !user.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Admin access required'
        }, 403)
      }

      const result = await databaseService.resolveReport(reportId, {
        action,
        reason,
        moderatorId: user.id
      })
      
      analytics.trackEvent('report_resolved', { 
        reportId,
        action,
        contentType: result.contentType,
        contentId: result.contentId
      })
      
      return createCorsResponse({
        success: true,
        result,
        message: 'Report resolved successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error resolving report:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to resolve report',
        message: error.message
      }, 500)
    }
  }
} 