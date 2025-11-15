import { createCorsResponse, parseRequestBody } from '../utils/cors.ts'
import { logger, analytics } from '../utils/logger.ts'

export async function handleWaitlistRoute(req: Request, path: string): Promise<Response> {
  const startTime = Date.now()
  const method = req.method

  try {
    logger.info(`Waitlist route: ${method} ${path}`)
    analytics.trackEvent('waitlist_request', { method, path })

    // POST /api/waitlist - Submit waitlist form
    if (method === 'POST' && path === '/api/waitlist') {
      const formData = await parseRequestBody(req)
      
      logger.info('Waitlist submission received:', { name: formData.name, email: formData.email, phone: formData.phone })
      
      // Send email notification using a simple email service
      const emailBody = `
New Waitlist Signup - Coding Education Program

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Experience Level: ${formData.experience || 'Not specified'}
Learning Goals: ${formData.goals || 'Not specified'}
Preferred Schedule: ${formData.availability || 'Not specified'}

---
Sent from XRBlockDev Services website
      `.trim();

      try {
        // Try to send email via multiple methods
        // Method 1: Log to Supabase logs (viewable in dashboard)
        logger.info('WAITLIST SIGNUP:', emailBody);
        
        // You can add email service here later (SendGrid, Mailgun, etc.)
        // For now, we log it and the admin can check Supabase logs
        
      } catch (emailError) {
        logger.error('Error sending email:', emailError);
        // Continue anyway - don't fail the request
      }
      
      return createCorsResponse({
        success: true,
        message: 'Waitlist submission received successfully',
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          timestamp: new Date().toISOString()
        }
      }, 200)
    }

    // Method not allowed
    return createCorsResponse({
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['POST']
    }, 405)

  } catch (error: any) {
    logger.error('Error in waitlist route:', error)
    
    const duration = Date.now() - startTime
    analytics.trackRequest(method, path, 500, duration)
    
    return createCorsResponse({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    }, 500)
  }
}

