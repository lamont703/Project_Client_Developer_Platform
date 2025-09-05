-- Create AI user for community member service
INSERT INTO "public"."users" (
    "id", 
    "name", 
    "email", 
    "is_ai", 
    "reputation",
    "questions_asked",
    "answers_provided",
    "prototypes_shared"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    'AI Community Assistant',
    'ai@protohub.com',
    true,
    1000,
    0,
    0,
    0
) ON CONFLICT (id) DO NOTHING;
