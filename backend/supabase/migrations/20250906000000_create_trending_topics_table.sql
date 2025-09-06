-- Create trending topics table for AI monitoring service
CREATE TABLE IF NOT EXISTS trending_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    frequency INTEGER NOT NULL DEFAULT 1,
    sentiment VARCHAR(20) NOT NULL DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    trending_up BOOLEAN NOT NULL DEFAULT true,
    related_questions UUID[] DEFAULT '{}',
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_trending_topics_topic ON trending_topics(topic);
CREATE INDEX IF NOT EXISTS idx_trending_topics_frequency ON trending_topics(frequency DESC);
CREATE INDEX IF NOT EXISTS idx_trending_topics_last_seen ON trending_topics(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_trending_topics_trending_up ON trending_topics(trending_up);

-- Create unique constraint on topic to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_trending_topics_unique_topic ON trending_topics(topic);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_trending_topics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER trigger_update_trending_topics_updated_at
    BEFORE UPDATE ON trending_topics
    FOR EACH ROW
    EXECUTE FUNCTION update_trending_topics_updated_at();

-- Insert some initial trending topics based on existing questions
INSERT INTO trending_topics (topic, frequency, sentiment, trending_up, related_questions)
SELECT 
    unnest(tags) as topic,
    1 as frequency,
    'neutral' as sentiment,
    true as trending_up,
    ARRAY[id] as related_questions
FROM questions 
WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
ON CONFLICT (topic) DO UPDATE SET
    frequency = trending_topics.frequency + 1,
    last_seen = NOW(),
    related_questions = array_cat(trending_topics.related_questions, EXCLUDED.related_questions),
    updated_at = NOW();

-- Enable RLS (Row Level Security)
ALTER TABLE trending_topics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations on trending_topics for authenticated users" ON trending_topics
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow read access for anonymous users
CREATE POLICY "Allow read access on trending_topics for anonymous users" ON trending_topics
    FOR SELECT USING (true);
