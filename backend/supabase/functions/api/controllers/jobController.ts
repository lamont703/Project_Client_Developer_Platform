import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { wireFrameService } from '../services/wireFrameService.ts'
import { goHighLevelService } from '../services/goHighLevelService.ts'
import { databaseService } from '../services/databaseService.ts'

export const jobController = {
  // Create a new job and generate wireframe
  async createJob(req: Request, path: string): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      logger.info('Creating new job and generating wireframe')
      
      const jobData = await parseRequestBody(req)
      if (!jobData) {
        return createCorsResponse({
          success: false,
          error: 'Invalid request body'
        }, 400)
      }

      // Step 1: Create wireframe
      logger.info('Step 1: Generating wireframe...')
      const wireframeResult = await wireFrameService.createWireFrame(jobData)
      
      // Step 2: Create opportunity in GoHighLevel
      logger.info('Step 2: Creating opportunity in GoHighLevel...')
      const opportunityResult = await goHighLevelService.createOpportunityInPipeline(jobData)
      
      // Step 3: Save to database
      logger.info('Step 3: Saving to database...')
      const dbOpportunity = await databaseService.insertOpportunity({
        opportunity_id: opportunityResult.id || `job-${Date.now()}`,
        name: jobData.title,
        status: 'open',
        monetary_value: jobData.budget || 0,
        contact_id: opportunityResult.contactId || null,
        pipeline_id: Deno.env.get('GHL_PIPELINE_ID'),
        pipeline_stage_id: Deno.env.get('GHL_PIPELINE_STAGE_ID'),
        assigned_to: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      const response = {
        success: true,
        message: 'Job created successfully',
        job: jobData,
        wireframe: wireframeResult,
        opportunity: opportunityResult,
        database_record: dbOpportunity,
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error in job controller:', error)
      
      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 500, duration)
      
      return createCorsResponse({
        success: false,
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      }, 500)
    }
  },

  // Get all jobs (placeholder)
  async getAllJobs(req: Request, path: string): Promise<Response> {
    const startTime = Date.now()
    const method = req.method

    try {
      logger.info('Getting all jobs (not yet implemented)')
      
      const response = {
        success: false,
        error: 'Jobs listing not yet implemented',
        message: 'This feature is being migrated from Express to Edge Function',
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 501, duration)
      
      return createCorsResponse(response, 501)
    } catch (error) {
      logger.error('Error in job controller:', error)
      
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
} 