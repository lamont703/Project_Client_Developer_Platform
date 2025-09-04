# HashRouter URL Examples - Updated for Root Hosting

## New URL Format (HashRouter)

With HashRouter and root-based hosting, URLs use hash-based routing:

### Home Page

```
https://xrwebsites.io/#/
```

### Chat Page with Developer Attribution

```
https://xrwebsites.io/#/chat?ref=lamont_evans&source=email
```

### Jobs Page

```
https://xrwebsites.io/#/jobs
```

### Post Job Page

```
https://xrwebsites.io/#/post-job
```

### Developers Page

```
https://xrwebsites.io/#/developers
```

### Proto Hub Page

```
https://xrwebsites.io/#/proto-hub
```

### Developer Chat Page

```
https://xrwebsites.io/#/developer-chat
```

## Benefits of HashRouter for GoHighLevel

- ✅ **Refresh works perfectly** - No server-side routing conflicts
- ✅ **Direct URL access works** - Hash routing is client-side only
- ✅ **Developer attribution preserved** - Parameters work in both search and hash
- ✅ **Analytics tracking works** - All events still tracked
- ✅ **Browser back/forward works** - Hash changes are tracked
- ✅ **No server configuration needed** - Works with any hosting
- ✅ **No redirects on refresh** - Server always serves the same page

## Testing URLs

After deploying, test these URLs:

1. **Chat with developer attribution:**

   ```
   https://xrwebsites.io/#/chat?ref=lamont_evans&source=email
   ```

2. **Jobs page:**

   ```
   https://xrwebsites.io/#/jobs
   ```

3. **Post job page:**
   ```
   https://xrwebsites.io/#/post-job
   ```

## Refresh Test

1. Navigate to any page (e.g., `https://xrwebsites.io/#/jobs`)
2. Refresh the page (F5 or Ctrl+R)
3. Should stay on the same page without redirecting

## Developer Attribution Test

1. Visit: `https://xrwebsites.io/#/chat?ref=lamont_evans&source=email`
2. Check Google Analytics for `ai_assistant_started` event
3. Should include developer attribution data
4. Refresh the page - should maintain attribution

## Expected Behavior

- ✅ URLs should load directly without redirects
- ✅ Refresh should stay on the same page
- ✅ Developer attribution should be extracted from URL parameters
- ✅ Analytics events should include developer attribution
- ✅ All navigation should work as expected
