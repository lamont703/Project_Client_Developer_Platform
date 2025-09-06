const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the sentiment type casting
content = content.replace(
  /sentiment: topic\.sentiment,/,
  'sentiment: topic.sentiment as "positive" | "neutral" | "negative",'
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed sentiment type casting');
