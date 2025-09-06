import { createCorsResponse } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'
import { validationService } from '../services/validationService.ts'
import { usersService } from '../services/database/usersService.ts'

export const userController = {
  // Get all users with optional filtering
  async getAllUsers(req: Request, path: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { searchTerm, sortBy, limit = '50', offset = '0' } = queryParams
      
      const users = await usersService.getUsers({
        searchTerm,
        sortBy: sortBy as 'reputation' | 'newest' | 'name',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })

      analytics.trackEvent('users_retrieved', { count: users.length })
      
      return createCorsResponse({
        success: true,
        users,
        count: users.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting users:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve users',
        message: error.message
      }, 500)
    }
  },

  // Get specific user profile
  async getUserById(req: Request, path: string, userId: string): Promise<Response> {
    try {
      const user = await usersService.getUserById(userId)
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'User not found'
        }, 404)
      }

      // Get user stats
      const stats = await usersService.getUserStats(userId)
      
      analytics.trackEvent('user_profile_viewed', { userId })
      
      return createCorsResponse({
        success: true,
        user: { ...user, stats },
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting user:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve user',
        message: error.message
      }, 500)
    }
  },

  // Get current user profile
  async getCurrentUser(req: Request, path: string): Promise<Response> {
    try {
      const user = await usersService.getCurrentUser()
      if (!user) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Get user stats
      const stats = await usersService.getUserStats(user.id)
      
      return createCorsResponse({
        success: true,
        user: { ...user, stats },
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting current user:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve current user',
        message: error.message
      }, 500)
    }
  },

  // Create new user
  async createUser(req: Request, path: string, userData: any): Promise<Response> {
    try {
      // Validate user data
      const validation = validationService.validateUser(userData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      // Check if user already exists
      const existingUser = await usersService.getUserByEmail(userData.email)
      if (existingUser) {
        return createCorsResponse({
          success: false,
          error: 'User with this email already exists'
        }, 409)
      }

      // Create user
      const user = await usersService.createUser(userData)

      analytics.trackEvent('user_created', { userId: user.id })
      
      return createCorsResponse({
        success: true,
        user,
        message: 'User created successfully',
        timestamp: new Date().toISOString()
      }, 201)
    } catch (error) {
      logger.error('Error creating user:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to create user',
        message: error.message
      }, 500)
    }
  },

  // Update user profile
  async updateUser(req: Request, path: string, userId: string, updateData: any): Promise<Response> {
    try {
      // Get current user from auth
      const currentUser = await usersService.getCurrentUser()
      if (!currentUser) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user can update this profile
      if (currentUser.id !== userId) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to update this user'
        }, 403)
      }

      // Validate update data
      const validation = validationService.validateUserUpdate(updateData)
      if (!validation.isValid) {
        return createCorsResponse({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        }, 400)
      }

      const updatedUser = await usersService.updateUser(userId, updateData)
      
      analytics.trackEvent('user_updated', { userId })
      
      return createCorsResponse({
        success: true,
        user: updatedUser,
        message: 'User updated successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating user:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update user',
        message: error.message
      }, 500)
    }
  },

  // Delete user
  async deleteUser(req: Request, path: string, userId: string): Promise<Response> {
    try {
      // Get current user from auth
      const currentUser = await usersService.getCurrentUser()
      if (!currentUser) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Check if user can delete this profile
      if (currentUser.id !== userId) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to delete this user'
        }, 403)
      }

      await usersService.deleteUser(userId)
      
      analytics.trackEvent('user_deleted', { userId })
      
      return createCorsResponse({
        success: true,
        message: 'User deleted successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error deleting user:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to delete user',
        message: error.message
      }, 500)
    }
  },

  // Get user's questions
  async getUserQuestions(req: Request, path: string, userId: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { sortBy = 'newest', limit = '20', offset = '0' } = queryParams
      
      const questions = await databaseService.getUserQuestions(userId, {
        sortBy: sortBy as 'newest' | 'votes' | 'views',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      
      return createCorsResponse({
        success: true,
        questions,
        count: questions.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting user questions:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve user questions',
        message: error.message
      }, 500)
    }
  },

  // Get user's answers
  async getUserAnswers(req: Request, path: string, userId: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { sortBy = 'newest', limit = '20', offset = '0' } = queryParams
      
      const answers = await databaseService.getUserAnswers(userId, {
        sortBy: sortBy as 'newest' | 'votes',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      
      return createCorsResponse({
        success: true,
        answers,
        count: answers.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting user answers:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve user answers',
        message: error.message
      }, 500)
    }
  },

  // Get user's prototypes
  async getUserPrototypes(req: Request, path: string, userId: string, queryParams: Record<string, string>): Promise<Response> {
    try {
      const { sortBy = 'newest', limit = '20', offset = '0' } = queryParams
      
      const prototypes = await databaseService.getUserPrototypes(userId, {
        sortBy: sortBy as 'newest' | 'likes' | 'views',
        limit: parseInt(limit),
        offset: parseInt(offset)
      })
      
      return createCorsResponse({
        success: true,
        prototypes,
        count: prototypes.length,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error getting user prototypes:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to retrieve user prototypes',
        message: error.message
      }, 500)
    }
  },

  // Update user reputation
  async updateUserReputation(req: Request, path: string, userId: string, reputationData: any): Promise<Response> {
    try {
      const { points, reason } = reputationData
      
      // Get current user from auth
      const currentUser = await usersService.getCurrentUser()
      if (!currentUser) {
        return createCorsResponse({
          success: false,
          error: 'Authentication required'
        }, 401)
      }

      // Only allow admins or the user themselves to update reputation
      if (currentUser.id !== userId && !currentUser.isAdmin) {
        return createCorsResponse({
          success: false,
          error: 'Not authorized to update reputation'
        }, 403)
      }

      const result = await usersService.updateUserReputation(userId, points, reason)
      
      analytics.trackEvent('user_reputation_updated', { 
        userId,
        points,
        newReputation: result.reputation
      })
      
      return createCorsResponse({
        success: true,
        reputation: result.reputation,
        message: 'Reputation updated successfully',
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      logger.error('Error updating user reputation:', error)
      return createCorsResponse({
        success: false,
        error: 'Failed to update reputation',
        message: error.message
      }, 500)
    }
  }
} 