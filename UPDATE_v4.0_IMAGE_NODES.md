# 📸 UPDATE v4.0: Image Nodes with Claude Vision API

## 🎉 Major Feature: Visual Brainstorming with AI

Transform your brainstorming with **intelligent image analysis**! Upload handwritten notes, sketches, diagrams, whiteboards, or any visual content and let Claude Vision API extract insights.

---

## ✨ What's New

### 1. **Image Node Upload** 📤

Upload images directly to your brainstorm canvas!

**Supported Formats:**
- PNG
- JPG/JPEG
- WEBP
- GIF

**File Size:** Up to 20MB per image

**How to use:**
1. Click the green **"Upload Image"** button in the top toolbar
2. Select an image file
3. Image appears on canvas with loading spinner
4. Claude Vision API analyzes it automatically (5-10 seconds)
5. Analysis appears below the image

---

### 2. **Claude Vision API Integration** 🔍

Every uploaded image is analyzed by **Claude Opus 4.5** (best vision model) to extract:

#### **Transcribed Text** ✍️
- Handwritten notes transcribed exactly
- Printed text extracted
- OCR for any readable content

#### **Key Objects/Concepts** 🎯
- Main objects identified
- Concepts and ideas extracted
- Specific, actionable insights

#### **Diagrams/Relationships** 🔗
- Flowcharts described
- Visual relationships mapped
- Structural patterns identified

#### **Summary** 📝
- Overall interpretation
- How it fits into brainstorming context
- Suggestions for connections

**Example Analysis:**
```
**Transcribed Text:** "Problem: User retention is low. Ideas: gamification, personalized onboarding, social features"

**Key Objects/Concepts:**
- User retention challenge
- Three solution approaches: gamification, personalization, social interaction
- Sticky note format suggests informal ideation

**Diagrams/Relationships:**
Mind map structure with central problem node and three branching solutions

**Summary:**
This captures an initial problem-solving session focused on user retention. The three proposed solutions represent different engagement strategies that could be developed into distinct feature tracks.
```

---

### 3. **Image Node Features** 🖼️

#### **Expand/Collapse View**
- Click the zoom icon to expand image to 400px height
- Collapse back to 200px for cleaner canvas
- Maintains all functionality in both views

#### **Edit Analysis** ✏️
- Click the edit icon (pencil)
- Modify or add to Claude's analysis
- Save your custom notes
- Edited content persists and is used in AI suggestions

#### **Preview + Analysis Display**
- Image preview at top
- Markdown-formatted analysis below
- Clean, readable layout
- Dark mode and theme support

#### **Error Handling**
- Displays error messages if analysis fails
- Shows helpful guidance (check API key, file size, etc.)
- Doesn't block canvas usage

---

### 4. **Full AI Integration** 🤖

Image content is **fully integrated** with all AI features:

#### **AI Connection Suggestions** 🔗
- Analyzes image content alongside text nodes
- Suggests semantic connections between images and text
- Relates visual concepts to written ideas
- Example: Links a whiteboard sketch of a user flow to text nodes about UX improvements

#### **Summary Generation** 📊
- Includes image insights in brainstorm summary
- Shows `[IMAGE]` label for visual nodes
- Synthesizes text + visual content
- Creates cohesive narrative of your entire brainstorm

#### **Chat with Claude** 💬
- Ask questions about uploaded images
- Claude sees full image analysis in context
- Can reference specific visual elements
- Suggests expansions based on both text and images

**Example Chat Interactions:**
- "What connections do you see between the whiteboard sketch and my execution plan?"
- "Transcribe the handwritten notes in the image more clearly"
- "What's the main theme across my text ideas and the diagram?"

---

## 🎨 Visual Design

### Image Node Styling
- **Uncategorized theme colors** (gray/slate with purple accents in cyberpunk)
- **Blue image icon badge** in header
- **Rounded corners** and smooth shadows
- **Theme-aware backgrounds** (white, dark gray, or black depending on theme)
- **Glowing effects** in dark/cyberpunk modes

### Interactions
- **Hover effects** on expand/edit buttons
- **Loading spinner** during analysis with backdrop blur
- **Smooth animations** on node creation
- **Delete button** appears on hover (top-right corner)

---

## 🔧 Technical Implementation

### API Integration
```javascript
// Uses Claude Opus 4.5 for best vision quality
export async function analyzeImage(imageBase64, mediaType) {
  const message = await anthropic.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: mediaType,
            data: imageBase64
          }
        },
        { type: 'text', text: prompt }
      ]
    }]
  });
  return message.content[0].text;
}
```

