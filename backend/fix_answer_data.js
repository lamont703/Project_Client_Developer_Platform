const fs = require('fs');

// Read the file
let content = fs.readFileSync('supabase/functions/api/services/aiMonitoringService.ts', 'utf8');

// Fix the answerData object
const fixedAnswerData = `        const answerData = {
          question_id: question.id,
          content: aiResponse.content,
          author_id: aiResponse.authorId,
          is_ai: true
        }`;

// Replace the broken answerData object
content = content.replace(
  /const answerData = \{[\s\S]*?\}/,
  fixedAnswerData
);

// Write the fixed file
fs.writeFileSync('supabase/functions/api/services/aiMonitoringService.ts', content);

console.log('✅ Fixed answerData object');
