// Task Manager Database Service
// Handles all database operations for GHL Task Manager system

import { supabase, createClient } from '../databaseService.ts'

// Types for GHL Task Manager
export interface GHLCache {
  id?: string
  pipeline_id: string
  pipeline_name: string
  location_id: string
  tasks: any[]
  total_tasks: number
  incomplete_tasks: number
  completed_tasks: number
  created_at?: string
  updated_at?: string
  expires_at?: string
}

export interface GHLAnalytics {
  id?: string
  pipeline_id: string
  pipeline_name: string
  location_id: string
  task_id: string
  opportunity_id?: string
  opportunity_name?: string
  action: string
  user_id?: string
  user_email?: string
  metadata?: any
  ip_address?: string
  user_agent?: string
  created_at?: string
}

export interface GHLAssignment {
  id?: string
  task_id: string
  pipeline_id: string
  opportunity_id: string
  assigned_to_user_id?: string
  assigned_to_email?: string
  assigned_by_user_id?: string
  assigned_by_email?: string
  assignment_reason?: string
  assigned_at?: string
  unassigned_at?: string
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface GHLStatusHistory {
  id?: string
  task_id: string
  pipeline_id: string
  opportunity_id: string
  previous_status?: string
  new_status: string
  changed_by_user_id?: string
  changed_by_email?: string
  change_reason?: string
  metadata?: any
  changed_at?: string
}

export interface TaskFilters {
  pipelineId?: string
  assignee?: string
  search?: string
  status?: string
  limit?: number
}

export interface TaskAnalytics {
  total_tasks: number
  completed_tasks: number
  incomplete_tasks: number
  completion_rate: number
  avg_tasks_per_opportunity: number
  most_active_assignee: string
  oldest_incomplete_task?: string
}

class TaskManagerDatabaseService {
  private supabase: any

  constructor() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    this.supabase = createClient(supabaseUrl, supabaseServiceKey)
  }

  // Cache Management Methods
  async storeTasksCache(pipelineId: string, pipelineName: string, locationId: string, tasks: any[]): Promise<void> {
    try {
      const totalTasks = tasks.length
      const completedTasks = tasks.filter(task => task.completed === true).length
      const incompleteTasks = totalTasks - completedTasks

      const cacheData: GHLCache = {
        pipeline_id: pipelineId,
        pipeline_name: pipelineName,
        location_id: locationId,
        tasks: tasks,
        total_tasks: totalTasks,
        incomplete_tasks: incompleteTasks,
        completed_tasks: completedTasks,
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
      }

      const { error } = await this.supabase
        .from('ghl_tasks_cache')
        .upsert(cacheData, { 
          onConflict: 'pipeline_id',
          ignoreDuplicates: false 
        })

      if (error) {
        console.error('Error storing tasks cache:', error)
        throw new Error(`Failed to store tasks cache: ${error.message}`)
      }

      console.log(`✅ Tasks cache stored for pipeline ${pipelineId}`)
    } catch (error) {
      console.error('Error in storeTasksCache:', error)
      throw error
    }
  }

