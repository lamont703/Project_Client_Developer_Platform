# Proto Hub Sequence Diagram Documentation

## Overview

This document describes the sequence diagram for the Proto Hub feature, which is a community-based Q&A forum for software prototyping education and collaboration.

## Updated Sequence Diagram Changes

### Key Updates Made:

1. **Component Structure**: Updated to reflect actual React component names
2. **Utility Classes**: Added specific utility classes we implemented
3. **State Management**: Reflected the useMemo pattern for sample data
4. **Analytics Integration**: Updated to use proper trackEvent methods

### Participant Updates:

#### Frontend Components:

- **ProtoHub**: Main React component for the Q&A forum
- **PrototypeShowcase**: React component for prototype gallery
- **AskQuestion**: Modal component for submitting questions
- **AddPrototype**: Modal component for submitting prototypes

#### Utility Classes:

- **QuestionSystem**: Singleton utility class for question management
- **PrototypeShowcase**: Singleton utility class for prototype management
- **AICommunityMember**: Singleton utility class for AI interactions
- **Analytics**: Singleton utility class for event tracking

#### Backend Services:

- **Backend Server**: Express.js server
- **Routes**: API route handlers
- **Controllers**: Business logic controllers
- **Database**: Supabase database
- **URL Validator**: Service for validating GitHub URLs
- **GitHub Pages**: External service for hosting prototypes

## Sequence Flow

### 1. Session Initialization

```
User → ProtoHub: Open Proto Hub
ProtoHub → Analytics: trackEvent('proto_hub_opened')
ProtoHub → QuestionSystem: initQuestionSystem()
QuestionSystem → Local Storage: loadCachedQuestions()
QuestionSystem → ProtoHub: questions list
ProtoHub → User: Display questions grid/list
```

### 2. Question Browsing & Filtering

```
User → ProtoHub: Browse questions
ProtoHub → QuestionSystem: loadQuestions()
QuestionSystem → Local Storage: getCachedQuestions()
QuestionSystem → ProtoHub: questions list
ProtoHub → User: Display questions grid/list

User → ProtoHub: Search questions / Apply filters
ProtoHub → QuestionSystem: filterQuestions(searchTerm, tags, sortBy)
QuestionSystem → Local Storage: updateFilters(state)
QuestionSystem → ProtoHub: filtered results
ProtoHub → User: Update question display
```

### 3. Question Detail View

```
User → ProtoHub: Click on question
ProtoHub → QuestionSystem: loadQuestionDetail(questionId)
QuestionSystem → Local Storage: getQuestionData(questionId)
QuestionSystem → ProtoHub: question details + answers
ProtoHub → User: Show question detail view
```

### 4. Answer Interactions

```
User → ProtoHub: Like answer / View answer
ProtoHub → QuestionSystem: handleAnswerInteraction(action, answerId)
QuestionSystem → Local Storage: updateAnswerStats()
QuestionSystem → ProtoHub: updated stats
ProtoHub → Analytics: trackEvent('answer_interaction', {action})
```

### 5. Question Submission Flow

```
User → ProtoHub: Click "Ask Question"
ProtoHub → AskQuestion: openAskQuestionModal()
AskQuestion → User: Show question form

User → AskQuestion: Fill question form (title, content, tags)
AskQuestion → URL Validator: validateQuestionData(formData)
URL Validator → AskQuestion: validation result

[If Validation Passed]
AskQuestion → Local Storage: saveQuestionDraft(formData)
AskQuestion → Backend Server: POST /api/questions (questionData)
Backend Server → Analytics: analytics middleware (question_submitted)
Backend Server → Routes: route to /api/questions
Routes → Controllers: questionController.createQuestion()
Controllers → Database: insertQuestion(questionData)
Database → Controllers: questionId created
Controllers → AICommunityMember: generateAIResponse(questionData)
AICommunityMember → Controllers: aiResponse generated
Controllers → Database: insertAnswer(aiResponse)
Database → Controllers: answerId created
Controllers → Routes: success response
Routes → Backend Server: 201 Created {questionId, answerId}
Backend Server → AskQuestion: 201 Created {questionId, answerId}
AskQuestion → Analytics: trackEvent('question_published')
AskQuestion → User: Show success message
AskQuestion → ProtoHub: closeModal()
ProtoHub → QuestionSystem: refreshQuestions()
QuestionSystem → ProtoHub: updated questions list
ProtoHub → User: Display new question

[If Validation Failed]
AskQuestion → User: Show validation errors
```

### 6. Prototype Showcase Flow

```
User → ProtoHub: Click "View Prototypes"
ProtoHub → PrototypeShowcase: openPrototypeShowcase()
PrototypeShowcase → PrototypeShowcase Utility: initPrototypeShowcase()
PrototypeShowcase Utility → Local Storage: loadCachedPrototypes()
PrototypeShowcase Utility → PrototypeShowcase: prototypes list
PrototypeShowcase → User: Show prototype gallery
```

### 7. Prototype Browsing & Filtering

```
User → PrototypeShowcase: Browse prototypes
PrototypeShowcase → PrototypeShowcase Utility: loadPrototypes()
PrototypeShowcase Utility → Local Storage: getCachedPrototypes()
PrototypeShowcase Utility → PrototypeShowcase: prototypes list
PrototypeShowcase → User: Display prototype grid/list

User → PrototypeShowcase: Filter by category / Search
PrototypeShowcase → PrototypeShowcase Utility: filterPrototypes(searchTerm, tags, sortBy)
PrototypeShowcase Utility → Local Storage: updatePrototypeFilters()
PrototypeShowcase Utility → PrototypeShowcase: filtered results
PrototypeShowcase → User: Filtered prototype results
```

