#!/usr/bin/env node

/**
 * Script to automatically update version number in index.html
 * Run this before committing to update the version display
 */

const fs = require('fs');
const { execSync } = require('child_process');

try {
    // Get the latest git tag
    const latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    console.log(`Latest version tag: ${latestTag}`);
    
    // Read the index.html file
    let htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Update the version in the updateVersionDisplay function
    htmlContent = htmlContent.replace(
        /const fallbackVersion = "[^"]*";/,
        `const fallbackVersion = "${latestTag}";`
    );
    
    // Write the updated content back
    fs.writeFileSync('index.html', htmlContent);
    
    console.log(`• Updated version to ${latestTag} in index.html`);
    
} catch (error) {
    console.error('• Error updating version:', error.message);
    process.exit(1);
}
