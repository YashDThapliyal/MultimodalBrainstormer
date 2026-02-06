import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Trash2, Image as ImageIcon, Loader, ZoomIn, Edit3, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useStore from '../store';
import { getTheme } from '../themes';

function ImageNode({ id, data, selected }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const [editValue, setEditValue] = useState(data.editedContent || data.analysis || '');
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNode = useStore((state) => state.updateNode);
  const currentTheme = useStore((state) => state.theme);

  const theme = getTheme(currentTheme);
  const nodeTheme = theme.nodes.uncategorized; // Image nodes use uncategorized styling

  const handleSave = () => {
    if (editValue.trim()) {
      updateNode(id, { editedContent: editValue.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(data.editedContent || data.analysis || '');
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        relative rounded-xl border-2
        bg-gradient-to-br ${nodeTheme.background}
        ${nodeTheme.shadow}
        ${isExpanded ? 'min-w-[400px] max-w-[500px]' : 'min-w-[300px] max-w-[400px]'}
        transition-all duration-200
        ${selected ? `${nodeTheme.border} ring-2 ring-offset-2` : nodeTheme.border}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white hover:scale-150 transition-transform"
      />

      <div className="relative group">
        {/* Header with image icon badge */}
        <div className={`flex items-center justify-between px-4 py-2 border-b ${theme.ui.border}`}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <ImageIcon size={14} className="text-white" />
            </div>
            <span className={`text-xs font-semibold ${nodeTheme.text}`}>Image Node</span>
          </div>

          {!data.isAnalyzing && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-200/20 rounded transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <ZoomIn size={14} className={nodeTheme.text} />
              </button>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-200/20 rounded transition-colors"
                  title="Edit analysis"
                >
                  <Edit3 size={14} className={nodeTheme.text} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Image preview */}
        <div className="p-3">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={data.imageUrl}
              alt="Uploaded content"
              className={`w-full ${isExpanded ? 'max-h-[400px]' : 'max-h-[200px]'} object-contain bg-black/10`}
            />
            {data.isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Loader size={32} className="text-white animate-spin" />
                <p className="text-white text-sm font-medium">Analyzing with Claude Vision...</p>
              </div>
            )}
          </div>
        </div>

        {/* Analysis content */}
        {!data.isAnalyzing && data.analysis && (
          <div className="px-4 pb-4">
            {/* Collapse/Expand header */}
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2 mb-2 rounded-lg transition-all ${theme.ui.panel} border ${theme.ui.border} hover:bg-opacity-80`}
            >
              <span className={`text-xs font-semibold ${nodeTheme.text}`}>
                Analysis
              </span>
              {isDescriptionExpanded ? (
                <ChevronUp size={16} className={nodeTheme.text} />
              ) : (
                <ChevronDown size={16} className={nodeTheme.text} />
              )}
            </button>

            {/* Collapsible content */}
            <AnimatePresence>
              {isDescriptionExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`rounded-lg p-3 ${theme.ui.input} border ${theme.ui.border}`}>
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className={`w-full p-2 text-xs border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.ui.input} min-h-[150px]`}
                          placeholder="Edit analysis..."
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={handleCancel}
                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X size={14} />
                          </button>
                          <button
                            onClick={handleSave}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                            title="Save"
                          >
                            <Check size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`prose prose-xs max-w-none ${nodeTheme.text}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {data.editedContent || data.analysis}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Error state */}
        {data.error && (
          <div className="px-4 pb-4">
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-xs">
              <p className="font-semibold">Analysis failed</p>
              <p className="mt-1">{data.error}</p>
            </div>
          </div>
        )}

        {/* Delete button */}
        <button
          onClick={() => deleteNode(id)}
          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600 hover:scale-110"
          title="Delete node"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white hover:scale-150 transition-transform"
      />
    </motion.div>
  );
}

export default memo(ImageNode);
