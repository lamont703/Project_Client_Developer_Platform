// Users Database Service
// Handles all users-related database operations

import { supabase, createClient } from '../databaseService.ts'

export const usersService = {
  // Get current user from auth
  async getCurrentUser(req?: Request) {
    try {
      // Extract JWT token from request headers
      const authHeader = req?.headers.get('Authorization')
      const testUserHeader = req?.headers.get('X-Test-User')
      
      // For testing: allow switching users via X-Test-User header
      if (testUserHeader === 'ai-user') {
        return {
          id: '550e8400-e29b-41d4-a716-446655440003',
          name: 'ProtoBot',
          email: 'protobot@protohub.com',
          isAdmin: false
        }
      }
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // For testing purposes, return a default user if no auth header
        console.warn('No Authorization header found, using default user')
        return {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Sarah Chen',
          email: 'sarah@protohub.com',
          isAdmin: false
        }
      }

      const token = authHeader.replace('Bearer ', '')
      
      // Create a new Supabase client with the user's JWT token
      const supabaseWithAuth = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        {
          global: {
            headers: {
              Authorization: authHeader
            }
          }
        }
      )

      // Get the user from the JWT token
      const { data: { user }, error } = await supabaseWithAuth.auth.getUser(token)
      
      if (error || !user) {
        console.error('Error getting user from JWT:', error)
        // Fallback to default user for testing
        return {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Sarah Chen',
          email: 'sarah@protohub.com',
          isAdmin: false
        }
      }

      // Get additional user details from the users table
      const { data: userData, error: userError } = await supabaseWithAuth
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userError || !userData) {
        // Return basic user info from JWT if no database record
        return {
          id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          isAdmin: false
        }
      }

      return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isAdmin: userData.is_admin || false
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      // Fallback to default user for testing
      return {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Sarah Chen',
        email: 'sarah@protohub.com',
        isAdmin: false
      }
    }
  },

  // Get all users with filters
  async getUsers(filters: any = {}) {
    try {
      let query = supabase
        .from('users')
        .select('*')

      if (filters.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`)
      }

      switch (filters.sortBy) {
        case 'reputation':
          query = query.order('reputation', { ascending: false })
          break
        case 'name':
          query = query.order('name', { ascending: true })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  // Get user by ID
  async getUserById(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching user by ID:', error)
      throw error
    }
  },

  // Get user by email
  async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching user by email:', error)
      throw error
    }
  },

  // Create new user
  async createUser(userData: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update user
  async updateUser(userId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Delete user
  async deleteUser(userId: string) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  },

  // Get user stats
  async getUserStats(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('questions_asked, answers_provided, prototypes_shared, reputation')
        .eq('id', userId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching user stats:', error)
      throw error
    }
  },

  // Get user's questions
  async getUserQuestions(userId: string, filters: any = {}) {
    try {
      let query = supabase
        .from('questions')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('author_id', userId)

      switch (filters.sortBy) {
        case 'votes':
          query = query.order('votes', { ascending: false })
          break
        case 'views':
          query = query.order('views', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user questions:', error)
      throw error
    }
  },

  // Get user's answers
  async getUserAnswers(userId: string, filters: any = {}) {
    try {
      let query = supabase
        .from('answers')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('author_id', userId)

      switch (filters.sortBy) {
        case 'votes':
          query = query.order('votes', { ascending: false })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user answers:', error)
      throw error
    }
  },

  // Update user reputation
  async updateUserReputation(userId: string, points: number, reason: string) {
    try {
      // First get the current reputation
      const { data: currentData, error: fetchError } = await supabase
        .from('users')
        .select('reputation')
        .eq('id', userId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentReputation = currentData?.reputation || 0
      const newReputation = currentReputation + points

      // Update with the new reputation
      const { data, error } = await supabase
        .from('users')
        .update({ reputation: newReputation })
        .eq('id', userId)
        .select('reputation')

      if (error) {
        throw error
      }

      return { reputation: data?.[0]?.reputation || 0 }
    } catch (error) {
      console.error('Error updating user reputation:', error)
      throw error
    }
  },

  // Get user analytics
  async getUserAnalytics(userId: string, period: string) {
    try {
      // This would typically calculate user-specific analytics
      // For now, return mock data
      return {
        questionsAsked: 5,
        answersProvided: 12,
        prototypesShared: 2,
        reputation: 150,
        period
      }
    } catch (error) {
      console.error('Error fetching user analytics:', error)
      throw error
    }
  }
}
