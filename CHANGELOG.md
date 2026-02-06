# Changelog

## [2.0.0] - 2026-02-06

### 🎨 Major Visual & Interaction Overhaul

This release completely transforms the user experience with professional UI design, intelligent layouts, and enhanced interactivity.

---

### ✨ Added

#### Auto-Layout System
- **Logical Flow Layout** - Arranges nodes left-to-right in semantic timeline (Problem → Solution → Execution → Validation)
- **Category Columns Layout** - Groups nodes by category in vertical columns
- **Hierarchy Tree Layout** - Top-down tree structure showing relationships
- **Circular Layout** - Circular arrangement for exploring equal-weight connections
- Auto-fit view after applying layouts

#### Node Categories
- **5 Category Types**: Problem (red/orange), Solution (blue), Execution (green), Validation (purple), Other (gray)
- Color-coded gradient backgrounds for each category
- Category icons: AlertCircle, Lightbulb, Cog, CheckCircle, Tag
- Clickable category badges with dropdown menu
- Visual distinction in minimap

#### Interactive Edge Features
- **Hover tooltips** showing connection reasoning (50-100 words)
- Invisible wider hover zones for easier interaction
- Smooth fade-in/out animations (150ms)
- Visual highlighting on hover (brighter color, increased width)
- Edge type distinction: Solid lines (manual) vs Dashed lines (AI)
- Directional arrows showing logical flow

#### Sidebar Enhancements
- **Example prompt chips** users can click:
  - "What are the main themes?"
  - "What's missing from this brainstorm?"
  - "Suggest ways to expand these ideas"
  - "How do these concepts relate?"
- Gradient header with Sparkles icon
- Icons in summary section (TrendingUp, Lightbulb)
- Improved message bubbles with distinct styling
- Animated typing indicator with bouncing dots
- Smooth slide-in animation when opening

#### Animations & Micro-interactions
- Node fade-in + scale animation on creation
- Hover lift effects on all interactive elements
- Button scale-105 on hover (5% grow)
- Smooth 200ms transitions throughout
- AI edge pulse animation
- Spring physics for sidebar slide
- Message bubble fade-in from bottom

#### UI/UX Polish
- **Gradient buttons** on all primary actions
- **Glassmorphism** node card design
- **Rounded-xl corners** (12px) everywhere
- **Shadow-lg elevations** for depth
- **Custom scrollbars** with rounded design
- **Improved typography** with font-semibold/bold
- **Better spacing** and whitespace usage

---

### 🔧 Changed

#### Canvas Controls
- Redesigned all buttons with gradients and shadows
- Added "Auto Layout" dropdown menu
- Stats panel now shows bold colored numbers
- Improved button disabled states
- Better visual hierarchy

#### Node Design
- Increased border-radius to 12px
- Added category-based gradient backgrounds
- Delete button only appears on hover
- Connection handles scale 150% on hover
- Improved text wrapping and truncation

#### Edge Design
- Changed manual edge color from blue to gray
- Changed AI edge color from blue to purple
- Added smooth stroke transitions
- Increased hover width from 2px to 3px
- Better edge label positioning

#### Background
- Changed from pure white to light gray gradient
- Improved dot pattern visibility
- Added canvas padding

---

### 📦 Dependencies Added

```json
{
  "dagre": "^0.8.5",
  "framer-motion": "^11.x"
}
```

---

### 🗂️ New Files

- `src/components/CustomEdge.jsx` - Interactive edge component with tooltips
- `src/utils/layout.js` - Auto-layout algorithms (4 different layouts)
- `ENHANCEMENTS.md` - Comprehensive enhancement documentation
- `CHANGELOG.md` - This file

---

### 🔄 Modified Files

- `src/store.js` - Added hoveredEdge, selectedEdge state
- `src/components/TextNode.jsx` - Complete redesign with categories
- `src/components/Canvas.jsx` - Auto-layout integration, new edge types
- `src/components/Sidebar.jsx` - UI/UX overhaul with prompts
- `src/index.css` - Custom animations and scrollbar styling
- `README.md` - Added v2.0 feature highlights
- `package.json` - Updated dependencies

---

### 🐛 Fixes

- Fixed Tailwind CSS v4 configuration issues (downgraded to v3)
- Fixed CSS import order for PostCSS
- Fixed node deletion edge cleanup
- Improved mobile responsiveness

---

### 🎯 Breaking Changes

None - All existing data in localStorage is compatible.

---

### 📈 Performance

- Optimized re-renders with React.memo
- Efficient layout calculations with dagre
- Smooth 60fps animations with Framer Motion
- No performance degradation with 50+ nodes

---

### 🚀 Migration Guide

No migration needed! Just:
1. Pull latest code
2. Run `npm install` to get new dependencies
3. Restart dev server
4. Refresh browser

Your existing brainstorms will automatically work with the new features.

---

## [1.0.0] - 2026-02-06

### Initial Release

- Basic React Flow canvas
- AI connection suggestions
- Chat interface
- Summary generation
- LocalStorage persistence
- Manual edge creation
- Basic node editing

---

**Full Diff:** v1.0.0...v2.0.0
