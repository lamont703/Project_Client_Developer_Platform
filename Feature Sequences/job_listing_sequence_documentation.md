# JobListing Sequence Diagram Documentation

## Overview

This document describes the sequence diagram for the JobListing component data flow, which displays opportunities from the GoHighLevel pipeline in a React frontend component.

## 🚨 Development Setup Requirements

### **Ngrok Tunnel Required**

For GoHighLevel webhook automation to work in development mode, you **MUST** start an ngrok tunnel to expose your local server to the internet.

**Required URL:** `https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/opportunities-update`

**Why needed:** GoHighLevel needs to send webhooks to your local development server, but GoHighLevel servers can't reach `localhost:3001` directly. Ngrok creates a public URL that forwards to your local server.

### **Quick Start Commands**

```bash
# Start your Express server first
cd backend
npm start

# In a new terminal, start ngrok tunnel
ngrok http 3001

# Verify the tunnel is working
curl https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/health
```

## Sequence Flow

### 1. Session Initialization

```
User → JobListing: Open Job Listing page
JobListing → Analytics: trackEvent('job_listing_opened')
JobListing → Local Storage: checkCachedOpportunities()
Local Storage → JobListing: cached data (if any)
```

### 2. Data Loading Process

```
JobListing → JobListing: setLoading(true)
JobListing → Backend Server: GET /api/opportunities

Backend Server → Analytics: analytics middleware (opportunities_requested)
Analytics → Backend Server: analytics processed

Backend Server → Routes: route to /api/opportunities
Routes → Controllers: getAllOpportunitiesController()
```

### 3. Database Operations

```
Controllers → Database: getAllOpportunities()
Database → Database: SELECT * FROM ghl_opportunities ORDER BY created_at DESC
Database → Controllers: opportunities data
```

### 4. Data Processing

```
Controllers → Controllers: filterOpenOpportunities(opportunities)
Controllers → Controllers: formatOpportunitiesForFrontend()
Controllers → Routes: success response with opportunities data
Routes → Backend Server: 200 OK (opportunities data)
Backend Server → JobListing: 200 OK (opportunities data)
```

### 5. Frontend Processing

```
JobListing → JobListing: setOpportunities(data.opportunities)
JobListing → JobListing: setLoading(false)
JobListing → Local Storage: cacheOpportunities(opportunities)
JobListing → Analytics: trackEvent('opportunities_loaded')
JobListing → User: Render opportunities grid/list
```

### 6. User Interactions

#### View Opportunity Details

```
User → JobListing: Click "View Details" on opportunity
JobListing → JobListing: handleApply(opportunityId)
JobListing → Analytics: trackEvent('opportunity_viewed')
JobListing → User: Show opportunity details modal/alert
```

#### Apply to Opportunity

```
User → JobListing: Click "Apply" button
JobListing → JobListing: handleApply(opportunityId)
JobListing → Analytics: trackEvent('opportunity_application')
```

### 7. Error Handling Scenarios

#### Network Error

```
Backend Server -x JobListing: Network timeout/error
JobListing → JobListing: setError('Error fetching opportunities')
JobListing → JobListing: setLoading(false)
JobListing → User: Show error message with retry button
```

#### Database Error

```
Controllers -x Database: Database connection error
Database → Controllers: error response
Controllers → Routes: 500 Internal Server Error
Routes → Backend Server: 500 Internal Server Error
Backend Server → JobListing: 500 Internal Server Error
JobListing → JobListing: setError('Failed to fetch opportunities')
JobListing → JobListing: setLoading(false)
JobListing → User: Show error message with retry button
```

#### No Opportunities

```
Database → Controllers: empty result set
Controllers → Controllers: filterOpenOpportunities([])
Controllers → Routes: success response with empty array
Routes → Backend Server: 200 OK (empty opportunities)
Backend Server → JobListing: 200 OK (empty opportunities)
JobListing → JobListing: setOpportunities([])
JobListing → JobListing: setLoading(false)
JobListing → User: Show "No Opportunities Yet" message
```

### 8. Retry Functionality

```
User → JobListing: Click "Try Again" button
JobListing → JobListing: setError(null)
JobListing → JobListing: setLoading(true)
JobListing → JobListing: fetchOpportunities()
Note: Recursive call to initial data loading flow
```

### 9. Real-time Updates (Development Mode)

```
GoHighLevel → Ngrok Tunnel: POST https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/opportunities-update
Ngrok Tunnel → Local Server: Forward to localhost:3001/api/webhooks/ghl/opportunities-update
Local Server → Webhook Handler: POST /api/webhooks/ghl/opportunities-update
Webhook Handler → Controllers: processWebhook(webhookData)
Controllers → Database: updateOpportunity(opportunityData)
Database → Controllers: opportunity updated
Controllers → Webhook Handler: success response
Webhook Handler → Local Server: 200 OK
Local Server → Ngrok Tunnel: 200 OK
Ngrok Tunnel → GoHighLevel: 200 OK
Note: Opportunity data updated in database. Next page refresh will show updated data
```

### 9.1. Ngrok Tunnel Health Check

```
GoHighLevel → Ngrok Tunnel: GET https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/health
Ngrok Tunnel → Local Server: Forward to localhost:3001/api/webhooks/ghl/health
Local Server → Webhook Handler: GET /api/webhooks/ghl/health
Webhook Handler → Controllers: getWebhookHealth()
Controllers → Webhook Handler: health status
Webhook Handler → Local Server: 200 OK (health status)
Local Server → Ngrok Tunnel: 200 OK
Ngrok Tunnel → GoHighLevel: 200 OK
```

