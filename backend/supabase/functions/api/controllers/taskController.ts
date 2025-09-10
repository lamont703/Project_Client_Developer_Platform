// Task Controller for GHL Task Manager
// Handles business logic for task management operations

import { goHighLevelService } from '../services/goHighLevelService.ts'
import { taskManagerDatabaseService } from '../services/database/taskManagerDatabaseService.ts'

export interface TaskManagerStatus {
  status: 'connected' | 'disconnected' | 'error'
  hasToken: boolean
  isExpired: boolean
  expiresAt?: string
  timeUntilExpiry?: number
  error?: string
}

export interface TaskFilters {
  pipelineId?: string
  assignee?: string
  search?: string
  status?: string
  limit?: number
}

export interface ProcessedTasks {
  tasks: any[]
  categories: { [assignee: string]: any[] }
  totalTasks: number
  completedTasks: number
  incompleteTasks: number
}

class TaskController {
  
  // Get task manager connection status
  async getTaskManagerStatus(): Promise<TaskManagerStatus> {
    try {
      const tokenStatus = goHighLevelService.getTokenStatus()
      
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        return {
          status: 'disconnected',
          hasToken: tokenStatus.hasToken,
          isExpired: tokenStatus.isExpired,
          expiresAt: tokenStatus.expiresAt || undefined,
          timeUntilExpiry: tokenStatus.timeUntilExpiry || undefined,
          error: !tokenStatus.hasToken ? 'No access token configured' : 'Access token expired'
        }
      }
      
      return {
        status: 'connected',
        hasToken: tokenStatus.hasToken,
        isExpired: tokenStatus.isExpired,
        expiresAt: tokenStatus.expiresAt || undefined,
        timeUntilExpiry: tokenStatus.timeUntilExpiry || undefined
      }
    } catch (error) {
      console.error('Error getting task manager status:', error)
      return {
        status: 'error',
        hasToken: false,
        isExpired: true,
        error: error.message
      }
    }
  }

  // Get all available pipelines
  async getAllPipelines(): Promise<any[]> {
    try {
      // Check token status first
      const tokenStatus = goHighLevelService.getTokenStatus()
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        throw new Error('GoHighLevel authentication required. Please configure access token.')
      }

      const pipelines = await goHighLevelService.getAllPipelines()
      
      // Store pipelines in cache
      const locationId = Deno.env.get('GHL_LOCATION_ID')!
      for (const pipeline of pipelines) {
        await taskManagerDatabaseService.storePipelineCache(
          locationId,
          pipeline.id,
          pipeline.name,
          pipeline,
          pipeline.stages || []
        )
      }
      
      return pipelines
    } catch (error) {
      console.error('Error getting pipelines:', error)
      
      // Provide more specific error messages
      if (error.message.includes('401')) {
        throw new Error('GoHighLevel authentication failed. Please check your access token.')
      } else if (error.message.includes('403')) {
        throw new Error('GoHighLevel access forbidden. Please check your permissions.')
      } else if (error.message.includes('404')) {
        throw new Error('GoHighLevel location not found. Please check your location ID.')
      }
      
      throw new Error(`Failed to get pipelines: ${error.message}`)
    }
  }

  // Get tasks for a specific pipeline
  async getTasks(filters: TaskFilters): Promise<ProcessedTasks> {
    try {
      const { pipelineId, status = 'open' } = filters
      
      if (!pipelineId) {
        throw new Error('Pipeline ID is required')
      }

      // Check token status first
      const tokenStatus = goHighLevelService.getTokenStatus()
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        throw new Error('GoHighLevel authentication required. Please configure access token.')
      }

      // Check cache first
      let tasks: any[] = []
      const cachedTasks = await taskManagerDatabaseService.getTasksFromCache(pipelineId)
      
      if (cachedTasks) {
        console.log('Using cached tasks')
        tasks = cachedTasks
      } else {
        console.log('Fetching fresh tasks from GHL')
        const opportunities = await goHighLevelService.getOpportunitiesWithTasks(pipelineId, status)
        
        // Extract all tasks from opportunities
        tasks = []
        for (const opportunity of opportunities) {
          if (opportunity.tasks && Array.isArray(opportunity.tasks)) {
            tasks.push(...opportunity.tasks.map((task: any) => ({
              ...task,
              opportunityId: opportunity.id,
              opportunityName: opportunity.name,
              pipelineId: pipelineId
            })))
          }
        }
        
        // Store in cache
        const pipelineName = opportunities[0]?.pipelineName || 'Unknown Pipeline'
        const locationId = Deno.env.get('GHL_LOCATION_ID')!
        await taskManagerDatabaseService.storeTasksCache(pipelineId, pipelineName, locationId, tasks)
      }

      // Process and categorize tasks
      const processedTasks = this.processTasks(tasks, filters)
      
      return processedTasks
    } catch (error) {
      console.error('Error getting tasks:', error)
      
      // Provide more specific error messages
      if (error.message.includes('401')) {
        throw new Error('GoHighLevel authentication failed. Please check your access token.')
      } else if (error.message.includes('403')) {
        throw new Error('GoHighLevel access forbidden. Please check your permissions.')
      } else if (error.message.includes('404')) {
        throw new Error('Pipeline not found. Please check your pipeline ID.')
      }
      
      throw new Error(`Failed to get tasks: ${error.message}`)
    }
  }

  // Process tasks and apply filters
  private processTasks(tasks: any[], filters: TaskFilters): ProcessedTasks {
    let filteredTasks = [...tasks]

    // Apply filters
    if (filters.assignee) {
      filteredTasks = filteredTasks.filter(task => 
        task.assignedTo && task.assignedTo.toLowerCase().includes(filters.assignee!.toLowerCase())
      )
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredTasks = filteredTasks.filter(task => 
        task.title?.toLowerCase().includes(searchTerm) ||
        task.description?.toLowerCase().includes(searchTerm) ||
        task.opportunityName?.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      if (filters.status === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed === true)
      } else if (filters.status === 'incomplete') {
        filteredTasks = filteredTasks.filter(task => task.completed !== true)
      }
    }

    // Apply limit
    if (filters.limit) {
      filteredTasks = filteredTasks.slice(0, filters.limit)
    }

    // Categorize by assignee
    const categories: { [assignee: string]: any[] } = {}
    for (const task of filteredTasks) {
      const assignee = task.assignedTo || 'Unassigned'
      if (!categories[assignee]) {
        categories[assignee] = []
      }
      categories[assignee].push(task)
    }

    // Sort tasks by due date
    filteredTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })

    const totalTasks = filteredTasks.length
    const completedTasks = filteredTasks.filter(task => task.completed === true).length
    const incompleteTasks = totalTasks - completedTasks

    return {
      tasks: filteredTasks,
      categories,
      totalTasks,
      completedTasks,
      incompleteTasks
    }
  }

  // Update task completion status
  async updateTaskStatus(taskId: string, completed: boolean, userId?: string): Promise<any> {
    try {
      // Check token status first
      const tokenStatus = goHighLevelService.getTokenStatus()
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        throw new Error('GoHighLevel authentication required. Please configure access token.')
      }

      // Update in GHL
      const updatedTask = await goHighLevelService.updateTaskStatus(taskId, completed)
      
      // Update local cache
      await taskManagerDatabaseService.updateTaskInCache(taskId, { completed })
      
      // Track analytics
      if (userId) {
        await taskManagerDatabaseService.trackTaskAction({
          pipeline_id: updatedTask.pipelineId || '',
          pipeline_name: updatedTask.pipelineName || '',
          location_id: Deno.env.get('GHL_LOCATION_ID')!,
          task_id: taskId,
          opportunity_id: updatedTask.opportunityId,
          opportunity_name: updatedTask.opportunityName,
          action: completed ? 'task_completed' : 'task_uncompleted',
          user_id: userId,
          metadata: { previous_status: !completed, new_status: completed }
        })
      }
      
      return updatedTask
    } catch (error) {
      console.error('Error updating task status:', error)
      
      // Provide more specific error messages
      if (error.message.includes('401')) {
        throw new Error('GoHighLevel authentication failed. Please check your access token.')
      } else if (error.message.includes('403')) {
        throw new Error('GoHighLevel access forbidden. Please check your permissions.')
      } else if (error.message.includes('404')) {
        throw new Error('Task not found. Please check your task ID.')
      }
      
      throw new Error(`Failed to update task status: ${error.message}`)
    }
  }

  // Assign task to user
  async assignTask(taskId: string, userId: string, assignedBy?: string): Promise<any> {
    try {
      // Check token status first
      const tokenStatus = goHighLevelService.getTokenStatus()
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        throw new Error('GoHighLevel authentication required. Please configure access token.')
      }

      // Update in GHL
      const updatedTask = await goHighLevelService.assignTask(taskId, userId)
      
      // Update local cache
      await taskManagerDatabaseService.updateTaskInCache(taskId, { assignedTo: userId })
      
      // Create assignment record
      await taskManagerDatabaseService.createTaskAssignment({
        task_id: taskId,
        pipeline_id: updatedTask.pipelineId || '',
        opportunity_id: updatedTask.opportunityId || '',
        assigned_to_user_id: userId,
        assigned_by_user_id: assignedBy,
        is_active: true
      })
      
      // Track analytics
      await taskManagerDatabaseService.trackTaskAction({
        pipeline_id: updatedTask.pipelineId || '',
        pipeline_name: updatedTask.pipelineName || '',
        location_id: Deno.env.get('GHL_LOCATION_ID')!,
        task_id: taskId,
        opportunity_id: updatedTask.opportunityId,
        opportunity_name: updatedTask.opportunityName,
        action: 'task_assigned',
        user_id: assignedBy,
        metadata: { assigned_to: userId }
      })
      
      return updatedTask
    } catch (error) {
      console.error('Error assigning task:', error)
      
      // Provide more specific error messages
      if (error.message.includes('401')) {
        throw new Error('GoHighLevel authentication failed. Please check your access token.')
      } else if (error.message.includes('403')) {
        throw new Error('GoHighLevel access forbidden. Please check your permissions.')
      } else if (error.message.includes('404')) {
        throw new Error('Task not found. Please check your task ID.')
      }
      
      throw new Error(`Failed to assign task: ${error.message}`)
    }
  }

  // Update task due date
  async updateTaskDueDate(taskId: string, dueDate: string, userId?: string): Promise<any> {
    try {
      // Check token status first
      const tokenStatus = goHighLevelService.getTokenStatus()
      if (!tokenStatus.hasToken || tokenStatus.isExpired) {
        throw new Error('GoHighLevel authentication required. Please configure access token.')
      }

      // Update in GHL
      const updatedTask = await goHighLevelService.updateTaskDueDate(taskId, dueDate)
      
      // Update local cache
      await taskManagerDatabaseService.updateTaskInCache(taskId, { dueDate })
      
      // Track analytics
      if (userId) {
        await taskManagerDatabaseService.trackTaskAction({
          pipeline_id: updatedTask.pipelineId || '',
          pipeline_name: updatedTask.pipelineName || '',
          location_id: Deno.env.get('GHL_LOCATION_ID')!,
          task_id: taskId,
          opportunity_id: updatedTask.opportunityId,
          opportunity_name: updatedTask.opportunityName,
          action: 'task_due_date_updated',
          user_id: userId,
          metadata: { new_due_date: dueDate }
        })
      }
      
      return updatedTask
    } catch (error) {
      console.error('Error updating task due date:', error)
      
      // Provide more specific error messages
      if (error.message.includes('401')) {
        throw new Error('GoHighLevel authentication failed. Please check your access token.')
      } else if (error.message.includes('403')) {
        throw new Error('GoHighLevel access forbidden. Please check your permissions.')
      } else if (error.message.includes('404')) {
        throw new Error('Task not found. Please check your task ID.')
      }
      
      throw new Error(`Failed to update task due date: ${error.message}`)
    }
  }

  // Get task analytics
  async getTaskAnalytics(pipelineId: string): Promise<any> {
    try {
      const analytics = await taskManagerDatabaseService.getTaskAnalytics(pipelineId)
      return analytics
    } catch (error) {
      console.error('Error getting task analytics:', error)
      throw new Error(`Failed to get task analytics: ${error.message}`)
    }
  }
}

export const taskController = new TaskController()
