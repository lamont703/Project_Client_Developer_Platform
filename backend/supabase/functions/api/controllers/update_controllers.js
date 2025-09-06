#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping of old databaseService methods to new service imports
const serviceMappings = {
  // Questions methods
  'getQuestions': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'getQuestionById': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'createQuestion': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'updateQuestion': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'deleteQuestion': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'incrementQuestionViews': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  'voteOnQuestion': { service: 'questionsService', import: "import { questionsService } from '../services/database/questionsService.ts'" },
  
  // Answers methods
  'getAnswersByQuestionId': { service: 'answersService', import: "import { answersService } from '../services/database/answersService.ts'" },
  'createAnswer': { service: 'answersService', import: "import { answersService } from '../services/database/answersService.ts'" },
  'voteOnAnswer': { service: 'answersService', import: "import { answersService } from '../services/database/answersService.ts'" },
  'updateQuestionAnswerCount': { service: 'answersService', import: "import { answersService } from '../services/database/answersService.ts'" },
  
  // Users methods
  'getCurrentUser': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'getUsers': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'getUserById': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'getUserByEmail': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'createUser': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'updateUser': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'deleteUser': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  'getUserStats': { service: 'usersService', import: "import { usersService } from '../services/database/usersService.ts'" },
  
  // Prototypes methods
  'getPrototypes': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'getPrototypeById': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'createPrototype': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'updatePrototype': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'deletePrototype': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'incrementPrototypeViews': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  'likePrototype': { service: 'prototypesService', import: "import { prototypesService } from '../services/database/prototypesService.ts'" },
  
  // Opportunities methods
  'getAllOpportunities': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'getOpportunityById': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'insertOpportunity': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'updateOpportunity': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'deleteOpportunity': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'opportunityExists': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  'updateOpportunityStage': { service: 'opportunitiesService', import: "import { opportunitiesService } from '../services/database/opportunitiesService.ts'" },
  
  // Reports methods
  'getReports': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'getReportById': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'createReport': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'updateReport': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'deleteReport': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'getPendingReports': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'resolveReport': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'checkContentExists': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  'getReportByUserAndContent': { service: 'reportsService', import: "import { reportsService } from '../services/database/reportsService.ts'" },
  
  // Analytics methods
  'trackEvent': { service: 'analyticsService', import: "import { analyticsService } from '../services/database/analyticsService.ts'" },
  'getAnalyticsEvents': { service: 'analyticsService', import: "import { analyticsService } from '../services/database/analyticsService.ts'" },
  'getAnalyticsSummary': { service: 'analyticsService', import: "import { analyticsService } from '../services/database/analyticsService.ts'" },
  'getPopularContent': { service: 'analyticsService', import: "import { analyticsService } from '../services/database/analyticsService.ts'" },
  
  // AI methods
  'getAIPersonas': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getAIPersonaById': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'createAIPersona': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'updateAIPersona': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getLearningMemory': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'updateLearningMemory': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getUserLearningMemories': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getTrendingTopics': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'upsertTrendingTopic': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'deleteTrendingTopic': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'clearTrendingTopics': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'createAIAssistantSession': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getAIAssistantSession': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'updateAIAssistantSession': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'trackAIEngagement': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getAIEngagementStats': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getCommunityTrends': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'createAIAnswer': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getAIAnswers': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'createAIQuestion': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" },
  'getAIQuestions': { service: 'aiServices', import: "import { aiServices } from '../services/database/aiServices.ts'" }
};

function updateControllerFile(filePath) {
  console.log(`Updating ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Track which services we need to import
  const neededImports = new Set();
  
  // Replace databaseService.methodName with serviceName.methodName
  for (const [methodName, mapping] of Object.entries(serviceMappings)) {
    const oldPattern = new RegExp(`databaseService\\.${methodName}`, 'g');
    if (content.includes(`databaseService.${methodName}`)) {
      content = content.replace(oldPattern, `${mapping.service}.${methodName}`);
      neededImports.add(mapping.import);
      modified = true;
    }
  }
  
  if (modified) {
    // Remove old databaseService import
    content = content.replace(/import { databaseService } from ['"]\.\.\/services\/databaseService\.ts['"];?\n?/g, '');
    
    // Add new imports at the top (after existing imports)
    const importLines = Array.from(neededImports).join('\n');
    const lines = content.split('\n');
    let insertIndex = 0;
    
    // Find where to insert imports (after existing imports)
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        insertIndex = i + 1;
      } else if (lines[i].trim() === '' && insertIndex > 0) {
        break;
      }
    }
    
    lines.splice(insertIndex, 0, importLines);
    content = lines.join('\n');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed for ${filePath}`);
  }
}

// Get all controller files
const controllerFiles = fs.readdirSync('.')
  .filter(file => file.endsWith('.ts') && file !== 'update_controllers.js');

console.log('🔄 Updating controller files to use refactored database services...\n');

controllerFiles.forEach(updateControllerFile);

console.log('\n✅ Controller update complete!');
