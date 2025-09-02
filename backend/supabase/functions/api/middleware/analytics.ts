// Analytics middleware for Edge Function
// Note: Using fetch instead of universal-analytics for Deno compatibility

// Google Analytics property ID
const GA_PROPERTY_ID = '502445924'

// Analytics service for Edge Function
export const analyticsService = {
  // Send event to Google Analytics
  async trackEvent(category: string, action: string, label?: string, value?: number) {
    try {
      const eventData = {
        v: '1', // Protocol version
        tid: GA_PROPERTY_ID, // Tracking ID
        cid: this.generateClientId(), // Client ID
        t: 'event', // Hit type
        ec: category, // Event category
        ea: action, // Event action
        el: label, // Event label
        ev: value // Event value
      }

      // Send to Google Analytics Measurement Protocol
      const response = await fetch('https://www.google-analytics.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(eventData)
      })

      if (!response.ok) {
        console.error('Analytics tracking failed:', response.status)
      }
    } catch (error) {
      console.error('Error tracking analytics event:', error)
    }
  },

  // Generate a client ID (simplified version)
  generateClientId(): string {
    // In a real implementation, you'd want to persist this
    return `edge-function-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },

  // Track page view
  async trackPageView(page: string, title?: string) {
    try {
      const eventData = {
        v: '1',
        tid: GA_PROPERTY_ID,
        cid: this.generateClientId(),
        t: 'pageview',
        dp: page, // Document path
        dt: title // Document title
      }

      const response = await fetch('https://www.google-analytics.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(eventData)
      })

      if (!response.ok) {
        console.error('Analytics pageview tracking failed:', response.status)
      }
    } catch (error) {
      console.error('Error tracking pageview:', error)
    }
  },

  // Track custom event with additional parameters
  async trackCustomEvent(eventName: string, parameters: Record<string, any> = {}) {
    try {
      const eventData = {
        v: '1',
        tid: GA_PROPERTY_ID,
        cid: this.generateClientId(),
        t: 'event',
        ec: 'Edge Function',
        ea: eventName,
        ...parameters
      }

      const response = await fetch('https://www.google-analytics.com/collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(eventData)
      })

      if (!response.ok) {
        console.error('Analytics custom event tracking failed:', response.status)
      }
    } catch (error) {
      console.error('Error tracking custom event:', error)
    }
  }
}

// Analytics middleware function
export function analyticsMiddleware(req: Request, path: string, method: string) {
  const startTime = Date.now()
  
  // Extract analytics event from headers
  const analyticsEvent = req.headers.get('x-analytics-event')
  const userAgent = req.headers.get('user-agent')
  
  if (analyticsEvent) {
    console.log(`Analytics Event: ${analyticsEvent}`, {
      path: path,
      method: method,
      userAgent: userAgent,
    })

    // Send event to Google Analytics
    analyticsService.trackEvent("Backend", analyticsEvent, path)
  }

  // Track all requests as pageviews
  analyticsService.trackPageView(path, `${method} ${path}`)

  return {
    startTime,
    trackRequest: (status: number, duration: number) => {
      analyticsService.trackCustomEvent('request_completed', {
        path: path,
        method: method,
        status: status,
        duration: duration,
        userAgent: userAgent
      })
    }
  }
} 