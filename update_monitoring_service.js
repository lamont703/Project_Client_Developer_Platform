const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add import for trending topics service
content = content.replace(
  /import { aiCommunityMemberService } from "\.\/aiCommunityMemberService\.ts"/,
  'import { aiCommunityMemberService } from "./aiCommunityMemberService.ts"\nimport { trendingTopicsService } from "./trendingTopicsService.ts"'
);

// Update getStats method to use new trending topics service
const newGetStats = `  // Public methods for monitoring and control
  async getStats(): Promise<MonitoringStats> {
    try {
      const trendingTopics = await trendingTopicsService.getTrendingTopicsForStats()
      return {
        ...this.stats,
        trendingTopics: trendingTopics
      }
    } catch (error) {
      logger.error('Error getting stats:', error)
      return { ...this.stats }
    }
  }`;

content = content.replace(
  /\/\/ Public methods for monitoring and control[\s\S]*?async getStats\(\): Promise<MonitoringStats> {[\s\S]*?}\s*}/,
  newGetStats
);

// Update analyzeCommunityTrends method to use new service
const newAnalyzeCommunityTrends = `  // Analyze community trends
  async analyzeCommunityTrends(): Promise<void> {
    try {
      logger.info('📊 Analyzing community trends...')
      
      const trends = await trendingTopicsService.updateTrendingTopics()
      
      // Update in-memory stats for immediate use
      this.stats.trendingTopics = trends
      
      logger.info(\`✅ Community trends updated: \${trends.length} topics\`)
    } catch (error) {
      logger.error('💥 Error analyzing community trends:', error)
    }
  }`;

content = content.replace(
  /\/\/ Analyze community trends[\s\S]*?async analyzeCommunityTrends\(\): Promise<void> {[\s\S]*?}\s*}/,
  newAnalyzeCommunityTrends
);

fs.writeFileSync(filePath, content);
console.log('✅ Updated monitoring service to use new trending topics service');
