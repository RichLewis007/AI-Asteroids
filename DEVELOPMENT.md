# AI Asteroids - Development Guide

This document contains information for developers and maintainers of the AI Asteroids project.

## Quick Start

1. Clone the repository
2. Open `index.html` in a web browser
3. For AI features, add your Gemini API key to the `API_KEY` variable

## Project Structure

```
AI-Asteroids/
├── index.html              # Main game file (HTML, CSS, JavaScript)
├── assets/                 # Game assets (images, etc.)
├── CHANGELOG.md           # Version history and changes
├── DEVELOPMENT.md         # This file - developer documentation
├── package.json           # Node.js dependencies and scripts
├── local-run.sh           # Local development workflow runner
├── generate-local-html.js # Local html file generator
├── update-version.js      # Version update automation script
└── .github/workflows/     # GitHub Actions automation
```

## Version Management

The game automatically displays the current version number in the top-right corner of all menus. This version is managed through git tags and automated scripts.

### Automatic Version Updates

The version display is automatically updated using the latest git tag. No manual editing required!

#### Option 1: GitHub Actions (Recommended)
When you create a new git tag, GitHub Actions automatically updates the version:

```bash
# Create a new version tag
git tag v.004
git push origin v.004
```

The GitHub Actions workflow will automatically:
- Update the version display in `index.html`
- Commit the change
- Push to the repository

#### Option 2: Manual Script
Run the update script before committing:

```bash
node update-version.js
git add index.html
git commit -m "Update version display"
git push
```

#### Option 3: NPM Scripts
```bash
npm run update-version  # Update version from git tag
npm run build          # Update version + prepare for release
npm run release        # Update version + commit + push
```

### How It Works

1. **Version Detection**: The script reads the latest git tag using `git describe --tags --abbrev=0`
2. **File Update**: Updates the `fallbackVersion` variable in `index.html`
3. **Display**: JavaScript displays the version in the game UI

## Development Scripts

### local-run.sh
A bash script that simplifies local development by checking for required configuration and running the development workflow.

**Features:**
- Validates .env file existence before running the development workflow
- Provides step-by-step guidance for API key setup
- Uses colored output for better user experience
- Automatically runs `npm run dev` when properly configured (which generates and opens the local html file)

**Usage:**
```bash
./local-run.sh
```

**What it does:**
1. Checks if `.env` file exists
2. If found: Runs `npm run dev` (which generates `local-index.html` and opens it in browser)
3. If not found: Displays setup instructions and exits

**Prerequisites:**
- Node.js and npm installed
- `.env` file with `GEMINI_API_KEY` (or the script will guide you to create one)

### generate-local-html.js
A Node.js script that creates a local version of the game with AI features enabled.

**Features:**
- Automatically reads API key from `.env` file
- Generates `local-index.html` with AI features enabled
- Updates version numbers across multiple files
- Opens the generated file in the default browser

**Usage:**
```bash
node generate-local-html.js
```

**What it updates:**
- `local-index.html`: Creates local html file with API key
- `package.json`: Updates version to latest git tag
- `README.md`: Updates version badges and text

## Game Features

### Core Gameplay
- Player ship with WASD/arrow key movement
- Mouse-aimed shooting
- Enemy asteroids and ships
- Collision detection and scoring
- Screen wrapping

### AI Integration
- **Mission Briefing**: AI-generated mission descriptions
- **After-Action Reports**: AI-generated performance summaries
- **API**: Google Gemini AI integration
- **Fallback**: Graceful degradation when no API key is configured

### Audio System
- **Library**: Tone.js for audio synthesis
- **Features**: Spatial audio, multiple synthesizers
- **Performance**: Lazy loading and connection pooling

## Development Setup

### Prerequisites
- Node.js (for automation scripts)
- Git
- Web browser

### API Key Setup
1. Get a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Add the key to the `API_KEY` variable in `index.html`
3. Leave blank for public deployment (fallback text will be shown)

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. For AI features, add your API key
4. Make changes and test locally

### Local Running With AI Features

For safe local use of AI features without exposing your API key to the repository:

#### Automated Local Running Setup
```bash
# 1. Set up your API key (one-time setup)
cp .env.example .env
# Edit .env with your actual Gemini API key

# 2. Generate local html file from main index.html
npm run dev
```

This command:
- **Automatically generates** `local-index.html` from the latest `index.html`
- **Adds running locally indicators** (visual notice, updated title)
- **Automatically inserts your API key** from `.env` file
- **Opens in browser** for immediate use
- **Always up-to-date** - no manual syncing required

#### Development Workflow
```bash
# 1. Set up API key (one-time setup)
cp .env.example .env
# Edit .env with your actual API key

# 2. Make changes to index.html
# 3. Generate fresh local html file with API key
npm run dev1`
# 4. Run AI features locally
# 5. Commit changes to index.html (not local-index.html)
```

#### Benefits
- **No maintenance overhead** - local html file is always current
- **Safe development** - API key never gets committed
- **Identical functionality** - same features as main game
- **Easy local running** - just run `npm run dev` after any changes

## Deployment

### GitHub Pages
The game is automatically deployed to GitHub Pages:
- **Live URL**: https://ai-asteroids.richlewis007.com/
- **Source**: Main branch, root folder
- **Custom Domain**: Configured with HTTPS

### Deployment Process
1. Make changes to `index.html`
2. Commit and push to `main` branch
3. GitHub Pages automatically rebuilds and deploys

## Contributing

### Code Style
- Follow existing code formatting
- Use meaningful variable names
- Comment complex logic
- Update CHANGELOG.md for user-facing changes

### Git Workflow
1. Make changes
2. Run locally
3. Update CHANGELOG.md if needed
4. Commit with descriptive messages
5. Push to main branch

### Version Releases
1. Update CHANGELOG.md `[Unreleased]` section
2. Create new git tag: `git tag v.XXX`
3. Push tag: `git push origin v.XXX`
4. GitHub Actions will handle version display update

## Troubleshooting

### Common Issues

**Version not updating**
- Check git tags: `git tag -l`
- Run update script: `node update-version.js`
- Verify GitHub Actions workflow is enabled
- Check GitHub Actions logs for errors
- Ensure the workflow has proper permissions to push to main branch

**AI features not working**
- Check API key is configured
- Verify API key has proper permissions
- Check browser console for errors

**Audio not playing**
- Ensure user has interacted with page (browser requirement)
- Check Tone.js library loaded successfully
- Verify audio context is started

## Additional Resources

- [Tone.js Documentation](https://tonejs.github.io/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Keep a Changelog](https://keepachangelog.com/)

---

*This documentation is for developers and maintainers. For user information, see README.md*
