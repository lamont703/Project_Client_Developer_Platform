const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/databaseService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the problematic type declarations at the top
content = content.replace(
  /\/\/ Type declarations for Deno ESM imports[\s\S]*?}\n\n/g,
  ''
)

// Remove the Deno global type declaration
content = content.replace(
  /\/\/ Deno global type[\s\S]*?}\n\n/g,
  ''
)

// Add a simple any type for the supabase client
content = content.replace(
  /import { createClient } from 'https:\/\/esm\.sh\/@supabase\/supabase-js@2\.49\.1'/,
  `// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'`
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed TypeScript errors in databaseService.ts');
