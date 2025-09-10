#!/usr/bin/env node

/**
 * Example usage of the GoHighLevel OAuth Token Generator
 * 
 * This file demonstrates how to use the ghl-oauth-token-generator.js module
 * to generate and manage GoHighLevel OAuth tokens.
 */

const {
  exchangeCodeForTokens,
  refreshAccessToken,
  getValidAccessToken,
  isTokenExpired
} = require('./ghl-oauth-token-generator');

// Load environment variables (make sure to set these in your .env file)
require('dotenv').config();

/**
 * Example 1: Exchange authorization code for tokens
 * Use this when you have an authorization code from the OAuth flow
 */
async function exchangeCodeExample() {
  console.log('\n🔄 Example 1: Exchange Authorization Code for Tokens');
  console.log('===================================================');
  
  try {
    // Replace 'YOUR_AUTHORIZATION_CODE_HERE' with actual code from OAuth redirect
    const authCode = 'YOUR_AUTHORIZATION_CODE_HERE';
    
    const result = await exchangeCodeForTokens({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      code: authCode,
      redirect_uri: process.env.GHL_REDIRECT_URI
    });
    
    if (result.success) {
      console.log('✅ Success!');
      console.log('📋 Token Details:');
      console.log(`   Access Token: ${result.data.access_token.substring(0, 50)}...`);
      console.log(`   Refresh Token: ${result.data.refresh_token.substring(0, 50)}...`);
      console.log(`   Expires In: ${result.data.expires_in} seconds`);
      console.log(`   Token Type: ${result.data.token_type}`);
    } else {
      console.error('❌ Failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Exception:', error.message);
  }
}

/**
 * Example 2: Refresh an existing access token
 * Use this when you have a refresh token and need a new access token
 */
async function refreshTokenExample() {
  console.log('\n🔄 Example 2: Refresh Access Token');
  console.log('==================================');
  
  try {
    // Replace 'YOUR_REFRESH_TOKEN_HERE' with actual refresh token
    const refreshToken = 'YOUR_REFRESH_TOKEN_HERE';
    
    const result = await refreshAccessToken({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET,
      refresh_token: refreshToken
    });
    
    if (result.success) {
      console.log('✅ Token refreshed successfully!');
      console.log('📋 New Token Details:');
      console.log(`   New Access Token: ${result.data.access_token.substring(0, 50)}...`);
      console.log(`   Expires In: ${result.data.expires_in} seconds`);
      
      if (result.data.refresh_token) {
        console.log(`   New Refresh Token: ${result.data.refresh_token.substring(0, 50)}...`);
      }
    } else {
      console.error('❌ Failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Exception:', error.message);
  }
}

/**
 * Example 3: Get valid access token (auto-refresh if needed)
 * This will automatically refresh the token if it's expired
 */
async function getValidTokenExample() {
  console.log('\n🔄 Example 3: Get Valid Access Token (Auto-refresh)');
  console.log('===================================================');
  
  try {
    const result = await getValidAccessToken({
      client_id: process.env.GHL_CLIENT_ID,
      client_secret: process.env.GHL_CLIENT_SECRET
    });
    
    if (result.success) {
      console.log('✅ Valid token obtained!');
      console.log('📋 Token Details:');
      console.log(`   Access Token: ${result.data.access_token.substring(0, 50)}...`);
      console.log(`   Status: ${result.message}`);
    } else {
      console.error('❌ Failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Exception:', error.message);
  }
}

/**
 * Example 4: Check if a token is expired
 */
function checkTokenExpiryExample() {
  console.log('\n🔄 Example 4: Check Token Expiry');
  console.log('=================================');
  
  // Replace with actual token
  const sampleToken = 'YOUR_ACCESS_TOKEN_HERE';
  
  if (sampleToken === 'YOUR_ACCESS_TOKEN_HERE') {
    console.log('⚠️ Please replace YOUR_ACCESS_TOKEN_HERE with an actual token to test expiry check');
    return;
  }
  
  const isExpired = isTokenExpired(sampleToken);
  console.log(`Token expired: ${isExpired ? '❌ Yes' : '✅ No'}`);
}

/**
 * Main function to run examples
 */
async function runExamples() {
  console.log('🚀 GoHighLevel OAuth Token Generator - Examples');
  console.log('===============================================');
  
  // Check environment variables
  if (!process.env.GHL_CLIENT_ID || !process.env.GHL_CLIENT_SECRET) {
    console.log('\n⚠️ Environment Setup Required:');
    console.log('Please set the following environment variables:');
    console.log('   GHL_CLIENT_ID=your_client_id');
    console.log('   GHL_CLIENT_SECRET=your_client_secret');
    console.log('   GHL_REDIRECT_URI=your_redirect_uri');
    console.log('\nYou can set these in a .env file or as system environment variables.');
    return;
  }
  
  console.log('\n📋 Environment Variables:');
  console.log(`   GHL_CLIENT_ID: ${process.env.GHL_CLIENT_ID ? '✅ Set' : '❌ Not set'}`);
  console.log(`   GHL_CLIENT_SECRET: ${process.env.GHL_CLIENT_SECRET ? '✅ Set' : '❌ Not set'}`);
  console.log(`   GHL_REDIRECT_URI: ${process.env.GHL_REDIRECT_URI ? '✅ Set' : '❌ Not set'}`);
  
  // Run examples (uncomment the ones you want to test)
  
  // await exchangeCodeExample();
  // await refreshTokenExample();
  // await getValidTokenExample();
  checkTokenExpiryExample();
  
  console.log('\n✨ Examples completed!');
  console.log('\nTo use these examples:');
  console.log('1. Set up your environment variables');
  console.log('2. Replace placeholder tokens/codes with real values');
  console.log('3. Uncomment the example functions you want to run');
  console.log('4. Run: node ghl-oauth-example.js');
}

// Run examples when script is executed directly
if (require.main === module) {
  runExamples().catch(error => {
    console.error('❌ Error running examples:', error.message);
    process.exit(1);
  });
}

module.exports = {
  exchangeCodeExample,
  refreshTokenExample,
  getValidTokenExample,
  checkTokenExpiryExample
};
