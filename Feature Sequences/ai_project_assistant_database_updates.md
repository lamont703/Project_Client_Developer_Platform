# Database Updates for AI Project Assistant Implementation

## Overview
Based on the AI Project Assistant sequence diagram, we've updated the Supabase database schema to support developer attribution tracking, session management, and enhanced analytics for the AI assistant workflow.

## Applied Migrations

### 1. **20250830153702_add_developer_attribution_to_job_drafts.sql**
**Table:** `job_drafts`
**Purpose:** Add developer attribution and AI-generated content fields

**New Columns:**
- `developer_ref` (VARCHAR(255)) - Developer reference for attribution tracking
- `source` (VARCHAR(100)) - Source of the job draft (email, ai_assistant, manual)
- `session_id` (VARCHAR(255)) - Unique session identifier
- `public_status` (VARCHAR(50)) - Current status (draft, posted, in_progress, completed)
- `generated_title` (TEXT) - AI-generated title
- `generated_skills` (TEXT[]) - AI-generated skills array
- `generated_milestones` (TEXT[]) - AI-generated milestones array
- `estimated_budget_range` (JSONB) - Min/max budget estimates
- `estimated_timeline` (VARCHAR(100)) - AI-estimated timeline
- `completion_score` (INTEGER) - Draft completion score (0-100)
- `ghl_opportunity_id` (VARCHAR(255)) - GoHighLevel opportunity ID
- `wireframe_url` (VARCHAR(500)) - Generated wireframe URL
- `github_pages_url` (VARCHAR(500)) - GitHub Pages deployment URL

### 2. **20250830153703_add_developer_attribution_to_analytics.sql**
**Table:** `analytics`
**Purpose:** Enhance analytics tracking with developer attribution

**New Columns:**
- `developer_ref` (VARCHAR(255)) - Developer reference for attribution
- `source` (VARCHAR(100)) - Source of the analytics event
- `attribution_chain` (VARCHAR(500)) - Chain of attribution
- `job_draft_id` (BIGINT) - Reference to job_drafts table
- `slot_name` (VARCHAR(100)) - Name of slot being filled
- `completion_score` (INTEGER) - Completion score at time of event

**New Foreign Key:**
- `fk_analytics_job_draft_id` - Links analytics to job_drafts

### 3. **20250830153704_add_developer_attribution_to_ghl_opportunities.sql**
**Table:** `ghl_opportunities`
**Purpose:** Add developer attribution to GoHighLevel opportunities

**New Columns:**
- `developer_ref` (VARCHAR(255)) - Developer reference for attribution
- `source` (VARCHAR(100)) - Source of the opportunity
- `job_draft_id` (BIGINT) - Reference to job_drafts table
- `session_id` (VARCHAR(255)) - Session identifier
- `attribution_chain` (VARCHAR(500)) - Chain of attribution

**New Foreign Key:**
- `fk_ghl_opportunities_job_draft_id` - Links opportunities to job_drafts

### 4. **20250830153705_create_ai_assistant_sessions.sql**
**Table:** `ai_assistant_sessions` (NEW)
**Purpose:** Track AI assistant sessions for developer attribution

**Columns:**
- `id` (UUID) - Primary key
- `session_id` (VARCHAR(255)) - Unique session identifier
- `developer_ref` (VARCHAR(255)) - Developer reference
- `source` (VARCHAR(100)) - Source of session
- `user_id` (UUID) - Reference to users table (nullable)
- `session_data` (JSONB) - Session state data
- `current_slot_index` (INTEGER) - Current slot in conversation
- `completion_score` (INTEGER) - Session completion score
- `is_active` (BOOLEAN) - Session active status
- `started_at` (TIMESTAMP) - Session start time
- `last_activity_at` (TIMESTAMP) - Last activity time
- `ended_at` (TIMESTAMP) - Session end time (nullable)
- `created_at` (TIMESTAMP) - Record creation time
- `updated_at` (TIMESTAMP) - Record update time

## Key Features Supported

### 1. **Developer Attribution Tracking**
- Track which developer referred users to the AI assistant
- Monitor conversion rates and attribution chains
- Link all activities back to the referring developer

### 2. **Session Management**
- Persistent session tracking across the AI assistant workflow
- Session state management with JSONB storage
- Activity tracking and session lifecycle management

### 3. **Enhanced Analytics**
- Detailed event tracking with developer attribution
- Slot-level analytics for conversation flow
- Completion score tracking throughout the process

### 4. **AI-Generated Content Storage**
- Store AI-generated titles, skills, and milestones
- Track budget and timeline estimates
- Link generated content to job drafts

### 5. **Integration Support**
- GoHighLevel opportunity linking
- Wireframe and GitHub Pages URL storage
- Public status tracking for job postings

## Database Relationships

```
users
  ↓ (user_id)
ai_assistant_sessions
  ↓ (session_id)
job_drafts
  ↓ (job_draft_id)
analytics
  ↓ (job_draft_id)
ghl_opportunities
```

## Indexes Created
- Performance indexes on all developer_ref, source, and session_id columns
- Composite indexes for common query patterns
- Full-text search indexes where appropriate

## Row Level Security (RLS)
- All tables have appropriate RLS policies
- Users can only access their own data
- Anonymous sessions are supported for the AI assistant

## Next Steps
1. Update frontend code to use the new database schema
2. Implement session management in the AI assistant
3. Add analytics tracking with developer attribution
4. Update backend controllers to handle the new fields
5. Test the complete workflow with developer attribution 