### 10. Data Formatting and Display

```
JobListing → JobListing: formatDate(created_at)
JobListing → JobListing: formatCurrency(monetary_value)
JobListing → JobListing: getStatusColor(status)
JobListing → User: Display formatted opportunity cards
```

### 11. Session Persistence

```
JobListing → Local Storage: saveUserState(currentState)
```

### 12. Analytics Tracking

```
JobListing → Analytics: trackUserJourney(actions)
```

## Key Components

### Frontend Components

- **JobListing**: Main React component for displaying opportunities
- **Local Storage**: Client-side caching and state persistence
- **Analytics**: Google Analytics integration for user tracking

### Backend Components

- **Backend Server**: Express.js server handling API requests
- **Routes**: API route handlers (/api/opportunities)
- **Controllers**: Business logic for opportunity management
- **Database**: Supabase database with ghl_opportunities table
- **Analytics Middleware**: Request tracking and analytics
- **Webhook Handler**: GoHighLevel webhook processing

### External Services

- **GoHighLevel**: CRM system providing opportunity data
- **Webhook Integration**: Real-time opportunity updates
- **Ngrok Tunnel**: Public URL forwarding for development webhooks

## Data Flow Architecture

### Current Architecture

```
Frontend (React) → Express.js Server → Supabase Database
                ↓
            GoHighLevel Webhooks → Ngrok Tunnel → Local Server → Database Updates
```

### Data Transformation

1. **Raw Database Data**: GoHighLevel opportunity records
2. **Backend Processing**: Filtering, formatting, and validation
3. **Frontend Display**: Formatted opportunity cards with status colors

## Error Handling Strategy

### Network Errors

- Automatic retry functionality
- User-friendly error messages
- Fallback to cached data when available

### Database Errors

- Graceful degradation
- Detailed error logging
- User notification with retry options

### Empty States

- Clear messaging when no opportunities exist
- Guidance for next steps
- Encouraging user engagement

## Development Setup Guide

### **Prerequisites**

1. **Ngrok installed** - Download from [ngrok.com](https://ngrok.com)
2. **Express server running** - Port 3001
3. **GoHighLevel webhook configured** - Pointing to ngrok URL

### **Step-by-Step Setup**

#### **1. Install Ngrok (if not already installed)**

```bash
# Download ngrok
curl -O https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-darwin-amd64.tgz
tar -xzf ngrok-v3-stable-darwin-amd64.tgz

# Move to PATH
sudo mv ngrok /usr/local/bin/

# Or install via Homebrew
brew install ngrok
```

#### **2. Start Your Express Server**

```bash
cd backend
npm start
# Server should be running on http://localhost:3001
```

#### **3. Start Ngrok Tunnel**

```bash
# In a new terminal window
ngrok http 3001

# You should see output like:
# Forwarding    https://d3200e811e3e.ngrok-free.app -> http://localhost:3001
```

#### **4. Verify Tunnel is Working**

```bash
# Test the health endpoint
curl https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/health

# Should return:
# {"success":true,"message":"Webhook handler is healthy","timestamp":"2024-01-15T..."}
```

#### **5. Configure GoHighLevel Webhook**

In your GoHighLevel dashboard:

- **Webhook URL**: `https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/opportunities-update`
- **Events**: Opportunity created, updated, deleted
- **Method**: POST

### **Troubleshooting**

#### **Ngrok Not Working**

```bash
# Check if ngrok is running
ps aux | grep ngrok

# Kill existing ngrok processes
pkill ngrok

# Start fresh
ngrok http 3001
```

#### **Webhook Not Receiving Data**

```bash
# Test webhook endpoint directly
curl -X POST https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check ngrok logs in the terminal where ngrok is running
```

#### **Port Already in Use**

```bash
# Check what's using port 3001
lsof -i :3001

# Kill the process if needed
kill -9 <PID>
```

### **Production vs Development**

| Environment     | Webhook URL                                                                 | Setup Required                |
| --------------- | --------------------------------------------------------------------------- | ----------------------------- |
| **Development** | `https://d3200e811e3e.ngrok-free.app/api/webhooks/ghl/opportunities-update` | Ngrok tunnel + Express server |
| **Production**  | `https://yourdomain.com/api/webhooks/ghl/opportunities-update`              | Deployed server only          |

## Performance Considerations

### Caching Strategy

- Local storage for opportunity data
- Reduced API calls on page refresh
- Improved user experience

### Loading States

- Skeleton loading screens
- Progressive data loading
- Optimistic UI updates

### Analytics Integration

- User journey tracking
- Opportunity interaction metrics
- Performance monitoring

## Security Considerations

### API Security

- CORS configuration
- Request validation
- Error message sanitization

### Data Privacy

- User data protection
- Secure API endpoints
- Audit logging

## Future Enhancements

### Real-time Updates

- WebSocket integration
- Live opportunity status updates
- Push notifications

### Advanced Filtering

- Status-based filtering
- Date range selection
- Search functionality

### Performance Optimization

- Pagination for large datasets
- Virtual scrolling
- Image optimization

## File Structure

```
job_listing_sequence.puml          # Sequence diagram source
job_listing_sequence.png           # Generated PNG image
job_listing_sequence_documentation.md  # This documentation
```

## Generated Files

- **job_listing_sequence.png**: Visual representation of the data flow
- **job_listing_sequence.puml**: PlantUML source code for the diagram

The sequence diagram provides a comprehensive view of how opportunity data flows from the GoHighLevel pipeline through the backend to the React frontend, including error handling, user interactions, and analytics tracking.
