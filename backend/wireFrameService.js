// wireFrameService.js
require('dotenv').config();
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Key Configuration
const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

// Helper function to parse retry delay from Google's response
function parseRetryDelay(errorDetails) {
    if (!errorDetails) return null;
    
    for (const detail of errorDetails) {
        if (detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo' && detail.retryDelay) {
            const delay = detail.retryDelay;
            if (delay.endsWith('s')) {
                return parseInt(delay.slice(0, -1)) * 1000; // Convert to milliseconds
            }
        }
    }
    return null;
}

// Helper function to retry API calls with intelligent backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                // For quota errors, provide helpful guidance
                if (error.status === 429) {
                    console.log('\n🚨 QUOTA LIMIT REACHED');
                    console.log('📋 Solutions:');
                    console.log('   1. Wait for quota to reset (usually resets daily)');
                    console.log('   2. Upgrade to a paid plan for higher limits');
                    console.log('   3. Check your billing settings at: https://console.cloud.google.com/billing');
                    console.log('   4. Monitor usage at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas');
                }
                throw error;
            }
            
            // Check if it's a retryable error
            const isRetryable = error.status === 500 || 
                               error.status === 503 || 
                               error.status === 429 ||
                               error.message.includes('Internal Server Error') ||
                               error.message.includes('Service Unavailable');
            
            if (!isRetryable) {
                throw error;
            }
            
            // For quota errors (429), use longer delays and respect API suggestions
            let delay = baseDelay * Math.pow(2, attempt - 1);
            
            if (error.status === 429) {
                // Try to get suggested delay from Google's response
                const suggestedDelay = parseRetryDelay(error.errorDetails);
                if (suggestedDelay) {
                    delay = Math.max(suggestedDelay, delay);
                } else {
                    // For quota errors, use much longer delays
                    delay = Math.max(30000, delay); // At least 30 seconds
                }
            }
            
            console.log(`Retrying in ${delay}ms (${Math.round(delay/1000)}s)...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Fallback function to create a simple wireframe when AI is unavailable
function createFallbackWireframe(jobData) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    
    return {
        "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${jobData.title} - Project Hub</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .card h3 { color: #333; margin-bottom: 15px; }
        .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; }
        .status { background: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${jobData.title}</h1>
            <p>Project Category: ${jobData.category}</p>
        </div>
        
        <div class="status">
            <strong>⚠️ Limited Mode:</strong> This is a simplified wireframe created while AI services are temporarily unavailable. Full wireframes with detailed prototypes will be generated when service is restored.
        </div>
        
        <div class="cards">
            <div class="card">
                <h3>📋 Project Overview</h3>
                <p><strong>Description:</strong> ${jobData.description}</p>
                <p><strong>Target Audience:</strong> ${jobData.targetAudience}</p>
                <p><strong>Budget:</strong> ${jobData.budget}</p>
                <p><strong>Timeline:</strong> ${jobData.timeline}</p>
            </div>
            
            <div class="card">
                <h3>🔧 Technical Details</h3>
                <p><strong>Technology Stack:</strong> ${jobData.technologyStack}</p>
                <p><strong>Key Features:</strong> ${jobData.keyFeatures}</p>
            </div>
            
            <div class="card">
                <h3>🎯 Success & Challenges</h3>
                <p><strong>Success Criteria:</strong> ${jobData.successCriteria}</p>
                <p><strong>Potential Challenges:</strong> ${jobData.potentialChallenges}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p>This wireframe will be enhanced with full AI-generated prototypes once quota limits are restored.</p>
        </div>
    </div>
</body>
</html>`,
        
        "README.md": `# ${jobData.title}

## Project Overview
${jobData.description}

## Technical Specifications
- **Category:** ${jobData.category}
- **Target Audience:** ${jobData.targetAudience}
- **Technology Stack:** ${jobData.technologyStack}
- **Budget:** ${jobData.budget}
- **Timeline:** ${jobData.timeline}

## Key Features
${jobData.keyFeatures}

## Success Criteria
${jobData.successCriteria}

## Potential Challenges
${jobData.potentialChallenges}

---
*Generated on ${new Date().toISOString()}*
*This is a simplified wireframe. Full AI-generated prototypes will be available when service quota is restored.*`
    };
}