### File Handling
- Client-side validation (size, type)
- Base64 encoding for API
- Object URLs for preview
- Async upload with loading states

### Node Structure
```javascript
{
  id: 'img-12345',
  type: 'imageNode',
  position: { x, y },
  data: {
    imageUrl: 'blob:...',           // For preview
    imageBase64: 'iVBORw0KG...',    // For API
    mediaType: 'image/png',
    isAnalyzing: true,              // Loading state
    analysis: '**Transcribed...',   // Claude's analysis
    editedContent: 'My notes...',   // User edits (optional)
    error: null                     // Error message if failed
  }
}
```

---

## 🚀 Use Cases

### 1. **Whiteboard Capture** 🖊️
Take a photo of your physical whiteboard brainstorm and digitize it:
- Handwriting transcribed automatically
- Diagrams described
- Ideas extracted and can be connected to digital nodes

### 2. **Sketch to Ideas** ✏️
Upload rough sketches or concept drawings:
- Visual concepts identified
- Relationships mapped
- Easy to expand with text nodes

### 3. **Document Processing** 📄
Import screenshots of documents, PDFs, or presentations:
- Key points extracted
- Text content searchable via analysis
- Visual elements described

### 4. **Meeting Notes** 📝
Snap photos of sticky notes, flip charts, or notepads:
- All text transcribed
- Groupings and themes identified
- Connect to action items in text nodes

### 5. **Diagram Analysis** 📊
Upload flowcharts, mind maps, or architecture diagrams:
- Structure described in text
- Relationships explained
- AI can suggest improvements or connections

---

## 🎯 Best Practices

### For Best Analysis Results:
1. **Clear, well-lit photos** - Avoid shadows and blur
2. **High contrast** - Dark text on light background (or vice versa)
3. **Straightforward angles** - Avoid extreme perspective distortion
4. **Legible handwriting** - Printed text works best, but clear handwriting transcribes well
5. **Focused content** - Single concept per image for clearer analysis

### Workflow Tips:
1. **Upload first, organize later** - Get all your images in, then use AI suggestions
2. **Edit analysis** - Claude's interpretation is a starting point - refine it!
3. **Combine with text nodes** - Use images for visual/handwritten content, text nodes for clean typed ideas
4. **Let AI connect** - After uploading images, click "AI Suggest" to see relationships
5. **Chat for clarification** - Ask Claude to explain specific parts of image analysis

---

## 📊 Updated AI Functions

### suggestConnections()
```javascript
// Now includes image content
const nodeList = nodes.map((node) => {
  if (node.type === 'imageNode') {
    const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
    return `[${node.id}] IMAGE NODE: ${content.substring(0, 200)}...`;
  } else {
    return `[${node.id}] ${node.data.label}`;
  }
}).join('\n');
```

### generateSummary()
```javascript
// Shows [IMAGE] prefix for visual nodes
const nodeList = nodes.map((node) => {
  if (node.type === 'imageNode') {
    const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
    return `- [IMAGE] ${content.substring(0, 150)}...`;
  } else {
    return `- ${node.data.label}`;
  }
}).join('\n');
```

### chatWithClaude()
```javascript
// Full image analysis in chat context
const nodeList = nodes.map((node) => {
  if (node.type === 'imageNode') {
    const content = node.data.editedContent || node.data.analysis || 'Image (analyzing...)';
    return `- [${node.id}] IMAGE NODE: ${content}`;
  } else {
    return `- [${node.id}] ${node.data.label}`;
  }
}).join('\n');
```

---

## 🗂️ New Files

```
src/
├── components/
│   └── ImageNode.jsx          # Complete image node component
└── services/
    └── ai.js                   # Added analyzeImage() function
```

---

## 🔧 Updated Files

**Major Updates:**
- `src/components/Canvas.jsx` - Added image upload handler, ImageNode type
- `src/services/ai.js` - All AI functions now include image content
- `src/store.js` - Supports imageNode type data structure

---

## 📦 Node Types Comparison

### Text Node
- ✍️ User-typed content
- 🎨 Category colors (Problem, Solution, Execution, Validation)
- 📝 Direct editing
- 🔗 Manual connections

### Image Node (NEW!)
- 📸 Visual content
- 🤖 AI-analyzed content
- ✏️ Editable analysis
- 🔍 Expandable preview
- 🔗 AI-suggested connections

---

## 🌟 What This Unlocks

### Hybrid Brainstorming
Combine the best of both worlds:
- **Physical** - Whiteboard, paper, sticky notes
- **Digital** - Clean text, AI suggestions, connections

### Visual Thinking
Not everything fits in text:
- Sketches, doodles, mind maps
- Diagrams, flowcharts, wireframes
- Photos of physical objects or environments

