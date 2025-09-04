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

      // Extract developer attribution data
      const developerRef = jobData.developerRef
      const developerName = jobData.developerName
      const source = jobData.source
      const sessionId = jobData.sessionId

      // Log developer attribution
      if (developerRef) {
        logger.info('Job created with developer attribution:', {
          developerRef,
          developerName,
          source,
          sessionId,
          projectTitle: jobData.title
        })
      }

      // Step 1: Create wireframe with developer attribution
      logger.info('Step 1: Generating wireframe...')
      const wireframeDataWithRef = {
        ...jobData,
        developerRef,
        developerName,
        source,
        sessionId
      }
      const wireframeResult = await wireFrameService.createWireFrame(wireframeDataWithRef)
      
      // Step 2: Create opportunity in GoHighLevel with developer attribution
      logger.info('Step 2: Creating opportunity in GoHighLevel...')
      const opportunityDataWithRef = {
        ...jobData,
        developerRef,
        developerName,
        source,
        sessionId
      }
      const opportunityResult = await goHighLevelService.createOpportunityInPipeline(opportunityDataWithRef)
      
      // Step 3: Save to database with developer attribution
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
        developer_ref: developerRef,
        developer_name: developerName,
        source: source,
        session_id: sessionId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      // Track successful job creation with developer attribution
      analytics.trackEvent('job_created', {
        event_category: 'job_posting',
        projectTitle: jobData.title,
        projectCategory: jobData.category,
        developerRef,
        developerName,
        source,
        sessionId,
        jobId: opportunityResult.id,
        wireframeUrl: wireframeResult.repo_url
      })

      const response = {
        success: true,
        message: 'Job created successfully',
        job: jobData,
        wireframe: wireframeResult,
        opportunity: opportunityResult,
        database_record: dbOpportunity,
        developer_attribution: {
          developerRef,
          developerName,
          source,
          sessionId
        },
        timestamp: new Date().toISOString()
      }

      const duration = Date.now() - startTime
      analytics.trackRequest(method, path, 200, duration)
      
      return createCorsResponse(response, 200)
    } catch (error) {
      logger.error('Error in job controller:', error)
      
      // Track job creation error with developer attribution
      const jobData = await parseRequestBody(req)
      if (jobData?.developerRef) {
        analytics.trackEvent('job_creation_error', {
          event_category: 'job_posting',
          error: error.message,
          projectTitle: jobData.title,
          developerRef: jobData.developerRef,
          developerName: jobData.developerName,
          source: jobData.source,
          sessionId: jobData.sessionId
        })
      }
      
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