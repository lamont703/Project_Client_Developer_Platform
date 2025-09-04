-- Remove views column from answers table (it should be on questions table)
-- Migration: 20250904022500_remove_views_from_answers.sql

-- Remove views column from answers table
ALTER TABLE answers DROP COLUMN IF EXISTS views;

-- Drop the index we created for answers views
DROP INDEX IF EXISTS idx_answers_views; 