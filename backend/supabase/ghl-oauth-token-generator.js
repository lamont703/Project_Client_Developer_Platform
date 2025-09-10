#!/usr/bin/env node

/**
 * GoHighLevel OAuth Token Generator
 * 
 * Independent JavaScript utility to generate access tokens from GoHighLevel OAuth authorization codes
 * Supports both authorization code exchange and token refresh functionality
 * 
 * Author: AI Assistant
 * Date: September 2025
 * 
 * Dependencies: axios, dotenv (optional)
 * Usage: node ghl-oauth-token-generator.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Try to load dotenv if available (optional dependency)
try {
  require('dotenv').config();
} catch (error) {
  console.log('Note: dotenv not found. Environment variables must be set manually.');
}

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  // GoHighLevel OAuth endpoint
  OAUTH_URL: 'https://services.leadconnectorhq.com/oauth/token',
  
  // API version header
  API_VERSION: '2021-07-28',
  
  // Token expiry buffer (5 minutes in milliseconds)
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000,
  
  // Default configuration file path
  CONFIG_FILE: path.join(__dirname, 'ghl-tokens.json')
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Decode JWT token to extract expiration time
 * @param {string} token - JWT token
 * @returns {number|null} - Expiration time in milliseconds
 */
function getTokenExpiry(token) {
  try {
    if (!token || typeof token !== 'string') return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    return payload.exp ? payload.exp * 1000 : null;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
}

/**
 * Check if token is expired or will expire soon
 * @param {string} token - JWT token
 * @returns {boolean} - True if token is expired or will expire soon
 */
function isTokenExpired(token) {
  if (!token) return true;
  
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  
  return Date.now() + CONFIG.TOKEN_EXPIRY_BUFFER >= expiry;
}

/**
 * Validate required configuration
 * @param {Object} config - Configuration object
 * @returns {Object} - Validation result
 */
function validateConfig(config) {
  const required = ['client_id', 'client_secret', 'redirect_uri'];
  const missing = required.filter(field => !config[field]);
  
  return {
    isValid: missing.length === 0,
    missing: missing,
    message: missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : 'Configuration is valid'
  };
}

/**
 * Save tokens to file
 * @param {Object} tokens - Token data
 */
function saveTokensToFile(tokens) {
  try {
    const tokenData = {
      ...tokens,
      saved_at: new Date().toISOString(),
      expires_at: tokens.expires_in ? new Date(Date.now() + (tokens.expires_in * 1000)).toISOString() : null
    };
    
    fs.writeFileSync(CONFIG.CONFIG_FILE, JSON.stringify(tokenData, null, 2));
    console.log(`✅ Tokens saved to: ${CONFIG.CONFIG_FILE}`);
  } catch (error) {
    console.error('❌ Error saving tokens to file:', error.message);
  }
}

/**
 * Load tokens from file
 * @returns {Object|null} - Token data or null if not found
 */
function loadTokensFromFile() {
  try {
    if (!fs.existsSync(CONFIG.CONFIG_FILE)) return null;
    
    const data = fs.readFileSync(CONFIG.CONFIG_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading tokens from file:', error.message);
    return null;
  }
}

// ========================================
// CORE OAUTH FUNCTIONS
// ========================================

/**
 * Exchange OAuth authorization code for access token
 * @param {Object} options - OAuth configuration
 * @returns {Promise<Object>} - Token response
 */
async function exchangeCodeForTokens(options) {
  const { client_id, client_secret, code, redirect_uri } = options;
  
  // Validate configuration
  const validation = validateConfig({ client_id, client_secret, redirect_uri });
  if (!validation.isValid) {
    throw new Error(validation.message);
  }
  
  if (!code) {
    throw new Error('Authorization code is required');
  }
  
  console.log('🔄 Exchanging authorization code for tokens...');
  
  try {
    const formData = new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri
    });

    const response = await axios.post(CONFIG.OAUTH_URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    const tokenData = response.data;
    
    console.log('✅ Successfully exchanged code for tokens');
    console.log(`📊 Token expires in: ${tokenData.expires_in} seconds`);
    
    // Save tokens to file
    saveTokensToFile(tokenData);
    
    return {
      success: true,
      data: tokenData,
      message: 'Authorization code successfully exchanged for tokens'
    };
    
  } catch (error) {
    console.error('❌ Error exchanging code for tokens:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to exchange authorization code for tokens'
    };
  }
}

/**
 * Refresh access token using refresh token
 * @param {Object} options - Refresh token configuration
 * @returns {Promise<Object>} - Token response
 */
async function refreshAccessToken(options) {
  const { client_id, client_secret, refresh_token } = options;
  
  // Validate configuration
  const validation = validateConfig({ client_id, client_secret, redirect_uri: 'dummy' });
  if (!validation.isValid && !client_id && !client_secret) {
    throw new Error('client_id and client_secret are required for token refresh');
  }
  
  if (!refresh_token) {
    throw new Error('Refresh token is required');
  }
  
  console.log('🔄 Refreshing access token...');
  
  try {
    const formData = new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    });

    const response = await axios.post(CONFIG.OAUTH_URL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    const tokenData = response.data;
    
    console.log('✅ Successfully refreshed access token');
    console.log(`📊 Token expires in: ${tokenData.expires_in} seconds`);
    
    // Save refreshed tokens to file
    saveTokensToFile(tokenData);
    
    return {
      success: true,
      data: tokenData,
      message: 'Access token successfully refreshed'
    };
    
  } catch (error) {
    console.error('❌ Error refreshing token:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to refresh access token'
    };
  }
}

