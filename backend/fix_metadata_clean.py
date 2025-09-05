#!/usr/bin/env python3

import re

# Read the current file
with open('supabase/functions/api/services/aiMonitoringService.ts', 'r') as f:
    content = f.read()

# Find and replace the answerData object to remove metadata
answer_data_pattern = r'const answerData = \{[^}]*metadata: \{[^}]*\}[^}]*\}'

# Replace with clean answerData object
clean_answer_data = '''const answerData = {
          question_id: question.id,
          content: aiResponse.content,
          author_id: aiResponse.authorId,
          is_ai: true
        }'''

# Replace the pattern
content = re.sub(answer_data_pattern, clean_answer_data, content, flags=re.DOTALL)

# Write the fixed file
with open('supabase/functions/api/services/aiMonitoringService.ts', 'w') as f:
    f.write(content)

print("✅ Clean fix applied - removed metadata field from answerData")
