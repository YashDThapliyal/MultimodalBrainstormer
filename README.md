# 🧠 MultimodalBrainstormer

Turn scattered thoughts into organized knowledge. **Upload text, images, and ideas.**  AI finds connections you'd miss and helps you think deeper.

![Version](https://img.shields.io/badge/version-4.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Claude](https://img.shields.io/badge/Claude-Vision-8B5CF6)

---

## Why MultimodalBrainstormer?

### The Problem
Your best ideas don't stay organized. You capture them in different ways:
- Quick text notes that blur together
- Sketches and photos that don't connect to typed ideas
- Screenshots of research that live separately from your thoughts
- Handwritten notes that get lost

**Result:** Scattered, unorganized, hard to find patterns.

### The Solution
**One canvas where everything connects.**

- **Text** nodes for refined ideas
- **Image** nodes for sketches, photos, handwritten notes, screenshots
- **AI-powered connections** that find relationships across all types
- **Chat** to ask questions about your multimodal brainstorm
- **Automatic organization** based on what actually belongs together

<img width="1295" height="977" alt="Screenshot 2026-02-06 at 3 02 47 AM" src="https://github.com/user-attachments/assets/d981e3ad-c9ca-4f5d-952b-16e10a11edaf" />


---

## What It Does

### 1. **Capture Ideas in Any Form**
```
📝 Text → Type quick thoughts
📸 Images → Upload sketches, photos, handwritten notes, screenshots
→ Both appear on the same interactive canvas
```

### 2. ** AI Understands Everything**
```
Handwritten note: "Customer wants faster checkout"
Text node: "Build payment optimization"
Photo of competitor: [screenshot of payment UI]

AI realizes: These are all about the same problem.
Suggests connection: All three relate to payment experience.
```

### 3. **Discover Hidden Patterns**
- **AI suggests connections** between ideas (text + images combined)
- **Hover connections** to see why they're related
- **Chat with your brainstorm** - ask questions, get insights
- **Auto-organize** into logical flows (4 layout algorithms)

### 4. **Vision AI Extracts Meaning from Images**
When you upload an image, the AI automatically:
- **Reads handwriting** (transcribes messy notes)
- **Identifies objects** (what's in photos/diagrams)
- **Extracts text** (from screenshots, documents)
- **Describes relationships** (diagrams, sketches)
- **Generates summaries** (interprets visual content)

All extracted content is searchable and connectable.

### 5. **Think Out Loud**
Chat directly with your brainstorm:
- "What are the main themes?"
- "What's in that image I uploaded?"
- "How does this relate to that?"
- "What's missing from my thinking?"

The AI sees everything—text, images, connections—and responds with context.

---

## Quick Start

### Setup (1 minute)
```bash
npm install
# Create .env file with:
VITE_ANTHROPIC_API_KEY=sk-ant-your_key
npm run dev
```

Open `http://localhost:5173`

### Use (2 minutes)

1. **Add ideas** - Click "New Idea" to type, or "Upload Image" to add photos/sketches
2. **Let the AI analyze** - Images are automatically processed with Vision AI
3. **Get suggestions** - Click "AI Suggest" to find connections
4. **Explore** - Use chat on right sidebar to ask questions
5. **Export** - Download as PNG when done

---

## Example: Planning a Trip to Carmel

**You dump in:**
- Text: "Weekend trip - 3 days"
- Image: Screenshot of Google Maps route (Berkeley → Carmel)
- Image: Photo of beach destination you found
- Image: Screenshot of attractions/activities page

**AI realizes:**
- Route shows 4-hour drive
- Beach is the destination
- Activities available there
- Time constraint: 3 days

**Suggests connections:**
- Drive time → Activities (enough time to do them)
- Destination photo → Activities (things to do there)
- All connected to 3-day constraint

**Chat: "What should I prioritize?"**
AI: "Drive takes 4 hours, activities include hiking and beach time. With 3 days, you should leave early day 1, leaving 2 days for activities."

**Result:** Organized trip plan from scattered inputs.

---

## Key Features

### Multimodal Nodes
- **Text nodes** - Categorized ideas (Problem/Solution/Execution/Validation)
- **Image nodes** - Photos, sketches, handwritten notes, screenshots with automatic Claude Vision analysis
- **Seamless integration** - Both types work together on one canvas

### AI That Actually Works
- **Smart connections** - Claude analyzes text + image content together
- **Vision API** - Reads handwriting, identifies objects, extracts text from images
- **Context-aware chat** - Understands everything on your canvas
- **Actionable suggestions** - Apply changes with one click

### Beautiful Organization
- **4 auto-layout algorithms** - Arrange nodes instantly
- **3 themes** - Light, Dark, Cyberpunk
- **Interactive canvas** - Drag, connect, edit in place
- **Export as PNG** - Share your thinking

### Everything Saves
- **Auto-saves to browser** - No login needed
- **Persistent across sessions** - Your brainstorms live in localStorage
- **Zero setup** - Just paste your API key and go

---

## Why It Works

Traditional brainstorming tools make you choose:
- **Whiteboard apps** - Great for sketching, but text doesn't connect to images
- **Note apps** - Great for text, but images are just attachments
- **AI chat** - Great for ideas, but can't see visual references together

**MultimodalBrainstormer:**
- Treats all inputs equally (text = images = connections)
- Claude Vision understands photos and handwriting
- Everything is connectable and searchable
- AI suggests connections across modalities
- You can ask questions about any part

It's like having a collaborator who can read your handwriting, understand your sketches, see your references, AND connect them all together.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Delete` | Remove selected nodes/edges |
| `Double-click node` | Edit text |
| `Enter` | Save or send chat |
| `Shift + Enter` | New line |
| `Escape` | Cancel editing |

---

## Use Cases

- **Designers** - Mix hand sketches with visual references and design notes
- **Product Managers** - Combine research screenshots, wireframes, and requirements
- **Researchers** - Integrate document screenshots, photos, and synthesis notes
- **Students** - Combine lecture notes, textbook photos, and handwritten study guides
- **Entrepreneurs** - Mix business ideas, market research, and customer feedback notes
- **Creatives** - Blend mood boards, sketches, written concepts, and inspiration

---

## Tech Stack

- **React 18** + **Vite** - UI and build
- **React Flow** - Interactive canvas
- **Claude AI + Vision API** - Intelligence
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

---

## API Key Setup

1. Get your key from [Anthropic Console](https://console.anthropic.com/)
2. Create `.env` file:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-your_key_here
   ```
3. Restart dev server
4. Done - app reads from environment variable

---

## Troubleshooting

**Images not analyzing?**
- Max 20MB per image
- Allowed formats: PNG, JPG, WEBP, GIF
- Takes 5-10 seconds per image

**Connections not suggesting?**
- Need at least 2 nodes
- Check API key is valid
- Restart dev server after changing `.env`

**Not saving?**
- Check browser localStorage (sometimes full)
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

Built by Yash Thapliyal in 2026
