import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

const useStore = create(
  persist(
    (set, get) => ({
      // Nodes and edges
      nodes: [],
      edges: [],

      // Chat state
      messages: [],
      summary: '',

      // UI state
      isSidebarOpen: true,
      isAnalyzing: false,
      theme: 'light', // 'light', 'dark', 'cyberpunk'

      // Node operations
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },

      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },

      addNode: (node) => {
        set({ nodes: [...get().nodes, node] });
      },

      updateNode: (id, data) => {
        set({
          nodes: get().nodes.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, ...data } } : node
          ),
        });
      },

      deleteNode: (id) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== id),
          edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
        });
      },

      // Edge operations
      addEdge: (edge) => {
        // Remove 'label' property - labels should only appear on hover
        const { label, ...edgeWithoutLabel } = edge;
        set({ edges: [...get().edges, edgeWithoutLabel] });
      },

      deleteEdge: (id) => {
        set({ edges: get().edges.filter((edge) => edge.id !== id) });
      },

      // Chat operations
      addMessage: (message) => {
        set({ messages: [...get().messages, message] });
      },

      setSummary: (summary) => {
        set({ summary });
      },

      // UI operations
      toggleSidebar: () => {
        set({ isSidebarOpen: !get().isSidebarOpen });
      },

      setAnalyzing: (isAnalyzing) => {
        set({ isAnalyzing });
      },

      setTheme: (theme) => {
        set({ theme });
      },

      // Clear all data
      clearAll: () => {
        set({
          nodes: [],
          edges: [],
          messages: [],
          summary: '',
        });
      },
    }),
    {
      name: 'braindump-storage',
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        messages: state.messages,
        summary: state.summary,
        theme: state.theme,
      }),
      // Clean up old edge data on load
      onRehydrateStorage: () => (state) => {
        if (state && state.edges) {
          // Remove 'label' property from all edges (labels should only appear on hover)
          state.edges = state.edges.map(edge => {
            const { label, ...edgeWithoutLabel } = edge;
            return edgeWithoutLabel;
          });
        }
      },
    }
  )
);

export default useStore;
