#!/usr/bin/env bash

# Local Development Runner
# 
# This script checks for the presence of a .env file and runs the development workflow.
# The development workflow generates the local HTML file and opens it in the browser.
# If no .env file is found, it provides clear instructions on how to create and configure it.
# 
# Features:
# - Validates .env file existence before running the development workflow
# - Provides step-by-step guidance for API key setup
# - Uses colored output for better user experience
# - Automatically runs npm run dev when properly configured (which generates and opens the local html file)
# 
# Usage: ./local-run.sh
# 
# Prerequisites:
# - Node.js and npm installed
# - .env file with GEMINI_API_KEY (or the script will guide you to create one)
# 
# The script will:
# 1. Check if .env file exists
# 2. If found: Run npm run dev (which generates local-index.html and opens it in browser)
# 3. If not found: Display setup instructions and exit

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_error() {
    echo -e "${RED}• $1${NC}"
}

print_success() {
    echo -e "${GREEN}• $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}• $1${NC}"
}

print_info() {
    echo -e "${BLUE}• $1${NC}"
}

# Check if .env file exists
if [[ -f ".env" ]]; then
    print_success ".env file found"
    echo "• Starting development workflow..."
    npm run dev
else
    print_warning ".env file not found"
    echo ""
    echo "To create and configure your .env file:"
    echo ""
    print_info "1. Create a .env file in the project root:"
    echo "   touch .env"
    echo ""
    print_info "2. Add your API key to the .env file:"
    echo "   echo 'GEMINI_API_KEY=your_actual_api_key_here' >> .env"
    echo ""
    print_info "3. Or edit the .env file manually:"
    echo "   nano .env"
    echo "   # Add: GEMINI_API_KEY=your_actual_api_key_here"
    echo ""
    print_info "4. Then run this script again:"
    echo "   ./local-run.sh"
    echo ""
    print_warning "Note: Replace 'your_actual_api_key_here' with your real Gemini API key"
    exit 1
fi

