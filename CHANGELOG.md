# Changelog

All notable changes to AI Asteroids will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CHANGELOG.md file to track project changes
- Exit button (🚪) to navigate to https://RichLewis007.com
- Immediate fallback text display when no API key is configured
- Version number display (v.002) shown in top-right corner of all menus
- Automated version management system with git tag integration
- Development documentation (DEVELOPMENT.md) for maintainers
- GitHub Actions workflow for automatic version updates
- Local testing setup (index-local.html) for safe AI feature development
- Automated local testing file generation script (generate-local-test.js)
- .env file support for automatic API key injection
- .env.example file for easy setup documentation
- Automatic browser opening for generated local test files
- High-tech animated loading display for after-action report generation
- Seamless screen fade-out effect when player dies, leading directly to tech display
- Local testing documentation in README for developers

### Changed
- Removed 10-second countdown timer that prevented immediate game restart after game over
- Cleaned up restart button logic for better user experience
- Mission briefing now shows fallback text immediately when no API key is set
- After-action reports now show fallback text immediately when no API key is set
- Improved UX by eliminating unnecessary loading spinners for users without API key
- Exit button now navigates to https://RichLewis007.com in same window instead of new tab
- Local testing workflow now automated - no more manual file syncing required
- API key management now uses .env files for better security and convenience
- After-action reports now use final score with seamless fade-to-tech-display flow

### Changed
- Game canvas now fills entire screen for immersive fullscreen experience
- Removed size constraints that limited canvas to 90% of window and 800px max
- Updated modal and overlay positioning for fullscreen layout

### Fixed
- Game over animation now plays consistently every time player dies
- Replaced unreliable GSAP dependency with pure CSS animations
- Fixed timing issues that prevented game over animation from showing

### Security
- Removed private email address from git history and public repository

## [v.002] - 2025-09-15

### Added
- Live link to play the game in README
- GitHub Pages deployment setup
- CNAME file for custom domain

### Changed
- Updated README with better instructions and live game link
- Improved project documentation and setup instructions

## [v.001] - 2025-08-07

### Added
- High score system with local storage
- Player name input for high score saving
- High score display functionality
- Mission briefing system with AI-generated content
- After-action report generation using Gemini AI
- Audio system with Tone.js integration
- Multiple sound effects:
  - Start game sound
  - Shoot sound
  - Player death sound
  - Enemy explosion sounds with 3D spatial audio
- Touch support for mobile devices
- Lazy loading of audio library for better performance
- Preconnect links for improved loading performance

### Changed
- Refactored audio initialization for better performance
- Improved sound design and explosion effects
- Enhanced motion and physics
- Better control setup with WASD support
- Optimized code for performance and load times

## [0.3.0] - 2025-08-07

### Added
- AI-powered mission briefing generation
- AI-powered after-action report generation
- Integration with Google's Gemini AI API
- Exponential backoff retry logic for API calls
- Mission briefing container and display
- After-action report container and display
- Report generation button
- Error handling for API failures

### Changed
- Updated README with instructions for API key setup
- Renamed project to "AI Asteroids"
- Improved project structure and documentation

## [0.2.0] - 2025-08-06

### Added
- Comprehensive sound system using Tone.js
- Multiple audio synthesizers:
  - Start game synth
  - Shoot synth
  - Player death sounds (boom, noise, wail)
  - Enemy explosion sounds
- 3D spatial audio with panner pool
- Engine flame effects on player ship
- Improved explosion particle effects
- Better visual feedback for ship movement

### Changed
- Enhanced sound design and audio experience
- Improved explosion effects and motion
- Better visual effects and animations
- Optimized audio performance with connection pooling

## [0.1.0] - 2025-08-06

### Added
- Basic Asteroids game implementation
- Player ship with mouse-aimed movement
- WASD and arrow key controls
- Space bar shooting
- Enemy asteroids and ships
- Collision detection
- Score system
- Screen wrapping for player and enemies
- Starfield background
- Game over screen
- Restart functionality

### Changed
- Initial control setup with WASD support
- Basic explosion sound implementation

## [0.0.1] - 2025-08-06

### Added
- Initial project setup
- Basic HTML structure
- Canvas-based game rendering
- README documentation

---

## Development Notes

### Recent Security Improvements
- **2025-09-15**: Removed private email address from all git history, commits, and public repository using git filter-branch
- **2025-09-15**: Force-pushed cleaned history to GitHub with updated tags

### Performance Optimizations
- Lazy loading of audio libraries
- Preconnect links for external resources
- Optimized audio connection pooling
- Efficient particle system management

### API Integration
- Google Gemini AI for mission briefings and after-action reports
- Exponential backoff retry logic for robust API handling
- Graceful fallbacks when API is unavailable

### Audio System
- Tone.js integration for high-quality audio synthesis
- 3D spatial audio positioning
- Multiple synthesizer types for varied sound effects
- Audio context management and optimization
