// Monitoring Stats Database Service
// Handles all monitoring statistics database operations

import { supabase } from '../databaseService.ts'

export const monitoringStatsService = {
  // Get current monitoring stats
  async getStats() {
    try {
      const { data, error } = await supabase
        .from('monitoring_stats')
        .select('*')
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .single()

      if (error) {
        throw error
      }

      return data || {
        total_engagements: 0,
        successful_engagements: 0,
        failed_engagements: 0,
        active_personas: 0,
        last_engagement: null,
        community_health: 0.0
      }
    } catch (error) {
      console.error('Error fetching monitoring stats:', error)
      throw error
    }
  },

  // Update monitoring stats
  async updateStats(updates: {
    total_engagements?: number
    successful_engagements?: number
    failed_engagements?: number
    active_personas?: number
    last_engagement?: Date | null
    community_health?: number
  }) {
    try {
      const { data, error } = await supabase
        .from('monitoring_stats')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating monitoring stats:', error)
      throw error
    }
  },

  // Increment engagement counters
  async incrementEngagements(type: 'total' | 'successful' | 'failed', count: number = 1) {
    try {
      const field = `${type}_engagements`
      const { data, error } = await supabase
        .from('monitoring_stats')
        .update({
          [field]: supabase.raw(`${field} + ${count}`),
          updated_at: new Date().toISOString()
        })
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error(`Error incrementing ${type} engagements:`, error)
      throw error
    }
  },

  // Update last engagement timestamp
  async updateLastEngagement() {
    try {
      const { data, error } = await supabase
        .from('monitoring_stats')
        .update({
          last_engagement: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating last engagement:', error)
      throw error
    }
  },

  // Update community health score
  async updateCommunityHealth(health: number) {
    try {
      const { data, error } = await supabase
        .from('monitoring_stats')
        .update({
          community_health: health,
          updated_at: new Date().toISOString()
        })
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error updating community health:', error)
      throw error
    }
  },

  // Reset all stats (for testing purposes)
  async resetStats() {
    try {
      const { data, error } = await supabase
        .from('monitoring_stats')
        .update({
          total_engagements: 0,
          successful_engagements: 0,
          failed_engagements: 0,
          active_personas: 0,
          last_engagement: null,
          community_health: 0.0,
          updated_at: new Date().toISOString()
        })
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .select()
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error resetting monitoring stats:', error)
      throw error
    }
  }
}
