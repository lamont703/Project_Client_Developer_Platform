# Frontend API Configuration Update

## Overview

Updated the frontend to use production Supabase Edge Function endpoints instead of localhost development URLs.

## 🎯 **Production API URL**

```
https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api
```

## 📁 **Files Updated**

### 1. **New API Configuration** (`frontend/src/utils/apiConfig.ts`)

- Centralized API configuration
- Environment-based URL switching
- Reusable API service class
- Error handling and logging

### 2. **Updated Components**

- `frontend/src/components/JobListing.tsx` - Updated to use ApiService
- `frontend/src/components/PostJobWizard.tsx` - Updated to use ApiService

## 🔧 **Configuration Details**

### **API Configuration Object**

```typescript
export const API_CONFIG = {
  // Production Supabase Edge Function URL
  PRODUCTION_URL: "https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api",

  // Development URL (for local testing)
  DEVELOPMENT_URL: "http://localhost:3001/api",

  // Current environment - change this to 'production' when deploying
  ENVIRONMENT: "production" as "development" | "production",

  // Get the base URL based on environment
  getBaseUrl(): string {
    return this.ENVIRONMENT === "production"
      ? this.PRODUCTION_URL
      : this.DEVELOPMENT_URL;
  },

  // API Endpoints
  ENDPOINTS: {
    HEALTH: "/health",
    OPPORTUNITIES: "/opportunities",
    JOBS: "/jobs",
    WEBHOOKS: "/webhooks",
    OAUTH: "/oauth",
    TOKENS: "/tokens",
  },
};
```

### **API Service Class**

```typescript
export class ApiService {
  // Get opportunities
  static async getOpportunities(): Promise<any> {
    return this.makeRequest(
      API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.OPPORTUNITIES)
    );
  }

  // Create job
  static async createJob(jobData: any): Promise<any> {
    return this.makeRequest(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.JOBS), {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }
}
```

## 🔄 **Migration Changes**

### **Before (Localhost)**

```typescript
const response = await fetch("http://localhost:3001/api/opportunities");
const data = await response.json();
```

### **After (Production)**

```typescript
const data = await ApiService.getOpportunities();
```

## ✅ **Benefits**

1. **Environment Switching** - Easy to switch between development and production
2. **Centralized Configuration** - All API URLs in one place
3. **Error Handling** - Consistent error handling across all API calls
4. **Type Safety** - TypeScript support for better development experience
5. **Maintainability** - Easy to update URLs or add new endpoints

## 🚀 **Deployment**

### **For Production**

- Set `ENVIRONMENT: 'production'` in `apiConfig.ts`
- Deploy using `npm run build:ghl`
- Copy `ghl-bundle.html` to GoHighLevel

### **For Development**

- Set `ENVIRONMENT: 'development'` in `apiConfig.ts`
- Run `npm start` for local development

## 🔍 **Testing**

### **Health Check**

```bash
curl https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api/health
```

### **Opportunities Endpoint**

```bash
curl https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api/opportunities
```

## 📊 **Current Status**

- ✅ **API Configuration** - Created and configured
- ✅ **JobListing Component** - Updated to use ApiService
- ✅ **PostJobWizard Component** - Updated to use ApiService
- ✅ **Production Build** - Successfully built and tested
- ✅ **Error Handling** - Implemented consistent error handling

## 🔮 **Future Enhancements**

### **Planned Features**

- **Authentication** - Add JWT token handling
- **Rate Limiting** - Implement request throttling
- **Caching** - Add response caching
- **Retry Logic** - Automatic retry on failures
- **Request Interceptors** - Add request/response logging

### **Monitoring**

- **Request Logging** - Track all API calls
- **Error Tracking** - Monitor API failures
- **Performance Metrics** - Track response times
- **Usage Analytics** - Monitor API usage patterns

## 🚨 **Rollback Plan**

If issues arise with the production API:

1. **Change Environment** - Set `ENVIRONMENT: 'development'` in `apiConfig.ts`
2. **Rebuild** - Run `npm run build:ghl`
3. **Deploy** - Use the new bundle with localhost endpoints
4. **Debug** - Check Supabase Edge Function logs

The frontend is now configured to use your production Supabase Edge Function API endpoints!
