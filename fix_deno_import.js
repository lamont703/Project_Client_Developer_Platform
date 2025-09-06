const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add @ts-ignore comment before the Deno import
content = content.replace(
  /import { serve } from "https:\/\/deno\.land\/std@0\.168\.0\/http\/server\.ts"/,
  '// @ts-ignore\nimport { serve } from "https://deno.land/std@0.168.0/http/server.ts"'
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed Deno import TypeScript error');
