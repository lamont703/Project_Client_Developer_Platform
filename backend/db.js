const { createClient } = require('@supabase/supabase-js');

const dotenv = require('dotenv');
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Save tokens to database
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

// Insert job draft into job_drafts table
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

// Get all jobs from job_drafts table
async function getAllJobs() {
    try {
        const { data, error } = await supabase
            .from('job_drafts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error returned from Supabase:', error);
            throw error;
        }

        console.log('Jobs fetched from Supabase:', data);
        return data;
    } catch (error) {
        console.error('Error fetching jobs from Supabase:', error);
        throw error;
    }
}

// ===== OPPORTUNITY DATABASE OPERATIONS =====

// Insert new opportunity into database
async function insertOpportunity(opportunityData) {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .insert([{
                opportunity_id: opportunityData.opportunity_id,
                name: opportunityData.name,
                status: opportunityData.status,
                monetary_value: opportunityData.monetary_value,
                contact_id: opportunityData.contact_id,
                pipeline_id: opportunityData.pipeline_id,
                pipeline_stage_id: opportunityData.pipeline_stage_id,
                pipeline_stage_name: opportunityData.pipeline_stage_name,
                assigned_to: opportunityData.assigned_to,
                created_at: opportunityData.created_at,
                updated_at: opportunityData.updated_at
            }]);

        if (error) {
            console.error('Error inserting opportunity:', error);
            throw error;
        }

        console.log('Opportunity inserted successfully:', data);
        return data;
    } catch (error) {
        console.error('Error during opportunity insertion:', error);
        throw error;
    }
}

// Update existing opportunity in database
async function updateOpportunity(opportunityId, updateData) {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .update({
                name: updateData.name,
                status: updateData.status,
                monetary_value: updateData.monetary_value,
                contact_id: updateData.contact_id,
                pipeline_id: updateData.pipeline_id,
                pipeline_stage_id: updateData.pipeline_stage_id,
                pipeline_stage_name: updateData.pipeline_stage_name,
                assigned_to: updateData.assigned_to,
                updated_at: updateData.updated_at
            })
            .eq('opportunity_id', opportunityId);

        if (error) {
            console.error('Error updating opportunity:', error);
            throw error;
        }

        console.log('Opportunity updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error during opportunity update:', error);
        throw error;
    }
}

// Delete opportunity from database
async function deleteOpportunity(opportunityId) {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .delete()
            .eq('opportunity_id', opportunityId);

        if (error) {
            console.error('Error deleting opportunity:', error);
            throw error;
        }

        console.log('Opportunity deleted successfully:', data);
        return data;
    } catch (error) {
        console.error('Error during opportunity deletion:', error);
        throw error;
    }
}

// Update opportunity stage in database
async function updateOpportunityStage(opportunityId, stageData) {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .update({
                pipeline_stage_id: stageData.pipeline_stage_id,
                pipeline_stage_name: stageData.pipeline_stage_name,
                status: stageData.status,
                updated_at: stageData.updated_at
            })
            .eq('opportunity_id', opportunityId);

        if (error) {
            console.error('Error updating opportunity stage:', error);
            throw error;
        }

        console.log('Opportunity stage updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error during opportunity stage update:', error);
        throw error;
    }
}

// Get opportunity by ID
async function getOpportunityById(opportunityId) {
    try {
        console.log('Fetching opportunity with ID:', opportunityId);
        
        // Use a simple query approach
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .select('*')
            .eq('id', opportunityId);

        console.log('Supabase response:', { data, error });

        if (error) {
            console.error('Error fetching opportunity:', error);
            throw error;
        }

        // Check if we got data
        if (!data || data.length === 0) {
            console.log('No opportunity found with ID:', opportunityId);
            return null;
        }

        console.log('Found opportunity:', data[0]);
        return data[0];
    } catch (error) {
        console.error('Error during opportunity fetch:', error);
        throw error;
    }
}

// Get all opportunities
async function getAllOpportunities() {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching opportunities:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error during opportunities fetch:', error);
        throw error;
    }
}

// Check if opportunity exists
async function opportunityExists(opportunityId) {
    try {
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .select('opportunity_id')
            .eq('opportunity_id', opportunityId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            throw error;
        }

        return !!data;
    } catch (error) {
        console.error('Error checking opportunity existence:', error);
        return false;
    }
}

module.exports = {
    // Existing exports
    saveTokensToDatabase,
    insertJobDraft,
    getAllJobs,
    supabase,
    
    // New opportunity exports
    insertOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateOpportunityStage,
    getOpportunityById,
    getAllOpportunities,
    opportunityExists
};