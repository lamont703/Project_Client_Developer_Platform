# Waitlist Email Notification Setup

## Current Status

✅ **Backend endpoint created** at `/api/waitlist`  
✅ **Form submits to backend** successfully  
✅ **Data is logged** in Supabase dashboard

## How to View Waitlist Submissions

### Option 1: Supabase Dashboard Logs

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Edge Functions** > **api** > **Logs**
4. Look for log entries starting with "WAITLIST SIGNUP:"

### Option 2: Check Supabase Logs via CLI

```bash
cd backend/supabase
supabase functions logs api --tail
```

You'll see entries like:

```
WAITLIST SIGNUP:
New Waitlist Signup - Coding Education Program

Name: John Doe
Email: john@example.com
Experience Level: Beginner
Learning Goals: Learn to code
Preferred Schedule: Weekday Mornings
```

## Deployment

To deploy the waitlist endpoint:

```bash
cd backend/supabase
supabase functions deploy api
```

## Adding Email Notifications Later

To add actual email delivery (to info@innergcomplete.com), you can:

1. **Use SendGrid** (Free tier: 100 emails/day)

   - Sign up at https://sendgrid.com
   - Get API key
   - Add to `.env.local`
   - Update `waitlist.ts` to send emails

2. **Use Mailgun** (Free tier: 5,000 emails/month)

   - Sign up at https://mailgun.com
   - Get API key
   - Add to `.env.local`
   - Update `waitlist.ts` to send emails

3. **Use Web3Forms** (Simplest - no backend needed)
   - Already configured in frontend
   - Just update the access key

## Testing

To test locally:

1. Start the app: `npm run start`
2. Navigate to `/coding-education`
3. Fill out the waitlist form
4. Check Supabase logs for the submission

To test in production:

1. Deploy: `supabase functions deploy api`
2. Test the form on live site
3. Check Supabase dashboard logs
