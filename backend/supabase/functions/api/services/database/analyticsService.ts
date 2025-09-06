// Analytics Database Service
// Handles all analytics-related database operations

import { supabase } from '../databaseService.ts'

export const analyticsService = {
  // Track analytics event
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

  // Get analytics events with filters
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

  // Get analytics summary
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

  // Get popular content
  async getPopularContent(filters: any = {}) {
    try {
      // This would typically get popular content based on views, likes, etc.
      // For now, return mock data
      return [
        { id: '1', title: 'Popular Question 1', type: 'question', views: 150 },
        { id: '2', title: 'Popular Prototype 1', type: 'prototype', views: 89 }
      ]
    } catch (error) {
      console.error("Error fetching popular content:", error)
      throw error
    }
  }
}
