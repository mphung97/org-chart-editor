import dagre from "dagre";
import { Edge, Node, Position } from "reactflow";
import { RFDirection } from "./types";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 320;
const nodeHeight = 170;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: RFDirection = "TB",
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, ranksep: 130, nodesep: 100 });

  const [invisibleNode, ...visibleNodes] = nodes;

  visibleNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  visibleNodes.forEach((node, index) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
    node.position = {
      x: nodeWithPosition.x + 100,
      y: nodeWithPosition.y + 100,
    };

    // set invisible node position same with first node
    if (index === 0) {
      invisibleNode.position = {
        x: nodeWithPosition.x + 100,
        y: nodeWithPosition.y + 100,
      };
    }

    return node;
  });

  return { nodes: [invisibleNode, ...visibleNodes], edges };
};

export { getLayoutedElements };
