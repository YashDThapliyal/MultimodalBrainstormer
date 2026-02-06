import dagre from 'dagre';

/**
 * Auto-layout algorithm that arranges nodes in a logical flow
 * Problem nodes → Solution nodes → Execution nodes → Validation nodes
 */
export function applyAutoLayout(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Configure layout direction and spacing
  dagreGraph.setGraph({
    rankdir: 'LR', // Left to right flow
    nodesep: 80, // Horizontal spacing between nodes
    ranksep: 150, // Vertical spacing between ranks
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to dagre with dimensions
  nodes.forEach((node) => {
    const width = node.data.size === 'large' ? 350 : node.data.size === 'small' ? 250 : 300;
    const height = 120; // Approximate height

    dagreGraph.setNode(node.id, {
      width,
      height,
      category: node.data.category || 'other',
    });
  });

  // Add edges to dagre
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run the layout algorithm
  dagre.layout(dagreGraph);

  // Apply computed positions back to nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return layoutedNodes;
}

/**
 * Smart layout that groups nodes by category and arranges them in columns
 */
export function applyCategoryLayout(nodes) {
  const categoryOrder = ['problem', 'solution', 'execution', 'validation', 'other'];

  // Group nodes by category
  const nodesByCategory = {};
  categoryOrder.forEach(cat => {
    nodesByCategory[cat] = [];
  });

  nodes.forEach(node => {
    const category = node.data.category || 'other';
    nodesByCategory[category].push(node);
  });

  // Calculate positions
  const layoutedNodes = [];
  const columnWidth = 400;
  const rowHeight = 150;
  const startX = 100;
  const startY = 100;

  let columnIndex = 0;
  categoryOrder.forEach(category => {
    const nodesInCategory = nodesByCategory[category];

    if (nodesInCategory.length === 0) return;

    nodesInCategory.forEach((node, rowIndex) => {
      layoutedNodes.push({
        ...node,
        position: {
          x: startX + columnIndex * columnWidth,
          y: startY + rowIndex * rowHeight,
        },
      });
    });

    columnIndex++;
  });

  return layoutedNodes;
}

/**
 * Hierarchical layout that identifies source nodes and creates a tree structure
 */
export function applyHierarchicalLayout(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'TB', // Top to bottom for hierarchy
    nodesep: 100,
    ranksep: 120,
    marginx: 50,
    marginy: 50,
  });

  // Add nodes
  nodes.forEach((node) => {
    const width = node.data.size === 'large' ? 350 : node.data.size === 'small' ? 250 : 300;
    const height = 120;

    dagreGraph.setNode(node.id, { width, height });
  });

  // Add edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Run layout
  dagre.layout(dagreGraph);

  // Apply positions
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };
  });

  return layoutedNodes;
}

/**
 * Circular layout for brainstorming - places nodes in a circle
 */
export function applyCircularLayout(nodes) {
  const radius = 400;
  const centerX = 500;
  const centerY = 400;

  return nodes.map((node, index) => {
    const angle = (2 * Math.PI * index) / nodes.length;

    return {
      ...node,
      position: {
        x: centerX + radius * Math.cos(angle) - 150,
        y: centerY + radius * Math.sin(angle) - 60,
      },
    };
  });
}
