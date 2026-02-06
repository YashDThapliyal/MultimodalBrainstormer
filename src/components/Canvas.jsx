import { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  Panel,
  MarkerType,
} from '@xyflow/react';
import { Plus, Sparkles, RotateCcw, Shapes, ChevronDown, ChevronUp, Download, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store';
import TextNode from './TextNode';
import ImageNode from './ImageNode';
import CustomEdge from './CustomEdge';
import ThemeSwitcher from './ThemeSwitcher';
import { suggestConnections, analyzeImage } from '../services/ai';
import { applyAutoLayout, applyCategoryLayout, applyHierarchicalLayout, applyCircularLayout } from '../utils/layout';
import { getTheme } from '../themes';
import { toPng } from 'html-to-image';

const nodeTypes = {
  textNode: TextNode,
  imageNode: ImageNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

// Default marker for edges (arrow)
const defaultEdgeOptions = {
  type: 'custom',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
  },
};

function Canvas() {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const [showStatsPanel, setShowStatsPanel] = useState(true);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    updateNode,
    addEdge,
    setAnalyzing,
    isAnalyzing,
    theme: currentTheme,
  } = useStore();

  const theme = getTheme(currentTheme);

  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        id: `edge-${Date.now()}`,
        source: connection.source,
        target: connection.target,
        data: { isAI: false },
        ...defaultEdgeOptions,
      };
      addEdge(newEdge);
    },
    [addEdge]
  );

  const addNewNode = useCallback(() => {
    const position = screenToFlowPosition({
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 50,
    });

    const newNode = {
      id: `node-${Date.now()}`,
      type: 'textNode',
      position,
      data: {
        label: '',
        category: null, // No default category - user will choose
        size: 'medium',
      },
    };

    addNode(newNode);
  }, [addNode, screenToFlowPosition]);

  const handleImageUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('Image too large! Maximum size is 20MB.');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Unsupported file type. Please upload PNG, JPG, WEBP, or GIF.');
      return;
    }

    // Create image URL for preview
    const imageUrl = URL.createObjectURL(file);

    // Convert to base64 for API
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target.result.split(',')[1];

      // Get position for new node
      const position = screenToFlowPosition({
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 150,
      });

      // Create node with loading state
      const nodeId = `img-${Date.now()}`;
      const imageNode = {
        id: nodeId,
        type: 'imageNode',
        position,
        data: {
          imageUrl,
          imageBase64: base64Data,
          mediaType: file.type,
          isAnalyzing: true,
        },
      };

      addNode(imageNode);

      // Analyze image with Vision API
      try {
        const analysis = await analyzeImage(base64Data, file.type);

        // Update node with analysis
        updateNode(nodeId, {
          isAnalyzing: false,
          analysis,
        });
      } catch (error) {
        console.error('Failed to analyze image:', error);
        updateNode(nodeId, {
          isAnalyzing: false,
          error: error.message || 'Failed to analyze image. Please try again.',
        });
      }
    };

    reader.readAsDataURL(file);
  }, [addNode, screenToFlowPosition]);

  const handleSuggestConnections = async () => {
    if (nodes.length < 2) {
      alert('Add at least 2 nodes to suggest connections!');
      return;
    }

    setAnalyzing(true);

    try {
      const suggestions = await suggestConnections(nodes);

      if (suggestions.length === 0) {
        alert('No new connections suggested. Your ideas might already be well-connected!');
        setAnalyzing(false);
        return;
      }

      // Add suggested connections
      suggestions.forEach((suggestion) => {
        const newEdge = {
          id: `edge-ai-${Date.now()}-${Math.random()}`,
          source: suggestion.source,
          target: suggestion.target,
          data: { isAI: true, reasoning: suggestion.reasoning },
          ...defaultEdgeOptions,
        };
        addEdge(newEdge);
      });

      // Automatically apply hierarchical tree layout after suggestions
      setTimeout(() => {
        const currentEdges = useStore.getState().edges;
        const layoutedNodes = applyHierarchicalLayout(nodes, currentEdges);
        useStore.setState({ nodes: layoutedNodes });

        // Fit view after layout
        setTimeout(() => {
          fitView({ padding: 0.2, duration: 400 });
        }, 50);
      }, 100);

    } catch (error) {
      console.error('Failed to suggest connections:', error);
      alert('Failed to suggest connections. Check your API key and try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleAutoLayout = (layoutType) => {
    let layoutedNodes;

    switch (layoutType) {
      case 'flow':
        layoutedNodes = applyAutoLayout(nodes, edges);
        break;
      case 'category':
        layoutedNodes = applyCategoryLayout(nodes);
        break;
      case 'hierarchy':
        layoutedNodes = applyHierarchicalLayout(nodes, edges);
        break;
      case 'circular':
        layoutedNodes = applyCircularLayout(nodes);
        break;
      default:
        return;
    }

    useStore.setState({ nodes: layoutedNodes });
    setShowLayoutMenu(false);

    // Fit view after layout
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 400 });
    }, 50);
  };

  const clearCanvas = () => {
    if (nodes.length === 0) return;

    const confirmed = window.confirm(
      'Are you sure you want to clear the entire canvas? This cannot be undone.'
    );

    if (confirmed) {
      useStore.getState().clearAll();
    }
  };

  const handleExport = async () => {
    if (nodes.length === 0) {
      alert('Add some nodes first to export!');
      return;
    }

    try {
      const element = reactFlowWrapper.current;
      const dataUrl = await toPng(element, {
        quality: 0.95,
        backgroundColor: currentTheme === 'light' ? '#f8fafc' : currentTheme === 'dark' ? '#0f172a' : '#000000',
      });

      const link = document.createElement('a');
      link.download = `brainstorm-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export:', error);
      alert('Failed to export. Please try again.');
    }
  };

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background
          variant={theme.canvas.gridVariant}
          gap={20}
          size={currentTheme === 'cyberpunk' ? 0.5 : 1}
          color={theme.canvas.gridColor}
          className={`bg-gradient-to-br ${theme.canvas.background}`}
        />
        <Controls className={`${theme.ui.panel} border ${theme.ui.border} rounded-lg shadow-lg`} />
        <MiniMap
          nodeColor={(node) => {
            const category = node.data?.category;
            if (currentTheme === 'light') {
              const colors = { problem: '#fecaca', solution: '#bfdbfe', execution: '#bbf7d0', validation: '#ddd6fe' };
              return category ? colors[category] : '#f1f5f9';
            } else if (currentTheme === 'dark') {
              const colors = { problem: '#7f1d1d', solution: '#1e3a8a', execution: '#14532d', validation: '#581c87' };
              return category ? colors[category] : '#374151';
            } else { // cyberpunk - rainbow neon
              const colors = { problem: '#ff0099', solution: '#00d4ff', execution: '#00ff64', validation: '#a855f7' };
              return category ? colors[category] : '#00d4ff';
            }
          }}
          className={`${theme.ui.panel} border ${theme.ui.border} rounded-lg shadow-lg`}
        />

        {/* Top-left controls */}
        <Panel position="top-left" className="flex flex-wrap gap-2">
          <button
            onClick={addNewNode}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold"
            title="Add new text idea"
          >
            <Plus size={20} />
            New Idea
          </button>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold">
              <Image size={20} />
              Upload Image
            </div>
          </label>

          <button
            onClick={handleSuggestConnections}
            disabled={isAnalyzing || nodes.length < 2}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            title="AI suggest connections"
          >
            <Sparkles size={20} className={isAnalyzing ? 'animate-spin' : ''} />
            {isAnalyzing ? 'Analyzing...' : 'AI Suggest'}
          </button>

          {/* Layout menu */}
          <div className="relative">
            <button
              onClick={() => setShowLayoutMenu(!showLayoutMenu)}
              disabled={nodes.length < 2}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              title="Auto layout options"
            >
              <Shapes size={20} />
              Auto Layout
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {showLayoutMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 min-w-[200px]"
                >
                  <button
                    onClick={() => handleAutoLayout('flow')}
                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    📊 Logical Flow
                    <p className="text-xs text-gray-500 mt-0.5">Problem → Solution → Execution</p>
                  </button>
                  <button
                    onClick={() => handleAutoLayout('category')}
                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium text-gray-700 hover:text-purple-600"
                  >
                    🎨 Category Columns
                    <p className="text-xs text-gray-500 mt-0.5">Group by type</p>
                  </button>
                  <button
                    onClick={() => handleAutoLayout('hierarchy')}
                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium text-gray-700 hover:text-green-600"
                  >
                    🌳 Hierarchy Tree
                    <p className="text-xs text-gray-500 mt-0.5">Top-down structure</p>
                  </button>
                  <button
                    onClick={() => handleAutoLayout('circular')}
                    className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium text-gray-700 hover:text-orange-600"
                  >
                    ⭕ Circular
                    <p className="text-xs text-gray-500 mt-0.5">Ideas in a circle</p>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleExport}
            disabled={nodes.length === 0}
            className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            title="Export as image"
          >
            <Download size={20} />
            Export
          </button>

          <button
            onClick={clearCanvas}
            disabled={nodes.length === 0}
            className="px-4 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            title="Clear canvas"
          >
            <RotateCcw size={20} />
            Clear
          </button>

          <ThemeSwitcher />
        </Panel>

        {/* Stats panel - Collapsable */}
        <Panel position="top-center">
          <AnimatePresence>
            {showStatsPanel ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`${theme.ui.panel} px-6 py-3 rounded-xl shadow-lg border ${theme.ui.border} flex items-center gap-3`}
              >
                <p className={`text-sm ${theme.ui.textSecondary} font-medium`}>
                  <span className="font-bold text-blue-500">{nodes.length}</span> ideas •{' '}
                  <span className="font-bold text-purple-500">{edges.length}</span> connections
                </p>
                <button
                  onClick={() => setShowStatsPanel(false)}
                  className="p-1 hover:bg-gray-200/20 rounded transition-colors"
                  title="Hide stats"
                >
                  <ChevronUp size={16} className={theme.ui.textSecondary} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowStatsPanel(true)}
                className={`${theme.ui.panel} px-4 py-2 rounded-full shadow-lg border ${theme.ui.border} hover:scale-105 transition-all`}
                title="Show stats"
              >
                <ChevronDown size={16} className={theme.ui.textSecondary} />
              </motion.button>
            )}
          </AnimatePresence>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Canvas;
