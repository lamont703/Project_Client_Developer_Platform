const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the getStats method
const oldMethod = `  // Public methods for monitoring and control
  getStats(): MonitoringStats {
    return { ...this.stats }
  }`;

const newMethod = `  // Public methods for monitoring and control
  async getStats(): Promise<MonitoringStats> {
    try {
      const trendingTopics = await databaseService.getTrendingTopics(10)
      return {
        ...this.stats,
        trendingTopics: trendingTopics.map(topic => ({
          topic: topic.topic,
          frequency: topic.frequency,
          sentiment: topic.sentiment as 'positive' | 'neutral' | 'negative',
          trendingUp: topic.trending_up,
          relatedQuestions: topic.related_questions || []
        }))
      }
    } catch (error) {
      logger.error('Error getting stats:', error)
      return { ...this.stats }
    }
  }`;

content = content.replace(oldMethod, newMethod);
fs.writeFileSync(filePath, content);
console.log('✅ Updated getStats method');
