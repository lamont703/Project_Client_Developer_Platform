// API Configuration for Frontend
export const API_CONFIG = {
  // Production Supabase Edge Function URL
  PRODUCTION_URL: 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api',
  
  // Development URL (for local testing)
  DEVELOPMENT_URL: 'http://localhost:3001/api',
  
  // Current environment - change this to 'production' when deploying
  ENVIRONMENT: 'production' as 'development' | 'production',
  
  // Supabase configuration
  SUPABASE_URL: 'https://qhlzjrcidehlpmiimmfm.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k',
  
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
    TOKENS: '/tokens',
    // ProtoHub endpoints
    QUESTIONS: '/questions',
    PROTOTYPES: '/prototypes',
    USERS: '/users',
    REPORTS: '/reports',
    ANALYTICS: '/analytics'
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
      // Add better error handling for missing environment variables
      if (!API_CONFIG.SUPABASE_ANON_KEY) {
        console.warn('Supabase ANON key not configured, using mock responses');
        return {
          success: true,
          opportunities: [],
          message: 'Mock response - Supabase not configured'
        };
      }

      console.log('🔍 DEBUG: makeRequest called with URL:', url);
      console.log('🔍 DEBUG: makeRequest options:', options);

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add Supabase authentication headers for production
          ...(API_CONFIG.ENVIRONMENT === 'production' && {
            'apikey': API_CONFIG.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
            'x-client-info': 'supabase-js/2.0.0'
          }),
          ...options.headers
        },
        ...options
      });

      console.log('🔍 DEBUG: Response status:', response.status);
      console.log('🔍 DEBUG: Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔍 DEBUG: Response not ok. Status:', response.status, 'Text:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🔍 DEBUG: Response data:', data);
      return data;
    } catch (error) {
      console.error('🔍 DEBUG: makeRequest error:', error);
      console.error('API request failed:', error);
      // Return mock data instead of throwing error
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        opportunities: [],
        message: 'Mock response due to API error'
      };
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

  // ===== PROTOHUB API METHODS =====

  // Questions
  static async getQuestions(filters: any = {}): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.QUESTIONS)}?${queryParams}` : API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.QUESTIONS);
    return this.makeRequest(url);
  }

  static async getQuestionById(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${id}`));
  }

  static async createQuestion(questionData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.QUESTIONS), {
      method: 'POST',
      body: JSON.stringify(questionData)
    });
  }

  static async updateQuestion(id: string, questionData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${id}`), {
      method: 'PUT',
      body: JSON.stringify(questionData)
    });
  }

  static async deleteQuestion(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${id}`), {
      method: 'DELETE'
    });
  }

  static async voteOnQuestion(id: string, direction: 'up' | 'down'): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${id}/vote`), {
      method: 'POST',
      body: JSON.stringify({ direction })
    });
  }

  static async voteOnAnswer(questionId: string, answerId: string, direction: 'up' | 'down'): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${questionId}/answers/${answerId}/vote`), {
      method: 'POST',
      body: JSON.stringify({ direction })
    });
  }

  static async recordAnswerView(questionId: string, answerId: string): Promise<any> {
    console.log('🔍 DEBUG: ApiService.recordAnswerView called with:', { questionId, answerId });
    const url = API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${questionId}/answers/${answerId}/view`);
    console.log('🔍 DEBUG: Making request to URL:', url);
    const result = await this.makeRequest(url, {
      method: 'POST'
    });
    console.log('🔍 DEBUG: recordAnswerView result:', result);
    return result;
  }

  static async recordQuestionView(questionId: string): Promise<any> {
    console.log('🔍 DEBUG: ApiService.recordQuestionView called with:', { questionId });
    const url = API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${questionId}/view`);
    console.log('🔍 DEBUG: Making request to URL:', url);
    const result = await this.makeRequest(url, {
      method: 'POST'
    });
    console.log('🔍 DEBUG: recordQuestionView result:', result);
    return result;
  }

  static async getQuestionAnswers(questionId: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${questionId}/answers`));
  }

  static async addAnswer(questionId: string, answerData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.QUESTIONS}/${questionId}/answers`), {
      method: 'POST',
      body: JSON.stringify(answerData)
    });
  }

  // Prototypes
  static async getPrototypes(filters: any = {}): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.PROTOTYPES)}?${queryParams}` : API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.PROTOTYPES);
    return this.makeRequest(url);
  }

  static async getPrototypeById(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.PROTOTYPES}/${id}`));
  }

  static async createPrototype(prototypeData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.PROTOTYPES), {
      method: 'POST',
      body: JSON.stringify(prototypeData)
    });
  }

  static async updatePrototype(id: string, prototypeData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.PROTOTYPES}/${id}`), {
      method: 'PUT',
      body: JSON.stringify(prototypeData)
    });
  }

  static async deletePrototype(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.PROTOTYPES}/${id}`), {
      method: 'DELETE'
    });
  }

  static async likePrototype(id: string, action: 'like' | 'unlike'): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.PROTOTYPES}/${id}/like`), {
      method: 'POST',
      body: JSON.stringify({ action })
    });
  }

  static async validateUrl(url: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.PROTOTYPES}/validate-url`), {
      method: 'POST',
      body: JSON.stringify({ url })
    });
  }

  // Users
  static async getUsers(filters: any = {}): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.USERS)}?${queryParams}` : API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.USERS);
    return this.makeRequest(url);
  }

  static async getUserById(id: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/${id}`));
  }

  static async getCurrentUser(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/me`));
  }

  static async updateUser(id: string, userData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/${id}`), {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  static async getUserQuestions(userId: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/questions`));
  }

  static async getUserAnswers(userId: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/answers`));
  }

  static async getUserPrototypes(userId: string): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.USERS}/${userId}/prototypes`));
  }

  // Reports
  static async createReport(reportData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.REPORTS), {
      method: 'POST',
      body: JSON.stringify(reportData)
    });
  }

  static async getReports(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.REPORTS));
  }

  static async getPendingReports(): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(`${API_CONFIG.ENDPOINTS.REPORTS}/pending`));
  }

  // Analytics
  static async trackEvent(eventData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ANALYTICS), {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  static async getAnalyticsEvents(filters: any = {}): Promise<any> {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ANALYTICS)}?${queryParams}` : API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.ANALYTICS);
    return this.makeRequest(url);
  }
}

// Export for use in components
export default ApiService; 