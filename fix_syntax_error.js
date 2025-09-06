const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the missing closing brace before the trending topics endpoint
content = content.replace(
  /}\s*\/\/ Test trending topics endpoint/,
  '}\n\n    // Test trending topics endpoint'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed syntax error - added missing closing brace');
