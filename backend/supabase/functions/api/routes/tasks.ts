// Task Routes for GHL Task Manager
import { logger } from "../utils/logger.ts"
import { taskController } from "../controllers/taskController.ts"

export async function handleTasksRoute(req: Request, path: string): Promise<Response> {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response('ok', { 
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        } 
      })
    }

    // Task Manager Status endpoint
    if (path === "/api/tasks/status" && req.method === "GET") {
      const status = await taskController.getTaskManagerStatus()
      return new Response(JSON.stringify(status), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      })
    }

    // Get All Pipelines endpoint
    if (path === "/api/tasks/pipelines" && req.method === "GET") {
      const pipelines = await taskController.getAllPipelines()
      return new Response(JSON.stringify({ pipelines }), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      })
    }

    // Get Client Software Development Opportunities endpoint
    if (path === "/api/tasks/client-software-opportunities" && req.method === "GET") {
      const url = new URL(req.url)
      const status = url.searchParams.get('status') || 'open'
      
      const opportunities = await taskController.getClientSoftwareDevelopmentOpportunities(status)
      return new Response(JSON.stringify({ 
        opportunities,
        count: opportunities.length,
        pipeline: 'Client Software Development Pipeline',
        status: status
      }), { 
        status: 200, 
        headers: { "Content-Type": "application/json" } 
      })
    }

    // Get Tasks endpoint (with filters)
    if (path.startsWith("/api/tasks") && req.method === "GET" && path !== "/api/tasks/status" && path !== "/api/tasks/pipelines" && !path.startsWith("/api/tasks/analytics")) {
      const url = new URL(req.url)
      const pipelineId = url.searchParams.get('pipelineId')
      const assignee = url.searchParams.get('assignee')
      const search = url.searchParams.get('search')
      const status = url.searchParams.get('status')
      const limit = url.searchParams.get('limit')

      const filters = {
        pipelineId: pipelineId || undefined,
        assignee: assignee || undefined,
        search: search || undefined,
        status: status || undefined,
        limit: limit ? parseInt(limit) : undefined
      }

      const result = await taskController.getTasks(filters)
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Task Analytics endpoint
    if (path.startsWith("/api/tasks/analytics") && req.method === "GET") {
      const url = new URL(req.url)
      const pipelineId = url.searchParams.get('pipelineId')

      if (!pipelineId) {
        return new Response(JSON.stringify({ error: 'pipelineId parameter is required' }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        })
      }

      const analytics = await taskController.getTaskAnalytics(pipelineId)
      return new Response(JSON.stringify({ analytics }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    }

    // Handle PUT requests for task updates
    if (req.method === 'PUT') {
      const body = await req.json()
      
      // Update task status
      if (path.includes('/status')) {
        const taskId = path.split('/')[3] // Extract taskId from path
        const { completed, userId } = body

        if (typeof completed !== 'boolean') {
          return new Response(JSON.stringify({ error: 'completed field is required and must be boolean' }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          })
        }

        const result = await taskController.updateTaskStatus(taskId, completed, userId)
        return new Response(JSON.stringify({ task: result }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      }

      // Assign task
      if (path.includes('/assign')) {
        const taskId = path.split('/')[3] // Extract taskId from path
        const { assignedTo, assignedBy } = body

        if (!assignedTo) {
          return new Response(JSON.stringify({ error: 'assignedTo field is required' }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          })
        }

        const result = await taskController.assignTask(taskId, assignedTo, assignedBy)
        return new Response(JSON.stringify({ task: result }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      }

      // Update task due date
      if (path.includes('/due-date')) {
        const taskId = path.split('/')[3] // Extract taskId from path
        const { dueDate, userId } = body

        if (!dueDate) {
          return new Response(JSON.stringify({ error: 'dueDate field is required' }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          })
        }

        const result = await taskController.updateTaskDueDate(taskId, dueDate, userId)
        return new Response(JSON.stringify({ task: result }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        })
      }
    }

    // If no route matches, return 404
    return new Response(JSON.stringify({ error: 'Task route not found' }), { 
      status: 404,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    logger.error(`Tasks route error: ${error.message}`)
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
