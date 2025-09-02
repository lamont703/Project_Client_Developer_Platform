// API Configuration for Frontend
export const API_CONFIG = {
  // Production Supabase Edge Function URL
  PRODUCTION_URL: 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api',
  
  // Development URL (for local testing)
  DEVELOPMENT_URL: 'http://localhost:3001/api',
  
  // Current environment - change this to 'production' when deploying
  ENVIRONMENT: 'production' as 'development' | 'production',
  
  // Get the base URL based on environment
  getBaseUrl(): string {
    return this.ENVIRONMENT === 'production' ? this.PRODUCTION_URL : this.DEVELOPMENT_URL;
  },
  
  // API Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    OPPORTUNITIES: '/opportunities',
    JOBS: '/jobs',
    WEBHOOKS: '/webhooks',
    OAUTH: '/oauth',
    TOKENS: '/tokens'
  },
  
  // Get full URL for an endpoint
  getUrl(endpoint: string): string {
    return `${this.getBaseUrl()}${endpoint}`;
  }
};

// API Service for making requests
export class ApiService {
  private static async makeRequest(url: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.HEALTH));
  }

  // Get opportunities
  static async getOpportunities(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.OPPORTUNITIES));
  }

  // Get jobs
  static async getJobs(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS));
  }

  // Create job
  static async createJob(jobData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS), {
      method: 'POST',
      body: JSON.stringify(jobData)
    });
  }

  // Update job
  static async updateJob(id: string, jobData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.JOBS}/${id}`), {
      method: 'PUT',
      body: JSON.stringify(jobData)
    });
  }

  // Delete job
  static async deleteJob(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.JOBS}/${id}`), {
      method: 'DELETE'
    });
  }
}

// Export for use in components
export default ApiService; 