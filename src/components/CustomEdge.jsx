import { memo, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store';
import { getTheme } from '../themes';

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data = {},
  markerEnd,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const currentTheme = useStore((state) => state.theme);

  const theme = getTheme(currentTheme);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isAI = data.isAI || false;
  const reasoning = data.reasoning || '';
  const hasReasoning = Boolean(reasoning);

  // Edge styling based on type, reasoning, and hover state
  let strokeColor;
  if (isHovered) {
    strokeColor = hasReasoning ? theme.edges.reasoningHover : theme.edges.manualHover;
  } else {
    strokeColor = hasReasoning ? theme.edges.reasoning : theme.edges.manual;
  }

  const strokeWidth = isHovered ? 3 : 2;
  const strokeDasharray = isAI ? '5,5' : '0';

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: strokeColor,
          strokeWidth,
          strokeDasharray,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Invisible wider path for easier hovering */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tooltip on hover - only visible when hovering */}
      <EdgeLabelRenderer>
        <AnimatePresence>
          {isHovered && reasoning && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                left: `${labelX}px`,
                top: `${labelY}px`,
                transform: 'translate(-50%, calc(-100% - 12px))',
                pointerEvents: 'none',
                zIndex: 1000,
              }}
              className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-2xl max-w-[280px] border border-gray-700"
            >
              <div className="flex flex-col gap-1">
                {isAI && (
                  <span className="text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                    AI Suggestion
                  </span>
                )}
                <p className="leading-relaxed text-gray-100">{reasoning}</p>
              </div>
              {/* Arrow pointing down to edge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#1f2937',
                  borderRight: '1px solid #374151',
                  borderBottom: '1px solid #374151',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(CustomEdge);
