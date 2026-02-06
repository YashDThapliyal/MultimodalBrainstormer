// Theme configurations for the brainstorming app

export const THEMES = {
  light: {
    id: 'light',
    name: 'Whiteboard',
    icon: '☀️',

    // Canvas
    canvas: {
      background: 'from-gray-50 to-slate-100',
      gridColor: '#cbd5e1',
      gridVariant: 'dots',
    },

    // Nodes
    nodes: {
      problem: {
        background: 'from-red-50 to-orange-50',
        border: 'border-red-300',
        text: 'text-red-700',
        shadow: 'shadow-md hover:shadow-xl',
      },
      solution: {
        background: 'from-blue-50 to-indigo-50',
        border: 'border-blue-300',
        text: 'text-blue-700',
        shadow: 'shadow-md hover:shadow-xl',
      },
      execution: {
        background: 'from-green-50 to-emerald-50',
        border: 'border-green-300',
        text: 'text-green-700',
        shadow: 'shadow-md hover:shadow-xl',
      },
      validation: {
        background: 'from-purple-50 to-violet-50',
        border: 'border-purple-300',
        text: 'text-purple-700',
        shadow: 'shadow-md hover:shadow-xl',
      },
      uncategorized: {
        background: 'from-white to-gray-50',
        border: 'border-gray-300',
        text: 'text-gray-600',
        shadow: 'shadow-md hover:shadow-xl',
      },
    },

    // Edges
    edges: {
      manual: '#64748b',
      manualHover: '#3b82f6',
      ai: '#a78bfa',
      aiHover: '#8b5cf6',
      reasoning: '#a78bfa',
      reasoningHover: '#8b5cf6',
    },

    // UI Elements
    ui: {
      sidebar: 'bg-gradient-to-b from-white to-gray-50',
      panel: 'bg-white',
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl',
      buttonSecondary: 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-300',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      input: 'bg-white border-gray-300 text-gray-800',
    },
  },

  dark: {
    id: 'dark',
    name: 'Dark Mode',
    icon: '🌙',

    // Canvas
    canvas: {
      background: 'from-slate-900 via-gray-900 to-slate-900',
      gridColor: '#475569',
      gridVariant: 'dots',
    },

    // Nodes
    nodes: {
      problem: {
        background: 'from-red-950/60 to-rose-950/60',
        border: 'border-red-400',
        text: 'text-red-200',
        shadow: 'shadow-2xl shadow-red-500/20 hover:shadow-red-500/40',
      },
      solution: {
        background: 'from-blue-950/60 to-indigo-950/60',
        border: 'border-blue-400',
        text: 'text-blue-200',
        shadow: 'shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40',
      },
      execution: {
        background: 'from-green-950/60 to-emerald-950/60',
        border: 'border-green-400',
        text: 'text-green-200',
        shadow: 'shadow-2xl shadow-green-500/20 hover:shadow-green-500/40',
      },
      validation: {
        background: 'from-purple-950/60 to-violet-950/60',
        border: 'border-purple-400',
        text: 'text-purple-200',
        shadow: 'shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40',
      },
      uncategorized: {
        background: 'from-slate-800 to-gray-900',
        border: 'border-slate-600',
        text: 'text-slate-200',
        shadow: 'shadow-2xl hover:shadow-3xl',
      },
    },

    // Edges
    edges: {
      manual: '#64748b',
      manualHover: '#60a5fa',
      ai: '#a78bfa',
      aiHover: '#c4b5fd',
      reasoning: '#a78bfa',
      reasoningHover: '#c4b5fd',
    },

    // UI Elements
    ui: {
      sidebar: 'bg-gradient-to-b from-slate-900 to-gray-900',
      panel: 'bg-slate-800/90 backdrop-blur-sm',
      button: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/30',
      buttonSecondary: 'bg-slate-800 text-slate-200 border-2 border-slate-600 hover:border-blue-500',
      text: 'text-slate-100',
      textSecondary: 'text-slate-400',
      border: 'border-slate-700',
      input: 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500',
    },
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: '⚡',

    // Canvas - BLACK with NEON BLUE
    canvas: {
      background: 'from-black via-blue-950 to-black',
      gridColor: '#00d4ff',
      gridVariant: 'lines',
    },

    // Nodes - RAINBOW NEON!
    nodes: {
      problem: {
        background: 'from-pink-500/20 to-pink-600/30',
        border: 'border-pink-400',
        text: 'text-pink-100',
        shadow: 'shadow-[0_0_35px_rgba(236,72,153,0.7)] hover:shadow-[0_0_50px_rgba(236,72,153,1)]',
      },
      solution: {
        background: 'from-cyan-400/20 to-blue-500/30',
        border: 'border-cyan-400',
        text: 'text-cyan-50',
        shadow: 'shadow-[0_0_35px_rgba(0,212,255,0.7)] hover:shadow-[0_0_50px_rgba(0,212,255,1)]',
      },
      execution: {
        background: 'from-green-400/20 to-emerald-500/30',
        border: 'border-green-400',
        text: 'text-green-50',
        shadow: 'shadow-[0_0_35px_rgba(0,255,100,0.7)] hover:shadow-[0_0_50px_rgba(0,255,100,1)]',
      },
      validation: {
        background: 'from-purple-400/20 to-violet-500/30',
        border: 'border-purple-400',
        text: 'text-purple-50',
        shadow: 'shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:shadow-[0_0_50px_rgba(168,85,247,1)]',
      },
      uncategorized: {
        background: 'from-slate-900/50 to-blue-900/30',
        border: 'border-cyan-300',
        text: 'text-cyan-50',
        shadow: 'shadow-[0_0_35px_rgba(0,212,255,0.5)] hover:shadow-[0_0_50px_rgba(0,212,255,0.9)]',
      },
    },

    // Edges - NEON CYAN & PINK!
    edges: {
      manual: '#64748b',
      manualHover: '#00d4ff',
      ai: '#00d4ff',
      aiHover: '#00ff88',
      reasoning: '#ff00ff',
      reasoningHover: '#ff00aa',
    },

    // UI Elements - NEON BLUE UI!
    ui: {
      sidebar: 'bg-black border-l-2 border-cyan-500',
      panel: 'bg-black/95 backdrop-blur-md border border-cyan-500/50',
      button: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.8)]',
      buttonSecondary: 'bg-black text-cyan-400 border-2 border-cyan-500 hover:border-pink-500 hover:text-pink-400',
      text: 'text-cyan-100',
      textSecondary: 'text-cyan-400',
      border: 'border-cyan-500/50',
      input: 'bg-black/80 border-cyan-500 text-cyan-50 placeholder:text-cyan-700',
    },
  },
};

export const getTheme = (themeId) => THEMES[themeId] || THEMES.light;
