# Test Edge Function

This is a simple test Edge Function to help you learn about Supabase serverless functions.

## 🚀 Quick Start

### 1. Deploy the Function

```bash
cd backend
npx supabase functions deploy test-function
```

### 2. Get Your Function URL

After deployment, you'll get a URL like:

```
https://your-project-ref.supabase.co/functions/v1/test-function
```

## 🧪 Test Endpoints

### 1. Basic Test

```bash
curl https://your-project-ref.supabase.co/functions/v1/test-function/test
```

**Response:**

```json
{
  "message": "Hello from Supabase Edge Function!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "method": "GET",
  "path": "/test",
  "environment": "serverless",
  "features": [
    "Deno runtime",
    "TypeScript support",
    "Global edge locations",
    "Built-in CORS handling"
  ]
}
```

### 2. Health Check

```bash
curl https://your-project-ref.supabase.co/functions/v1/test-function/health
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": "running",
  "version": "1.0.0"
}
```

### 3. Echo Test (POST)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World", "test": true}' \
  https://your-project-ref.supabase.co/functions/v1/test-function/echo
```

**Response:**

```json
{
  "message": "Echo response",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "received": {
    "method": "POST",
    "path": "/echo",
    "body": "{\"message\": \"Hello World\", \"test\": true}",
    "headers": {
      "content-type": "application/json",
      "user-agent": "curl/7.68.0"
    }
  }
}
```

### 4. Database Test

```bash
curl https://your-project-ref.supabase.co/functions/v1/test-function/db-test
```

**Response:**

```json
{
  "message": "Database connection successful!",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "table": "users",
  "recordCount": 4,
  "sampleData": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Sarah Chen",
      "email": "sarah@example.com",
      "reputation": 320
    }
  ]
}
```

## 🔧 Local Development

### 1. Start Local Supabase

```bash
cd backend
npx supabase start
```

### 2. Serve Function Locally

```bash
npx supabase functions serve test-function
```

### 3. Test Locally

```bash
# Test basic endpoint
curl http://localhost:54321/functions/v1/test-function/test

# Test health check
curl http://localhost:54321/functions/v1/test-function/health

# Test echo
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"test": "local"}' \
  http://localhost:54321/functions/v1/test-function/echo
```

## 📊 Function Logs

### View Logs

```bash
# View function logs
npx supabase functions logs test-function

# Follow logs in real-time
npx supabase functions logs test-function --follow
```

## 🔍 What This Function Demonstrates

1. **Basic HTTP handling** - GET and POST requests
2. **CORS support** - Cross-origin requests
3. **Error handling** - Try-catch blocks
4. **Database connection** - Supabase client usage
5. **Environment variables** - Deno.env usage
6. **JSON responses** - Structured API responses
7. **Request logging** - Console.log for debugging

## 🎯 Next Steps

After testing this function:

1. **Understand the structure** - Notice how it handles different endpoints
2. **Test database connectivity** - See how it connects to Supabase
3. **Check CORS handling** - Verify it works from your frontend
4. **Review error handling** - See how errors are managed
5. **Examine logging** - Check the function logs in Supabase dashboard

## 🚨 Troubleshooting

### Common Issues:

1. **Function not found**: Make sure you deployed with the correct name
2. **Database connection failed**: Check your environment variables
3. **CORS errors**: The function includes CORS headers, but check your frontend
4. **Timeout errors**: Functions have a 10-second limit

### Useful Commands:

```bash
# Redeploy function
npx supabase functions deploy test-function

# Check function status
npx supabase functions list

# Delete function (if needed)
npx supabase functions delete test-function
```

## 📝 Notes

- This function uses **Deno runtime** (not Node.js)
- **TypeScript** is supported out of the box
- **Environment variables** are set via Supabase dashboard or CLI
- **Cold starts** may cause initial delay (normal for serverless)
- **Function logs** are available in Supabase dashboard

Happy testing! 🎉
