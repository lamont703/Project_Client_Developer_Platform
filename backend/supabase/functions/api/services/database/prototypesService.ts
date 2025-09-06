// Prototypes Database Service
// Handles all prototypes-related database operations

import { supabase } from '../databaseService.ts'

export const prototypesService = {
  // Get all prototypes with filters
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

  // Get prototype by ID
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

  // Create new prototype
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

  // Update prototype
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

  // Delete prototype
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

  // Increment prototype views
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

  // Like/unlike prototype
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

  // Get user's prototypes
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
  }
}
