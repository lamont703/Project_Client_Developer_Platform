const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/databaseService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix missing closing braces in various methods
const fixes = [
  // Fix getAllOpportunities method
  {
    search: 'return data || []\n    catch (error) {',
    replace: 'return data || []\n    } catch (error) {'
  },
  // Fix insertOpportunity method  
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix updateOpportunity method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix getOpportunityById method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix deleteOpportunity method
  {
    search: 'return true\n    catch (error) {',
    replace: 'return true\n    } catch (error) {'
  },
  // Fix opportunityExists method
  {
    search: 'return !!data\n    catch (error) {',
    replace: 'return !!data\n    } catch (error) {'
  },
  // Fix updateOpportunityStage method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix getCurrentUser method - fix destructuring
  {
    search: 'const { data: { user }, error = await supabaseWithAuth.auth.getUser(token)',
    replace: 'const { data: { user }, error } = await supabaseWithAuth.auth.getUser(token)'
  },
  // Fix getCurrentUser method - fix destructuring
  {
    search: 'const { data: userData, error: userError = await supabaseWithAuth',
    replace: 'const { data: userData, error: userError } = await supabaseWithAuth'
  },
  // Fix getQuestions method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getQuestionById method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix createQuestion method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix updateQuestion method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix deleteQuestion method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix incrementQuestionViews method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix incrementQuestionViews method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix voteOnQuestion method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix getAnswersByQuestionId method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix createAnswer method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix voteOnAnswer method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix updateQuestionAnswerCount method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix updateQuestionAnswerCount method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix getPrototypes method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getPrototypeById method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix createPrototype method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix updatePrototype method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix deletePrototype method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix incrementPrototypeViews method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix incrementPrototypeViews method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix likePrototype method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix getUsers method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getUserById method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix getUserByEmail method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix createUser method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix updateUser method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix deleteUser method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix getUserStats method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix getUserQuestions method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getUserAnswers method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getUserPrototypes method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix updateUserReputation method
  {
    search: 'const { data: currentData, error: fetchError = await supabase',
    replace: 'const { data: currentData, error: fetchError } = await supabase'
  },
  // Fix getReports method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getReportById method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix createReport method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix updateReport method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix deleteReport method
  {
    search: 'const { error = await supabase',
    replace: 'const { error } = await supabase'
  },
  // Fix getPendingReports method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix resolveReport method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix checkContentExists method
  {
    search: 'return !!data\n    catch (error) {',
    replace: 'return !!data\n    } catch (error) {'
  },
  // Fix getReportByUserAndContent method
  {
    search: 'return data\n    catch (error) {',
    replace: 'return data\n    } catch (error) {'
  },
  // Fix trackEvent method
  {
    search: 'return data?.[0] || null\n    catch (error) {',
    replace: 'return data?.[0] || null\n    } catch (error) {'
  },
  // Fix getAnalyticsEvents method
  {
    search: 'const { data, error = await query',
    replace: 'const { data, error } = await query'
  },
  // Fix getAnalyticsSummary method
  {
    search: 'return {\n        totalUsers: 150,\n        totalQuestions: 45,\n        totalAnswers: 120,\n        totalPrototypes: 23,\n        activeUsers: 25,\n        period\n      }\n    catch (error) {',
    replace: 'return {\n        totalUsers: 150,\n        totalQuestions: 45,\n        totalAnswers: 120,\n        totalPrototypes: 23,\n        activeUsers: 25,\n        period\n      }\n    } catch (error) {'
  },
  // Fix getUserAnalytics method
  {
    search: 'return {\n        questionsAsked: 5,\n        answersProvided: 12,\n        prototypesShared: 2,\n        reputation: 150,\n        period\n      }\n    catch (error) {',
    replace: 'return {\n        questionsAsked: 5,\n        answersProvided: 12,\n        prototypesShared: 2,\n        reputation: 150,\n        period\n      }\n    } catch (error) {'
  },
  // Fix getPopularContent method
  {
    search: 'return [\n        { id: \'1\', title: \'Popular Question 1\', type: \'question\', views: 150 },\n        { id: \'2\', title: \'Popular Prototype 1\', type: \'prototype\', views: 89 }\n      ]\n    } catch (error) {',
    replace: 'return [\n        { id: \'1\', title: \'Popular Question 1\', type: \'question\', views: 150 },\n        { id: \'2\', title: \'Popular Prototype 1\', type: \'prototype\', views: 89 }\n      ]\n    } catch (error) {'
  }
];

// Apply all fixes
fixes.forEach(fix => {
  content = content.replace(fix.search, fix.replace);
});

fs.writeFileSync(filePath, content);
console.log('✅ Fixed all database service syntax errors');
