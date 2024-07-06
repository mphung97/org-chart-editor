import { Node } from "reactflow";

const position = { x: 0, y: 0 };

export const initialNodes: Node<any>[] = [
  {
    id: "invisible",
    data: {},
    position,
    type: "invisible",
    zIndex: -1,
    style: {
      visibility: "hidden",
    },
  },
];

export const initialEdges = [];
