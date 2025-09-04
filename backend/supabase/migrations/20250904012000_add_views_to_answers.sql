-- Add views column to answers table
-- Migration: 20250904012000_add_views_to_answers.sql

-- Add views column to answers table
ALTER TABLE answers ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create index for views column for better performance
CREATE INDEX IF NOT EXISTS idx_answers_views ON answers(views DESC);

-- Update existing answers to have 0 views (if any exist)
UPDATE answers SET views = 0 WHERE views IS NULL; 