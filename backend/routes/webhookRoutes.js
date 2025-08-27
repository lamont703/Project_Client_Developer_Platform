const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
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
        
        // Log raw body data
        logger.info('Raw request body (string):', req.body);
        logger.info('Raw request body (typeof):', typeof req.body);
        logger.info('Raw request body (stringified):', JSON.stringify(req.body));
        
        // Check if body is a string that needs parsing
        let webhookData = req.body;
        if (typeof req.body === 'string') {
            try {
                webhookData = JSON.parse(req.body);
                logger.info('Parsed string body to JSON:', JSON.stringify(webhookData, null, 2));
            } catch (parseError) {
                logger.error('Failed to parse body as JSON:', parseError);
                logger.info('Raw string body:', req.body);
            }
        }
        
        logger.info('Request query:', JSON.stringify(req.query, null, 2));
        logger.info('Content-Type:', req.get('Content-Type'));
        logger.info('User-Agent:', req.get('User-Agent'));
        logger.info('========================');

        // Check if body is empty or undefined
        if (!webhookData || Object.keys(webhookData).length === 0) {
            logger.warn('Webhook body is empty or undefined');
            return res.status(400).json({
                success: false,
                message: 'Webhook body is empty',
                received_data: webhookData,
                raw_body: req.body
            });
        }

        // Debug: Log the exact structure of the webhook data
        logger.info('=== WEBHOOK DATA STRUCTURE ===');
        logger.info('Raw webhook data:', JSON.stringify(webhookData, null, 2));
        logger.info('Data type:', typeof webhookData);
        logger.info('Data keys:', Object.keys(webhookData));
        logger.info('Data values:', Object.values(webhookData));
        
        // Check for common GoHighLevel webhook structures
        if (webhookData.data) {
            logger.info('Found "data" property:', JSON.stringify(webhookData.data, null, 2));
        }
        if (webhookData.payload) {
            logger.info('Found "payload" property:', JSON.stringify(webhookData.payload, null, 2));
        }
        if (webhookData.opportunity) {
            logger.info('Found "opportunity" property:', JSON.stringify(webhookData.opportunity, null, 2));
        }
        logger.info('================================');

        logger.info('Processing webhook data:', JSON.stringify(webhookData, null, 2));

        // Process the webhook using the controller
        const result = await opportunityController.processWebhook(webhookData);

        // Send success response
        const response = {
            ...result,
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

// Health check endpoint for webhooks
router.get('/ghl/health', (req, res) => {
    logger.info('Health check requested for GoHighLevel webhooks');
    const healthStatus = opportunityController.getWebhookHealth();
    res.status(200).json(healthStatus);
});

// Test endpoint to verify webhook is working
router.post('/ghl/test', (req, res) => {
    logger.info('Test webhook received');
    const testResult = opportunityController.testWebhook(req.body);
    res.status(200).json(testResult);
});

// Test endpoint to simulate different GoHighLevel webhook structures
router.post('/ghl/test-structures', async (req, res) => {
    logger.info('Testing different webhook data structures');
    
    // Test different possible GoHighLevel webhook structures
    // Using the correct column names from the ghl_opportunities table
    const testStructures = [
        {
            name: 'Direct structure',
            data: {
                event_type: 'opportunity.created',
                opportunity_id: 'test-123',
                name: 'Test Opportunity',
                status: 'open',
                monetary_value: 1000,
                contact_id: 'contact-123',
                pipeline_id: 'pipeline-123',
                pipeline_stage_id: 'stage-123',
                assigned_to: 'user-123',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        },
        {
            name: 'Nested in data property',
            data: {
                data: {
                    event_type: 'opportunity.updated',
                    opportunity_id: 'test-456',
                    name: 'Test Opportunity 2',
                    status: 'closed',
                    monetary_value: 2000,
                    contact_id: 'contact-456',
                    pipeline_id: 'pipeline-456',
                    pipeline_stage_id: 'stage-456',
                    assigned_to: 'user-456',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            }
        },
        {
            name: 'Nested in payload property',
            data: {
                payload: {
                    event_type: 'opportunity.stage_changed',
                    opportunity_id: 'test-789',
                    name: 'Test Opportunity 3',
                    status: 'in_progress',
                    monetary_value: 1500,
                    contact_id: 'contact-789',
                    pipeline_id: 'pipeline-789',
                    pipeline_stage_id: 'stage-789',
                    assigned_to: 'user-789',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            }
        },
        {
            name: 'Different field names',
            data: {
                type: 'opportunity.deleted',
                id: 'test-999',
                name: 'Test Opportunity 4',
                status: 'deleted',
                monetary_value: 500,
                contact_id: 'contact-999',
                pipeline_id: 'pipeline-999',
                pipeline_stage_id: 'stage-999',
                assigned_to: 'user-999',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        }
    ];
    
    const results = [];
    
    for (const test of testStructures) {
        try {
            logger.info(`Testing structure: ${test.name}`);
            const result = await opportunityController.processWebhook(test.data);
            results.push({
                structure: test.name,
                success: true,
                result
            });
        } catch (error) {
            results.push({
                structure: test.name,
                success: false,
                error: error.message
            });
        }
    }
    
    res.status(200).json({
        message: 'Tested different webhook structures',
        results
    });
});

// Endpoint to check what columns exist in the ghl_opportunities table
router.get('/ghl/check-schema', async (req, res) => {
    try {
        const { supabase } = require('../db');
        
        // Try to get a single row to see the structure
        const { data, error } = await supabase
            .from('ghl_opportunities')
            .select('*')
            .limit(1);
        
        if (error) {
            logger.error('Error checking schema:', error);
            return res.status(500).json({
                success: false,
                error: error.message,
                details: error
            });
        }
        
        // Get table info (simplified approach)
        let tableInfo = null;
        try {
            const { data: rpcData, error: rpcError } = await supabase
                .rpc('get_table_info', { table_name: 'ghl_opportunities' });
            if (!rpcError) {
                tableInfo = rpcData;
            }
        } catch (rpcError) {
            logger.info('RPC function not available, skipping table info');
        }
        
        res.status(200).json({
            success: true,
            sample_data: data,
            table_info: tableInfo,
            message: 'Schema check completed'
        });
        
    } catch (error) {
        logger.error('Error in schema check:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 