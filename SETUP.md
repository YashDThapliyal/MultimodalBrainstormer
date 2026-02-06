# Quick Setup Guide

## You're Almost Ready! 🚀

The app is built and the dev server is running. Follow these final steps:

### 1. Add Your Anthropic API Key

Open the file `.env.local` in this directory and replace the placeholder with your actual API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

Get your API key from: https://console.anthropic.com/

### 2. Restart the Dev Server

After adding your API key:

```bash
# Stop the current server (Ctrl+C in the terminal where it's running)
# Then restart:
npm run dev
```

### 3. Open Your Browser

Navigate to: **http://localhost:5173/**

### 4. Start Brainstorming!

Try this workflow:
1. Click **"New Idea"** to add 3-5 nodes with different thoughts
2. Click **"AI Suggest"** to see AI-discovered connections
3. Open the **right sidebar** (if not already open)
4. Click **"Generate"** in the Summary section
5. Try asking the AI: *"What are the main themes in my brainstorm?"*

## Troubleshooting

### Server Not Starting?
```bash
# Make sure you're in the right directory
cd /Users/yash/Desktop/braindump/braindump-app

# Try reinstalling dependencies
npm install

# Start the server
npm run dev
```

### API Errors?
- Double-check your API key in `.env.local`
- Ensure your Anthropic account has credits
- Check the browser console (F12) for specific error messages

### Changes Not Showing?
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear browser cache
- Restart the dev server

## Project Structure Reference

```
braindump-app/
├── src/
│   ├── components/
│   │   ├── Canvas.jsx      # Main canvas with React Flow
│   │   ├── TextNode.jsx    # Custom node component
│   │   └── Sidebar.jsx     # AI summary + chat
│   ├── services/
│   │   └── ai.js           # Claude API integration
│   ├── store.js            # Zustand state management
│   ├── App.jsx             # Main app
│   └── index.css           # Global styles
├── .env.local              # YOUR API KEY HERE!
├── package.json            # Dependencies
└── README.md               # Full documentation
```

## Next Steps

After everything works:
- Read the full [README.md](./README.md) for detailed features
- Experiment with different brainstorming workflows
- Try the chat interface to explore your ideas
- Check out the keyboard shortcuts

Enjoy building your knowledge graph! 🧠✨
