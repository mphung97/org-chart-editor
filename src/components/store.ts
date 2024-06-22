import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import { initialNodes, initialEdges } from "./nodes-edges";
import { RFState } from "./types";
import { getLayoutedElements } from "./dagre";

const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useRFStore = create<RFState>((set, get) => ({
  nodes,
  edges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
}));

export default useRFStore;
