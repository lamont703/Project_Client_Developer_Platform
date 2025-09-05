#!/usr/bin/env python3

import re

# Read the current file
with open('supabase/functions/api/services/aiMonitoringService.ts', 'r') as f:
    content = f.read()

# Enhanced debug logging for processEngagementOpportunities
process_engagement_opportunities_enhanced = '''  // Process engagement opportunities
  async processEngagementOpportunities(): Promise<void> {
    try {
      logger.info('🚀 STEP 1: Starting processEngagementOpportunities()')
      logger.info('🔍 Processing engagement opportunities...')

      // Check if we're within engagement limits
      logger.info('🚀 STEP 2: Checking engagement limits...')
      const canEngage = this.canEngage()
      const recentCount = this.getRecentEngagementsCount()
      logger.info(`📊 Engagement check: canEngage=${canEngage}, recent engagements: ${recentCount}/${this.config.maxEngagementsPerHour}`)
      
      if (!canEngage) {
        logger.info('⏸️ Engagement limit reached, skipping this cycle')
        logger.info('🚀 STEP 2 RESULT: CANNOT ENGAGE - LIMIT REACHED')
        return
      }
      logger.info('🚀 STEP 2 RESULT: CAN ENGAGE - PROCEEDING')

      // Find engagement opportunities
      logger.info('🚀 STEP 3: Finding engagement opportunities...')
      const opportunities = await this.findEngagementOpportunities()
      
      logger.info(`🚀 STEP 3 RESULT: Found ${opportunities.length} engagement opportunities:`)
      opportunities.forEach((opp, index) => {
        logger.info(`  ${index + 1}. ${opp.type} (${opp.priority}) - ${opp.reason}`)
        logger.info(`     Target ID: ${opp.targetId}`)
        logger.info(`     Suggested Persona: ${opp.suggestedPersona}`)
      })
      
      if (opportunities.length === 0) {
        logger.info('🔍 No engagement opportunities found')
        logger.info('🚀 STEP 3 RESULT: NO OPPORTUNITIES FOUND - EXITING')
        return
      }

      // Process highest priority opportunity
      logger.info('🚀 STEP 4: Processing highest priority opportunity...')
      const opportunity = opportunities[0]
      logger.info(`🎯 Processing highest priority opportunity: ${opportunity.type} (${opportunity.priority})`)
      logger.info(`📝 Context: ${JSON.stringify(opportunity.context, null, 2)}`)

      logger.info('🚀 STEP 5: Calling executeEngagement...')
      await this.executeEngagement(opportunity)
      logger.info('�� STEP 5 RESULT: executeEngagement completed')
      
    } catch (error) {
      logger.error('💥 Error processing engagement opportunities:', error)
      logger.error('Stack trace:', error.stack)
    }
  }'''

# Enhanced debug logging for findEngagementOpportunities
find_engagement_opportunities_enhanced = '''  // Find engagement opportunities
  async findEngagementOpportunities(): Promise<EngagementOpportunity[]> {
    const opportunities: EngagementOpportunity[] = []

    try {
      logger.info('🔍 STEP 3.1: Starting findEngagementOpportunities()')
      logger.info('🔍 Step 1: Finding unanswered questions...')
      const unansweredQuestions = await this.findUnansweredQuestions()
      logger.info(`📝 Found ${unansweredQuestions.length} unanswered questions`)
      opportunities.push(...unansweredQuestions)

      logger.info('🔍 Step 2: Finding trending opportunities...')
      const trendingOpportunities = await this.findTrendingOpportunities()
      logger.info(`📈 Found ${trendingOpportunities.length} trending opportunities`)
      opportunities.push(...trendingOpportunities)

      logger.info('🔍 Step 3: Finding collaboration opportunities...')
      const collaborationOpportunities = await this.findCollaborationOpportunities()
      logger.info(`🤝 Found ${collaborationOpportunities.length} collaboration opportunities`)
      opportunities.push(...collaborationOpportunities)

      logger.info('🔍 Step 4: Finding learning opportunities...')
      const learningOpportunities = await this.findLearningOpportunities()
      logger.info(`📚 Found ${learningOpportunities.length} learning opportunities`)
      opportunities.push(...learningOpportunities)

      // Sort by priority
      logger.info('🔍 STEP 3.2: Sorting opportunities by priority...')
      const sortedOpportunities = opportunities.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })

      logger.info(`📊 Total opportunities found: ${sortedOpportunities.length}`)
      logger.info('🔍 STEP 3.3: Returning sorted opportunities')
      return sortedOpportunities

    } catch (error) {
      logger.error('💥 Error finding engagement opportunities:', error)
      logger.error('Stack trace:', error.stack)
      return []
    }
  }'''

