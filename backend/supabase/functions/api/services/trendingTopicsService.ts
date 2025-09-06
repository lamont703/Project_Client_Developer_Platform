// Trending Topics Service
// Handles all trending topics operations

import { supabase } from "./databaseService.ts"
import { logger } from "../utils/logger.ts"

export interface TrendingTopic {
  id: string
  topic: string
  frequency: number
  sentiment: 'positive' | 'neutral' | 'negative'
  trending_up: boolean
  related_questions: string[]
  first_seen: string
  last_seen: string
  created_at: string
  updated_at: string
}

export interface CommunityTrend {
  topic: string
  frequency: number
  sentiment: 'positive' | 'neutral' | 'negative'
  trendingUp: boolean
  relatedQuestions: string[]
}

export const trendingTopicsService = {
  // Get trending topics from database
  async getTrendingTopics(limit: number = 10): Promise<TrendingTopic[]> {
    try {
      logger.info(`📈 Fetching ${limit} trending topics from database...`)
      
      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('frequency', { ascending: false })
        .order('last_seen', { ascending: false })
        .limit(limit)

      if (error) {
        logger.error('❌ Error fetching trending topics:', error)
        throw error
      }

      logger.info(`✅ Successfully fetched ${data?.length || 0} trending topics`)
      return data || []
    } catch (error) {
      logger.error('💥 Error in getTrendingTopics:', error)
      throw error
    }
  },

  // Analyze community trends from questions
  async analyzeCommunityTrends(): Promise<CommunityTrend[]> {
    try {
      logger.info('📊 Analyzing community trends from questions...')
      
      // Get recent questions with tags
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('id, tags, content, created_at')
        .not('tags', 'is', null)
        .order('created_at', { ascending: false })
        .limit(100)

      if (questionsError) {
        logger.error('❌ Error fetching questions for trend analysis:', questionsError)
        throw questionsError
      }

      logger.info(`📋 Found ${questions?.length || 0} questions to analyze`)

      if (!questions || questions.length === 0) {
        logger.info('📝 No questions found for trend analysis')
        return []
      }

      // Analyze topic frequency and sentiment
      const topicFrequency: Record<string, number> = {}
      const topicSentiment: Record<string, number> = {}
      const topicQuestions: Record<string, string[]> = {}

      questions.forEach(question => {
        if (question.tags && question.tags.length > 0) {
          question.tags.forEach(tag => {
            // Count frequency
            topicFrequency[tag] = (topicFrequency[tag] || 0) + 1
            
            // Analyze sentiment
            const sentiment = this.analyzeSentiment(question.content)
            topicSentiment[tag] = (topicSentiment[tag] || 0) + sentiment
            
            // Track related questions
            if (!topicQuestions[tag]) {
              topicQuestions[tag] = []
            }
            topicQuestions[tag].push(question.id)
          })
        }
      })

      logger.info(`📊 Analyzed ${Object.keys(topicFrequency).length} unique topics`)

      // Convert to CommunityTrend format
      const trends: CommunityTrend[] = Object.entries(topicFrequency)
        .map(([topic, frequency]) => ({
          topic,
          frequency,
          sentiment: (topicSentiment[topic] > 0 ? 'positive' : topicSentiment[topic] < 0 ? 'negative' : 'neutral') as 'positive' | 'neutral' | 'negative',
          trendingUp: frequency >= 2, // Consider trending if appears in 2+ questions
          relatedQuestions: topicQuestions[topic] || []
        }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 10)

      logger.info(`✅ Generated ${trends.length} community trends`)
      return trends

    } catch (error) {
      logger.error('💥 Error analyzing community trends:', error)
      throw error
    }
  },

  // Save trending topics to database
  async saveTrendingTopics(trends: CommunityTrend[]): Promise<void> {
    try {
      logger.info(`💾 Saving ${trends.length} trending topics to database...`)
      
      // Clear existing trending topics first
      const { error: deleteError } = await supabase
        .from('trending_topics')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records

      if (deleteError) {
        logger.error('❌ Error clearing existing trending topics:', deleteError)
        throw deleteError
      }

      logger.info('🧹 Cleared existing trending topics')

      // Insert new trending topics
      const topicsToInsert = trends.map(trend => ({
        topic: trend.topic,
        frequency: trend.frequency,
        sentiment: trend.sentiment,
        trending_up: trend.trendingUp,
        related_questions: trend.relatedQuestions,
        first_seen: new Date().toISOString(),
        last_seen: new Date().toISOString()
      }))

      const { error: insertError } = await supabase
        .from('trending_topics')
        .insert(topicsToInsert)

      if (insertError) {
        logger.error('❌ Error inserting trending topics:', insertError)
        throw insertError
      }

      logger.info(`✅ Successfully saved ${trends.length} trending topics to database`)

    } catch (error) {
      logger.error('💥 Error saving trending topics:', error)
      throw error
    }
  },

  // Update trending topics (analyze and save)
  async updateTrendingTopics(): Promise<CommunityTrend[]> {
    try {
      logger.info('🔄 Updating trending topics...')
      
      // Analyze current trends
      const trends = await this.analyzeCommunityTrends()
      
      // Save to database
      await this.saveTrendingTopics(trends)
      
      logger.info(`✅ Successfully updated trending topics: ${trends.length} topics`)
      return trends

    } catch (error) {
      logger.error('💥 Error updating trending topics:', error)
      throw error
    }
  },

  // Simple sentiment analysis
  analyzeSentiment(text: string): number {
    if (!text) return 0
    
    const positiveWords = ['great', 'awesome', 'excellent', 'amazing', 'love', 'perfect', 'fantastic', 'wonderful', 'good', 'nice', 'helpful']
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointing', 'frustrating', 'difficult', 'problem', 'issue']
    
    const words = text.toLowerCase().split(/\s+/)
    let score = 0
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 1
      if (negativeWords.includes(word)) score -= 1
    })
    
    return score
  },

  // Get trending topics for monitoring stats
  async getTrendingTopicsForStats(): Promise<CommunityTrend[]> {
    try {
      const topics = await this.getTrendingTopics(10)
      
      return topics.map(topic => ({
        topic: topic.topic,
        frequency: topic.frequency,
        sentiment: topic.sentiment,
        trendingUp: topic.trending_up,
        relatedQuestions: topic.related_questions || []
      }))
    } catch (error) {
      logger.error('💥 Error getting trending topics for stats:', error)
      return []
    }
  }
}
