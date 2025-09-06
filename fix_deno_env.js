const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the Deno.env.toObject() issue by using a different approach
content = content.replace(
  /const envVars = Deno\.env\.toObject\(\)/,
  `const envVars = {
        GITHUB_TOKEN: Deno.env.get('GITHUB_TOKEN'),
        GITHUB_USERNAME: Deno.env.get('GITHUB_USERNAME'),
        GOOGLE_API_KEY: Deno.env.get('GOOGLE_API_KEY'),
        GHL_ACCESS_TOKEN: Deno.env.get('GHL_ACCESS_TOKEN'),
        GHL_REFRESH_TOKEN: Deno.env.get('GHL_REFRESH_TOKEN'),
        GHL_CLIENT_ID: Deno.env.get('GHL_CLIENT_ID'),
        GHL_CLIENT_SECRET: Deno.env.get('GHL_CLIENT_SECRET'),
      }`
)

// Update the all_env_vars line to work with the new structure
content = content.replace(
  /all_env_vars: Object\.keys\(envVars\)\.filter\(key => !key\.startsWith\('SUPABASE_'\)\),/,
  'all_env_vars: Object.keys(envVars).filter(key => envVars[key] !== undefined),'
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed Deno.env.toObject() issue');
