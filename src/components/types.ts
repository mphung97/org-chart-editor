import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

type RFDirection = "TB" | "BT" | "LR" | "RL";
type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export type { RFDirection, RFState };