  async getTasksFromCache(pipelineId: string): Promise<any[] | null> {
    try {
      const { data, error } = await this.supabase
        .from('ghl_tasks_cache')
        .select('*')
        .eq('pipeline_id', pipelineId)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('Error getting tasks from cache:', error)
        return null
      }

      if (!data || data.length === 0) {
        console.log(`No fresh cache found for pipeline ${pipelineId}`)
        return null
      }

      console.log(`✅ Found fresh cache for pipeline ${pipelineId}`)
      return data[0].tasks
    } catch (error) {
      console.error('Error in getTasksFromCache:', error)
      return null
    }
  }

  async updateTaskInCache(taskId: string, updates: any): Promise<void> {
    try {
      // First, find the cache entry that contains this task
      const { data: cacheEntries, error: findError } = await this.supabase
        .from('ghl_tasks_cache')
        .select('*')
        .gt('expires_at', new Date().toISOString())

      if (findError) {
        console.error('Error finding cache entries:', findError)
        throw new Error(`Failed to find cache entries: ${findError.message}`)
      }

      // Update the task in the cache
      for (const cacheEntry of cacheEntries) {
        const tasks = cacheEntry.tasks
        const taskIndex = tasks.findIndex((task: any) => task.id === taskId)
        
        if (taskIndex !== -1) {
          // Update the task
          tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
          
          // Recalculate totals
          const totalTasks = tasks.length
          const completedTasks = tasks.filter((task: any) => task.completed === true).length
          const incompleteTasks = totalTasks - completedTasks

          const { error: updateError } = await this.supabase
            .from('ghl_tasks_cache')
            .update({
              tasks: tasks,
              total_tasks: totalTasks,
              completed_tasks: completedTasks,
              incomplete_tasks: incompleteTasks
            })
            .eq('id', cacheEntry.id)

          if (updateError) {
            console.error('Error updating cache:', updateError)
            throw new Error(`Failed to update cache: ${updateError.message}`)
          }

          console.log(`✅ Updated task ${taskId} in cache`)
          break
        }
      }
    } catch (error) {
      console.error('Error in updateTaskInCache:', error)
      throw error
    }
  }

  // Analytics Methods
  async trackTaskAction(analyticsData: GHLAnalytics): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('ghl_task_analytics')
        .insert(analyticsData)

      if (error) {
        console.error('Error tracking task action:', error)
        throw new Error(`Failed to track task action: ${error.message}`)
      }

      console.log(`✅ Tracked action: ${analyticsData.action} for task ${analyticsData.task_id}`)
    } catch (error) {
      console.error('Error in trackTaskAction:', error)
      throw error
    }
  }

  async getTaskAnalytics(pipelineId: string): Promise<TaskAnalytics> {
    try {
      // Get cached tasks for analytics
      const { data: cacheData, error: cacheError } = await this.supabase
        .from('ghl_tasks_cache')
        .select('*')
        .eq('pipeline_id', pipelineId)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)

      if (cacheError) {
        console.error('Error getting cache for analytics:', cacheError)
        throw new Error(`Failed to get cache for analytics: ${cacheError.message}`)
      }

      if (!cacheData || cacheData.length === 0) {
        return {
          total_tasks: 0,
          completed_tasks: 0,
          incomplete_tasks: 0,
          completion_rate: 0,
          avg_tasks_per_opportunity: 0,
          most_active_assignee: 'No data'
        }
      }

      const cache = cacheData[0]
      const tasks = cache.tasks

      // Calculate analytics
      const totalTasks = tasks.length
      const completedTasks = tasks.filter((task: any) => task.completed === true).length
      const incompleteTasks = totalTasks - completedTasks
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

      // Find most active assignee
      const assigneeCounts: { [key: string]: number } = {}
      tasks.forEach((task: any) => {
        if (task.assignedTo) {
          assigneeCounts[task.assignedTo] = (assigneeCounts[task.assignedTo] || 0) + 1
        }
      })

      const mostActiveAssignee = Object.keys(assigneeCounts).length > 0 
        ? Object.keys(assigneeCounts).reduce((a, b) => assigneeCounts[a] > assigneeCounts[b] ? a : b)
        : 'Unassigned'

      // Find oldest incomplete task
      const incompleteTasksWithDates = tasks
        .filter((task: any) => !task.completed && task.dueDate)
        .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

      const oldestIncompleteTask = incompleteTasksWithDates.length > 0 
        ? incompleteTasksWithDates[0].dueDate 
        : undefined

      return {
        total_tasks: totalTasks,
        completed_tasks: completedTasks,
        incomplete_tasks: incompleteTasks,
        completion_rate: completionRate,
        avg_tasks_per_opportunity: totalTasks > 0 ? Math.round(totalTasks / 1) : 0, // Simplified for now
        most_active_assignee: mostActiveAssignee,
        oldest_incomplete_task: oldestIncompleteTask
      }
    } catch (error) {
      console.error('Error in getTaskAnalytics:', error)
      throw error
    }
  }

  // Assignment Methods
  async createTaskAssignment(assignmentData: GHLAssignment): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('ghl_task_assignments')
        .insert(assignmentData)

      if (error) {
        console.error('Error creating task assignment:', error)
        throw new Error(`Failed to create task assignment: ${error.message}`)
      }

      console.log(`✅ Created assignment for task ${assignmentData.task_id}`)
    } catch (error) {
      console.error('Error in createTaskAssignment:', error)
      throw error
    }
  }

  async updateTaskAssignment(taskId: string, updates: Partial<GHLAssignment>): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('ghl_task_assignments')
        .update(updates)
        .eq('task_id', taskId)
        .eq('is_active', true)

      if (error) {
        console.error('Error updating task assignment:', error)
        throw new Error(`Failed to update task assignment: ${error.message}`)
      }

      console.log(`✅ Updated assignment for task ${taskId}`)
    } catch (error) {
      console.error('Error in updateTaskAssignment:', error)
      throw error
    }
  }

  async getTaskAssignments(pipelineId?: string, userId?: string): Promise<GHLAssignment[]> {
    try {
      let query = this.supabase
        .from('ghl_task_assignments')
        .select('*')
        .eq('is_active', true)

      if (pipelineId) {
        query = query.eq('pipeline_id', pipelineId)
      }

      if (userId) {
        query = query.eq('assigned_to_user_id', userId)
      }

      const { data, error } = await query.order('assigned_at', { ascending: false })

      if (error) {
        console.error('Error getting task assignments:', error)
        throw new Error(`Failed to get task assignments: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getTaskAssignments:', error)
      throw error
    }
  }

  // Status History Methods
  async createStatusHistory(statusData: GHLStatusHistory): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('ghl_task_status_history')
        .insert(statusData)

      if (error) {
        console.error('Error creating status history:', error)
        throw new Error(`Failed to create status history: ${error.message}`)
      }

      console.log(`✅ Created status history for task ${statusData.task_id}`)
    } catch (error) {
      console.error('Error in createStatusHistory:', error)
      throw error
    }
  }

  async getTaskStatusHistory(taskId: string): Promise<GHLStatusHistory[]> {
    try {
      const { data, error } = await this.supabase
        .from('ghl_task_status_history')
        .select('*')
        .eq('task_id', taskId)
        .order('changed_at', { ascending: false })

      if (error) {
        console.error('Error getting task status history:', error)
        throw new Error(`Failed to get task status history: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getTaskStatusHistory:', error)
      throw error
    }
  }

  // Pipeline Cache Methods
  async storePipelineCache(locationId: string, pipelineId: string, pipelineName: string, pipelineData: any, stages: any[]): Promise<void> {
    try {
      const cacheData = {
        location_id: locationId,
        pipeline_id: pipelineId,
        pipeline_name: pipelineName,
        pipeline_data: pipelineData,
        stages: stages,
        is_active: true,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
      }

      const { error } = await this.supabase
        .from('ghl_pipeline_cache')
        .upsert(cacheData, { 
          onConflict: 'pipeline_id',
          ignoreDuplicates: false 
        })

      if (error) {
        console.error('Error storing pipeline cache:', error)
        throw new Error(`Failed to store pipeline cache: ${error.message}`)
      }

      console.log(`✅ Pipeline cache stored for ${pipelineName}`)
    } catch (error) {
      console.error('Error in storePipelineCache:', error)
      throw error
    }
  }

  async getPipelineCache(locationId: string): Promise<any[] | null> {
    try {
      const { data, error } = await this.supabase
        .from('ghl_pipeline_cache')
        .select('*')
        .eq('location_id', locationId)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error getting pipeline cache:', error)
        return null
      }

      if (!data || data.length === 0) {
        console.log(`No fresh pipeline cache found for location ${locationId}`)
        return null
      }

      console.log(`✅ Found fresh pipeline cache for location ${locationId}`)
      return data
    } catch (error) {
      console.error('Error in getPipelineCache:', error)
      return null
    }
  }

  // Utility Methods
  async cleanupExpiredCache(): Promise<number> {
    try {
      const { error } = await this.supabase.rpc('cleanup_expired_ghl_cache')
      
      if (error) {
        console.error('Error cleaning up expired cache:', error)
        throw new Error(`Failed to cleanup expired cache: ${error.message}`)
      }

      console.log('✅ Cleaned up expired cache entries')
      return 0 // Function returns count, but we'll simplify for now
    } catch (error) {
      console.error('Error in cleanupExpiredCache:', error)
      throw error
    }
  }

  async getPipelineTaskStats(pipelineId: string): Promise<TaskAnalytics> {
    try {
      const { data, error } = await this.supabase.rpc('get_pipeline_task_stats', {
        pipeline_id_param: pipelineId
      })

      if (error) {
        console.error('Error getting pipeline task stats:', error)
        throw new Error(`Failed to get pipeline task stats: ${error.message}`)
      }

      return data && data.length > 0 ? data[0] : {
        total_tasks: 0,
        completed_tasks: 0,
        incomplete_tasks: 0,
        completion_rate: 0,
        avg_tasks_per_opportunity: 0,
        most_active_assignee: 'No data',
        oldest_incomplete_task: undefined
      }
    } catch (error) {
      console.error('Error in getPipelineTaskStats:', error)
      throw error
    }
  }

  async getUserTaskActivity(userId: string, daysBack: number = 30): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc('get_user_task_activity', {
        user_id_param: userId,
        days_back: daysBack
      })

      if (error) {
        console.error('Error getting user task activity:', error)
        throw new Error(`Failed to get user task activity: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getUserTaskActivity:', error)
      throw error
    }
  }
}

export const taskManagerDatabaseService = new TaskManagerDatabaseService()