# Enhanced debug logging for findUnansweredQuestions
find_unanswered_questions_enhanced = '''  // Find unanswered questions
  private async findUnansweredQuestions(): Promise<EngagementOpportunity[]> {
    try {
      logger.info('🔍 STEP 3.1.1: Starting findUnansweredQuestions()')
      logger.info('📋 Querying database for unanswered questions...')
      const questions = await databaseService.getQuestions({ 
        sortBy: 'unanswered',
        limit: 50 
      })

      logger.info(`📊 Database returned ${questions.length} questions`)
      questions.forEach((q, index) => {
        logger.info(`  ${index + 1}. "${q.title}" - answers: ${q.answers_count || 0}, is_ai: ${q.is_ai_generated}`)
      })

      logger.info('🔍 STEP 3.1.2: Applying filters...')
      const filteredQuestions = questions.filter(q => {
        const hasNoAnswers = !q.answers_count || q.answers_count === 0
        const isNotAI = !q.is_ai_generated
        logger.info(`  Filtering "${q.title}": hasNoAnswers=${hasNoAnswers}, isNotAI=${isNotAI}`)
        return hasNoAnswers && isNotAI
      })

      logger.info(`✅ After filtering: ${filteredQuestions.length} unanswered human questions`)

      logger.info('🔍 STEP 3.1.3: Creating opportunities...')
      const opportunities = filteredQuestions
        .slice(0, 3) // Limit to 3 opportunities
        .map(question => {
          const priority = this.calculateQuestionPriority(question)
          const persona = this.selectPersonaForQuestion(question)
          logger.info(`📝 Creating opportunity for "${question.title}" with priority ${priority} and persona ${persona}`)
          
          return {
            type: 'unanswered_question' as const,
            priority,
            targetId: question.id,
            context: question,
            suggestedPersona: persona,
            reason: `Unanswered question: "${question.title}"`
          }
        })

      logger.info(`🎯 Created ${opportunities.length} unanswered question opportunities`)
      logger.info('🔍 STEP 3.1.4: Returning opportunities')
      return opportunities

    } catch (error) {
      logger.error('💥 Error finding unanswered questions:', error)
      logger.error('Stack trace:', error.stack)
      return []
    }
  }'''

# Enhanced debug logging for executeEngagement
execute_engagement_enhanced = '''  // Execute engagement opportunity
  async executeEngagement(opportunity: EngagementOpportunity): Promise<void> {
    try {
      logger.info('🚀 STEP 5.1: Starting executeEngagement()')
      logger.info(`🚀 Executing ${opportunity.type} engagement for target ${opportunity.targetId}`)
      let engagement: any = null

      logger.info('🚀 STEP 5.2: Determining engagement type...')
      switch (opportunity.type) {
        case 'unanswered_question':
          logger.info('💬 Engaging with unanswered question...')
          logger.info('🚀 STEP 5.3: Calling engageWithQuestion...')
          engagement = await this.engageWithQuestion(opportunity)
          logger.info('🚀 STEP 5.3 RESULT: engageWithQuestion completed')
          break
        case 'trending_topic':
          logger.info('📈 Engaging with trending topic...')
          engagement = await this.engageWithTrendingTopic(opportunity)
          break
        case 'collaboration_request':
          logger.info('🤝 Engaging with collaboration request...')
          engagement = await this.engageWithCollaboration(opportunity)
          break
        case 'learning_opportunity':
          logger.info('📚 Engaging with learning opportunity...')
          engagement = await this.engageWithLearning(opportunity)
          break
        default:
          logger.error(`❌ Unknown engagement type: ${opportunity.type}`)
          return
      }

      logger.info('🚀 STEP 5.4: Checking engagement result...')
      if (engagement) {
        logger.info('✅ Engagement successful, recording...')
        logger.info('🚀 STEP 5.5: Recording engagement...')
        await this.recordEngagement(opportunity, engagement)
        this.stats.successfulEngagements++
        this.stats.lastEngagement = new Date()
        logger.info(`🎉 Successfully executed ${opportunity.type} engagement`)
        logger.info('🚀 STEP 5.5 RESULT: Engagement recorded successfully')
      } else {
        logger.warn(`⚠️ No engagement generated for ${opportunity.type}`)
        logger.info('🚀 STEP 5.4 RESULT: NO ENGAGEMENT GENERATED')
      }

    } catch (error) {
      logger.error(`💥 Error executing engagement ${opportunity.type}:`, error)
      logger.error('Stack trace:', error.stack)
      this.stats.failedEngagements++
    }
  }'''

