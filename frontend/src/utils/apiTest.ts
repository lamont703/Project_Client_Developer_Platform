// API Test Utility
import { API_CONFIG } from './apiConfig';

export class ApiTester {
  static async testApiHealth(): Promise<{ success: boolean; details: any }> {
    try {
      console.log('🔍 Testing API Configuration...');
      console.log('Environment:', API_CONFIG.ENVIRONMENT);
      console.log('Base URL:', API_CONFIG.getBaseUrl());
      console.log('Jobs Endpoint:', API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS));
      console.log('Supabase URL:', API_CONFIG.SUPABASE_URL);
      console.log('Supabase Key:', API_CONFIG.SUPABASE_ANON_KEY ? 'Set' : 'Not Set');

      // Test the health endpoint
      const healthUrl = API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.HEALTH);
      console.log('Testing health endpoint:', healthUrl);

      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(API_CONFIG.ENVIRONMENT === 'production' && {
            'apikey': API_CONFIG.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
            'x-client-info': 'supabase-js/2.0.0'
          })
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Health check failed:', errorText);
        return {
          success: false,
          details: {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
            url: healthUrl
          }
        };
      }

      const data = await response.json();
      console.log('Health check response:', data);

      return {
        success: true,
        details: {
          status: response.status,
          data: data,
          url: healthUrl
        }
      };

    } catch (error) {
      console.error('API test failed:', error);
      return {
        success: false,
        details: {
          error: error instanceof Error ? error.message : String(error),
          url: API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.HEALTH)
        }
      };
    }
  }

  static async testJobCreation(mockJobData: any): Promise<{ success: boolean; details: any }> {
    try {
      console.log('🔍 Testing Job Creation...');
      const jobsUrl = API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS);
      console.log('Jobs endpoint:', jobsUrl);

      const response = await fetch(jobsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(API_CONFIG.ENVIRONMENT === 'production' && {
            'apikey': API_CONFIG.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
            'x-client-info': 'supabase-js/2.0.0'
          })
        },
        body: JSON.stringify(mockJobData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Job creation failed:', errorText);
        return {
          success: false,
          details: {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
            url: jobsUrl
          }
        };
      }

      const data = await response.json();
      console.log('Job creation response:', data);

      return {
        success: true,
        details: {
          status: response.status,
          data: data,
          url: jobsUrl
        }
      };

    } catch (error) {
      console.error('Job creation test failed:', error);
      return {
        success: false,
        details: {
          error: error instanceof Error ? error.message : String(error),
          url: API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS)
        }
      };
    }
  }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).ApiTester = ApiTester;
} 