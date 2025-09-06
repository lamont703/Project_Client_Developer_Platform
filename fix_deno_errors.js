const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/databaseService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add Deno global type declaration at the very top
const denoDeclaration = `// Deno global type declaration
declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined
    }
  }
}

`

// Add the declaration at the beginning
content = denoDeclaration + content;

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Added Deno global type declaration to fix TypeScript errors');
