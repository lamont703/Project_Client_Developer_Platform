const { 
    insertOpportunity, 
    updateOpportunity, 
    deleteOpportunity, 
    updateOpportunityStage,
    opportunityExists 
} = require('../db');
const logger = require('../config/logger');

// Map GoHighLevel webhook fields to database fields
function mapGoHighLevelFields(webhookData) {
    logger.info('Mapping GoHighLevel webhook fields to database fields');
    
    const mappedData = {
        opportunity_id: webhookData.id || webhookData.opportunity_id,
        name: webhookData.opportunity_name || webhookData.name,
        status: webhookData.status,
        monetary_value: webhookData.lead_value || webhookData.monetary_value,
        contact_id: webhookData.contact_id,
        pipeline_id: webhookData.pipeline_id,
        pipeline_stage_id: webhookData.pipleline_stage || webhookData.pipeline_stage_id,
        assigned_to: webhookData.assigned_to || webhookData.assignedTo,
        created_at: webhookData.date_created || webhookData.created_at || new Date().toISOString(),
        updated_at: webhookData.updated_at || new Date().toISOString()
    };
    
    // Log the mapping
    logger.info('Field mapping:', {
        'GoHighLevel field': 'Database field',
        'id': mappedData.opportunity_id,
        'opportunity_name': mappedData.name,
        'status': mappedData.status,
        'lead_value': mappedData.monetary_value,
        'pipleline_stage': mappedData.pipeline_stage_id
    });
    
    return mappedData;
}

// Handle opportunity creation
async function handleOpportunityCreated(webhookData) {
    try {
        const mappedData = mapGoHighLevelFields(webhookData);
        logger.info(`Creating opportunity ${mappedData.opportunity_id} in database`);
        
        // Use database function to insert opportunity
        const result = await insertOpportunity(mappedData);
        
        logger.info(`Opportunity ${mappedData.opportunity_id} created successfully in database`);
        return result;
    } catch (error) {
        logger.error('Error handling opportunity creation:', error);
        throw error;
    }
}

// Handle opportunity updates
async function handleOpportunityUpdated(webhookData) {
    try {
        const mappedData = mapGoHighLevelFields(webhookData);
        const { opportunity_id } = mappedData;
        
        logger.info(`Updating opportunity ${opportunity_id} in database`);
        
        // Use database function to update opportunity
        const result = await updateOpportunity(opportunity_id, mappedData);
        
        logger.info(`Opportunity ${opportunity_id} updated successfully in database`);
        return result;
    } catch (error) {
        logger.error('Error handling opportunity update:', error);
        throw error;
    }
}

// Handle opportunity deletion
async function handleOpportunityDeleted(webhookData) {
    try {
        const mappedData = mapGoHighLevelFields(webhookData);
        const { opportunity_id } = mappedData;
        
        logger.info(`Deleting opportunity ${opportunity_id} from database`);
        
        // Use database function to delete opportunity
        const result = await deleteOpportunity(opportunity_id);
        
        logger.info(`Opportunity ${opportunity_id} deleted successfully from database`);
        return result;
    } catch (error) {
        logger.error('Error handling opportunity deletion:', error);
        throw error;
    }
}

// Handle opportunity stage changes
async function handleOpportunityStageChanged(webhookData) {
    try {
        const mappedData = mapGoHighLevelFields(webhookData);
        const { opportunity_id, pipeline_stage_id, status, updated_at } = mappedData;
        
        logger.info(`Changing stage for opportunity ${opportunity_id} to ${pipeline_stage_id}`);
        
        // Use database function to update opportunity stage
        const result = await updateOpportunityStage(opportunity_id, {
            pipeline_stage_id,
            status,
            updated_at
        });
        
        logger.info(`Opportunity ${opportunity_id} stage changed to ${pipeline_stage_id}`);
        return result;
    } catch (error) {
        logger.error('Error handling opportunity stage change:', error);
        throw error;
    }
}

// Sync pipeline data with database
async function syncPipelineData(webhookData) {
    try {
        // You can add additional logic here to sync other pipeline-related data
        // such as contacts, deals, or pipeline stages
        
        logger.info('Pipeline data synced successfully');
        return true;
    } catch (error) {
        logger.error('Error syncing pipeline data:', error);
        throw error;
    }
}

