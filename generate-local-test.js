#!/usr/bin/env node

/**
 * Generate Local Testing File
 * 
 * This script automatically creates index-local.html from index.html
 * by replacing the empty API_KEY with your actual API key from .env file.
 * 
 * Usage: node generate-local-test.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Simple .env file parser
function parseEnvFile(envPath) {
    const env = {};
    if (!fs.existsSync(envPath)) {
        return env;
    }
    
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
    }
    
    return env;
}

// Function to open file in default browser
function openInBrowser(filePath) {
    const command = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';
    
    exec(`${command} "${filePath}"`, (error) => {
        if (error) {
            console.log('💡 Could not open browser automatically. Please open index-local.html manually.');
        } else {
            console.log('Opening in your default browser...');
        }
    });
}

function generateLocalTestFile() {
    try {
        // Read the main index.html file
        const indexPath = path.join(__dirname, 'index.html');
        const localTestPath = path.join(__dirname, 'index-local.html');
        const envPath = path.join(__dirname, '.env');
        
        if (!fs.existsSync(indexPath)) {
            console.error('❌ Error: index.html not found');
            process.exit(1);
        }
        
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Try to read API key from .env file
        const env = parseEnvFile(envPath);
        const apiKey = env.GEMINI_API_KEY || env.API_KEY;
        
        let replacement;
        if (apiKey) {
            replacement = `const API_KEY = "${apiKey}"; // Loaded from .env file`;
            console.log('✅ Using API key from .env file');
        } else {
            replacement = 'const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key';
            console.log('⚠️  No API key found in .env file - using placeholder');
            console.log('💡 Create a .env file with: GEMINI_API_KEY=your_key_here');
        }
        
        // Replace the empty API key
        const apiKeyRegex = /const API_KEY = "";/;
        
        if (!content.match(apiKeyRegex)) {
            console.error('❌ Error: Could not find API_KEY declaration in index.html');
            process.exit(1);
        }
        
        content = content.replace(apiKeyRegex, replacement);
        
        // Add a testing notice to the title
        content = content.replace(
            '<title>AI Asteroids</title>',
            '<title>AI Asteroids - Local Testing</title>'
        );
        
        // Add testing notice to the page
        const testingNotice = `
    <div id="api-test-notice">
        🧪 LOCAL TESTING MODE<br>
        AI features enabled with your API key
    </div>`;
        
        content = content.replace(
            '<body>',
            `<body>${testingNotice}`
        );
        
        // Add CSS for the testing notice
        const testingNoticeCSS = `
        /* API Key Testing Notice */
        #api-test-notice {
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(255, 193, 7, 0.9);
            color: #000;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1001;
            max-width: 300px;
        }`;
        
        content = content.replace(
            '</style>',
            `${testingNoticeCSS}
        </style>`
        );
        
        // Update version display for local testing
        content = content.replace(
            'const fallbackVersion = "v.005"; // Updated by script',
            'const fallbackVersion = "v.005 (Local Test)"; // Updated by script'
        );
        
        // Write the local test file
        fs.writeFileSync(localTestPath, content, 'utf8');
        
        console.log('✅ Successfully generated index-local.html');
        console.log('📝 Local testing file is ready for development');
        
        if (apiKey) {
            console.log('🚀 AI features are ready to test!');
        } else {
            console.log('🔑 Remember to replace YOUR_API_KEY_HERE with your actual API key');
            console.log('💡 Or create a .env file with: GEMINI_API_KEY=your_key_here');
        }
        
        // Open the generated file in the default browser
        openInBrowser(localTestPath);
        
    } catch (error) {
        console.error('❌ Error generating local test file:', error.message);
        process.exit(1);
    }
}

// Run the script
generateLocalTestFile();