/**
 * Get valid access token (refresh if needed)
 * @param {Object} options - Token configuration
 * @returns {Promise<Object>} - Valid token response
 */
async function getValidAccessToken(options = {}) {
  // Try to load existing tokens from file first
  let existingTokens = loadTokensFromFile();
  
  if (!existingTokens && !options.access_token) {
    throw new Error('No access token found. Please provide access_token or run token exchange first.');
  }
  
  const currentToken = options.access_token || existingTokens?.access_token;
  const refreshToken = options.refresh_token || existingTokens?.refresh_token;
  
  // Check if current token is still valid
  if (!isTokenExpired(currentToken)) {
    console.log('✅ Current access token is still valid');
    return {
      success: true,
      data: { access_token: currentToken },
      message: 'Current access token is valid'
    };
  }
  
  // Token is expired, try to refresh
  if (refreshToken) {
    console.log('⚠️ Access token expired, attempting refresh...');
    
    const refreshConfig = {
      client_id: options.client_id || process.env.GHL_CLIENT_ID,
      client_secret: options.client_secret || process.env.GHL_CLIENT_SECRET,
      refresh_token: refreshToken
    };
    
    return await refreshAccessToken(refreshConfig);
  }
  
  throw new Error('Access token expired and no refresh token available. Please re-authorize.');
}

// ========================================
// INTERACTIVE CLI FUNCTIONS
// ========================================

/**
 * Interactive CLI for OAuth token generation
 */
async function runInteractiveCLI() {
  console.log('\n🚀 GoHighLevel OAuth Token Generator');
  console.log('=====================================\n');
  
  // Check for environment variables
  const envConfig = {
    client_id: process.env.GHL_CLIENT_ID,
    client_secret: process.env.GHL_CLIENT_SECRET,
    redirect_uri: process.env.GHL_REDIRECT_URI
  };
  
  console.log('📋 Current Configuration:');
  console.log(`   Client ID: ${envConfig.client_id ? '✅ Set' : '❌ Not set'}`);
  console.log(`   Client Secret: ${envConfig.client_secret ? '✅ Set' : '❌ Not set'}`);
  console.log(`   Redirect URI: ${envConfig.redirect_uri ? '✅ Set' : '❌ Not set'}\n`);
  
  // Check for existing tokens
  const existingTokens = loadTokensFromFile();
  if (existingTokens) {
    console.log('💾 Existing tokens found:');
    console.log(`   Saved at: ${existingTokens.saved_at}`);
    console.log(`   Expires at: ${existingTokens.expires_at}`);
    console.log(`   Is expired: ${isTokenExpired(existingTokens.access_token) ? '❌ Yes' : '✅ No'}\n`);
  }
  
  // Example usage
  console.log('📖 Usage Examples:');
  console.log('');
  console.log('1. Exchange authorization code for tokens:');
  console.log('   const result = await exchangeCodeForTokens({');
  console.log('     client_id: "your_client_id",');
  console.log('     client_secret: "your_client_secret",');
  console.log('     code: "authorization_code_from_oauth_flow",');
  console.log('     redirect_uri: "your_redirect_uri"');
  console.log('   });');
  console.log('');
  console.log('2. Refresh access token:');
  console.log('   const result = await refreshAccessToken({');
  console.log('     client_id: "your_client_id",');
  console.log('     client_secret: "your_client_secret",');
  console.log('     refresh_token: "your_refresh_token"');
  console.log('   });');
  console.log('');
  console.log('3. Get valid access token (auto-refresh if needed):');
  console.log('   const result = await getValidAccessToken();');
  console.log('');
}

// ========================================
// MODULE EXPORTS & CLI EXECUTION
// ========================================

// Export functions for use as module
module.exports = {
  exchangeCodeForTokens,
  refreshAccessToken,
  getValidAccessToken,
  isTokenExpired,
  getTokenExpiry,
  validateConfig,
  saveTokensToFile,
  loadTokensFromFile,
  CONFIG
};

// CLI execution when run directly
if (require.main === module) {
  runInteractiveCLI().catch(error => {
    console.error('❌ CLI Error:', error.message);
    process.exit(1);
  });
}

// ========================================
// EXAMPLE USAGE (UNCOMMENT TO USE)
// ========================================

/*
// Example 1: Exchange authorization code for tokens
async function example1() {
  try {
    const result = await exchangeCodeForTokens({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      code: 'your_authorization_code_here',
      redirect_uri: process.env.GHL_REDIRECT_URI
    });
    
    if (result.success) {
      console.log('Access Token:', result.data.access_token);
      console.log('Refresh Token:', result.data.refresh_token);
      console.log('Expires In:', result.data.expires_in, 'seconds');
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Exception:', error.message);
  }
}

// Example 2: Refresh existing token
async function example2() {
  try {
    const result = await refreshAccessToken({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      refresh_token: 'your_refresh_token_here'
    });
    
    if (result.success) {
      console.log('New Access Token:', result.data.access_token);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Exception:', error.message);
  }
}

// Example 3: Get valid token (auto-refresh if needed)
async function example3() {
  try {
    const result = await getValidAccessToken();
    
    if (result.success) {
      console.log('Valid Access Token:', result.data.access_token);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Exception:', error.message);
  }
}

// Uncomment to run examples
// example1();
// example2();
// example3();
*/
