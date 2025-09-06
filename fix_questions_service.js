const fs = require('fs');

// Read the questionsService file
const filePath = './backend/supabase/functions/api/services/database/questionsService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace .single() with .maybeSingle() in getQuestionById method
content = content.replace(
  /async getQuestionById\(questionId: string\) \{[\s\S]*?\.single\(\)/,
  `async getQuestionById(questionId: string) {
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
  }`
);

// Write the updated content back
fs.writeFileSync(filePath, content);
console.log('✅ Fixed getQuestionById method to use .maybeSingle()');
