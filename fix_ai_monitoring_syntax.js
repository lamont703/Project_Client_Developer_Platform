const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Replace databaseService.supabase with direct supabase import
content = content.replace(
  /import { aiCommunityMemberService } from "\.\/aiCommunityMemberService\.ts"\nimport { databaseService } from "\.\/databaseService\.ts"\nimport { logger } from "\.\.\/utils\/logger\.ts"/,
  `import { aiCommunityMemberService } from "./aiCommunityMemberService.ts"
import { databaseService, supabase } from "./databaseService.ts"
import { logger } from "../utils/logger.ts"`
)

// Fix 2: Replace databaseService.supabase with supabase
content = content.replace(
  /const { error: deleteError } = await databaseService\.supabase/,
  'const { error: deleteError } = await supabase'
)

// Fix 3: Remove extra closing brace on line 600
content = content.replace(
  /  \}\n  \}\n\n  \/\/ Update community health score/,
  `  }

  // Update community health score`
)

// Fix 4: Add missing analyzeSentiment method before the analyzeCommunityTrends method
const analyzeSentimentMethod = `  // Simple sentiment analysis
  private analyzeSentiment(text: string): number {
    if (!text) return 0
    
    const positiveWords = ['great', 'awesome', 'excellent', 'amazing', 'love', 'perfect', 'fantastic', 'wonderful']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointing', 'frustrating']
    
    const words = text.toLowerCase().split(/\s+/)
    let score = 0
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1
      if (negativeWords.includes(word)) score -= 1
    })
    
    return score
  }

`

// Insert the analyzeSentiment method before analyzeCommunityTrends
content = content.replace(
  /  \/\/ Analyze community trends\n  async analyzeCommunityTrends\(\): Promise<void> \{/,
  analyzeSentimentMethod + `  // Analyze community trends
  async analyzeCommunityTrends(): Promise<void> {`
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed syntax issues in aiMonitoringService.ts');
