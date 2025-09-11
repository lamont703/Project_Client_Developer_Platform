// GoHighLevel service for Edge Function
// Note: Using fetch instead of axios for Deno compatibility

// Base URL for GoHighLevel API
const BASE_URL = 'https://services.leadconnectorhq.com'

// Token management
let currentAccessToken = Deno.env.get('GHL_ACCESS_TOKEN')
let currentRefreshToken = Deno.env.get('GHL_REFRESH_TOKEN')
let tokenExpiryTime: number | null = null

// Define the service object with all methods
export const goHighLevelService = {
  // Helper functions
  getTokenExpiry(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  isTokenExpired(token: string | undefined): boolean {
    if (!token) return true
    const expiry = this.getTokenExpiry(token)
    if (!expiry) return true
    const bufferTime = 5 * 60 * 1000
    return Date.now() + bufferTime >= expiry
  },

  // Main service methods
  async refreshAccessToken(): Promise<string> {
    try {
      console.log('Refreshing access token...')
      
      const formData = new URLSearchParams({
        client_id: Deno.env.get('GHL_CLIENT_ID')!,
        client_secret: Deno.env.get('GHL_CLIENT_SECRET')!,
        grant_type: 'refresh_token',
        refresh_token: currentRefreshToken!
      })
  
      const response = await fetch('https://services.leadconnectorhq.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formData
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      const { access_token, refresh_token, expires_in } = data
      
      // Update tokens
      currentAccessToken = access_token
      if (refresh_token) {
        currentRefreshToken = refresh_token
      }
      
      // Calculate expiry time
      tokenExpiryTime = Date.now() + (expires_in * 1000)
      
      console.log('Token refreshed successfully')
      return access_token
      
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw new Error('Failed to refresh access token')
    }
  },

  async getValidAccessToken(): Promise<string> {
    if (this.isTokenExpired(currentAccessToken)) {
      console.log('Token expired, refreshing...')
      await this.refreshAccessToken()
    }
    return currentAccessToken!
  },

  // Enhanced function to exchange authorization code for tokens
  // Uses the same robust implementation as our successful token generator
  async exchangeCodeForTokens(code: string) {
    try {
      console.log("🔄 Exchanging authorization code for tokens...")
      
      const clientId = Deno.env.get("GHL_CLIENT_ID")
      const clientSecret = Deno.env.get("GHL_CLIENT_SECRET")
      const redirectUri = Deno.env.get("GHL_REDIRECT_URI")
      
      if (!clientId || !clientSecret || !redirectUri) {
        throw new Error("Missing required OAuth configuration")
      }
      
      if (!code) {
        throw new Error("Authorization code is required")
      }
      
      const formData = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri
      })
      
      const response = await fetch("https://services.leadconnectorhq.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("❌ OAuth token exchange failed:", errorData)
        throw new Error(`OAuth token exchange failed: ${response.status}`)
      }
      
      const tokenData = await response.json()
      const { access_token, refresh_token, expires_in } = tokenData
      
      console.log("✅ Successfully exchanged code for tokens")
      console.log(`📊 Token expires in: ${expires_in} seconds`)
      
      currentAccessToken = access_token
      if (refresh_token) {
        currentRefreshToken = refresh_token
      }
      tokenExpiryTime = Date.now() + (expires_in * 1000)
      
      return {
        success: true,
        data: tokenData,
        message: "Authorization code successfully exchanged for tokens"
      }
    } catch (error) {
      console.error("❌ Error exchanging code for tokens:", error.message)
      return {
        success: false,
        error: error.message,
        message: "Failed to exchange authorization code for tokens"
      }
    }
  },

  // Function to create an opportunity in the pipeline
  async createOpportunityInPipeline(jobData: any) {
    // First, let's get the pipeline stage name
    let pipelineStageName = "Discovery Call" // Default name
    
    try {
      const token = await this.getValidAccessToken()
      
      // Fetch pipeline stage details to get the name
      const stageResponse = await fetch(`${BASE_URL}/pipelines/${Deno.env.get('GHL_PIPELINE_ID')}/stages/${Deno.env.get('GHL_PIPELINE_STAGE_ID')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Version': '2021-07-28',
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (stageResponse.ok) {
        const stageData = await stageResponse.json()
        if (stageData && stageData.name) {
          pipelineStageName = stageData.name
          console.log('Pipeline stage name:', pipelineStageName)
        }
      }
    } catch (error) {
      console.log('Could not fetch pipeline stage name, using default:', error)
    }

    const opportunityData = {
      pipelineId: Deno.env.get('GHL_PIPELINE_ID'),
      locationId: Deno.env.get('GHL_LOCATION_ID'),
      name: jobData.title || jobData.name,
      pipelineStageId: Deno.env.get('GHL_PIPELINE_STAGE_ID'),
      status: "open",
      contactId: "X9BZelkJiMRBoBfQ2exx", // You might want to make this dynamic
      monetaryValue: jobData.salary || jobData.monetary_value || 0,
      assignedTo: ""
    }

    try {
      // Get a valid token before making the request
      const token = await this.getValidAccessToken()
      
      const response = await fetch(`${BASE_URL}/opportunities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Version': '2021-07-28',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(opportunityData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Opportunity created successfully:', data)
      return data
    } catch (error) {
      console.error('Error creating opportunity in pipeline:', error)
      throw error
    }
  },

  // Function to get current token status
  getTokenStatus() {
    return {
      hasToken: !!currentAccessToken,
      isExpired: this.isTokenExpired(currentAccessToken),
      expiresAt: tokenExpiryTime ? new Date(tokenExpiryTime).toISOString() : null,
      timeUntilExpiry: tokenExpiryTime ? Math.max(0, tokenExpiryTime - Date.now()) : null
    }
  },

  // ===== NEW TASK MANAGEMENT FUNCTIONS =====

  // Function to get all pipelines for the configured location
  async getAllPipelines(): Promise<any[]> {
    try {
      const token = await this.getValidAccessToken()
      const locationId = Deno.env.get('GHL_LOCATION_ID')
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
      
      const params = new URLSearchParams({
        locationId: locationId!
      })
      
      const response = await fetch(`${BASE_URL}/opportunities/pipelines?${params}`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Fetched ${data.pipelines?.length || 0} pipelines`)
      return data.pipelines || []
    } catch (error) {
      console.error('Error fetching pipelines:', error)
      throw error
    }
  },

  // Function to get opportunities with tasks for a specific pipeline
  async getOpportunitiesWithTasks(pipelineId: string, status: string = 'open'): Promise<any[]> {
    try {
      const token = await this.getValidAccessToken()
      const locationId = Deno.env.get('GHL_LOCATION_ID')
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
      
      const params = new URLSearchParams({
        location_id: locationId!,
        getTasks: 'true',
        pipeline_id: pipelineId,
        status: status
      })
      
      console.log(`Querying GHL API for pipeline ${pipelineId}...`)
      
      const response = await fetch(`${BASE_URL}/opportunities/search?${params}`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const opportunities = data.opportunities || []
      
      console.log(`✅ Fetched ${opportunities.length} opportunities with tasks`)
      return opportunities
    } catch (error) {
      console.error('Error fetching opportunities with tasks:', error)
      throw error
    }
  },

  // Function to update task completion status
  async updateTaskStatus(taskId: string, completed: boolean): Promise<any> {
    try {
      const token = await this.getValidAccessToken()
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
      const updateData = {
        completed: completed
      }
      
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Updated task ${taskId} status to ${completed ? 'completed' : 'incomplete'}`)
      return data
    } catch (error) {
      console.error('Error updating task status:', error)
      throw error
    }
  },

  // Function to assign task to a user
  async assignTask(taskId: string, userId: string): Promise<any> {
    try {
      const token = await this.getValidAccessToken()
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
      const updateData = {
        assignedTo: userId
      }
      
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Assigned task ${taskId} to user ${userId}`)
      return data
    } catch (error) {
      console.error('Error assigning task:', error)
      throw error
    }
  },

  // Function to update task due date
  async updateTaskDueDate(taskId: string, dueDate: string): Promise<any> {
    try {
      const token = await this.getValidAccessToken()
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      
      const updateData = {
        dueDate: dueDate
      }
      
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Updated task ${taskId} due date to ${dueDate}`)
      return data
    } catch (error) {
      console.error('Error updating task due date:', error)
      throw error
    }
  },

  // Function to get a specific task by ID
  async getTaskById(taskId: string): Promise<any> {
    try {
      const token = await this.getValidAccessToken()
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
      
      const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Fetched task ${taskId}`)
      return data
    } catch (error) {
      console.error('Error fetching task:', error)
      throw error
    }
  },

  // Function to get pipeline stages
  async getPipelineStages(pipelineId: string): Promise<any[]> {
    try {
      const token = await this.getValidAccessToken()
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
      
      const response = await fetch(`${BASE_URL}/pipelines/${pipelineId}/stages`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Fetched ${data.stages?.length || 0} stages for pipeline ${pipelineId}`)
      return data.stages || []
    } catch (error) {
      console.error('Error fetching pipeline stages:', error)
      throw error
    }
  }
}
