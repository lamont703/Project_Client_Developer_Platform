const fs = require('fs');

// Read the aiMonitoringService file
const filePath = './functions/api/services/aiMonitoringService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add import for monitoringStatsService
content = content.replace(
  /import { answersService } from "\.\/database\/answersService\.ts"/,
  'import { answersService } from "./database/answersService.ts"\nimport { monitoringStatsService } from "./database/monitoringStatsService.ts"'
);

// Add method to load stats from database
const loadStatsMethod = `
  // Load stats from database
  private async loadStatsFromDatabase(): Promise<void> {
    try {
      const dbStats = await monitoringStatsService.getStats()
      this.stats = {
        totalEngagements: dbStats.total_engagements || 0,
        successfulEngagements: dbStats.successful_engagements || 0,
        failedEngagements: dbStats.failed_engagements || 0,
        activePersonas: dbStats.active_personas || this.config.activePersonas.length,
        lastEngagement: dbStats.last_engagement ? new Date(dbStats.last_engagement) : new Date(0),
        communityHealth: dbStats.community_health || 0,
        trendingTopics: []
      }
      logger.info('📊 Loaded monitoring stats from database:', this.stats)
    } catch (error) {
      logger.error('💥 Error loading stats from database:', error)
      // Continue with default stats if database fails
    }
  }

  // Save stats to database
  private async saveStatsToDatabase(): Promise<void> {
    try {
      await monitoringStatsService.updateStats({
        total_engagements: this.stats.totalEngagements,
        successful_engagements: this.stats.successfulEngagements,
        failed_engagements: this.stats.failedEngagements,
        active_personas: this.stats.activePersonas,
        last_engagement: this.stats.lastEngagement,
        community_health: this.stats.communityHealth
      })
      logger.info('💾 Saved monitoring stats to database')
    } catch (error) {
      logger.error('💥 Error saving stats to database:', error)
    }
  }

`;

// Add the loadStatsFromDatabase method after the constructor
content = content.replace(
  /(\s*this\.lastEngagementTime = new Date\(0\)\s*})/,
  `$1${loadStatsMethod}`
);

// Update the constructor to call loadStatsFromDatabase
content = content.replace(
  /this\.lastEngagementTime = new Date\(0\)\s*}/,
  'this.lastEngagementTime = new Date(0)\n    \n    // Load stats from database\n    this.loadStatsFromDatabase()\n  }'
);

// Update stats increment calls to save to database
content = content.replace(
  /this\.stats\.successfulEngagements\+\+\s*this\.stats\.lastEngagement = new Date\(\)/g,
  'this.stats.successfulEngagements++\n        this.stats.totalEngagements++\n        this.stats.lastEngagement = new Date()\n        await this.saveStatsToDatabase()'
);

content = content.replace(
  /this\.stats\.failedEngagements\+\+/g,
  'this.stats.failedEngagements++\n        this.stats.totalEngagements++\n        await this.saveStatsToDatabase()'
);

// Write the updated content back
fs.writeFileSync(filePath, content);
console.log('✅ Updated AI monitoring service to use database stats');
