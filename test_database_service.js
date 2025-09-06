const fs = require('fs');

// Create a simple test script to check if databaseService methods work
const testScript = `
import { databaseService } from './databaseService.ts'

console.log('Testing databaseService.getTrendingTopics...')
try {
  const topics = await databaseService.getTrendingTopics(5)
  console.log('✅ Success:', topics)
} catch (error) {
  console.log('❌ Error:', error.message)
}
`

fs.writeFileSync('test_db_service.ts', testScript);
console.log('✅ Created test script for database service');
