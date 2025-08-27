// testWireFrameService.js
const { createWireFrame } = require('../wireFrameService');

// Sample job data for testing
const sampleJobData = {
    title: "E-commerce Mobile App",
    category: "Mobile Development",
    description: "Build a modern e-commerce mobile application with user authentication, product catalog, shopping cart, and payment integration",
    targetAudience: "Online shoppers aged 25-45 who prefer mobile shopping experiences",
    keyFeatures: "User registration/login, product browsing, search functionality, shopping cart, secure payment processing, order tracking, user reviews",
    technologyStack: "React Native, Node.js, MongoDB, Stripe API, Firebase Authentication",
    budget: "$15,000 - $25,000",
    timeline: "3-4 months",
    successCriteria: "App store approval, 1000+ downloads in first month, 4+ star rating, conversion rate above 3%",
    potentialChallenges: "Payment security compliance, cross-platform compatibility, app store optimization, user onboarding flow"
};

async function testWireFrameService() {
    try {
        console.log('🚀 Testing WireFrame Service with sample data...\n');
        console.log('Sample Job Data:');
        console.log(JSON.stringify(sampleJobData, null, 2));
        console.log('\n' + '='.repeat(50) + '\n');
        
        const result = await createWireFrame(sampleJobData);
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ WireFrame Service Test Completed Successfully!');
        console.log('🎯 Results:');
        console.log(`📦 Repository URL: ${result.repo_url}`);
        console.log(`🌐 Live Site URL: ${result.pages_url}`);
        console.log('='.repeat(50));
        
    } catch (error) {
        console.error('\n❌ WireFrame Service Test Failed:');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
    }
}

// Run the test
testWireFrameService(); 