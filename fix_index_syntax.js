const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the regex pattern in analyzeSentiment method
content = content.replace(
  /const words = text\.toLowerCase\(\)\.split\(\/s\+\)/,
  'const words = text.toLowerCase().split(/\\s+/)'
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed regex pattern in analyzeSentiment method');
