import dagre from "dagre";
import { Edge, Node, Position } from "reactflow";
import { RFDirection } from "./types";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 320;
const nodeHeight = 224;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: RFDirection = "TB",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x + 100,
      y: nodeWithPosition.y + 100,
    };

    return node;
  });

  return { nodes, edges };
};

interface DagreValues {
  nodes: Node[];
  edges: Edge[];
}
const dagreValues: DagreValues = {
  nodes: [],
  edges: [],
};
const subscribers = new Set();

const dagreStore = {
  getDagreValues() {
    return dagreValues;
  },
  setDagreValues(nodes: Node[], edges: Edge[]) {
    const { nodes: newNodes, edges: newEdges } = getLayoutedElements(
      nodes,
      edges,
    );

    dagreValues.nodes = newNodes;
    dagreValues.edges = newEdges;

    subscribers.forEach((listener: any) => listener());
  },
  subscribe(listener: any) {
    subscribers.add(listener);
    return () => subscribers.delete(listener);
  },
};

export { getLayoutedElements, dagreStore };
