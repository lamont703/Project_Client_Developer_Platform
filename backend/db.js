const { createClient } = require('@supabase/supabase-js');

const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function saveTokensToDatabase(locationId, accessToken, refreshToken, expiresIn) {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    try {
        const { data, error } = await supabase
            .from('ghl_integrations')
            .upsert({
                location_id: locationId,
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_at: expiresAt
            }, { onConflict: 'location_id' });

        if (error) throw error;
        console.log('Tokens saved to database successfully');
    } catch (error) {
        console.error('Error saving tokens to database:', error);
    }
}

// Transform camelCase to snake_case for database compatibility
function transformJobDataForDatabase(jobData) {
    return {
        title: jobData.title,
        category: jobData.category,
        target_audience: jobData.targetAudience,
        description: jobData.description,
        key_features: jobData.keyFeatures,
        technology_stack: jobData.technologyStack,
        budget: jobData.budget,
        timeline: jobData.timeline,
        success_criteria: jobData.successCriteria,
        potential_challenges: jobData.potentialChallenges
    };
}

async function insertJobDraft(jobData) {
    console.log('Inserting job draft into job_drafts table:', jobData);
    
    // Transform the data to match database schema
    const transformedData = transformJobDataForDatabase(jobData);
    console.log('Transformed data for database:', transformedData);
    
    try {
        const { data, error } = await supabase
            .from('job_drafts')
            .insert([transformedData]);

        if (error) {
            console.error('Error returned from Supabase:', error);
            throw error;
        }

        console.log('Job draft successfully inserted into Supabase:', data);
        return data;
    } catch (error) {
        console.error('Error during insertion into Supabase:', error);
        throw error;
    }
}

module.exports = {
  saveTokensToDatabase,
  insertJobDraft
};