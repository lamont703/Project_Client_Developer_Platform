const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the placeholder analyzeCommunityTrends method with a real implementation
const newAnalyzeMethod = `  // Analyze community trends
  async analyzeCommunityTrends(): Promise<void> {
    try {
      logger.info('📊 Analyzing community trends...')
      
      // Get recent questions and answers
      const questions = await databaseService.getQuestions({ 
        sortBy: 'newest',
        limit: 50 
      })

      logger.info(\`📋 Found \${questions.length} questions to analyze\`)

      // Analyze topics and trends
      const topicFrequency: Record<string, number> = {}
      const topicSentiment: Record<string, number> = {}

      questions.forEach(question => {
        if (question.tags && question.tags.length > 0) {
          question.tags.forEach(tag => {
            topicFrequency[tag] = (topicFrequency[tag] || 0) + 1
            // Simple sentiment analysis based on question content
            const sentiment = this.analyzeSentiment(question.content)
            topicSentiment[tag] = (topicSentiment[tag] || 0) + sentiment
          })
        }
      })

      logger.info(\`📊 Analyzed topics: \${Object.keys(topicFrequency).length} unique topics\`)

      // Save trending topics to database
      const trendingTopics = Object.entries(topicFrequency)
        .map(([topic, frequency]) => ({
          topic,
          frequency,
          sentiment: topicSentiment[topic] > 0 ? 'positive' : topicSentiment[topic] < 0 ? 'negative' : 'neutral',
          trending_up: frequency >= 1, // Lower threshold for testing
          related_questions: questions.filter(q => q.tags?.includes(topic)).map(q => q.id)
        }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 10)

      // Save each trending topic to database
      for (const topic of trendingTopics) {
        try {
          await databaseService.upsertTrendingTopic({
            topic: topic.topic,
            frequency: topic.frequency,
            sentiment: topic.sentiment,
            trending_up: topic.trending_up,
            related_questions: topic.related_questions
          })
          logger.info(\`💾 Saved trending topic: \${topic.topic} (frequency: \${topic.frequency})\`)
        } catch (error) {
          logger.error(\`❌ Error saving trending topic \${topic.topic}:\`, error)
        }
      }

      // Update in-memory stats for immediate use
      this.stats.trendingTopics = trendingTopics.map(topic => ({
        topic: topic.topic,
        frequency: topic.frequency,
        sentiment: topic.sentiment as 'positive' | 'neutral' | 'negative',
        trendingUp: topic.trending_up,
        relatedQuestions: topic.related_questions
      }))

      logger.info(\`✅ Community trends updated: \${this.stats.trendingTopics.length} topics saved to database\`)

    } catch (error) {
      logger.error('💥 Error analyzing community trends:', error)
    }
  }`

// Replace the placeholder method
content = content.replace(
  /  \/\/ Analyze community trends[\s\S]*?logger\.info\(\`✅ Community trends updated: \$\{this\.stats\.trendingTopics\.length\} topics\`\)[\s\S]*?  \}/,
  newAnalyzeMethod
)

// Write the updated content
fs.writeFileSync(filePath, content);
console.log('✅ Fixed analyzeCommunityTrends method to save trending topics to database');
