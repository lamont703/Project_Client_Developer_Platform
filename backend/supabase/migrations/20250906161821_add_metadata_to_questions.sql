-- Add metadata field to questions table
-- This field will store additional information about AI-generated questions

ALTER TABLE questions 
ADD COLUMN metadata JSONB DEFAULT '{}';

-- Add comment to explain the field
COMMENT ON COLUMN questions.metadata IS 'Additional metadata for questions, including AI generation info, engagement type, persona details, etc.';

-- Create an index on metadata for better query performance
CREATE INDEX idx_questions_metadata ON questions USING GIN (metadata);

-- Update existing AI-generated questions to have empty metadata
UPDATE questions 
SET metadata = '{}' 
WHERE metadata IS NULL;
