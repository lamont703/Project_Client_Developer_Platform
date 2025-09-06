import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { validationService } from '../services/validationService.ts'
import { urlValidationService } from '../services/urlValidationService.ts'
import { usersService } from '../services/database/usersService.ts'
import { prototypesService } from '../services/database/prototypesService.ts'

export const prototypeController = {
  // Get all prototypes with optional filtering
  async getAllPrototypes(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { searchTerm, tag, technology, status, sortBy, limit = '20', offset = '0' } = queryParams
      
      const prototypes = await prototypesService.getPrototypes({
        searchTerm,
        tag,
        technology,
        status: status as 'live' | 'development' | 'archived',
        sortBy: sortBy as 'newest' | 'likes' | 'views' | 'featured',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      analytics.trackEvent('prototypes_retrieved', { count: prototypes.length })
      
      return createCorsResponse({
        success: true,
        prototypes,
        count: prototypes.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting prototypes:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve prototypes',
        message: error.message
      }, 500)
    }
  },

  // Get specific prototype
  async getPrototypeById(req: Request, path: string, prototypeId: string): Promise<Response> {
    try {
      const prototype = await prototypesService.getPrototypeById(prototypeId)
      if (!prototype) {
        return createCorsResponse({
          success: false,
          error: 'Prototype not found'
        }, 404)
      }

      // Increment view count
      await prototypesService.incrementPrototypeViews(prototypeId)
      
      analytics.trackEvent('prototype_viewed', { prototypeId })
      
      return createCorsResponse({
        success: true,
        prototype,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting prototype:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve prototype',
        message: error.message
      }, 500)
    }
  },

  // Create new prototype
  async createPrototype(req: Request, path: string, prototypeData: any): Promise<Response> {
    try {
      // Validate prototype data
      const validation = validationService.validatePrototype(prototypeData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Get current user from auth
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Validate GitHub Pages URL
      const urlValidation = await urlValidationService.validateGitHubPagesUrl(prototypeData.githubPagesUrl)
      const status = urlValidation.isValid ? 'live' : 'development'

      // Convert camelCase to snake_case for database
      const dbPrototypeData = {
        title: prototypeData.title,
        description: prototypeData.description,
        github_pages_url: prototypeData.githubPagesUrl,
        github_repo_url: prototypeData.githubRepoUrl,
        tags: prototypeData.tags,
        technologies: prototypeData.technologies,
        author_id: user.id,
        status
      }

      // Create prototype
      const prototype = await prototypesService.createPrototype(dbPrototypeData)

      analytics.trackEvent('prototype_created', { 
        prototypeId: prototype.id,
        status,
        urlValid: urlValidation.isValid
      })
      
      return createCorsResponse({
        success: true,
        prototype,
        urlValidation,
        message: 'Prototype created successfully',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error creating prototype:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to create prototype',
        message: error.message
      }, 500)
    }
  },

  // Update prototype
  async updatePrototype(req: Request, path: string, prototypeId: string, updateData: any): Promise<Response> {
    try {
      // Get current user from auth
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the prototype
      const prototype = await prototypesService.getPrototypeById(prototypeId)
      if (!prototype || prototype.author_id !== user.id) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to update this prototype'
        }, 403)
      }

      // Validate update data
      const validation = validationService.validatePrototypeUpdate(updateData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Validate URL if it's being updated
      let urlValidation = null
      if (updateData.githubPagesUrl) {
        urlValidation = await urlValidationService.validateGitHubPagesUrl(updateData.githubPagesUrl)
        updateData.status = urlValidation.isValid ? 'live' : 'development'
      }

      // Convert camelCase to snake_case for database
      const dbUpdateData: any = {}
      if (updateData.title) dbUpdateData.title = updateData.title
      if (updateData.description) dbUpdateData.description = updateData.description
      if (updateData.githubPagesUrl) dbUpdateData.github_pages_url = updateData.githubPagesUrl
      if (updateData.githubRepoUrl) dbUpdateData.github_repo_url = updateData.githubRepoUrl
      if (updateData.tags) dbUpdateData.tags = updateData.tags
      if (updateData.technologies) dbUpdateData.technologies = updateData.technologies
      if (updateData.status) dbUpdateData.status = updateData.status

      const updatedPrototype = await prototypesService.updatePrototype(prototypeId, dbUpdateData)
      
      analytics.trackEvent('prototype_updated', { 
        prototypeId,
        urlValid: urlValidation?.isValid
      })
      
      return createCorsResponse({
        success: true,
        prototype: updatedPrototype,
        urlValidation,
        message: 'Prototype updated successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating prototype:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update prototype',
        message: error.message
      }, 500)
    }
  },

  // Delete prototype
  async deletePrototype(req: Request, path: string, prototypeId: string): Promise<Response> {
    try {
      // Get current user from auth
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user owns the prototype
      const prototype = await prototypesService.getPrototypeById(prototypeId)
      if (!prototype || prototype.author_id !== user.id) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to delete this prototype'
        }, 403)
      }

      await prototypesService.deletePrototype(prototypeId)
      
      analytics.trackEvent('prototype_deleted', { prototypeId })
      
      return createCorsResponse({
        success: true,
        message: 'Prototype deleted successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error deleting prototype:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to delete prototype',
        message: error.message
      }, 500)
    }
  },

  // Like/unlike prototype
  async likePrototype(req: Request, path: string, prototypeId: string, likeData: any): Promise<Response> {
    try {
      const { action } = likeData // 'like' or 'unlike'
      
      // Get current user from auth
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      const result = await prototypesService.likePrototype(prototypeId, user.id, action)
      
      analytics.trackEvent('prototype_liked', { 
        prototypeId, 
        action,
        newLikeCount: result.likes
      })
      
      return createCorsResponse({
        success: true,
        likes: result.likes,
        message: 'Like action recorded successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error liking prototype:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to record like action',
        message: error.message
      }, 500)
    }
  },

  // Record prototype view
  async recordPrototypeView(req: Request, path: string, prototypeId: string): Promise<Response> {
    try {
      await prototypesService.incrementPrototypeViews(prototypeId)
      
      analytics.trackEvent('prototype_viewed', { prototypeId })
      
      return createCorsResponse({
        success: true,
        message: 'View recorded successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error recording prototype view:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to record view',
        message: error.message
      }, 500)
    }
  },

  // Validate prototype URL
  async validatePrototypeUrl(req: Request, path: string, prototypeId: string, urlData: any): Promise<Response> {
    try {
      const { url } = urlData
      
      const validation = await urlValidationService.validateGitHubPagesUrl(url)
      
      // Update prototype status based on validation
      if (validation.isValid) {
        await prototypesService.updatePrototype(prototypeId, { status: 'live' })
      } else {
        await prototypesService.updatePrototype(prototypeId, { status: 'development' })
      }
      
      analytics.trackEvent('prototype_url_validated', { 
        prototypeId,
        isValid: validation.isValid
      })
      
      return createCorsResponse({
        success: true,
        validation,
        message: 'URL validation completed',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error validating prototype URL:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to validate URL',
        message: error.message
      }, 500)
    }
  }
} 