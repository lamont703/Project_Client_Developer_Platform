const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add missing closing brace after the GHL status endpoint
content = content.replace(
  /}\s*\/\/ Test trending topics endpoint/,
  '}\n\n    // Test trending topics endpoint'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed missing closing brace');
