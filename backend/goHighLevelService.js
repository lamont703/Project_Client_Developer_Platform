require('dotenv').config();

const axios = require('axios');
const qs = require('qs'); // Import qs to format the request body

// Base URL for GoHighLevel API
const BASE_URL = 'https://services.leadconnectorhq.com';

// Function to send data to GoHighLevel
async function sendDataToGoHighLevel(data) {
    try {
        const response = await axios.post(`${BASE_URL}/your-endpoint`, data, {
            headers: {
                'Authorization': `Bearer ${process.env.GHL_API_KEY}`, // Use environment variable for API key
                'Content-Type': 'application/json'
            }
        });
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data to GoHighLevel:', error);
    }
}

// Function to exchange authorization code for tokens
async function exchangeCodeForTokens(code) {
    try {
        const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', qs.stringify({
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.GHL_REDIRECT_URI
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.response.data);
        throw error;
    }
}

// Function to create an opportunity in the pipeline
async function createOpportunityInPipeline(title) {
    const opportunityData = {
        pipelineId: "uR2CMkTiwqoUOYuf8oGR",
        locationId: "QLyYYRoOhCg65lKW9HDX",
        name: title,
        pipelineStageId: "94d76438-fa70-4282-a4df-ad5286a6bf76",
        status: "open",
        contactId: "X9BZelkJiMRBoBfQ2exx",
        monetaryValue: 220,
        assignedTo: ""
    };

    try {
        const response = await axios.post(`${BASE_URL}/opportunities/`, opportunityData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Version': '2021-07-28',
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhc3MiOiJMb2NhdGlvbiIsImF1dGhDbGFzc0lkIjoiUUx5WVlSb09oQ2c2NWxLVzlIRFgiLCJzb3VyY2UiOiJJTlRFR1JBVElPTiIsInNvdXJjZUlkIjoiNjhhYmY3MTk0ZDFkNTBhZjI2NGVhNzU0LW1lcXAzdjE0IiwiY2hhbm5lbCI6Ik9BVVRIIiwicHJpbWFyeUF1dGhDbGFzc0lkIjoiUUx5WVlSb09oQ2c2NWxLVzlIRFgiLCJvYXV0aE1ldGEiOnsic2NvcGVzIjpbImJ1c2luZXNzZXMucmVhZG9ubHkiLCJidXNpbmVzc2VzLndyaXRlIiwiY2FsZW5kYXJzLnJlYWRvbmx5IiwiY2FsZW5kYXJzLndyaXRlIiwiY2FsZW5kYXJzL2V2ZW50cy5yZWFkb25seSIsImNhbGVuZGFycy9ncm91cHMucmVhZG9ubHkiLCJjYWxlbmRhcnMvZXZlbnRzLndyaXRlIiwiY2FsZW5kYXJzL2dyb3Vwcy53cml0ZSIsImNhbGVuZGFycy9yZXNvdXJjZXMucmVhZG9ubHkiLCJjYWxlbmRhcnMvcmVzb3VyY2VzLndyaXRlIiwiY2FtcGFpZ25zLnJlYWRvbmx5IiwiY29udmVyc2F0aW9ucy5yZWFkb25seSIsImNvbnZlcnNhdGlvbnMud3JpdGUiLCJjb252ZXJzYXRpb25zL21lc3NhZ2UucmVhZG9ubHkiLCJjb252ZXJzYXRpb25zL21lc3NhZ2Uud3JpdGUiLCJjb252ZXJzYXRpb25zL3JlcG9ydHMucmVhZG9ubHkiLCJjb252ZXJzYXRpb25zL2xpdmVjaGF0LndyaXRlIiwiY29udGFjdHMucmVhZG9ubHkiLCJjb250YWN0cy53cml0ZSIsIm9iamVjdHMvc2NoZW1hLnJlYWRvbmx5Iiwib2JqZWN0cy9zY2hlbWEud3JpdGUiLCJvYmplY3RzL3JlY29yZC5yZWFkb25seSIsIm9iamVjdHMvcmVjb3JkLndyaXRlIiwiYXNzb2NpYXRpb25zLndyaXRlIiwiYXNzb2NpYXRpb25zLnJlYWRvbmx5IiwiYXNzb2NpYXRpb25zL3JlbGF0aW9uLnJlYWRvbmx5IiwiYXNzb2NpYXRpb25zL3JlbGF0aW9uLndyaXRlIiwiY291cnNlcy53cml0ZSIsImNvdXJzZXMucmVhZG9ubHkiLCJmb3Jtcy5yZWFkb25seSIsImZvcm1zLndyaXRlIiwiaW52b2ljZXMucmVhZG9ubHkiLCJpbnZvaWNlcy53cml0ZSIsImludm9pY2VzL3NjaGVkdWxlLnJlYWRvbmx5IiwiaW52b2ljZXMvc2NoZWR1bGUud3JpdGUiLCJpbnZvaWNlcy90ZW1wbGF0ZS5yZWFkb25seSIsImludm9pY2VzL3RlbXBsYXRlLndyaXRlIiwiaW52b2ljZXMvZXN0aW1hdGUucmVhZG9ubHkiLCJsaW5rcy53cml0ZSIsImxjLWVtYWlsLnJlYWRvbmx5IiwibGlua3MucmVhZG9ubHkiLCJpbnZvaWNlcy9lc3RpbWF0ZS53cml0ZSIsImxvY2F0aW9ucy5yZWFkb25seSIsImxvY2F0aW9ucy9jdXN0b21WYWx1ZXMucmVhZG9ubHkiLCJsb2NhdGlvbnMvY3VzdG9tVmFsdWVzLndyaXRlIiwibG9jYXRpb25zL2N1c3RvbUZpZWxkcy5yZWFkb25seSIsImxvY2F0aW9ucy90YWdzLnJlYWRvbmx5IiwibG9jYXRpb25zL3Rhc2tzLndyaXRlIiwibG9jYXRpb25zL3Rhc2tzLnJlYWRvbmx5IiwibG9jYXRpb25zL2N1c3RvbUZpZWxkcy53cml0ZSIsImxvY2F0aW9ucy90YWdzLndyaXRlIiwibG9jYXRpb25zL3RlbXBsYXRlcy5yZWFkb25seSIsIm1lZGlhcy5yZWFkb25seSIsIm1lZGlhcy53cml0ZSIsImZ1bm5lbHMvZnVubmVsLnJlYWRvbmx5IiwiZnVubmVscy9wYWdlLnJlYWRvbmx5IiwiZnVubmVscy9yZWRpcmVjdC5yZWFkb25seSIsImZ1bm5lbHMvcGFnZWNvdW50LnJlYWRvbmx5Iiwib3Bwb3J0dW5pdGllcy5yZWFkb25seSIsIm9hdXRoLnJlYWRvbmx5Iiwib2F1dGgud3JpdGUiLCJmdW5uZWxzL3JlZGlyZWN0LndyaXRlIiwicGF5bWVudHMvb3JkZXJzLnJlYWRvbmx5Iiwib3Bwb3J0dW5pdGllcy53cml0ZSIsInBheW1lbnRzL29yZGVycy53cml0ZSIsInBheW1lbnRzL2ludGVncmF0aW9uLnJlYWRvbmx5IiwicGF5bWVudHMvY291cG9ucy5yZWFkb25seSIsInBheW1lbnRzL3N1YnNjcmlwdGlvbnMucmVhZG9ubHkiLCJwYXltZW50cy90cmFuc2FjdGlvbnMucmVhZG9ubHkiLCJwYXltZW50cy9pbnRlZ3JhdGlvbi53cml0ZSIsInBheW1lbnRzL2N1c3RvbS1wcm92aWRlci5yZWFkb25seSIsInBheW1lbnRzL2NvdXBvbnMud3JpdGUiLCJwYXltZW50cy9jdXN0b20tcHJvdmlkZXIud3JpdGUiLCJwcm9kdWN0cy5yZWFkb25seSIsInByb2R1Y3RzL3ByaWNlcy53cml0ZSIsInByb2R1Y3RzL3ByaWNlcy5yZWFkb25seSIsInByb2R1Y3RzLndyaXRlIiwicHJvZHVjdHMvY29sbGVjdGlvbi53cml0ZSIsInByb2R1Y3RzL2NvbGxlY3Rpb24ucmVhZG9ubHkiLCJzb2NpYWxwbGFubmVyL29hdXRoLnJlYWRvbmx5Iiwic29jaWFscGxhbm5lci9vYXV0aC53cml0ZSIsInNvY2lhbHBsYW5uZXIvcG9zdC5yZWFkb25seSIsInNvY2lhbHBsYW5uZXIvcG9zdC53cml0ZSIsInNvY2lhbHBsYW5uZXIvYWNjb3VudC5yZWFkb25seSIsInNvY2lhbHBsYW5uZXIvYWNjb3VudC53cml0ZSIsInNvY2lhbHBsYW5uZXIvY3N2LnJlYWRvbmx5Iiwic29jaWFscGxhbm5lci9jYXRlZ29yeS5yZWFkb25seSIsInNvY2lhbHBsYW5uZXIvY3N2LndyaXRlIiwic29jaWFscGxhbm5lci90YWcucmVhZG9ubHkiLCJzb2NpYWxwbGFubmVyL3N0YXRpc3RpY3MucmVhZG9ubHkiLCJzdG9yZS9zaGlwcGluZy5yZWFkb25seSIsInN0b3JlL3NoaXBwaW5nLndyaXRlIiwic3RvcmUvc2V0dGluZy5yZWFkb25seSIsInVzZXJzLnJlYWRvbmx5Iiwic3RvcmUvc2V0dGluZy53cml0ZSIsInN1cnZleXMucmVhZG9ubHkiLCJ3b3JrZmxvd3MucmVhZG9ubHkiLCJlbWFpbHMvYnVpbGRlci53cml0ZSIsImVtYWlscy9idWlsZGVyLnJlYWRvbmx5IiwiZW1haWxzL3NjaGVkdWxlLnJlYWRvbmx5IiwiYmxvZ3MvcG9zdC11cGRhdGUud3JpdGUiLCJ3b3JkcHJlc3Muc2l0ZS5yZWFkb25seSIsImJsb2dzL3Bvc3Qud3JpdGUiLCJibG9ncy9jaGVjay1zbHVnLnJlYWRvbmx5Iiwic29jaWFscGxhbm5lci90YWcud3JpdGUiLCJzb2NpYWxwbGFubmVyL2NhdGVnb3J5LndyaXRlIiwiYmxvZ3MvY2F0ZWdvcnkucmVhZG9ubHkiLCJibG9ncy9hdXRob3IucmVhZG9ubHkiLCJibG9ncy9wb3N0cy5yZWFkb25seSIsImJsb2dzL2xpc3QucmVhZG9ubHkiLCJjaGFyZ2VzLnJlYWRvbmx5Iiwia25vd2xlZGdlLWJhc2VzLnJlYWRvbmx5Iiwia25vd2xlZGdlLWJhc2VzLndyaXRlIiwiZG9jdW1lbnRzX2NvbnRyYWN0c190ZW1wbGF0ZS9saXN0LnJlYWRvbmx5IiwiZG9jdW1lbnRzX2NvbnRyYWN0c190ZW1wbGF0ZS9zZW5kTGluay53cml0ZSIsImRvY3VtZW50c19jb250cmFjdHMvc2VuZExpbmsud3JpdGUiLCJjaGFyZ2VzLndyaXRlIiwibWFya2V0cGxhY2UtaW5zdGFsbGVyLWRldGFpbHMucmVhZG9ubHkiLCJ0d2lsaW9hY2NvdW50LnJlYWQiLCJkb2N1bWVudHNfY29udHJhY3RzL2xpc3QucmVhZG9ubHkiXSwiY2xpZW50IjoiNjhhYmY3MTk0ZDFkNTBhZjI2NGVhNzU0IiwidmVyc2lvbklkIjoiNjhhYmY3MTk0ZDFkNTBhZjI2NGVhNzU0IiwiY2xpZW50S2V5IjoiNjhhYmY3MTk0ZDFkNTBhZjI2NGVhNzU0LW1lcXAzdjE0In0sImlhdCI6MTc1NjE5NDA5MC4zMzksImV4cCI6MTc1NjI4MDQ5MC4zMzl9.OptejFRKdrHvXgZ1nHKdwGbfdVSMQqpYNnNCtiS5qaxcpf7EOWA6DkCCecQJyJ3akZK2CEXsxB1vjAybOdpc94GD_kRx_fAtqJPo_idaTtRcRDVM9mxF-SVtggZiSg6s_9q1RErzRt_2lrR_kqDeF5s2Xk7uR9ByWuR-ISlKvt_OjdPv_cKItaOecVVkWUehsRHDBDR4xBb9UI1cLJIjWBb_6ChpS2l_QGEY727wep-2u5_SWkTUt82_vDefU3rCFdKnXA1SkuJ6F7POfLX78zgCw6ZA_rtVaXxmOkCC-wjtTlzrc1wAGVPpoaLBxbEjzvZNnyGeB7hU164i-RBkbRmnOagOXqy5IJYvk3AE9o2r2sU3XPZVuFKOggLI-0Ge__4fsJC4LFwzvT9PjtEMLNAnOyXEkyMC_lz_JmlPGK6QOl70dpe2hZ5sE4Vt1tzez96B5OToBKcj31X_53FbNiuL9Yp9AHamMcMNNs8nWFw8MrCA0UiLrK4eoWh3wtASZ9GM1LOCJdyokKc7mG4ZiRf7R9oYqf24YQOYycA_-J1Yp0Sd48Sdc_W2ndMO34F-CU0KaPRRc4RQ040i-j7MK1FyBMrMO29Sr3BN9CbHGALBKDKjDECffxEhGFNcu9cXsk4SMn3lkd1P70MAwollx-BMMO2WeDjaeQfHvuxfGJo'
            },
            data: opportunityData,
            maxBodyLength: Infinity
        });
        console.log('Opportunity created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating opportunity in pipeline:', error);
        throw error;
    }
}

module.exports = {
    sendDataToGoHighLevel,
    exchangeCodeForTokens,
    createOpportunityInPipeline
}; 