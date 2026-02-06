# 🧠 AI-Powered Brainstorming Knowledge Graph

An interactive, multimodal thinking tool that combines the spatial freedom of a whiteboard with intelligent AI-driven knowledge organization. Create and connect ideas through text and images, and let Claude AI discover semantic relationships, analyze visual content, and help you think deeper.

![Version](https://img.shields.io/badge/version-4.0-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Claude](https://img.shields.io/badge/Claude-Sonnet_4.5-8B5CF6)

---

## ✨ Key Features

### 🎨 Interactive Canvas
- **Text Nodes** - Create, edit, and categorize ideas with color-coded categories
- **Image Nodes** - Upload photos, sketches, diagrams, or handwritten notes
- **Flexible Connections** - Draw relationships between any ideas
- **4 Auto-Layout Algorithms** - Organize your brainstorm instantly
- **3 Beautiful Themes** - Light, Dark, and Cyberpunk modes

### 🤖 Claude AI Integration
- **Smart Connection Suggestions** - AI analyzes your content and suggests semantic relationships
- **Vision Analysis** - Automatic OCR and content extraction from images
- **Chat Interface** - Ask questions, get insights, and expand on ideas
- **Summary Generation** - AI-generated overview of themes and patterns
- **Actionable Suggestions** - AI can suggest new ideas and connections you can apply with one click

### 📸 Multimodal Brainstorming
- **Upload Images** - PNG, JPG, WEBP, GIF (up to 20MB)
- **Claude Vision API** - Transcribes handwriting, identifies objects, describes diagrams
- **Full AI Integration** - Image content is used in suggestions, summaries, and chat
- **Edit Analysis** - Refine Claude's interpretation of your images

### 🎨 Visual Design
- **Three Themes:**
  - ☀️ **Whiteboard** - Clean, professional light mode
  - 🌙 **Dark Mode** - Elegant dark theme with glowing accents
  - ⚡ **Cyberpunk** - Black background with neon colors and intense glows
- **Theme-Aware Components** - Everything adapts to your chosen theme
- **Smooth Animations** - Framer Motion throughout
- **Export to PNG** - Download your brainstorm as a high-quality image

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed
- **Anthropic API key** ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone or navigate to this directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**

   Create a `.env` file in the root directory:
   ```env
   VITE_ANTHROPIC_API_KEY=sk-ant-your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📖 Usage Guide

### Quick Start Workflow

#### 1. **Rapid Braindump**
- Click **"New Idea"** to add text nodes
- Click **"Upload Image"** to add visual content (sketches, notes, photos)
- Type your thoughts quickly without worrying about organization
- Double-click text nodes to edit them later

#### 2. **Let AI Analyze Images**
- Uploaded images are automatically analyzed by Claude Vision
- Claude transcribes handwriting, identifies objects, and describes diagrams
- Click the edit icon to refine the analysis

#### 3. **AI Organization**
- Once you have several nodes, click **"AI Suggest"**
- Review the auto-created connection suggestions (dashed lines with reasoning on hover)
- Delete any suggestions that don't make sense
- Manually add your own connections by dragging from node handles

#### 4. **Explore & Expand**
- Open the right sidebar to see an AI-generated summary
- Use the chat to ask questions like:
  - "What are the main themes in my brainstorm?"
  - "What's in the image I just uploaded?"
  - "How does [idea X] relate to [idea Y]?"
  - "What's missing from this brainstorm?"
  - "Help me expand on [specific concept]"
- Apply AI suggestions with one click (green action buttons)

#### 5. **Organize & Export**
- Use **"Auto Layout"** to arrange nodes (4 algorithms available)
- Assign categories to nodes (Problem, Solution, Execution, Validation)
- Click **"Export"** to download as PNG
- Click **"Clear"** to start fresh (with confirmation)

---

## 🎯 Features in Detail

### Node Types

#### Text Nodes
- User-typed content
- 4 category types with color themes:
  - 🔴 **Problem** - Challenges, pain points, questions
  - 💡 **Solution** - Ideas, approaches, answers
  - ⚙️ **Execution** - Implementation steps, actions
  - ✅ **Validation** - Testing, verification, success criteria
- 3 size options (small, medium, large)
- Direct editing with Shift+Enter for new lines
- Delete with hover button or Delete key

#### Image Nodes
- Upload photos, sketches, diagrams, handwritten notes
- Automatic Claude Vision analysis:
  - **Transcribed Text** - Handwriting and printed text extracted
  - **Key Objects/Concepts** - Main ideas identified
  - **Diagrams/Relationships** - Visual structures described
  - **Summary** - Overall interpretation
- Expandable preview (200px → 400px)
- Editable analysis with markdown rendering
- Full integration with AI suggestions and chat

### AI Features

#### Connection Suggestions
- Analyzes all nodes (text + images)
- Suggests 3-8 meaningful connections
- Provides reasoning for each connection
- Shows as dashed purple lines
- Hover to see reasoning tooltip
- Automatically applies hierarchical layout after suggestions

#### Summary Generation
- AI-generated overview of your entire brainstorm
- Identifies main themes and patterns
- Suggests areas for further exploration
- Highlights gaps or questions
- Updates on demand

#### Chat with Claude
- Full context of all nodes and connections
- Understands image content
- Suggests new ideas with **→ Add idea:** format
- Suggests connections with **→ Connect:** format
- Green action buttons to apply suggestions instantly
- Markdown rendering with code blocks, lists, formatting

#### Vision Analysis
- Uses Claude Opus 4.5 (best vision model)
- Processes images in 5-10 seconds
- Handles handwriting, diagrams, screenshots
- Extracts structured information
- Editable results

### Auto-Layout Algorithms

1. **📊 Logical Flow** - Left-to-right arrangement based on connections
2. **🎨 Category Columns** - Groups nodes by category in vertical columns
3. **🌳 Hierarchy Tree** - Top-down tree structure following relationships
4. **⭕ Circular** - Arranges all nodes in a circle

### Theme System

#### ☀️ Whiteboard (Light Mode)
- Clean white background
- Soft pastel node colors
- Subtle shadows
- Perfect for presentations and professional use

#### 🌙 Dark Mode
- Dark gray background
- Muted glowing node colors
- Sophisticated purple/blue accents
- Easy on the eyes for extended sessions

#### ⚡ Cyberpunk
- Pure black background
- Neon colors: hot pink, cyan, lime, purple
- Intense glowing shadows
- Purple grid lines
- High-contrast futuristic aesthetic

### Export
- One-click PNG export
- Theme-aware backgrounds
- High quality (0.95 quality)
- Filename: `brainstorm-[timestamp].png`

---

## ⌨️ Keyboard Shortcuts

- **Delete** - Delete selected nodes/edges
- **Shift + Click** - Multi-select nodes
- **Enter** - Save node while editing (or send chat message)
- **Escape** - Cancel node editing
- **Shift + Enter** - New line in text input or chat
- **Double-click node** - Edit text content

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Canvas.jsx          # Main React Flow canvas with controls
│   ├── TextNode.jsx        # Text node component with categories
│   ├── ImageNode.jsx       # Image node with Vision analysis
│   ├── CustomEdge.jsx      # Edge with hover tooltips
│   ├── Sidebar.jsx         # AI summary and chat interface
│   └── ThemeSwitcher.jsx   # Theme selector dropdown
├── services/
│   └── ai.js               # Anthropic API integration (4 functions)
├── utils/
│   └── layout.js           # 4 auto-layout algorithms
├── themes.js               # Theme configurations (light, dark, cyberpunk)
├── store.js                # Zustand state management with persistence
├── App.jsx                 # Root component
├── main.jsx                # Entry point
└── index.css               # Global styles and Tailwind config
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18.3** | UI framework |
| **Vite** | Build tool and dev server |
| **React Flow** | Interactive node-graph visualization |
| **Zustand** | State management with localStorage persistence |
| **Anthropic Claude API** | AI analysis, chat, and vision |
| **Tailwind CSS v3** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Dagre** | Graph layout algorithms |
| **React Markdown** | Markdown rendering in chat |
| **html-to-image** | Canvas export to PNG |
| **Lucide React** | Icon library |

### AI Models Used
- **Claude Sonnet 4.5** (`claude-sonnet-4-5-20250929`) - Text analysis, suggestions, chat
- **Claude Opus 4.5** (`claude-opus-4-5-20251101`) - Vision API for image analysis

---

## 🌟 Use Cases

### 📝 Meeting Notes Digitization
Take photos of whiteboard brainstorms or sticky notes and instantly digitize them with AI transcription and organization.

### 🎨 Visual + Text Thinking
Combine sketches and diagrams with typed notes. Claude understands both and suggests connections between visual and textual ideas.

### 🚀 Product Planning
Upload wireframe sketches, add feature descriptions as text nodes, let AI connect UI elements to functionality.

### 📚 Research Organization
Import document screenshots, add your own interpretations, chat with Claude to identify themes and gaps.

### 💡 Creative Ideation
Mix hand-drawn concepts with typed refinements. Use AI to find unexpected connections and expand your thinking.

---

## 🎓 Example Workflow: Planning a Mobile App

1. **Sketch wireframes on paper** → Upload as image nodes
2. **Claude extracts** screen names, UI elements, user flows
3. **Add text nodes** for technical requirements and features
4. **Click "AI Suggest"** → Claude links wireframes to features
5. **Chat: "What's missing?"** → AI suggests error states, edge cases
6. **Apply suggestions** → New nodes added with one click
7. **Auto-layout** → Organize into hierarchy
8. **Export PNG** → Share with team

---

## 🔐 Security Notes

⚠️ **Development Mode**: This app uses `dangerouslyAllowBrowser: true` to call the Anthropic API directly from the browser.

**For Production:**
- Implement a backend proxy server
- Keep your API key on the server side
- Add authentication and rate limiting
- Never expose your API key in client-side code

---

## 💾 Data Persistence

Your brainstorms are automatically saved to browser **localStorage**:
- Nodes and their positions
- Edges and connections
- Chat history
- Summary
- Theme preference

Data persists until you:
- Clear browser data
- Click the "Clear" button
- Manually clear localStorage

**Note:** Image files are stored as Object URLs and will need to be re-uploaded between sessions. The AI analysis persists.

---

## 🐛 Troubleshooting

### API Key Issues
- Ensure your `.env` file has `VITE_ANTHROPIC_API_KEY=your_key`
- File must be in the project root directory
- **Restart the dev server** after adding/changing the API key
- Check browser console for API error messages

### Image Upload Fails
- **File too large**: Maximum 20MB per image
- **Wrong format**: Use PNG, JPG, WEBP, or GIF only
- Check console for specific error message

### AI Suggestions Not Working
- Need **at least 2 nodes** on canvas
- Check API key has sufficient credits
- Review browser console for error details
- Ensure stable internet connection

### Vision Analysis Slow or Fails
- Vision analysis takes 5-10 seconds (normal)
- Large images take longer
- Check API key permissions for Vision API
- Try compressing the image

### Nodes Not Saving
- Check browser console for localStorage errors
- Try clearing localStorage and starting fresh
- Ensure you're not in private/incognito mode
- Some browsers have localStorage size limits

### Theme Not Applying
- Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
- Clear browser cache
- Check console for errors

---

## 📚 API Integration Details

### Functions in `src/services/ai.js`

#### 1. `suggestConnections(nodes)`
- Analyzes all nodes (text + image content)
- Returns JSON array of connections with reasoning
- Suggests 3-8 meaningful relationships
- Includes image analysis in context

#### 2. `generateSummary(nodes, edges)`
- Creates 2-4 paragraph overview
- Identifies themes and patterns
- Suggests areas for exploration
- Notes gaps and questions

#### 3. `chatWithClaude(userMessage, nodes, edges, previousMessages)`
- Context-aware conversation
- Full access to all node content (including images)
- Can suggest actionable changes
- Maintains conversation history

#### 4. `analyzeImage(imageBase64, mediaType)`
- Uses Claude Opus 4.5 Vision API
- Returns structured analysis with markdown
- Extracts text, objects, diagrams, summary
- Takes 5-10 seconds per image

---

## 📈 Version History

### v4.0 (Current) - Image Nodes & Vision AI
- Image node upload with Claude Vision analysis
- Full multimodal AI integration
- Edit analysis functionality
- Enhanced theme styling for images

### v3.0 - Themes & Export
- Three beautiful themes (Light, Dark, Cyberpunk)
- Export to PNG functionality
- Clean edge tooltips (hover-only)
- Enhanced visual depth

### v2.0 - Enhanced Visual Design
- 4 auto-layout algorithms
- Node categories with colors
- Interactive edge tooltips
- Redesigned sidebar
- Smooth animations

### v1.0 - Initial Release
- Text nodes and connections
- AI connection suggestions
- Chat with Claude
- Summary generation
- LocalStorage persistence

---

## 🔮 Future Ideas

### Potential Enhancements
- [ ] Undo/redo functionality
- [ ] Multi-image nodes (galleries)
- [ ] Drag-and-drop image upload
- [ ] Paste images from clipboard
- [ ] Custom theme builder
- [ ] Export as SVG, PDF, Markdown
- [ ] Search/filter nodes
- [ ] Node templates
- [ ] Collaborative real-time editing
- [ ] Backend persistence with user accounts
- [ ] Audio nodes with Whisper transcription
- [ ] Web content parsing
- [ ] Advanced graph analytics

---

## 💡 Pro Tips

1. **Mix media types** - Use text for refined ideas, images for raw captures
2. **Hover for reasoning** - All AI-suggested connections have explanations
3. **Edit image analysis** - Claude's transcription is a starting point
4. **Chat for insights** - Ask "why" questions to understand deeper patterns
5. **Try all themes** - Each has its own vibe for different contexts
6. **Export often** - Great for backups and sharing progress
7. **Use categories** - Color-coding helps visual organization
8. **Let AI surprise you** - Non-obvious connections are often the most valuable
9. **Cyberpunk at night** - Neon colors are easier on eyes in dark rooms
10. **Upload liberally** - 20MB limit is generous, don't be shy!

---

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

- Open an issue for bug reports
- Share your use cases and feature ideas
- Fork and experiment

---

## 📄 License

MIT License - feel free to use and modify for your own projects.

---

## 🙏 Acknowledgments

- **Anthropic** for Claude AI and Vision API
- **React Flow** for the excellent graph visualization library
- **Tailwind CSS** for the utility-first CSS framework
- **Zustand** for elegant state management

---

Built with ❤️ using Claude Sonnet 4.5, React, and a lot of coffee ☕

**Try it now:** `npm run dev`

**Need help?** Check the [UPDATE documentation](./UPDATE_v4.0_IMAGE_NODES.md) for detailed feature guides.