### Team Collaboration
Capture everyone's input:
- Photos of everyone's handwritten notes
- Screenshots from remote presentations
- Whiteboard captures from in-person sessions

### Iterative Refinement
Build on visual ideas:
- Start with sketch (image node)
- Extract concepts with AI
- Expand with text nodes
- Connect everything intelligently

---

## 🐛 Error Messages

### "Image too large! Maximum size is 20MB."
- Compress your image using online tools
- Take a lower resolution photo
- Crop to focus on relevant content

### "Unsupported file type..."
- Convert to PNG, JPG, WEBP, or GIF
- Screenshots and phone photos usually work

### "Failed to analyze image..."
- Check your `VITE_ANTHROPIC_API_KEY` in `.env`
- Ensure you have Vision API access
- Try a different image
- Check console for detailed error

---

## 💡 Pro Tips

1. **Mix and match** - Use text nodes for refined ideas, image nodes for raw captures
2. **Edit after analysis** - Claude's transcription might need tweaking
3. **Upload liberally** - 20MB is generous, don't be shy!
4. **Let AI bridge gaps** - Image→Text connections are powerful
5. **Export includes images** - Your PNG export shows both text and image nodes
6. **Cyberpunk mode** - Image nodes get neon purple glow!

---

## 🔮 Future Enhancements

Potential improvements:
- Multi-image nodes (galleries)
- Image annotation directly on canvas
- Compare/diff between images
- OCR text as separate nodes
- Drag-and-drop upload
- Paste from clipboard

---

## 🎯 Performance Notes

- ✅ Image preview is instant (Object URL)
- ✅ Analysis takes 5-10 seconds (Vision API)
- ✅ Editing is client-side (instant)
- ✅ No impact on text node performance
- ✅ Canvas handles dozens of image nodes smoothly

---

## 📱 Complete Feature Set (v4.0)

### Canvas
- ✅ Text nodes with categories
- ✅ **Image nodes with Vision AI**
- ✅ Manual connections
- ✅ AI-suggested connections
- ✅ 4 auto-layout modes
- ✅ 3 themes (Light, Dark, Cyberpunk)
- ✅ Export to PNG

### AI Features
- ✅ Semantic connection suggestions
- ✅ **Image content analysis**
- ✅ Summary generation
- ✅ Chat interface with context
- ✅ Actionable suggestions
- ✅ **Text + visual reasoning**

### UI/UX
- ✅ Multi-theme system
- ✅ Hover tooltips on edges
- ✅ Markdown rendering
- ✅ Smooth animations
- ✅ Clean, modern design
- ✅ **Expandable image previews**

---

## 🚀 Getting Started

### 1. Set Up API Key
```bash
# .env file
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```

### 4. Upload Your First Image
1. Click **"Upload Image"** (green button with image icon)
2. Select a photo of handwritten notes or a sketch
3. Watch Claude analyze it!
4. Edit the analysis if needed
5. Click **"AI Suggest"** to connect it to other nodes

---

## 📈 Example Workflow

### Scenario: Planning a Mobile App

1. **Start with sketches**
   - Upload hand-drawn UI wireframes (image nodes)
   - Claude extracts screen names and UI elements

2. **Add text refinements**
   - Create text nodes for features (Solution category)
   - Note technical constraints (Execution category)

3. **AI connections**
   - Click "AI Suggest"
   - Claude links wireframe screens to feature descriptions
   - Identifies which screens need which features

4. **Chat for insights**
   - "What's missing from this app plan?"
   - "How do the wireframes align with the features?"
   - Get AI suggestions for improvements

5. **Export and share**
   - Click "Export"
   - Share PNG with team
   - Includes all visual and text content

---

## ✨ What Makes This Special

### 🧠 True Multimodal Brainstorming
- First AI brainstorming tool with **vision-text fusion**
- Claude "sees" your sketches and connects them to your text
- Visual + textual reasoning in one canvas

### 🎨 Theme-Aware Visual Nodes
- Image nodes adapt to Light/Dark/Cyberpunk themes
- Consistent design language across node types
- Professional polish

### 🔗 Intelligent Hybrid Connections
- AI suggests connections **between** images and text
- Not just "similar topics" - actual conceptual relationships
- Example: Links a sketch of a login flow to security considerations in text

### 📝 Editable AI Analysis
- Claude's analysis is a starting point, not locked in
- You're in control of the final content
- Best of both worlds: AI speed + human refinement

---

**Dev Server:** http://localhost:5173/

**Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)** to see image upload features!

Ready to bring your visual ideas to life? 📸✨🤖
