// Answers Database Service
// Handles all answers-related database operations

import { supabase } from '../databaseService.ts'

export const answersService = {
  // Get answers by question ID
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

  // Create new answer
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

  // Vote on answer
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

  // Update question answer count
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

  // Get all answers (with optional filters)
  async getAnswers(filters: any = {}) {
    try {
      let query = supabase
        .from('answers')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai),
          question:questions(title, tags)
        `)

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

  // Get answer by ID
  async getAnswerById(answerId: string) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai),
          question:questions(title, tags)
        `)
        .eq('id', answerId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching answer by ID:', error)
      throw error
    }
  },

  // Update answer
  async updateAnswer(answerId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .update(updateData)
        .eq('id', answerId)
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai),
          question:questions(title, tags)
        `)

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating answer:', error)
      throw error
    }
  },

  // Delete answer
  async deleteAnswer(answerId: string) {
    try {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('id', answerId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting answer:', error)
      throw error
    }
  }


}
