# TokenService Documentation

## Overview

The TokenService is a centralized service for managing GoHighLevel API authentication and token refresh. It provides automatic token refresh and simplified API calls while maintaining backward compatibility with existing code.

## 🚀 Key Features

### ✅ **Automatic Token Refresh**

- Automatically refreshes tokens before they expire
- 5-minute buffer time to prevent expired token calls
- Seamless token management without manual intervention

### ✅ **Backward Compatibility**

- All existing endpoints continue to work unchanged
- Legacy functions still available for existing code
- No breaking changes to current implementation

### ✅ **Simplified API Calls**

- Clean, consistent interface for all HTTP methods
- Automatic URL construction and header management
- Built-in error handling and logging

## 📁 File Structure

```
backend/
├── services/
│   └── tokenService.js          # Main TokenService implementation
├── routes/
│   └── tokenServiceExample.js   # Example usage patterns
└── goHighLevelService.js        # Existing service (unchanged)
```

## 🔧 Usage Examples

### 1. Basic Token Management

```javascript
const { TokenService } = require("../services/tokenService");

// Get a valid token (refreshes automatically if needed)
const token = await TokenService.getToken();

// Manually refresh token
const newToken = await TokenService.refreshToken();

// Check token status
const status = TokenService.getTokenStatus();
console.log(status);
// Output: {
//   hasToken: true,
//   isExpired: false,
//   expiresAt: "2024-01-15T12:00:00.000Z",
//   timeUntilExpiry: 3600000
// }
```

### 2. Making API Calls

```javascript
// GET request
const opportunities = await TokenService.get("/opportunities/", {
  locationId: process.env.GHL_LOCATION_ID,
});

// POST request
const newOpportunity = await TokenService.post("/opportunities/", {
  name: "New Project",
  status: "open",
  monetaryValue: 5000,
});

// PUT request
const updatedOpportunity = await TokenService.put("/opportunities/123", {
  status: "qualified",
});

// DELETE request
await TokenService.delete("/opportunities/123");
```

### 3. Custom Requests

```javascript
// Make a custom authenticated request
const response = await TokenService.makeAuthenticatedRequest(
  "/custom-endpoint",
  {
    method: "PATCH",
    data: { customField: "value" },
    headers: { "Custom-Header": "value" },
  }
);
```

## 🔄 Migration Strategy

### **Phase 1: No Changes Required** ✅

Your existing endpoints continue to work exactly as before:

- `/api/jobs` - Still uses `createOpportunityInPipeline()`
- `/api/opportunities` - Still reads from database only
- `/api/webhooks` - Still receives webhooks only

### **Phase 2: Gradual Adoption** (Optional)

When you add new GoHighLevel API features, use TokenService:

```javascript
// OLD way (still works)
const { createOpportunityInPipeline } = require("../goHighLevelService");
const result = await createOpportunityInPipeline(jobData);

// NEW way (recommended for new features)
const { TokenService } = require("../services/tokenService");
const result = await TokenService.post("/opportunities/", opportunityData);
```

### **Phase 3: Enhanced Features** (Future)

Add new endpoints that leverage TokenService:

```javascript
// New endpoint: Sync opportunities from GoHighLevel
router.get("/api/opportunities/sync", async (req, res) => {
  const ghlOpportunities = await TokenService.get("/opportunities/");
  // Sync with database...
});

// New endpoint: Update opportunity status
router.put("/api/opportunities/:id/status", async (req, res) => {
  const updated = await TokenService.put(`/opportunities/${req.params.id}`, {
    status: req.body.status,
  });
  // Update database...
});
```

## 🛠️ API Reference

### **TokenService Methods**

#### `getToken()`

Get a valid access token (refreshes automatically if needed)

```javascript
const token = await TokenService.getToken();
```

#### `refreshToken()`

Manually refresh the access token

```javascript
const newToken = await TokenService.refreshToken();
```

#### `get(endpoint, params)`

Make a GET request to GoHighLevel API

```javascript
const data = await TokenService.get("/opportunities/", { locationId: "123" });
```

#### `post(endpoint, data)`

Make a POST request to GoHighLevel API

```javascript
const result = await TokenService.post("/opportunities/", opportunityData);
```

#### `put(endpoint, data)`

Make a PUT request to GoHighLevel API

```javascript
const updated = await TokenService.put("/opportunities/123", updateData);
```

#### `delete(endpoint)`

Make a DELETE request to GoHighLevel API

```javascript
await TokenService.delete("/opportunities/123");
```

#### `makeAuthenticatedRequest(url, options)`

Make a custom authenticated request

```javascript
const response = await TokenService.makeAuthenticatedRequest("/custom", {
  method: "PATCH",
  data: customData,
});
```

#### `getTokenStatus()`

Get current token status information

```javascript
const status = TokenService.getTokenStatus();
```

#### `exchangeCodeForTokens(code)`

Exchange authorization code for tokens (OAuth flow)

```javascript
const tokens = await TokenService.exchangeCodeForTokens(authCode);
```

## 🔍 Testing the TokenService

### **1. Check Token Status**

```bash
curl http://localhost:3001/api/token-status
```

### **2. Test Token Refresh**

```bash
curl -X POST http://localhost:3001/api/refresh-token
```

### **3. Test GoHighLevel API Call**

```bash
curl http://localhost:3001/api/ghl-opportunities
```

## 🚨 Error Handling

The TokenService includes comprehensive error handling:

```javascript
try {
  const opportunities = await TokenService.get("/opportunities/");
} catch (error) {
  console.error("API call failed:", error.message);
  // Handle error appropriately
}
```

### **Common Error Scenarios:**

- **Token expired**: Automatically refreshed
- **Network error**: Throws error with details
- **API error**: Includes GoHighLevel error response
- **Invalid endpoint**: Clear error message

## 📊 Benefits

### **For Developers:**

- ✅ **Simplified API calls** - No need to manage tokens manually
- ✅ **Automatic refresh** - Tokens stay valid without intervention
- ✅ **Consistent interface** - Same pattern for all HTTP methods
- ✅ **Better error handling** - Clear error messages and logging

### **For System Reliability:**

- ✅ **Reduced token errors** - Automatic refresh prevents expired tokens
- ✅ **Improved uptime** - Less manual intervention needed
- ✅ **Better monitoring** - Token status tracking and logging
- ✅ **Scalable architecture** - Easy to add new GoHighLevel features

## 🔮 Future Enhancements

### **Planned Features:**

- **Token persistence** - Save tokens to database
- **Multiple account support** - Handle multiple GoHighLevel accounts
- **Rate limiting** - Built-in API rate limit handling
- **Webhook validation** - Verify webhook signatures
- **Metrics collection** - Track API usage and performance

### **Integration Opportunities:**

- **Real-time sync** - Sync opportunities between GoHighLevel and database
- **Status updates** - Update opportunity status in real-time
- **Contact management** - Manage contacts through GoHighLevel API
- **Pipeline automation** - Automate pipeline stage transitions

## 🎯 Summary

The TokenService provides a robust, scalable foundation for GoHighLevel API integration while maintaining complete backward compatibility. You can:

1. **Continue using existing endpoints** - No changes required
2. **Gradually adopt new patterns** - Use TokenService for new features
3. **Enhance existing functionality** - Add new API capabilities easily
4. **Improve system reliability** - Automatic token management

The service is designed to grow with your needs while keeping your existing code stable and functional.
