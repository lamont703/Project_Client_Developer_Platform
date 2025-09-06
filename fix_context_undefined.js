const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiCommunityMemberService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the undefined context issues
content = content.replace(
  /if \(context\?\.userInterests\?\.length > 0\) \{[\s\S]*?context\.userInterests\.some\(userInterest =>/,
  `if (context?.userInterests && context.userInterests.length > 0) {
      // Match persona based on user interests
      const matchingPersonas = AI_PERSONAS.filter(persona => 
        persona.interests.some(interest => 
          context.userInterests.some(userInterest =>`
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed undefined context issues');
