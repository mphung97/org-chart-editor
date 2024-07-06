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
  {
    id: "NaSzsUULHUZwFRO6eNPbM",
    position,
    type: "organization",
    data: {
      no: 1,
      name: "Christina Limcc",
      role: "PM",
      site: "SIA",
    },
  },
  {
    id: "MaSzsUULHUZwFRO6eNPbM",
    position,
    type: "organization",
    data: {
      no: 1,
      name: "Christina Limcc",
      role: "PM",
      site: "SIA",
    },
  },
];

export const initialEdges = [];
