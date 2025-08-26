const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const callbackCode = '6647595619661428b1e2b4e00a312cc553658bc4';

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