# ProtoHub Analytics Tracking Implementation

## Overview

This document outlines the comprehensive Google Analytics tracking implementation for the ProtoHub platform. All user interactions are tracked to provide detailed insights into platform usage and user engagement.

## Analytics Categories

### 1. ProtoHub Questions (`proto_hub_questions`)

**Events Tracked:**

- `question_viewed` - When a user views a question
- `question_created` - When a user creates a new question
- `question_voted` - When a user votes on a question (up/down)
- `question_search` - When a user searches for questions
- `question_filtered` - When a user filters questions
- `question_sorted` - When a user sorts questions

**Metadata Captured:**

- Question ID, title, author, tags
- Vote direction, previous votes, new votes
- Search terms, results count, filters applied
- Sort method, results count

### 2. ProtoHub Answers (`proto_hub_answers`)

**Events Tracked:**

- `answer_viewed` - When a user views an answer
- `answer_created` - When a user creates a new answer
- `answer_voted` - When a user votes on an answer (up/down)
- `answer_accepted` - When an answer is marked as accepted

**Metadata Captured:**

- Question ID, answer ID, author
- Answer length, AI-generated flag
- Vote direction, previous votes, new votes

### 3. ProtoHub Prototypes (`proto_hub_prototypes`)

**Events Tracked:**

- `prototype_viewed` - When a user views a prototype
- `prototype_created` - When a user creates a new prototype
- `prototype_liked` - When a user likes a prototype
- `prototype_shared` - When a user shares a prototype
- `prototype_gallery_opened` - When user opens prototype gallery

**Metadata Captured:**

- Prototype ID, title, author, tags, technologies
- Previous likes, new likes
- Share method

### 4. ProtoHub Users (`proto_hub_users`)

**Events Tracked:**

- `user_profile_viewed` - When a user views another user's profile
- `user_reputation_changed` - When user reputation changes
- `user_followed` - When a user follows another user

**Metadata Captured:**

- User ID, profile type (question_author, answer_author, prototype_author)
- Previous reputation, new reputation, reason for change

### 5. ProtoHub Moderation (`proto_hub_moderation`)

**Events Tracked:**

- `content_reported` - When content is reported
- `content_flagged` - When content is flagged

**Metadata Captured:**

- Content type (question, answer, prototype)
- Content ID, reason, flag type

### 6. ProtoHub Navigation (`proto_hub_navigation`)

**Events Tracked:**

- `navigation` - When user navigates between pages
- `tab_switched` - When user switches tabs

**Metadata Captured:**

- From page, to page, navigation method
- Tab name, previous tab

### 7. ProtoHub Forms (`proto_hub_forms`)

**Events Tracked:**

- `form_started` - When user starts filling a form
- `form_completed` - When user successfully completes a form
- `form_abandoned` - When user abandons a form

**Metadata Captured:**

- Form type (question, answer, prototype, report)
- Success status, time spent, fields completed

### 8. ProtoHub Performance (`proto_hub_performance`)

**Events Tracked:**

- `page_load_time` - Page load performance
- `api_response_time` - API response performance

**Metadata Captured:**

- Page name, load time in milliseconds
- Endpoint, response time, success status

### 9. ProtoHub Errors (`proto_hub_errors`)

**Events Tracked:**

- `error_occurred` - When any error occurs
- `validation_error` - When form validation fails

**Metadata Captured:**

- Error type, error message, context
- Form type, field name, validation message

### 10. ProtoHub Session (`proto_hub_session`)

**Events Tracked:**

- `session_started` - When user session begins
- `session_ended` - When user session ends

**Metadata Captured:**

- Session ID, duration, events count

### 11. ProtoHub Features (`proto_hub_features`)

**Events Tracked:**

- `feature_used` - When user uses a specific feature

**Metadata Captured:**

- Feature name, additional metadata

### 12. ProtoHub AI (`proto_hub_ai`)

**Events Tracked:**

- `ai_response_generated` - When AI generates a response
- `ai_interaction` - When user interacts with AI

**Metadata Captured:**

- Question ID, response time, response length
- Interaction type, additional metadata

## Implementation Details

### Frontend Integration

- All components import `Analytics` from `../../utils/analytics`
- Analytics calls are made at key user interaction points
- Fallback tracking for offline/error scenarios
- Comprehensive error tracking for debugging

### Google Analytics Integration

- Events sent to Google Analytics via `gtag`
- Debug logging in development environment
- Event categorization for easy filtering
- Rich metadata for detailed analysis

### Data Privacy

- No personally identifiable information tracked
- Session-based tracking with unique session IDs
- Local storage for offline event caching
- Configurable analytics enable/disable

## Usage Examples

### Question View Tracking

```typescript
Analytics.getInstance().trackQuestionViewed(questionId, questionTitle, {
  question_author: question.author.name,
  question_tags: question.tags,
  question_votes: question.votes,
  question_answers: question.answers,
});
```

### Answer Creation Tracking

```typescript
Analytics.getInstance().trackAnswerCreated(
  questionId,
  answerId,
  answerLength,
  isAI
);
```

### Prototype Like Tracking

```typescript
Analytics.getInstance().trackPrototypeLiked(
  prototypeId,
  previousLikes,
  newLikes
);
```

## Analytics Dashboard Setup

### Google Analytics 4 Configuration

1. Create custom dimensions for:

   - Question ID
   - Answer ID
   - Prototype ID
   - User ID
   - Content Type
   - Vote Direction

2. Create custom metrics for:

   - Vote Count Changes
   - Form Completion Time
   - Page Load Time
   - API Response Time

3. Set up conversion events for:
   - Question Creation
   - Answer Submission
   - Prototype Creation
   - User Registration

### Key Performance Indicators (KPIs)

- **Engagement**: Questions viewed, answers created, prototypes shared
- **Quality**: Vote ratios, accepted answers, user reputation
- **Growth**: New users, content creation rate, session duration
- **Performance**: Page load times, API response times, error rates

## Benefits

- **User Behavior Insights**: Understand how users interact with the platform
- **Content Performance**: Identify popular questions, answers, and prototypes
- **Feature Usage**: Track which features are most/least used
- **Error Monitoring**: Identify and fix issues quickly
- **Performance Optimization**: Monitor and improve platform performance
- **Growth Analysis**: Track user engagement and platform growth