// Process webhook data and route to appropriate handler
async function processWebhook(webhookData) {
    try {
        // GoHighLevel might send data in different structures
        // Try to extract the actual opportunity data from various possible locations
        let actualData = webhookData;
        
        // Check if data is nested in a 'data' property
        if (webhookData.data) {
            actualData = webhookData.data;
            logger.info('Using data from webhookData.data property');
        }
        
        // Check if data is nested in a 'payload' property
        if (webhookData.payload) {
            actualData = webhookData.payload;
            logger.info('Using data from webhookData.payload property');
        }
        
        // Check if data is nested in an 'opportunity' property
        if (webhookData.opportunity) {
            actualData = webhookData.opportunity;
            logger.info('Using data from webhookData.opportunity property');
        }
        
        // Log the actual data we're working with
        logger.info('Actual data being processed:', JSON.stringify(actualData, null, 2));
        
        // Extract opportunity_id from the actual data
        // GoHighLevel uses 'id' as the standard field
        const opportunity_id = actualData.id || 
                              actualData.opportunity_id || 
                              actualData.opportunityId;
        
        // If no opportunity_id found, this might be a contact-only webhook
        if (!opportunity_id) {
            logger.info('No opportunity_id found - this appears to be a contact-only webhook');
            return {
                success: true,
                message: 'Contact-only webhook processed (no opportunity data)',
                webhook_type: 'contact',
                received_data: webhookData
            };
        }
        
        // Determine event type based on the data
        let event_type = 'opportunity.updated'; // Default to update
        
        // Check if this looks like a new opportunity
        if (opportunity_id) {
            const exists = await opportunityExists(opportunity_id);
            if (!exists) {
                event_type = 'opportunity.created';
                logger.info(`Inferred event_type as 'opportunity.created' (new opportunity)`);
            } else {
                // Check if status or stage changed
                if (actualData.status || actualData.pipleline_stage || actualData.pipeline_stage_id) {
                    event_type = 'opportunity.updated';
                    logger.info(`Inferred event_type as 'opportunity.updated' (existing opportunity with changes)`);
                } else {
                    event_type = 'opportunity.updated';
                    logger.info(`Inferred event_type as 'opportunity.updated' (existing opportunity)`);
                }
            }
        }
        
        logger.info(`Extracted event_type: ${event_type}`);
        logger.info(`Extracted opportunity_id: ${opportunity_id}`);

        // Handle different event types
        switch (event_type) {
            case 'opportunity.created':
                logger.info('Handling opportunity.created event');
                await handleOpportunityCreated(actualData);
                break;
            case 'opportunity.updated':
                logger.info('Handling opportunity.updated event');
                await handleOpportunityUpdated(actualData);
                break;
            case 'opportunity.deleted':
                logger.info('Handling opportunity.deleted event');
                await handleOpportunityDeleted(actualData);
                break;
            case 'opportunity.stage_changed':
                logger.info('Handling opportunity.stage_changed event');
                await handleOpportunityStageChanged(actualData);
                break;
            default:
                logger.info(`Unhandled event type: ${event_type}`);
        }

        // Update the database with the latest pipeline data
        await syncPipelineData(actualData);

        return {
            success: true,
            event_type,
            opportunity_id,
            message: 'Webhook processed successfully'
        };

    } catch (error) {
        logger.error('Error processing webhook:', error);
        throw error;
    }
}

// Get webhook health status
function getWebhookHealth() {
    return {
        success: true,
        message: 'GoHighLevel webhook endpoint is healthy',
        timestamp: new Date().toISOString(),
        server_time: new Date().toISOString(),
        endpoint: '/api/webhooks/ghl/opportunities-update'
    };
}

// Test webhook functionality
function testWebhook(webhookData) {
    logger.info('Test webhook received');
    return {
        success: true,
        message: 'Test webhook received successfully',
        received_data: webhookData,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    processWebhook,
    handleOpportunityCreated,
    handleOpportunityUpdated,
    handleOpportunityDeleted,
    handleOpportunityStageChanged,
    syncPipelineData,
    getWebhookHealth,
    testWebhook
}; 