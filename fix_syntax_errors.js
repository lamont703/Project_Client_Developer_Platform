const fs = require('fs');

// Fix databaseService.ts - add missing closing brace
const dbPath = 'backend/supabase/functions/api/services/databaseService.ts';
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Add missing closing brace at the end
dbContent = dbContent.replace(/(\s+)$/, '\n}\n');

fs.writeFileSync(dbPath, dbContent);
console.log('✅ Fixed databaseService.ts syntax');

// Fix aiMonitoringService.ts - remove duplicate code and fix structure
const monitoringPath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let monitoringContent = fs.readFileSync(monitoringPath, 'utf8');

// Remove the duplicate/malformed analyzeCommunityTrends method
monitoringContent = monitoringContent.replace(
  /  } catch \(error\) {\s*logger\.error\('❌ Error clearing trending topics:', error\)\s*}\s*\/\/ Analyze topics and trends[\s\S]*?}\s*}/,
  ''
);

// Remove duplicate getStats method
monitoringContent = monitoringContent.replace(
  /  } catch \(error\) {\s*logger\.error\('Error getting stats:', error\)\s*return \{ \.\.\.this\.stats \}\s*}\s*}/,
  ''
);

fs.writeFileSync(monitoringPath, monitoringContent);
console.log('✅ Fixed aiMonitoringService.ts syntax');
