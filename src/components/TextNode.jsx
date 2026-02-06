import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Trash2, Check, X, Tag, AlertCircle, Lightbulb, Cog, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store';
import { getTheme } from '../themes';

// Category icons
const CATEGORY_ICONS = {
  problem: AlertCircle,
  solution: Lightbulb,
  execution: Cog,
  validation: CheckCircle,
};

const CATEGORY_LABELS = {
  problem: 'Problem',
  solution: 'Solution',
  execution: 'Execution',
  validation: 'Validation',
};

function TextNode({ id, data, selected }) {
  const [isEditing, setIsEditing] = useState(data.label === '');
  const [editValue, setEditValue] = useState(data.label);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const updateNode = useStore((state) => state.updateNode);
  const deleteNode = useStore((state) => state.deleteNode);
  const currentTheme = useStore((state) => state.theme);

  const theme = getTheme(currentTheme);
  const category = data.category;
  const size = data.size || 'medium';

  // Get theme colors for this category
  const categoryKey = category || 'uncategorized';
  const nodeTheme = theme.nodes[categoryKey];
  const CategoryIcon = category ? CATEGORY_ICONS[category] : Tag;
  const categoryLabel = category ? CATEGORY_LABELS[category] : 'Add Category';

  // Size variants
  const sizeClasses = {
    small: 'min-w-[180px] max-w-[250px]',
    medium: 'min-w-[200px] max-w-[300px]',
    large: 'min-w-[250px] max-w-[350px]',
  };

  const handleSave = () => {
    if (editValue.trim()) {
      updateNode(id, { label: editValue.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (data.label) {
      setEditValue(data.label);
      setIsEditing(false);
    } else {
      deleteNode(id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleCategoryChange = (newCategory) => {
    updateNode(id, { category: newCategory });
    setShowCategoryMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        relative px-4 py-3 rounded-xl border-2
        bg-gradient-to-br ${nodeTheme.background}
        ${nodeTheme.shadow}
        ${sizeClasses[size]}
        transition-all duration-200
        ${selected ? `${nodeTheme.border} ring-2 ring-offset-2` : nodeTheme.border}
      `}
    >
      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white hover:scale-150 transition-transform"
      />

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`w-full p-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.ui.input}`}
            rows={3}
            placeholder="Enter your idea..."
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              title="Cancel"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleSave}
              className="p-1.5 hover:bg-green-100 rounded-lg transition-colors text-green-600"
              title="Save"
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative group">
          {/* Category badge */}
          <div className="flex items-center gap-1.5 mb-2 relative">
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${nodeTheme.text} bg-white/80 hover:bg-white transition-colors backdrop-blur-sm`}
              title="Change category"
            >
              <CategoryIcon size={12} />
              <span className="font-medium">{categoryLabel}</span>
            </button>

            {/* Category menu */}
            {showCategoryMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-full left-0 mt-1 rounded-lg shadow-lg p-1 z-50 min-w-[140px] ${theme.ui.panel} border ${theme.ui.border}`}
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
                  const Icon = CATEGORY_ICONS[key];
                  const catTheme = theme.nodes[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handleCategoryChange(key)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${catTheme.text}`}
                    >
                      <Icon size={14} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Node content */}
          <div
            onDoubleClick={() => setIsEditing(true)}
            className={`text-sm font-medium leading-relaxed whitespace-pre-wrap break-words cursor-text ${nodeTheme.text}`}
          >
            {data.label}
          </div>

          {/* Delete button (appears on hover) */}
          <button
            onClick={() => deleteNode(id)}
            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-600 hover:scale-110"
            title="Delete node"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white hover:scale-150 transition-transform"
      />
    </motion.div>
  );
}

export default memo(TextNode);
