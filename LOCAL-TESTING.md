# 🧪 Local Testing Guide

This guide helps you test the AI features locally without exposing your API key to GitHub.

## 🔑 Getting Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key
5. Copy the key (it looks like: `AIzaSyC...`)

## 🚀 Quick Setup

1. **Open the local test file:**
   ```bash
   open index-local.html
   ```

2. **Add your API key:**
   - Open `index-local.html` in a text editor
   - Find line 439: `const API_KEY = "YOUR_API_KEY_HERE";`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - Save the file

3. **Test the AI features:**
   - Refresh the page in your browser
   - You should see "🧪 LOCAL TESTING MODE" at the top
   - Start a game and play until you die
   - Click "✨ Generate Report" to test the AI after-action report

## ✅ What to Test

### Mission Briefing
- **With API Key**: Should show a spinner, then AI-generated mission text
- **Without API Key**: Should show "Mission: Destroy all hostiles. Good luck, pilot."

### After-Action Report  
- **With API Key**: Should show a spinner, then AI-generated report based on your score
- **Without API Key**: Should show "Your comms were damaged in the fight. No report available."

## 🔒 Security Notes

- ✅ `index-local.html` is in `.gitignore` - it won't be committed to GitHub
- ✅ Your API key stays on your local machine only
- ✅ The main `index.html` has an empty API key for GitHub Pages

## 🐛 Troubleshooting

**"API request failed after multiple retries"**
- Check your API key is correct
- Make sure you have internet connection
- Verify the API key has Gemini API access enabled

**No spinner shows**
- Check browser console for JavaScript errors
- Make sure you replaced `YOUR_API_KEY_HERE` with your actual key

**AI text doesn't appear**
- Check browser console for network errors
- Try refreshing the page
- Verify your API key has the right permissions

## 🎯 Expected Behavior

When working correctly:
1. **Mission Briefing**: Shows spinner → AI-generated mission text
2. **After-Action Report**: Shows spinner → AI-generated report based on score
3. **Fallback Mode**: Shows static text when no API key or API fails

The AI should generate different content each time you play!
