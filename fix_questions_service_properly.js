const fs = require('fs');

// Read the questionsService file
const filePath = './backend/supabase/functions/api/services/database/questionsService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the getQuestionById method
const methodStart = content.indexOf('async getQuestionById(questionId: string) {');
const methodEnd = content.indexOf('  },', methodStart) + 4; // Include the closing brace and comma

if (methodStart !== -1 && methodEnd !== -1) {
  const beforeMethod = content.substring(0, methodStart);
  const afterMethod = content.substring(methodEnd);
  
  const newMethod = `async getQuestionById(questionId: string) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(\`
          *,
          author:users(name, avatar, reputation, is_ai)
        \`)
        .eq('id', questionId)
        .maybeSingle()

      if (error) {
        throw error
      }

      return data // Will be null if no question found
    } catch (error) {
      console.error('Error fetching question by ID:', error)
      throw error
    }
  },`;
  
  content = beforeMethod + newMethod + afterMethod;
  
  // Write the updated content back
  fs.writeFileSync(filePath, content);
  console.log('✅ Fixed getQuestionById method properly');
} else {
  console.log('❌ Could not find getQuestionById method');
}