### 8. Prototype Interactions

```
User → PrototypeShowcase: Like prototype / View prototype
PrototypeShowcase → PrototypeShowcase Utility: handlePrototypeInteraction(action, prototypeId)
PrototypeShowcase Utility → Local Storage: updatePrototypeStats()
PrototypeShowcase Utility → PrototypeShowcase: updated stats
PrototypeShowcase → Analytics: trackEvent('prototype_interaction', {action})
```

### 9. View Live Prototype

```
User → PrototypeShowcase: Click "View Prototype"
PrototypeShowcase → URL Validator: validateGitHubPagesUrl(url)
URL Validator → PrototypeShowcase: validation result

[If Valid URL]
PrototypeShowcase → GitHub Pages: openInNewTab(githubPagesUrl)
GitHub Pages → User: Load prototype in new tab
PrototypeShowcase → Analytics: trackEvent('prototype_viewed', {prototypeId})

[If Invalid URL]
PrototypeShowcase → User: Show error message
```

### 10. Prototype Submission Flow

```
User → PrototypeShowcase: Click "Share Your Prototype"
PrototypeShowcase → AddPrototype: openAddPrototypeModal()
AddPrototype → User: Show prototype submission form

User → AddPrototype: Fill prototype form (title, description, githubPagesUrl, githubRepoUrl, technologies, tags, status)
AddPrototype → URL Validator: validatePrototypeData(formData)
URL Validator → AddPrototype: validation result

[If Validation Passed]
AddPrototype → Local Storage: savePrototypeDraft(formData)
AddPrototype → Backend Server: POST /api/prototypes (prototypeData)
Backend Server → Analytics: analytics middleware (prototype_submitted)
Backend Server → Routes: route to /api/prototypes
Routes → Controllers: prototypeController.createPrototype()
Controllers → Database: insertPrototype(prototypeData)
Database → Controllers: prototypeId created
Controllers → URL Validator: validateGitHubPagesUrl(githubPagesUrl)
URL Validator → Controllers: url validation result

[If URL is Valid]
Controllers → Database: updatePrototypeStatus(prototypeId, "live")
Database → Controllers: status updated

[If URL is Invalid]
Controllers → Database: updatePrototypeStatus(prototypeId, "development")
Database → Controllers: status updated

Controllers → Routes: success response
Routes → Backend Server: 201 Created {prototypeId}
Backend Server → AddPrototype: 201 Created {prototypeId}
AddPrototype → Analytics: trackEvent('prototype_published')
AddPrototype → User: Show success message
AddPrototype → PrototypeShowcase: closeModal()
PrototypeShowcase → PrototypeShowcase Utility: refreshPrototypes()
PrototypeShowcase Utility → PrototypeShowcase: updated prototypes list
PrototypeShowcase → User: Display new prototype

[If Validation Failed]
AddPrototype → User: Show validation errors
```

### 11. AI Community Member Interactions

```
[Loop: AI Community Engagement]
AICommunityMember → QuestionSystem: monitorNewQuestions()
QuestionSystem → AICommunityMember: new question detected
AICommunityMember → AICommunityMember: analyzeQuestion(questionData)
AICommunityMember → AICommunityMember: generateHelpfulResponse()
AICommunityMember → Controllers: postAIResponse(questionId, response)
Controllers → Database: insertAnswer(aiResponse)
Database → Controllers: answerId created
AICommunityMember → Analytics: trackEvent('ai_response_posted')
```

### 12. Community Moderation

```
[Optional: Moderation needed]
User → ProtoHub: Report inappropriate content
ProtoHub → Backend Server: POST /api/reports (reportData)
Backend Server → Analytics: analytics middleware (content_reported)
Backend Server → Routes: route to /api/reports
Routes → Controllers: moderationController.createReport()
Controllers → Database: insertReport(reportData)
Database → Controllers: reportId created
Controllers → Routes: success response
Routes → Backend Server: 201 Created {reportId}
Backend Server → ProtoHub: 201 Created {reportId}
ProtoHub → User: Show confirmation message
```

### 13. User Profile & Session Management

```
User → ProtoHub: Update profile / View reputation
ProtoHub → Local Storage: getUserProfile()
Local Storage → ProtoHub: profile data
ProtoHub → User: Display profile information

ProtoHub → Local Storage: saveUserState(currentState)
Local Storage → ProtoHub: state saved

ProtoHub → Analytics: trackUserJourney(actions)
Analytics → ProtoHub: analytics processed
```

## Implementation Notes

### Frontend State Management:

- Uses `useMemo` for sample data to prevent infinite re-renders
- Local state management with React hooks
- Persistent state in localStorage

### Utility Classes:

- **QuestionSystem**: Manages questions, answers, filters, and validation
- **PrototypeShowcase**: Manages prototypes, filters, and URL validation
- **AICommunityMember**: Simulates AI interactions and responses
- **Analytics**: Comprehensive event tracking and Google Analytics integration

### Component Architecture:

- Modular React components with clear separation of concerns
- Modal components for forms and interactions
- Responsive design with mobile-first approach

### Data Flow:

- Client-side state management with utility classes
- Server-side persistence with Supabase
- Real-time updates through local state
- Analytics tracking throughout user journey

## File Structure

```
proto_hub_sequence.puml          # Updated sequence diagram
proto_hub_sequence.png           # Generated PNG image
proto_hub_sequence_documentation.md  # This documentation
```

## Generated Files

- **proto_hub_sequence.png**: Visual representation of the sequence flow
- **proto_hub_sequence.puml**: PlantUML source code for the diagram

The sequence diagram now accurately reflects our actual implementation with proper component names, utility classes, and state management patterns.
