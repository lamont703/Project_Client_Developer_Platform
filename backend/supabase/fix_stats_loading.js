const fs = require('fs');

// Read the aiMonitoringService file
const filePath = './functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the loadStatsFromDatabase call from constructor
content = content.replace(
  /this\.lastEngagementTime = new Date\(0\)\s*\n\s*\/\/ Load stats from database\s*\n\s*this\.loadStatsFromDatabase\(\)\s*\}/,
  'this.lastEngagementTime = new Date(0)\n  }'
);

// Update the getStats method to load from database
content = content.replace(
  /getStats\(\): MonitoringStats \{[\s\S]*?return this\.stats[\s\S]*?\}/,
  `async getStats(): Promise<MonitoringStats> {
    try {
      // Load fresh stats from database
      const dbStats = await monitoringStatsService.getStats()
      this.stats = {
        totalEngagements: dbStats.total_engagements || 0,
        successfulEngagements: dbStats.successful_engagements || 0,
        failedEngagements: dbStats.failed_engagements || 0,
        activePersonas: dbStats.active_personas || this.config.activePersonas.length,
        lastEngagement: dbStats.last_engagement ? new Date(dbStats.last_engagement) : new Date(0),
        communityHealth: dbStats.community_health || 0,
        trendingTopics: this.stats.trendingTopics // Keep trending topics in memory
      }
      return this.stats
    } catch (error) {
      logger.error('💥 Error loading stats from database:', error)
      return this.stats
    }
  }`
);

// Write the updated content back
fs.writeFileSync(filePath, content);
console.log('✅ Fixed stats loading to be async and load from database');
