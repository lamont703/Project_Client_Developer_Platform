import { analyticsService } from '../middleware/analytics.ts'

// Logger utility for Edge Function
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data || '')
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error || '')
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data || '')
  },

  debug: (message: string, data?: any) => {
    console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`, data || '')
  }
}

// Analytics tracking for Edge Function
export const analytics = {
  trackEvent: (eventName: string, data?: any) => {
    logger.info(`Analytics Event: ${eventName}`, data)
    
    // Send to Google Analytics
    analyticsService.trackCustomEvent(eventName, {
      ...data,
      timestamp: new Date().toISOString()
    })
  },

  trackRequest: (method: string, path: string, status: number, duration: number) => {
    logger.info(`Request: ${method} ${path} - ${status} (${duration}ms)`)
    
    // Send to Google Analytics
    analyticsService.trackCustomEvent('api_request', {
      method: method,
      path: path,
      status: status,
      duration: duration,
      timestamp: new Date().toISOString()
    })
  },

  trackError: (error: any, context?: any) => {
    logger.error(`Analytics Error: ${error.message}`, context)
    
    // Send to Google Analytics
    analyticsService.trackCustomEvent('api_error', {
      error: error.message,
      stack: error.stack,
      context: context,
      timestamp: new Date().toISOString()
    })
  }
} 