# Enhanced debug logging for engageWithQuestion
engage_with_question_enhanced = '''  // Engage with unanswered question
  private async engageWithQuestion(opportunity: EngagementOpportunity): Promise<any> {
    try {
      logger.info('🚀 STEP 5.3.1: Starting engageWithQuestion()')
      const question = opportunity.context
      logger.info(`💬 Generating AI response for question: "${question.title}"`)
      logger.info(`📝 Question content: "${question.content}"`)
      logger.info(`🏷️ Question tags: ${JSON.stringify(question.tags)}`)
      
      // Create context for AI response
      logger.info('🚀 STEP 5.3.2: Creating AI context...')
      const context = {
        questionId: question.id,
        questionContent: question.content,
        questionAuthor: question.author_id,
        previousResponses: [],
        communityTrends: this.stats.trendingTopics.map(t => t.topic),
        userInterests: [],
        conversationHistory: []
      }
      logger.info(`📊 AI context created: ${JSON.stringify(context, null, 2)}`)

      logger.info('🚀 STEP 5.3.3: Calling AI community member service...')
      logger.info('🤖 Calling AI community member service to generate response...')
      const aiResponse = await aiCommunityMemberService.generateResponse(question, context)
      
      logger.info('🚀 STEP 5.3.4: Checking AI response...')
      if (aiResponse) {
        logger.info(`✅ AI response generated successfully`)
        logger.info(`👤 Persona: ${aiResponse.persona?.name}`)
        logger.info(`📝 Content length: ${aiResponse.content?.length || 0} characters`)
        logger.info(`🎯 Confidence: ${aiResponse.confidence}`)

        // Create answer in database
        logger.info('🚀 STEP 5.3.5: Creating answer in database...')
        logger.info('💾 Creating answer in database...')
        const answerData = {
          question_id: question.id,
          content: aiResponse.content,
          author_id: aiResponse.authorId,
          is_ai: true,
          metadata: {
            persona: aiResponse.persona?.name,
            confidence: aiResponse.confidence,
            emotionalTone: aiResponse.emotionalTone,
            followUpQuestions: aiResponse.followUpQuestions,
            engagementType: 'unanswered_question'
          }
        }

        logger.info(`📊 Answer data: ${JSON.stringify(answerData, null, 2)}`)
        
        logger.info('🚀 STEP 5.3.6: Calling databaseService.createAnswer...')
        const createdAnswer = await databaseService.createAnswer(answerData)
        logger.info(`✅ Answer created successfully with ID: ${createdAnswer?.id}`)
        logger.info('🚀 STEP 5.3.6 RESULT: Answer created successfully')

        logger.info('�� STEP 5.3.7: Returning AI response...')
        return aiResponse
      } else {
        logger.warn('⚠️ AI response generation returned null')
        logger.info('🚀 STEP 5.3.4 RESULT: AI RESPONSE GENERATION FAILED')
        return null
      }

    } catch (error) {
      logger.error('💥 Error engaging with question:', error)
      logger.error('Stack trace:', error.stack)
      logger.info('🚀 STEP 5.3 ERROR: Exception in engageWithQuestion')
      return null
    }
  }'''

# Replace the methods with enhanced versions
content = re.sub(
    r'// Process engagement opportunities\s+async processEngagementOpportunities\(\): Promise<void> \{.*?\n  \}',
    process_engagement_opportunities_enhanced,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'// Find engagement opportunities\s+async findEngagementOpportunities\(\): Promise<EngagementOpportunity\[\]> \{.*?\n  \}',
    find_engagement_opportunities_enhanced,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'// Find unanswered questions\s+private async findUnansweredQuestions\(\): Promise<EngagementOpportunity\[\]> \{.*?\n  \}',
    find_unanswered_questions_enhanced,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'// Execute engagement opportunity\s+async executeEngagement\(opportunity: EngagementOpportunity\): Promise<void> \{.*?\n  \}',
    execute_engagement_enhanced,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'// Engage with unanswered question\s+private async engageWithQuestion\(opportunity: EngagementOpportunity\): Promise<any> \{.*?\n  \}',
    engage_with_question_enhanced,
    content,
    flags=re.DOTALL
)

# Write the enhanced file
with open('supabase/functions/api/services/aiMonitoringService.ts', 'w') as f:
    f.write(content)

print("✅ Enhanced debug logging added to monitoring service")
