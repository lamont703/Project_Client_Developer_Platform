// GoHighLevel service for Edge Function
// Note: Using fetch instead of axios for Deno compatibility

// Base URL for GoHighLevel API
const BASE_URL = 'https://services.leadconnectorhq.com'

// Token management
let currentAccessToken = Deno.env.get('GHL_ACCESS_TOKEN')
let currentRefreshToken = Deno.env.get('GHL_REFRESH_TOKEN')
let tokenExpiryTime: number | null = null

// Function to decode JWT and get expiration time
function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 // Convert to milliseconds
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

// Function to check if token is expired or will expire soon (within 5 minutes)
function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true
  
  const expiry = getTokenExpiry(token)
  if (!expiry) return true
  
  // Consider token expired if it expires within 5 minutes
  const bufferTime = 5 * 60 * 1000 // 5 minutes in milliseconds
  return Date.now() + bufferTime >= expiry
}

// Function to refresh the access token
async function refreshAccessToken(): Promise<string> {
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
}

// Function to get a valid access token (refreshes if needed)
async function getValidAccessToken(): Promise<string> {
  if (isTokenExpired(currentAccessToken)) {
    console.log('Token expired, refreshing...')
    await refreshAccessToken()
  }
  return currentAccessToken!
}

// Function to exchange authorization code for tokens
async function exchangeCodeForTokens(code: string) {
  try {
    const formData = new URLSearchParams({
      client_id: Deno.env.get('GHL_CLIENT_ID')!,
      client_secret: Deno.env.get('GHL_CLIENT_SECRET')!,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: Deno.env.get('GHL_REDIRECT_URI')!
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
    tokenExpiryTime = Date.now() + (expires_in * 1000)

    return data
  } catch (error) {
    console.error('Error exchanging code for tokens:', error)
    throw error
  }
}

// Function to create an opportunity in the pipeline
async function createOpportunityInPipeline(jobData: any) {
  // First, let's get the pipeline stage name
  let pipelineStageName = "Discovery Call" // Default name
  
  try {
    const token = await getValidAccessToken()
    
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
    const token = await getValidAccessToken()
    
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
}

// Function to get current token status
function getTokenStatus() {
  return {
    hasToken: !!currentAccessToken,
    isExpired: isTokenExpired(currentAccessToken),
    expiresAt: tokenExpiryTime ? new Date(tokenExpiryTime).toISOString() : null,
    timeUntilExpiry: tokenExpiryTime ? Math.max(0, tokenExpiryTime - Date.now()) : null
  }
}

export const goHighLevelService = {
  getValidAccessToken,
  exchangeCodeForTokens,
  createOpportunityInPipeline,
  getTokenStatus,
  refreshAccessToken
} 