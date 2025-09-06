// Questions Database Service
// Handles all questions-related database operations

import { supabase } from '../databaseService.ts'

export const questionsService = {
  // Get all questions with filters
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

  // Get question by ID
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

  // Create new question
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

  // Update question
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

  // Delete question
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

  // Increment question views
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

  // Vote on question
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

  // Create AI-generated question
  async createAIQuestion(questionData: any) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          ...questionData,
          is_ai_generated: true,
          created_at: new Date().toISOString()
        }])
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating AI question:', error)
      throw error
    }
  },

  // Get AI-generated questions
  async getAIQuestions(filters: any = {}) {
    try {
      let query = supabase
        .from('questions')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai)
        `)
        .eq('is_ai_generated', true)

      if (filters.tag) {
        query = query.contains('tags', [filters.tag])
      }

      if (filters.status) {
        query = query.eq('status', filters.status)
      }

      query = query.order('created_at', { ascending: false })

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching AI questions:', error)
      throw error
    }
  }
}
