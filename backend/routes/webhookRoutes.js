const express = require('express');
const router = express.Router();
const { supabase } = require('../db');
const logger = require('../config/logger');

// Middleware to verify webhook signature (optional but recommended for security)
const verifyWebhookSignature = (req, res, next) => {
    // You can add webhook signature verification here if GoHighLevel provides it
    // For now, we'll accept all webhooks
    next();
};

// Webhook endpoint for GoHighLevel opportunity updates
router.post('/ghl/opportunities-update', verifyWebhookSignature, async (req, res) => {
    try {
        logger.info('=== WEBHOOK RECEIVED ===');
        logger.info('Request method:', req.method);
        logger.info('Request URL:', req.url);
        logger.info('Request headers:', JSON.stringify(req.headers, null, 2));
        logger.info('Request body:', JSON.stringify(req.body, null, 2));
        logger.info('Request query:', JSON.stringify(req.query, null, 2));
        logger.info('Content-Type:', req.get('Content-Type'));
        logger.info('User-Agent:', req.get('User-Agent'));
        logger.info('========================');

        const webhookData = req.body;
        
        // Check if body is empty or undefined
        if (!webhookData || Object.keys(webhookData).length === 0) {
            logger.warn('Webhook body is empty or undefined');
            return res.status(400).json({
                success: false,
                message: 'Webhook body is empty',
                received_data: webhookData
            });
        }

        logger.info('Processing webhook data:', JSON.stringify(webhookData, null, 2));

        // Extract relevant data from the webhook
        const {
            event_type,
            opportunity_id,
            pipeline_id,
            pipeline_stage_id,
            status,
            name,
            monetary_value,
            contact_id,
            assigned_to,
            created_at,
            updated_at
        } = webhookData;

        logger.info('Extracted data:', {
            event_type,
            opportunity_id,
            pipeline_id,
            pipeline_stage_id,
            status,
            name
        });

        // Handle different event types
        switch (event_type) {
            case 'opportunity.created':
                logger.info('Handling opportunity.created event');
                await handleOpportunityCreated(webhookData);
                break;
            case 'opportunity.updated':
                logger.info('Handling opportunity.updated event');
                await handleOpportunityUpdated(webhookData);
                break;
            case 'opportunity.deleted':
                logger.info('Handling opportunity.deleted event');
                await handleOpportunityDeleted(webhookData);
                break;
            case 'opportunity.stage_changed':
                logger.info('Handling opportunity.stage_changed event');
                await handleOpportunityStageChanged(webhookData);
                break;
            default:
                logger.info(`Unhandled event type: ${event_type}`);
        }

        // Update the database with the latest pipeline data
        await syncPipelineData(webhookData);

        // Send success response
        const response = {
            success: true,
            message: 'Webhook processed successfully',
            event_type,
            opportunity_id,
            timestamp: new Date().toISOString()
        };

        logger.info('Sending success response:', response);
        res.status(200).json(response);

    } catch (error) {
        logger.error('Error processing GoHighLevel webhook:', error);
        logger.error('Error stack:', error.stack);
        
        const errorResponse = {
            success: false,
            message: 'Error processing webhook',
            error: error.message,
            timestamp: new Date().toISOString()
        };
        
        logger.error('Sending error response:', errorResponse);
        res.status(500).json(errorResponse);
    }
});

// Handle opportunity creation
async function handleOpportunityCreated(webhookData) {
    try {
        const { opportunity_id, name, status, monetary_value, contact_id } = webhookData;
        
        logger.info(`Creating opportunity ${opportunity_id} in database`);
        
        // Insert new opportunity into database
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .insert([{
                opportunity_id,
                name,
                status,
                monetary_value,
                contact_id,
                pipeline_id: webhookData.pipeline_id,
                pipeline_stage_id: webhookData.pipeline_stage_id,
                assigned_to: webhookData.assigned_to,
                created_at: webhookData.created_at,
                updated_at: webhookData.updated_at
            }]);

        if (error) {
            logger.error('Error inserting opportunity:', error);
            throw error;
        }

        logger.info(`Opportunity ${opportunity_id} created successfully in database`);
    } catch (error) {
        logger.error('Error handling opportunity creation:', error);
        throw error;
    }
}

// Handle opportunity updates
async function handleOpportunityUpdated(webhookData) {
    try {
        const { opportunity_id, name, status, monetary_value, contact_id } = webhookData;
        
        logger.info(`Updating opportunity ${opportunity_id} in database`);
        
        // Update existing opportunity in database
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .update({
                name,
                status,
                monetary_value,
                contact_id,
                pipeline_id: webhookData.pipeline_id,
                pipeline_stage_id: webhookData.pipeline_stage_id,
                assigned_to: webhookData.assigned_to,
                updated_at: webhookData.updated_at
            })
            .eq('opportunity_id', opportunity_id);

        if (error) {
            logger.error('Error updating opportunity:', error);
            throw error;
        }

        logger.info(`Opportunity ${opportunity_id} updated successfully in database`);
    } catch (error) {
        logger.error('Error handling opportunity update:', error);
        throw error;
    }
}

// Handle opportunity deletion
async function handleOpportunityDeleted(webhookData) {
    try {
        const { opportunity_id } = webhookData;
        
        logger.info(`Deleting opportunity ${opportunity_id} from database`);
        
        // Delete opportunity from database
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .delete()
            .eq('opportunity_id', opportunity_id);

        if (error) {
            logger.error('Error deleting opportunity:', error);
            throw error;
        }

        logger.info(`Opportunity ${opportunity_id} deleted successfully from database`);
    } catch (error) {
        logger.error('Error handling opportunity deletion:', error);
        throw error;
    }
}

// Handle opportunity stage changes
async function handleOpportunityStageChanged(webhookData) {
    try {
        const { opportunity_id, pipeline_stage_id, status } = webhookData;
        
        logger.info(`Changing stage for opportunity ${opportunity_id} to ${pipeline_stage_id}`);
        
        // Update opportunity stage in database
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .update({
                pipeline_stage_id,
                status,
                updated_at: webhookData.updated_at
            })
            .eq('opportunity_id', opportunity_id);

        if (error) {
            logger.error('Error updating opportunity stage:', error);
            throw error;
        }

        logger.info(`Opportunity ${opportunity_id} stage changed to ${pipeline_stage_id}`);
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
    } catch (error) {
        logger.error('Error syncing pipeline data:', error);
        throw error;
    }
}

// Health check endpoint for webhooks
router.get('/ghl/health', (req, res) => {
    logger.info('Health check requested for GoHighLevel webhooks');
    res.status(200).json({
        success: true,
        message: 'GoHighLevel webhook endpoint is healthy',
        timestamp: new Date().toISOString(),
        server_time: new Date().toISOString(),
        endpoint: '/api/webhooks/ghl/opportunities-update'
    });
});

// Test endpoint to verify webhook is working
router.post('/ghl/test', (req, res) => {
    logger.info('Test webhook received');
    res.status(200).json({
        success: true,
        message: 'Test webhook received successfully',
        received_data: req.body,
        timestamp: new Date().toISOString()
    });
});

module.exports = router; 