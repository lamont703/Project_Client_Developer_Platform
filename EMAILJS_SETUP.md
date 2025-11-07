# Email Service Setup Instructions for Waitlist Notifications

This project uses **FormSubmit** to send email notifications when users sign up for the waitlist.

## ✅ Simple Setup - No Configuration Needed!

**FormSubmit** is already configured and working out of the box. No API keys, no service IDs, no registration required.

- **Free tier:** Unlimited submissions (with captcha)
- **No registration required**
- **No API keys needed**
- **Emails sent to:** info@innergcomplete.com

## How It Works

The waitlist form automatically sends emails using FormSubmit's free service. Just fill out the form and you'll receive an email notification at info@innergcomplete.com.

---

## Alternative: Using EmailJS (More Control)

If you prefer more control and want to use EmailJS instead, follow these steps:

### Setup Steps

### 1. Create a Free EmailJS Account

- Go to https://www.emailjs.com/
- Sign up for a free account
- Free tier includes 200 emails per month

### 2. Add an Email Service

- In your EmailJS dashboard, go to **Email Services**
- Click **Add New Service**
- Choose your email provider (Gmail, Outlook, etc.)
- Connect your email account
- Note your **Service ID**

### 3. Create an Email Template

- Go to **Email Templates**
- Click **Create New Template**
- Use this template:

**Template Name:** Waitlist Notification

**Subject:** New Waitlist Signup - Coding Education Program

**Content:**

```
New waitlist signup received!

Name: {{from_name}}
Email: {{from_email}}
Experience Level: {{experience_level}}
Learning Goals: {{learning_goals}}
Preferred Schedule: {{preferred_schedule}}

Please follow up with this potential student.

---
This email was sent from the XRBlockDev Services website.
```

**To Email:** info@innergcomplete.com
**From Name:** Waitlist Bot

- Click **Save**

### 4. Get Your Public Key

- Go to **Account** > **General**
- Copy your **Public Key**

### 5. Update the Configuration

Edit `frontend/src/utils/emailService.ts` and replace:

```typescript
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
```

With your actual credentials from steps 2, 3, and 4.

### 6. Test It

- Start your development server
- Fill out the waitlist form
- Check your email at info@innergcomplete.com

## Email Template Parameters

The form sends these parameters:

- `from_name` - User's full name
- `from_email` - User's email address
- `experience_level` - User's experience level
- `learning_goals` - User's learning goals
- `preferred_schedule` - User's preferred schedule

---

## Troubleshooting

### FormSubmit Issues

**Emails not arriving?**

1. Check your spam folder at info@innergcomplete.com
2. Verify the email address is correct
3. FormSubmit may show a verification page on first submission - that's normal
4. Check browser console for errors

**Rate limiting?**

- FormSubmit free tier has rate limits
- Consider upgrading to premium ($9/mo for 3000 submissions/month) if needed

### EmailJS Configuration Issues

If you're using EmailJS instead:

**Emails not sending**

1. Check that your credentials are correct in `emailService.ts`
2. Verify your email service is connected in EmailJS dashboard
3. Check EmailJS dashboard for error logs
4. Make sure you're using the correct template ID

**Email delivery delays**

- Free tier may have slight delays
- Check spam folder
- EmailJS typically delivers within 1-2 minutes

### Free Tier Limits

- **FormSubmit:** Unlimited (with captcha on first submission)
- **EmailJS:** 200 emails per month
- No credit card required for either

## Production Deployment

**Current Setup (FormSubmit):**

- ✅ No configuration needed - works automatically!
- Deploy to production and test the form
- Check your email at info@innergcomplete.com

**Alternative (EmailJS):**
After deploying to production with EmailJS:

1. Update the credentials in `emailService.ts`
2. Test the form on the live site
3. Monitor EmailJS dashboard for successful sends

## Current Configuration

- **Service:** FormSubmit (Automatic)
- **Endpoint:** https://formsubmit.co/info@innergcomplete.com
- **Destination Email:** info@innergcomplete.com
- **No API keys required** ✅
- **No service IDs required** ✅
- **No registration required** ✅
