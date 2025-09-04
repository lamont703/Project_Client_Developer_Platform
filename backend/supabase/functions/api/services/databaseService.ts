import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create Supabase client for Edge Function
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const databaseService = {
  // Get all opportunities from database
  async getAllOpportunities() {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching opportunities:', error)
      throw error
    }
  },

  // Insert opportunity into database
  async insertOpportunity(opportunityData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .insert([opportunityData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error inserting opportunity:', error)
      throw error
    }
  },

  // Update opportunity in database
  async updateOpportunity(id: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .update(updateData)
        .eq('opportunity_id', id)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating opportunity:', error)
      throw error
    }
  },

  // Get opportunity by ID
  async getOpportunityById(id: string) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('*')
        .eq('opportunity_id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching opportunity by ID:', error)
      throw error
    }
  },

  // Delete opportunity by ID
  async deleteOpportunity(id: string) {
    try {
      const { error } = await supabase
        .from('ghl_opportunities')
        .delete()
        .eq('opportunity_id', id)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting opportunity:', error)
      throw error
    }
  },

  // Check if opportunity exists
  async opportunityExists(opportunityId: string) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('id')
        .eq('opportunity_id', opportunityId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error checking if opportunity exists:', error)
      return false
    }
  },

  // Update opportunity stage
  async updateOpportunityStage(opportunityId: string, stageData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .update(stageData)
        .eq('opportunity_id', opportunityId)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating opportunity stage:', error)
      throw error
    }
  },

  // ===== PROTOHUB DATABASE METHODS =====

  // Get current user from auth
  async getCurrentUser() {
    try {
      // This would typically get the user from the JWT token
      // For now, return a mock user for testing
      return {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Questions methods
  async getQuestions(filters: any = {}) {
    try {
      let query = supabase
        .from('questions')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,content.ilike.%${filters.searchTerm}%`)
      }

      if (filters.tag && filters.tag !== 'all') {
        query = query.contains('tags', [filters.tag])
      }

      switch (filters.sortBy) {
        case 'votes':
          query = query.order('votes', { ascending: false })
          break
        case 'views':
          query = query.order('views', { ascending: false })
          break
        case 'unanswered':
          query = query.eq('is_answered', false).order('created_at', { ascending: false })
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
      console.error('Error fetching questions:', error)
      throw error
    }
  },

  async getQuestionById(questionId: string) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('id', questionId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching question by ID:', error)
      throw error
    }
  },

  async createQuestion(questionData: any) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([questionData])
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating question:', error)
      throw error
    }
  },

  async updateQuestion(questionId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .update(updateData)
        .eq('id', questionId)
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  },

  async deleteQuestion(questionId: string) {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  },

  async incrementQuestionViews(questionId: string) {
    try {
      // First get the current views count
      const { data: currentData, error: fetchError } = await supabase
        .from('questions')
        .select('views')
        .eq('id', questionId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentViews = currentData?.views || 0
      const newViews = currentViews + 1

      // Update with the new count
      const { error } = await supabase
        .from('questions')
        .update({ views: newViews })
        .eq('id', questionId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error incrementing question views:', error)
      throw error
    }
  },

  async voteOnQuestion(questionId: string, userId: string, direction: string) {
    try {
      const increment = direction === 'up' ? 1 : -1
      
      // First get the current votes count
      const { data: currentData, error: fetchError } = await supabase
        .from('questions')
        .select('votes')
        .eq('id', questionId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentVotes = currentData?.votes || 0
      const newVotes = currentVotes + increment

      // Update with the new count
      const { data, error } = await supabase
        .from('questions')
        .update({ votes: newVotes })
        .eq('id', questionId)
        .select('votes')

      if (error) {
        throw error
      }

      return { votes: data?.[0]?.votes || 0 }
    } catch (error) {
      console.error('Error voting on question:', error)
      throw error
    }
  },

  // Answers methods
  async getAnswersByQuestionId(questionId: string, filters: any = {}) {
    try {
      let query = supabase
        .from('answers')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('question_id', questionId)

      switch (filters.sortBy) {
        case 'votes':
          query = query.order('votes', { ascending: false })
          break
        case 'oldest':
          query = query.order('created_at', { ascending: true })
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
      console.error('Error fetching answers:', error)
      throw error
    }
  },

  async createAnswer(answerData: any) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([answerData])
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating answer:', error)
      throw error
    }
  },

  async voteOnAnswer(answerId: string, userId: string, direction: string) {
    try {
      const increment = direction === 'up' ? 1 : -1
      
      // First get the current votes count
      const { data: currentData, error: fetchError } = await supabase
        .from('answers')
        .select('votes')
        .eq('id', answerId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentVotes = currentData?.votes || 0
      const newVotes = currentVotes + increment

      // Update with the new count
      const { data, error } = await supabase
        .from('answers')
        .update({ votes: newVotes })
        .eq('id', answerId)
        .select('votes')

      if (error) {
        throw error
      }

      return { votes: data?.[0]?.votes || 0 }
    } catch (error) {
      console.error('Error voting on answer:', error)
      throw error
    }
  },

  async incrementQuestionViews(questionId: string) {
    console.log('🔍 DEBUG: incrementQuestionViews called for questionId:', questionId)
    try {
      // First get the current views count
      console.log('🔍 DEBUG: Fetching current views count for questionId:', questionId)
      const { data: currentData, error: fetchError } = await supabase
        .from('questions')
        .select('views')
        .eq('id', questionId)
        .single()

      if (fetchError) {
        console.error('🔍 DEBUG: Error fetching current views:', fetchError)
        throw fetchError
      }

      const currentViews = currentData?.views || 0
      const newViews = currentViews + 1
      console.log('🔍 DEBUG: Current views:', currentViews, 'New views:', newViews)

      // Update with the new count
      console.log('🔍 DEBUG: Updating views in database')
      const { data, error } = await supabase
        .from('questions')
        .update({ views: newViews })
        .eq('id', questionId)
        .select('views')

      if (error) {
        console.error('🔍 DEBUG: Error updating views:', error)
        throw error
      }

      const updatedViews = data?.[0]?.views || 0
      console.log('🔍 DEBUG: Views updated successfully. New count:', updatedViews)
      return { views: updatedViews }
    } catch (error) {
      console.error('🔍 DEBUG: Error in incrementQuestionViews:', error)
      console.error('Error incrementing question views:', error)
      throw error
    }
  },

  async updateQuestionAnswerCount(questionId: string) {
    try {
      // First get the current answers count
      const { data: currentData, error: fetchError } = await supabase
        .from('questions')
        .select('answers_count')
        .eq('id', questionId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentAnswersCount = currentData?.answers_count || 0
      const newAnswersCount = currentAnswersCount + 1

      // Update with the new count
      const { error } = await supabase
        .from('questions')
        .update({ 
          answers_count: newAnswersCount,
          is_answered: true
        })
        .eq('id', questionId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error updating question answer count:', error)
      throw error
    }
  },

  // Prototypes methods
  async getPrototypes(filters: any = {}) {
    try {
      let query = supabase
        .from('prototypes')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`)
      }

      if (filters.tag) {
        query = query.contains('tags', [filters.tag])
      }

      if (filters.technology) {
        query = query.contains('technologies', [filters.technology])
      }

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      switch (filters.sortBy) {
        case 'likes':
          query = query.order('likes', { ascending: false })
          break
        case 'views':
          query = query.order('views', { ascending: false })
          break
        case 'featured':
          query = query.eq('is_featured', true).order('created_at', { ascending: false })
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
      console.error('Error fetching prototypes:', error)
      throw error
    }
  },

  async getPrototypeById(prototypeId: string) {
    try {
      const { data, error } = await supabase
        .from('prototypes')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('id', prototypeId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching prototype by ID:', error)
      throw error
    }
  },

  async createPrototype(prototypeData: any) {
    try {
      const { data, error } = await supabase
        .from('prototypes')
        .insert([prototypeData])
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating prototype:', error)
      throw error
    }
  },

  async updatePrototype(prototypeId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('prototypes')
        .update(updateData)
        .eq('id', prototypeId)
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating prototype:', error)
      throw error
    }
  },

  async deletePrototype(prototypeId: string) {
    try {
      const { error } = await supabase
        .from('prototypes')
        .delete()
        .eq('id', prototypeId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting prototype:', error)
      throw error
    }
  },

  async incrementPrototypeViews(prototypeId: string) {
    try {
      // First get the current views count
      const { data: currentData, error: fetchError } = await supabase
        .from('prototypes')
        .select('views')
        .eq('id', prototypeId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentViews = currentData?.views || 0
      const newViews = currentViews + 1

      // Update with the new count
      const { error } = await supabase
        .from('prototypes')
        .update({ views: newViews })
        .eq('id', prototypeId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error incrementing prototype views:', error)
      throw error
    }
  },

  async likePrototype(prototypeId: string, userId: string, action: string) {
    try {
      const increment = action === 'like' ? 1 : -1
      
      // First get the current likes count
      const { data: currentData, error: fetchError } = await supabase
        .from('prototypes')
        .select('likes')
        .eq('id', prototypeId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentLikes = currentData?.likes || 0
      const newLikes = currentLikes + increment

      // Update with the new count
      const { data, error } = await supabase
        .from('prototypes')
        .update({ likes: newLikes })
        .eq('id', prototypeId)
        .select('likes')

      if (error) {
        throw error
      }

      return { likes: data?.[0]?.likes || 0 }
    } catch (error) {
      console.error('Error liking prototype:', error)
      throw error
    }
  },

  // Users methods
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

  async getUserPrototypes(userId: string, filters: any = {}) {
    try {
      let query = supabase
        .from('prototypes')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('author_id', userId)

      switch (filters.sortBy) {
        case 'likes':
          query = query.order('likes', { ascending: false })
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
      console.error('Error fetching user prototypes:', error)
      throw error
    }
  },

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

  // Reports methods
  async getReports(filters: any = {}) {
    try {
      let query = supabase
        .from('reports')
        .select(`
          *,
          reporter:users!reporter_id(name, email),
          moderator:users!moderator_id(name, email)
        `)

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      if (filters.contentType) {
        query = query.eq('content_type', filters.contentType)
      }

      query = query.order('created_at', { ascending: false })

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
      console.error('Error fetching reports:', error)
      throw error
    }
  },

  async getReportById(reportId: string) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          reporter:users!reporter_id(name, email),
          moderator:users!moderator_id(name, email)
        `)
        .eq('id', reportId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching report by ID:', error)
      throw error
    }
  },

  async createReport(reportData: any) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .insert([reportData])
        .select(`
          *,
          reporter:users!reporter_id(name, email)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating report:', error)
      throw error
    }
  },

  async updateReport(reportId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update(updateData)
        .eq('id', reportId)
        .select(`
          *,
          reporter:users!reporter_id(name, email),
          moderator:users!moderator_id(name, email)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating report:', error)
      throw error
    }
  },

  async deleteReport(reportId: string) {
    try {
      const { error } = await supabase
        .from('reports')
        .delete()
        .eq('id', reportId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting report:', error)
      throw error
    }
  },

  async getPendingReports(filters: any = {}) {
    try {
      let query = supabase
        .from('reports')
        .select(`
          *,
          reporter:users!reporter_id(name, email)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

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
      console.error('Error fetching pending reports:', error)
      throw error
    }
  },

  async resolveReport(reportId: string, resolveData: any) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .update({
          status: 'resolved',
          ...resolveData
        })
        .eq('id', reportId)
        .select(`
          *,
          reporter:users!reporter_id(name, email),
          moderator:users!moderator_id(name, email)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error resolving report:', error)
      throw error
    }
  },

  async checkContentExists(contentType: string, contentId: string) {
    try {
      let tableName = ''
      switch (contentType) {
        case 'question':
          tableName = 'questions'
          break
        case 'answer':
          tableName = 'answers'
          break
        case 'prototype':
          tableName = 'prototypes'
          break
        case 'user':
          tableName = 'users'
          break
        default:
          return false
      }

      const { data, error } = await supabase
        .from(tableName)
        .select('id')
        .eq('id', contentId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error checking if content exists:', error)
      return false
    }
  },

  async getReportByUserAndContent(userId: string, contentType: string, contentId: string) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('reporter_id', userId)
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching report by user and content:', error)
      return null
    }
  },

  // Analytics methods
  async trackEvent(eventData: any) {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .insert([eventData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error tracking event:', error)
      throw error
    }
  },

  async getAnalyticsEvents(filters: any = {}) {
    try {
      let query = supabase
        .from('analytics')
        .select('*')

      if (filters.eventType) {
        query = query.eq('event_type', filters.eventType)
      }

      if (filters.userId) {
        query = query.eq('user_id', filters.userId)
      }

      if (filters.startDate) {
        query = query.gte('created_at', filters.startDate)
      }

      if (filters.endDate) {
        query = query.lte('created_at', filters.endDate)
      }

      query = query.order('created_at', { ascending: false })

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 100) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching analytics events:', error)
      throw error
    }
  },

  async getAnalyticsSummary(period: string) {
    try {
      // This would typically calculate summary statistics
      // For now, return mock data
      return {
        totalUsers: 150,
        totalQuestions: 45,
        totalAnswers: 120,
        totalPrototypes: 23,
        activeUsers: 25,
        period
      }
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
      throw error
    }
  },

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
  },

  async getPopularContent(filters: any = {}) {
    try {
      // This would typically get popular content based on views, likes, etc.
      // For now, return mock data
      return [
        { id: '1', title: 'Popular Question 1', type: 'question', views: 150 },
        { id: '2', title: 'Popular Prototype 1', type: 'prototype', views: 89 }
      ]
    } catch (error) {
      console.error('Error fetching popular content:', error)
      throw error
    }
  }
} 