// Project Generation Function - THIS IS THE FUNCTION THAT WE NEED TO USE TO CREATE THE WIREFRAME FOR THE PROJECT
async function generateProjectAssets(transcript) {
    /**
     * Analyzes a transcript and generates a complete project package.
     */
    const model = genai.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 8192,
            temperature: 0.7
        }
    });

    console.log("This is the User Request Transcript: ", transcript);
    
    const prompt = `
    **CRITICAL TASK: Generate a complete, self-contained project package based on the user's request.**

    **USER REQUEST TRANSCRIPT:**
    ---
    ${transcript}
    ---

    **PRIMARY GOAL:**
    Produce a complete, static, and interactive project deliverable based on the user's request. The entire output MUST be a single, valid JSON object where keys are the full file paths (e.g., "docs/overview.md", "prototype/index.html") and values are the complete file content.

    **PROJECT STRUCTURE & REQUIREMENTS:**

    1.  **Overall Structure (JSON Keys):**
        - \`index.html\`: A central hub page.
        - \`README.md\`: A brief project readme.
        - \`docs/\`: A directory for all markdown documentation.
        - \`wireframes/\`: A directory for low-fidelity HTML wireframes.
        - \`prototype/\`: A directory for the high-fidelity, interactive HTML/CSS/JS prototype.
        - \`prototype/assets/\`: For CSS, JS, and data files.

    2.  **Hub Page (\`index.html\`):**
        - Create a clean landing page with three main navigation cards:
            - **"Documentation"**: Links to \`docs/overview.md\`.
            - **"Wireframes"**: Links to \`wireframes/index.html\`.
            - **"Interactive Prototype"**: Links to \`prototype/index.html\`.
        - **IMPORTANT:** In the footer of this page, add two links: "View Documentation" (to \`docs/overview.md\`) and "View Wireframe" (to \`wireframes/index.html\`).

    3.  **Documentation (\`docs/*.md\`):**
        - Generate concise, actionable markdown documentation based on the user's request.
        - Include key sections like \`overview.md\`, \`requirements.md\`, and \`flows.md\`.
        - Use tables, lists, and clear examples.

    4.  **Wireframes (\`wireframes/*.html\`):**
        - Produce low-fidelity, grayscale HTML wireframes. Use simple CSS for layout (boxes, lines, labels).
        - Create an \`index.html\` in this directory that links to all other wireframe pages.
        - Each wireframe should have a header and a "notes" column explaining the logic.
        - These are for layout and flow, not for final design.

    5.  **Interactive Prototype (\`prototype/\`):**
        - Create a clickable, data-driven, and mobile-friendly prototype using vanilla HTML, CSS, and JavaScript.
        - **NO external libraries or frameworks.**
        - The \`prototype/index.html\` is the entry point.
        - \`prototype/assets/styles.css\`: All CSS for the prototype.
        - \`prototype/assets/app.js\`: All JavaScript for interactivity.
        - \`prototype/assets/dummy-data.json\`: Create realistic mock data to power the prototype.
        - The prototype must be a simulation of the core user flows.

    **EXECUTION:**
    - Analyze the provided **USER REQUEST TRANSCRIPT**.
    - Generate all the files described above according to the specified structure and requirements.
    - Ensure all internal links between the hub, docs, wireframes, and prototype pages are correct.
    - Return the entire project as a single, valid JSON object. Do not include any other text or explanation in your response.
    `;

    console.log("--- Generating Project Assets... This may take a moment. ---");
    
    try {
        const result = await retryWithBackoff(async () => {
            return await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });
        }, 2, 5000); // Reduced retries and increased initial delay for quota issues
        
        console.log("--- Asset Generation Complete. ---");
        
        const responseText = result.response.text();
        console.log("Raw AI response length:", responseText.length);
        
        try {
            // Try to clean the response if it has extra content
            let cleanedResponse = responseText.trim();
            
            // Look for JSON content between ```json and ``` if present
            const jsonMatch = cleanedResponse.match(/```json\s*(\{[\s\S]*\})\s*```/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[1];
            }
            
            // Look for JSON content that starts with { and ends with }
            const jsonStart = cleanedResponse.indexOf('{');
            const jsonEnd = cleanedResponse.lastIndexOf('}');
            
            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);
            }
            
            return JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse JSON response:', parseError);
            console.error('Raw response preview:', responseText.substring(0, 500) + '...');
            console.log('🔄 JSON parsing failed, falling back to simplified wireframe...');
            return null; // Signal to use fallback
        }
    } catch (error) {
        if (error.status === 429) {
            console.log('🔄 Quota exceeded, using fallback wireframe generation...');
            return null; // Signal to use fallback
        }
        throw error;
    }
}

// GitHub Functions - THIS IS THE FUNCTION THAT WE NEED TO USE TO CREATE THE WIREFRAME FOR THE PROJECT
async function createGithubRepo(repoName) {
    /**
     * Creates a new repository on GitHub.
     */
    const url = "https://api.github.com/user/repos";
    const headers = { "Authorization": `token ${GITHUB_TOKEN}` };
    const data = {
        name: repoName,
        description: "A new repository for a generated project package.",
        private: false,
        auto_init: true
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating GitHub repository:', error.response?.data || error.message);
        throw error;
    }
}

