const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const callbackCode = '88c4e7f6a0760ee20f183b0d25a9d00f6442a3b7';

let data = qs.stringify({
  'client_id': process.env.GHL_CLIENT_ID,
  'client_secret': process.env.GHL_CLIENT_SECRET,
  'grant_type': 'authorization_code',
  'code': callbackCode,
  'redirect_uri': process.env.GHL_REDIRECT_URI
});

let config = {
  method: 'post',
  url: 'https://services.leadconnectorhq.com/oauth/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded', 
    'Accept': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log('Access Token:', response.data.access_token);
  console.log('Refresh Token:', response.data.refresh_token);
})
.catch((error) => {
  console.error('Error fetching tokens:', error);
}); 