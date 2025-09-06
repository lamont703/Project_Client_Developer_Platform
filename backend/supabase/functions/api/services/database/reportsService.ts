// Reports Database Service
// Handles all reports-related database operations

import { supabase } from '../databaseService.ts'

export const reportsService = {
  // Get all reports with filters
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

  // Get report by ID
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

  // Create new report
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

  // Update report
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

  // Delete report
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

  // Get pending reports
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

  // Resolve report
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

  // Check if content exists
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

  // Get report by user and content
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
  }
}
