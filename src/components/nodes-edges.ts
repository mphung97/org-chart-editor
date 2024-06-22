import { Node } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes: Node<any>[] = [
  {
    id: "1",
    data: {
      email: "input@example.com",
      displayName: "Input Node",
      companyName: "Example Corp",
      role: "Input",
    },
    position,
    type: "organization",
  },
  {
    id: "2",
    data: {
      email: "node2@example.com",
      displayName: "Node 2",
      companyName: "Example Corp",
      role: "Manager",
    },
    position,
    type: "organization",
  },
  {
    id: "2a",
    data: {
      email: "node2a@example.com",
      displayName: "Node 2a",
      companyName: "Example Corp",
      role: "Engineer",
    },
    position,
    type: "organization",
  },
  {
    id: "2b",
    data: {
      email: "node2b@example.com",
      displayName: "Node 2b",
      companyName: "Example Corp",
      role: "Analyst",
    },
    position,
    type: "organization",
  },
  {
    id: "2c",
    data: {
      email: "node2c@example.com",
      displayName: "Node 2c",
      companyName: "Example Corp",
      role: "Developer",
    },
    position,
    type: "organization",
  },
  {
    id: "2d",
    data: {
      email: "node2d@example.com",
      displayName: "Node 2d",
      companyName: "Example Corp",
      role: "Designer",
    },
    position,
    type: "organization",
  },
  {
    id: "3",
    data: {
      email: "node3@example.com",
      displayName: "Node 3",
      companyName: "Example Corp",
      role: "Team Lead",
    },
    position,
    type: "organization",
  },
  {
    id: "4",
    data: {
      email: "node4@example.com",
      displayName: "Node 4",
      companyName: "Example Corp",
      role: "Product Manager",
    },
    position,
    type: "organization",
  },
  {
    id: "5",
    data: {
      email: "node5@example.com",
      displayName: "Node 5",
      companyName: "Example Corp",
      role: "QA Engineer",
    },
    position,
    type: "organization",
  },
  {
    id: "6",
    data: {
      email: "output@example.com",
      displayName: "Output Node",
      companyName: "Example Corp",
      role: "Output",
    },
    position,
    type: "organization",
  },
  {
    id: "7",
    data: {
      email: "output2@example.com",
      displayName: "Output Node 2",
      companyName: "Example Corp",
      role: "Output",
    },
    position,
    type: "organization",
  },
];

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
  { id: "e13", source: "1", target: "3", type: edgeType, animated: true },
  { id: "e22a", source: "2", target: "2a", type: edgeType, animated: true },
  { id: "e22b", source: "2", target: "2b", type: edgeType, animated: true },
  { id: "e22c", source: "2", target: "2c", type: edgeType, animated: true },
  { id: "e2c2d", source: "2c", target: "2d", type: edgeType, animated: true },
  { id: "e45", source: "4", target: "5", type: edgeType, animated: true },
  { id: "e56", source: "5", target: "6", type: edgeType, animated: true },
  { id: "e57", source: "5", target: "7", type: edgeType, animated: true },
];
