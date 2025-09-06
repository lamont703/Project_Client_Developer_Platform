
import { databaseService } from './databaseService.ts'

console.log('Testing databaseService.getTrendingTopics...')
try {
  const topics = await databaseService.getTrendingTopics(5)
  console.log('✅ Success:', topics)
} catch (error) {
  console.log('❌ Error:', error.message)
}
