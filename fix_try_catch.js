const fs = require('fs');

const filePath = 'backend/supabase/functions/api/index.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add missing try block before the catch
content = content.replace(
  /  } catch \(error\) {/,
  '  } catch (error) {'
);

// Check if there's a missing try - if so, add it
if (!content.includes('try {')) {
  content = content.replace(
    /serve\(async \(req: Request\) => {/,
    'serve(async (req: Request) => {\n  try {'
  );
}

fs.writeFileSync(filePath, content);
console.log('✅ Fixed try-catch structure');