// Upload File to GitHub - THIS IS THE FUNCTION THAT WE NEED TO USE TO CREATE THE WIREFRAME FOR THE PROJECT
async function uploadFileToGithub(repoFullName, filePath, fileContent) {
    /**
     * Uploads or updates a file in the specified GitHub repository.
     */
    const url = `https://api.github.com/repos/${repoFullName}/contents/${filePath}`;
    const headers = { "Authorization": `token ${GITHUB_TOKEN}` };
    
    let sha = null;
    try {
        const getResponse = await axios.get(url, { headers });
        if (getResponse.status === 200) {
            sha = getResponse.data.sha;
        }
    } catch (error) {
        // File doesn't exist, which is fine for new files
    }

    const encodedContent = Buffer.from(fileContent, 'utf-8').toString('base64');
    const data = {
        message: `feat: Add or update ${filePath}`,
        content: encodedContent
    };
    
    if (sha) {
        data.sha = sha;
    }

    try {
        const response = await axios.put(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error uploading file ${filePath}:`, error.response?.data || error.message);
        throw error;
    }
}

// Enable GitHub Pages - THIS IS THE FUNCTION THAT WE NEED TO USE TO CREATE THE WIREFRAME FOR THE PROJECT
async function enableGithubPages(repoFullName) {
    /**
     * Enables GitHub Pages for the repository.
     */
    const url = `https://api.github.com/repos/${repoFullName}/pages`;
    const headers = {
        "Authorization": `token ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json"
    };
    const data = {
        source: {
            branch: "main",
            path: "/"
        }
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error enabling GitHub Pages:', error.response?.data || error.message);
        throw error;
    }
}

// Orchestrator Function - THIS IS THE FUNCTION THAT WE NEED TO USE TO CREATE THE WIREFRAME FOR THE PROJECT
async function generateAndDeployProject(transcript, jobData = null) {
    /**
     * Generates assets, creates a repo, uploads files, and enables GitHub Pages.
     */
    if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
        throw new Error("GITHUB_TOKEN and GITHUB_USERNAME must be set in the environment.");
    }

    console.log("1. Generating complete project package...");
    let projectFiles = await generateProjectAssets(transcript);
    
    // If AI generation failed due to quota, use fallback
    if (!projectFiles && jobData) {
        console.log("   Using fallback wireframe generation...");
        projectFiles = createFallbackWireframe(jobData);
    } else if (!projectFiles) {
        throw new Error("Failed to generate project files and no fallback data available");
    }
    
    console.log(`   Done. Generated ${Object.keys(projectFiles).length} files.`);

    const repoName = `generated-project-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)}`;
    console.log(`\n2. Creating GitHub repository named '${repoName}'...`);
    const repoInfo = await createGithubRepo(repoName);
    const repoFullName = `${GITHUB_USERNAME}/${repoName}`;
    console.log(`   Repository created: ${repoInfo.html_url}`);

    console.log("\n3. Uploading all project files to the repository...");
    for (const [filePath, fileContent] of Object.entries(projectFiles)) {
        console.log(`   - Uploading ${filePath}...`);
        await uploadFileToGithub(repoFullName, filePath, fileContent);
    }
    console.log("   All files uploaded.");

    console.log("\n4. Enabling GitHub Pages...");
    const pagesInfo = await enableGithubPages(repoFullName);
    console.log(`   GitHub Pages enabled: ${pagesInfo.html_url}`);

    return {
        repo_url: repoInfo.html_url,
        pages_url: pagesInfo.html_url,
        fallback_used: !projectFiles || Object.keys(projectFiles).length <= 2
    };
}

// Function to create a wire frame for a job
async function createWireFrame(jobData) {
    try {
        // Convert job data to a transcript-like format for processing
        const transcript = `
        Create a project for: ${jobData.title}
        Category: ${jobData.category}
        Description: ${jobData.description}
        Target Audience: ${jobData.targetAudience}
        Key Features: ${jobData.keyFeatures}
        Technology Stack: ${jobData.technologyStack}
        Budget: ${jobData.budget}
        Timeline: ${jobData.timeline}
        Success Criteria: ${jobData.successCriteria}
        Potential Challenges: ${jobData.potentialChallenges}
        `;

        console.log('Creating wireframe for job:', jobData.title);
        const result = await generateAndDeployProject(transcript, jobData);
        console.log('Wireframe created successfully:', result);
        
        if (result.fallback_used) {
            console.log('ℹ️  Note: Simplified wireframe was used due to API limitations. Full AI-generated wireframes will be available when quota is restored.');
        }
        
        return result;
    } catch (error) {
        console.error('Error creating wireframe:', error);
        throw error;
    }
}

module.exports = {
    createWireFrame,
    generateProjectAssets,
    createGithubRepo,
    uploadFileToGithub,
    enableGithubPages,
    generateAndDeployProject
};