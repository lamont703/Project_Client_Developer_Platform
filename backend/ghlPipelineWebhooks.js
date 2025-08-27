// Import the database connection from db.js
const { supabase } = require('./db');

// This file is intended to maintain a connection between the GoHighLevel pipeline and the database through webhooks. Use the webhook to update the database with the latest pipeline data.
// The webhook will be triggered when a new opportunity is created in the pipeline.
// The webhook will be triggered when an opportunity is updated in the pipeline.
// The webhook will be triggered when an opportunity is deleted in the pipeline.