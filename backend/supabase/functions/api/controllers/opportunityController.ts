import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { databaseService } from '../services/databaseService.ts'

export const opportunityController = {
  // Get all opportunities from database
  async getAllOpportunities(req: Request, path: string): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      logger.info('Fetching all opportunities from database')
      const allOpportunities = await databaseService.getAllOpportunities()
      
      // Filter to only return opportunities with "open" status
      const openOpportunities = allOpportunities.filter((opp: any) => opp.status === 'open')
      
      logger.info(`Found ${allOpportunities.length} total opportunities, ${openOpportunities.length} are open`)
      
      const response = {
        success: true,
        opportunities: openOpportunities,
        count: openOpportunities.length,
        total_count: allOpportunities.length,
        filtered_by: 'open_status',
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error fetching opportunities:', error)
      
      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 500, duration)
      
      return createCorsResponse({
        success: false,
        error: 'Failed to fetch opportunities',
        message: error.message,
        timestamp: new Date().toISOString()
      }, 500)
    }
  },

  // Get opportunity by ID from database
  async getOpportunityById(req: Request, path: string, id: string): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      logger.info(`Fetching opportunity with ID: ${id}`)
      
      const opportunity = await databaseService.getOpportunityById(id)
      
      if (!opportunity) {
        return createCorsResponse({
          success: false,
          error: 'Opportunity not found',
          timestamp: new Date().toISOString()
        }, 404)
      }
      
      const response = {
        success: true,
        opportunity: opportunity,
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error fetching opportunity:', error)
      
      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 500, duration)
      
      return createCorsResponse({
        success: false,
        error: 'Failed to fetch opportunity',
        message: error.message,
        timestamp: new Date().toISOString()
      }, 500)
    }
  },

  // Update opportunity in database
  async updateOpportunity(req: Request, path: string, id: string, updateData: any): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      if (!updateData) {
        return createCorsResponse({
          success: false,
          error: 'Invalid request body'
        }, 400)
      }

      logger.info(`Updating opportunity ${id} in database`)
      
      const updatedOpportunity = await databaseService.updateOpportunity(id, updateData)
      
      if (!updatedOpportunity) {
        return createCorsResponse({
          success: false,
          error: 'Opportunity not found'
        }, 404)
      }

      const response = {
        success: true,
        opportunity: updatedOpportunity,
        message: 'Opportunity updated successfully',
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error updating opportunity:', error)
      
      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 500, duration)
      
      return createCorsResponse({
        success: false,
        error: 'Failed to update opportunity',
        message: error.message,
        timestamp: new Date().toISOString()
      }, 500)
    }
  },

  // Delete opportunity from database
  async deleteOpportunity(req: Request, path: string, id: string): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      logger.info(`Deleting opportunity ${id} from database`)
      
      await databaseService.deleteOpportunity(id)

      const response = {
        success: true,
        message: 'Opportunity deleted successfully',
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error deleting opportunity:', error)
      
      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 500, duration)
      
      return createCorsResponse({
        success: false,
        error: 'Failed to delete opportunity',
        message: error.message,
        timestamp: new Date().toISOString()
      }, 500)
    }
  }
} 