// AI Services Database Service
// Handles all AI community member and AI-related database operations

import { supabase } from '../databaseService.ts'

export const aiServices = {
  // AI Personas methods
  async getAIPersonas(filters: any = {}) {
    try {
      let query = supabase
        .from('ai_personas')
        .select('*')

      if (filters.experienceLevel) {
        query = query.eq('experience_level', filters.experienceLevel)
      }

      if (filters.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive)
      }

      if (filters.expertise) {
        query = query.contains('expertise', [filters.expertise])
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
      console.error('Error fetching AI personas:', error)
      throw error
    }
  },

  async getAIPersonaById(personaId: string) {
    try {
      const { data, error } = await supabase
        .from('ai_personas')
        .select('*')
        .eq('id', personaId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching AI persona by ID:', error)
      throw error
    }
  },

  async createAIPersona(personaData: any) {
    try {
      const { data, error } = await supabase
        .from('ai_personas')
        .insert([personaData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating AI persona:', error)
      throw error
    }
  },

  async updateAIPersona(personaId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('ai_personas')
        .update(updateData)
        .eq('id', personaId)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating AI persona:', error)
      throw error
    }
  },

  // AI Learning Memory methods
  async getLearningMemory(userId: string, personaId: string) {
    try {
      const { data, error } = await supabase
        .from('ai_learning_memory')
        .select('*')
        .eq('user_id', userId)
        .eq('persona_id', personaId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching learning memory:', error)
      return null
    }
  },

  async updateLearningMemory(userId: string, personaId: string, memoryData: any) {
    try {
      const { data, error } = await supabase
        .from('ai_learning_memory')
        .upsert({
          user_id: userId,
          persona_id: personaId,
          ...memoryData,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating learning memory:', error)
      throw error
    }
  },

  async getUserLearningMemories(userId: string) {
    try {
      const { data, error } = await supabase
        .from('ai_learning_memory')
        .select(`
          *,
          persona:ai_personas(name, username, expertise, interests)
        `)
        .eq('user_id', userId)
        .order('last_interaction', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user learning memories:', error)
      throw error
    }
  },

  // Trending Topics methods
  async getTrendingTopics(limit: number = 10) {
    try {
      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('frequency', { ascending: false })
        .order('last_seen', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching trending topics:', error)
      throw error
    }
  },

  async upsertTrendingTopic(topicData: any) {
    try {
      const { data, error } = await supabase
        .from('trending_topics')
        .upsert({
          ...topicData,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error upserting trending topic:', error)
      throw error
    }
  },

  async deleteTrendingTopic(topicId: string) {
    try {
      const { error } = await supabase
        .from('trending_topics')
        .delete()
        .eq('id', topicId)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting trending topic:', error)
      throw error
    }
  },

  async clearTrendingTopics() {
    try {
      const { error } = await supabase
        .from('trending_topics')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error clearing trending topics:', error)
      throw error
    }
  },

  // AI Assistant Sessions methods
  async createAIAssistantSession(sessionData: any) {
    try {
      const { data, error } = await supabase
        .from('ai_assistant_sessions')
        .insert([sessionData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error creating AI assistant session:', error)
      throw error
    }
  },

  async getAIAssistantSession(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('ai_assistant_sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching AI assistant session:', error)
      throw error
    }
  },

  async updateAIAssistantSession(sessionId: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('ai_assistant_sessions')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating AI assistant session:', error)
      throw error
    }
  },

  // Enhanced Analytics methods for AI monitoring
  async trackAIEngagement(engagementData: any) {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .insert([{
          event_type: 'ai_engagement',
          ...engagementData,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error tracking AI engagement:', error)
      throw error
    }
  },

  async getAIEngagementStats(filters: any = {}) {
    try {
      let query = supabase
        .from('analytics')
        .select('*')
        .eq('event_type', 'ai_engagement')

      if (filters.personaId) {
        query = query.eq('persona_id', filters.personaId)
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

      const { data, error } = await query

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching AI engagement stats:', error)
      throw error
    }
  },

  async getCommunityTrends(period: string = '7d') {
    try {
      // Calculate date range based on period
      const now = new Date()
      let startDate: Date
      
      switch (period) {
        case '1d':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      }

      // Get trending topics
      const trendingTopics = await this.getTrendingTopics(10)
      
      // Note: This method references getQuestions which should be imported from questionsService
      // For now, we'll return mock data for questions
      const questions = [] // This should be imported from questionsService

      return {
        trendingTopics,
        totalQuestions: questions.length,
        period,
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching community trends:', error)
      throw error
    }
  },

  // Enhanced answer methods for AI responses
  async createAIAnswer(answerData: any) {
    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([{
          ...answerData,
          is_ai: true,
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
      console.error('Error creating AI answer:', error)
      throw error
    }
  },

  async getAIAnswers(filters: any = {}) {
    try {
      let query = supabase
        .from('answers')
        .select(`
          *,
          author:users(name, avatar, reputation, is_ai),
          question:questions(title, tags)
        `)
        .eq('is_ai', true)

      if (filters.personaId) {
        query = query.eq('persona_id', filters.personaId)
      }

      if (filters.confidence) {
        query = query.gte('confidence', filters.confidence)
      }

      if (filters.emotionalTone) {
        query = query.eq('emotional_tone', filters.emotionalTone)
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
      console.error('Error fetching AI answers:', error)
      throw error
    }
  },

  // Enhanced question methods for AI-generated questions
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
