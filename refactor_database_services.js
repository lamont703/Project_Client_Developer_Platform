#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the original databaseService.ts file
const originalFile = 'backend/supabase/functions/api/services/databaseService.ts';
const content = fs.readFileSync(originalFile, 'utf8');

// Define service mappings
const serviceMappings = {
  questionsService: {
    methods: [
      'getQuestions',
      'getQuestionById', 
      'createQuestion',
      'updateQuestion',
      'deleteQuestion',
      'incrementQuestionViews',
      'voteOnQuestion',
      'createAIQuestion',
      'getAIQuestions'
    ],
    file: 'backend/supabase/functions/api/services/database/questionsService.ts'
  },
  answersService: {
    methods: [
      'getAnswersByQuestionId',
      'createAnswer',
      'voteOnAnswer',
      'updateQuestionAnswerCount',
      'createAIAnswer',
      'getAIAnswers'
    ],
    file: 'backend/supabase/functions/api/services/database/answersService.ts'
  },
  usersService: {
    methods: [
      'getUsers',
      'getUserById',
      'getUserByEmail',
      'createUser',
      'updateUser',
      'deleteUser',
      'getUserStats',
      'getUserQuestions',
      'getUserAnswers',
      'getUserPrototypes',
      'updateUserReputation'
    ],
    file: 'backend/supabase/functions/api/services/database/usersService.ts'
  },
  prototypesService: {
    methods: [
      'getPrototypes',
      'getPrototypeById',
      'createPrototype',
      'updatePrototype',
      'deletePrototype',
      'incrementPrototypeViews',
      'likePrototype'
    ],
    file: 'backend/supabase/functions/api/services/database/prototypesService.ts'
  },
  aiServices: {
    methods: [
      'getAIPersonas',
      'getAIPersonaById',
      'createAIPersona',
      'updateAIPersona',
      'getLearningMemory',
      'updateLearningMemory',
      'getUserLearningMemories',
      'getTrendingTopics',
      'upsertTrendingTopic',
      'deleteTrendingTopic',
      'clearTrendingTopics',
      'createAIAssistantSession',
      'getAIAssistantSession',
      'updateAIAssistantSession'
    ],
    file: 'backend/supabase/functions/api/services/database/aiServices.ts'
  },
  analyticsService: {
    methods: [
      'trackEvent',
      'getAnalyticsEvents',
      'getAnalyticsSummary',
      'getUserAnalytics',
      'getPopularContent',
      'trackAIEngagement',
      'getAIEngagementStats',
      'getCommunityTrends'
    ],
    file: 'backend/supabase/functions/api/services/database/analyticsService.ts'
  },
  opportunitiesService: {
    methods: [
      'getAllOpportunities',
      'insertOpportunity',
      'updateOpportunity',
      'getOpportunityById',
      'deleteOpportunity',
      'opportunityExists',
      'updateOpportunityStage'
    ],
    file: 'backend/supabase/functions/api/services/database/opportunitiesService.ts'
  },
  reportsService: {
    methods: [
      'getReports',
      'getReportById',
      'createReport',
      'updateReport',
      'deleteReport',
      'getPendingReports',
      'resolveReport',
      'checkContentExists',
      'getReportByUserAndContent'
    ],
    file: 'backend/supabase/functions/api/services/database/reportsService.ts'
  }
};

// Extract methods from content
function extractMethod(methodName, content) {
  const methodRegex = new RegExp(`async ${methodName}\\([^)]*\\)\\s*{[^}]*}(?=\\s*[,}])`, 'gs');
  const match = content.match(methodRegex);
  return match ? match[0] : null;
}

// Create service files
Object.entries(serviceMappings).forEach(([serviceName, config]) => {
  let serviceContent = `// ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} Database Service\n`;
  serviceContent += `// Handles all ${serviceName.replace('Service', '').toLowerCase()}-related database operations\n\n`;
  serviceContent += `import { supabase } from './databaseService.ts'\n\n`;
  serviceContent += `export const ${serviceName} = {\n`;

  config.methods.forEach(methodName => {
    const method = extractMethod(methodName, content);
    if (method) {
      serviceContent += `  ${method},\n\n`;
    }
  });

  serviceContent += '}\n';

  fs.writeFileSync(config.file, serviceContent);
  console.log(`Created ${config.file}`);
});

console.log('Refactoring complete!');
