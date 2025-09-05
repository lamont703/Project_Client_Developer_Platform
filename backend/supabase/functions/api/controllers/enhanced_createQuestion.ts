      // Generate AI response if enabled
      if (questionData.generateAIResponse !== false) {
        try {
          // Create conversation context for better AI responses
          const context = {
            questionId: question.id,
            questionContent: question.content,
            questionAuthor: user.id,
            previousResponses: [],
            communityTrends: await databaseService.getCommunityTrends(),
            userInterests: user.interests || [],
            conversationHistory: []
          }
          
          const aiResponse = await aiCommunityMemberService.generateResponse(question, context)
          if (aiResponse) {
            // Create answer with enhanced AI response data
            await databaseService.createAnswer({
              question_id: question.id,
              content: aiResponse.content,
              author_id: aiResponse.authorId,
              is_ai: true,
              metadata: {
                persona: aiResponse.persona?.name,
                confidence: aiResponse.confidence,
                emotionalTone: aiResponse.emotionalTone,
                followUpQuestions: aiResponse.followUpQuestions
              }
            })
            
            // Update learning memory
            await aiCommunityMemberService.updateLearningMemory(user.id, {
              questionId: question.id,
              interaction: 'question_answered',
              timestamp: new Date()
            })
            
            logger.info(`AI Community Member ${aiResponse.persona?.name} responded to question ${question.id}`)
          }
        } catch (aiError) {
          logger.error('AI response generation failed:', aiError)
          // Continue without AI response - don't fail the question creation
        }
      }
