const { exchangeCodeForTokens, sendDataToGoHighLevel } = require('./goHighLevelService');
const axios = require('axios'); // Added axios import

async function getLocationId() {
    try {
        const response = await axios.get('https://services.leadconnectorhq.com/api/locations', {
            headers: {
                'Authorization': `Bearer ${process.env.GHL_ACCESS_TOKEN}`, // Use the access token
                'Accept': 'application/json'
            }
        });

        console.log('Location ID retrieved:', response.data);
    } catch (error) {
        console.error('Error retrieving location ID:', error.response ? error.response.data : error.message);
    }
}

async function getBusiness() {
    try {
        const response = await axios.get(`https://services.leadconnectorhq.com/businesses/${process.env.GHL_BUSINESS_ID}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GHL_ACCESS_TOKEN}`, // Use the access token
                'Accept': 'application/json',
                'Version': '2021-07-28' // API version
            }
        });

        console.log('Business data retrieved:', response.data);
    } catch (error) {
        console.error('Error retrieving business data:', error.response ? error.response.data : error.message);
    }
}

async function getBusinessesByLocation(locationId) {
    try {
        const response = await axios.get('https://services.leadconnectorhq.com/businesses/', {
            headers: {
                'Authorization': `Bearer ${process.env.GHL_ACCESS_TOKEN}`, // Use the access token
                'Accept': 'application/json',
                'Version': '2021-07-28' // API version
            },
            params: {
                locationId: 'QLyYYRoOhCg65lKW9HDX' // Query parameter
            }
        });

        console.log('Businesses data retrieved:', response.data);
    } catch (error) {
        console.error('Error retrieving businesses data:', error.response ? error.response.data : error.message);
    }
}

async function testGoHighLevelService() {
    try {
         // Specify the locationId directly
        const locationId = 'QLyYYRoOhCg65lKW9HDX'; // Replace with the actual location ID
        await getBusinessesByLocation(locationId);
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testGoHighLevelService();