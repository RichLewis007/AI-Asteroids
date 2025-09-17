#!/usr/bin/env node

/**
 * Generate Local HTML File
 * 
 * This script automatically creates local-index.html from index.html
 * by replacing the empty API_KEY with your actual API key from .env file.
 * 
 * Usage: node generate-local-html.js
 */

const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

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

// Function to get the latest version from git tags
function getLatestVersion() {
    try {
        const latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
        console.log(`• Using version: ${latestTag}`);
        return latestTag;
    } catch (error) {
        console.log('• Could not get latest git tag, keeping original version');
        return null;
    }
}

// Function to update package.json version
function updatePackageJsonVersion(version) {
    try {
        const packageJsonPath = path.join(__dirname, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            packageJson.version = version;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
            console.log(`• Updated package.json version to ${version}`);
        }
    } catch (error) {
        console.log('• Could not update package.json version:', error.message);
    }
}

// Function to update README.md version
function updateReadmeVersion(version) {
    try {
        const readmePath = path.join(__dirname, 'README.md');
        if (fs.existsSync(readmePath)) {
            let content = fs.readFileSync(readmePath, 'utf8');
            
            // Look for common version patterns and update them
            const versionPatterns = [
                // Pattern for "version: v.xxx" or "Version: v.xxx"
                /(version:\s*)v\.[0-9]+/gi,
                // Pattern for "v.xxx" in badges or other places
                /(badge.*version.*)v\.[0-9]+/gi,
                // Pattern for "Current version: v.xxx"
                /(current version:\s*)v\.[0-9]+/gi
            ];
            
            let updated = false;
            versionPatterns.forEach(pattern => {
                if (pattern.test(content)) {
                    content = content.replace(pattern, `$1${version}`);
                    updated = true;
                }
            });
            
            if (updated) {
                fs.writeFileSync(readmePath, content, 'utf8');
                console.log(`• Updated README.md version to ${version}`);
            } else {
                console.log('• No version patterns found in README.md to update');
            }
        }
    } catch (error) {
        console.log('• Could not update README.md version:', error.message);
    }
}

// Function to open file in default browser
function openInBrowser(filePath) {
    const command = process.platform === 'win32' ? 'start' : 
                   process.platform === 'darwin' ? 'open' : 'xdg-open';
    
    exec(`${command} "${filePath}"`, (error) => {
        if (error) {
            console.log('• Could not open browser automatically. Please open local-index.html manually.');
        } else {
            console.log('Opening in your default browser...');
        }
    });
}

function generateLocalHtmlFile() {
    try {
        // Read the main index.html file
        const indexPath = path.join(__dirname, 'index.html');
        const localHtmlFilePath = path.join(__dirname, 'local-index.html');
        const envPath = path.join(__dirname, '.env');
        
        if (!fs.existsSync(indexPath)) {
            console.error('• Error: index.html not found');
            process.exit(1);
        }
        
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Try to read API key from .env file
        const env = parseEnvFile(envPath);
        const apiKey = env.GEMINI_API_KEY || env.API_KEY;
        
        let replacement;
        if (apiKey) {
            replacement = `const API_KEY = "${apiKey}"; // Loaded from .env file`;
            console.log('• Using API key from .env file');
        } else {
            replacement = 'const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key';
            console.log('• No API key found in .env file - using placeholder');
            console.log('• Create a .env file with: GEMINI_API_KEY=your_key_here');
        }
        
        // Replace the empty API key
        const apiKeyRegex = /const API_KEY = "";/;
        
        if (!content.match(apiKeyRegex)) {
            console.error('• Error: Could not find API_KEY declaration in index.html');
            process.exit(1);
        }
        
        content = content.replace(apiKeyRegex, replacement);
        
        // Add a Local Running notice to the title
        content = content.replace(
            '<title>AI Asteroids</title>',
            '<title>AI Asteroids - Running Locally</title>'
        );
        
        // Add local running notice to the page
        const localRunNotice = `
    <div id="api-use-notice">
        RUNNING LOCALLY<br>
        AI features are enabled with your API key
    </div>`;
        
        content = content.replace(
            '<body>',
            `<body>${localRunNotice}`
        );
        
        // Add CSS for the local running notice
        const localRunNoticeCSS = `
        /* API Key Local Running Notice */
        #api-use-notice {
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
            opacity: 1;
            transition: opacity 2s ease-out;
        }
        
        #api-use-notice.fade-out {
            opacity: 0;
        }`;
        
        content = content.replace(
            '</style>',
            `${localRunNoticeCSS}
        </style>`
        );
        
        // Add JavaScript to fade the notice after 6 seconds
        const fadeNoticeJS = `
        // Fade out the local running notice after 6 seconds
        document.addEventListener('DOMContentLoaded', function() {
            const notice = document.getElementById('api-use-notice');
            if (notice) {
                setTimeout(() => {
                    notice.classList.add('fade-out');
                    // Remove the element after fade completes
                    setTimeout(() => {
                        if (notice.parentNode) {
                            notice.parentNode.removeChild(notice);
                        }
                    }, 2000); // Match CSS transition duration
                }, 6000); // 6 seconds
            }
        });`;
        
        content = content.replace(
            '</script>',
            `${fadeNoticeJS}
        </script>`
        );
        
        // Get the latest version and update version display for local running
        const latestVersion = getLatestVersion();
        if (latestVersion) {
            content = content.replace(
                /const fallbackVersion = "[^"]*";/,
                `const fallbackVersion = "${latestVersion} (Running Locally)";`
            );
            
            // Also update package.json and README.md versions
            updatePackageJsonVersion(latestVersion);
            updateReadmeVersion(latestVersion);
        } else {
            // Keep the original version if we can't get git tag
            console.log('• Keeping original version in local html file');
        }
        
        // Write the local html file
        fs.writeFileSync(localHtmlFilePath, content, 'utf8');
        
        console.log('• Successfully generated local-index.html');
        console.log('• Local html file is ready for development');
        
        if (apiKey) {
            console.log('• AI features are ready to use!');
        } else {
            console.log('• Remember to replace YOUR_API_KEY_HERE with your actual API key');
            console.log('• Or create a .env file with: GEMINI_API_KEY=your_key_here');
        }
        
        // Open the generated file in the default browser
        openInBrowser(localHtmlFilePath);
        
    } catch (error) {
        console.error('• Error generating local html file:', error.message);
        process.exit(1);
    }
}

// Run the script
generateLocalHtmlFile();
