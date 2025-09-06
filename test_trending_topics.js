// Simple test to debug trending topics
const testUrl = 'https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api/monitoring/stats';
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobHpqcmNpZGVobHBtaWltbWZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNzE0MDMsImV4cCI6MjA3MTc0NzQwM30.uQEJAihX_cX9c6lFAJEoe1WYh8ULMey5wl-a2lh7j8k';

console.log('Testing trending topics...');

fetch(testUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('Response:', JSON.stringify(data, null, 2));
  console.log('Trending topics count:', data.stats?.trendingTopics?.length || 0);
  if (data.stats?.trendingTopics?.length > 0) {
    console.log('Trending topics:', data.stats.trendingTopics);
  }
})
.catch(error => {
  console.error('Error:', error);
});
