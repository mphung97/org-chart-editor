"use client";

import "reactflow/dist/style.css";

import { memo, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  NodeTypes,
  ConnectionLineType,
  EdgeTypes,
  MiniMap,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Edge,
  useOnSelectionChange,
  useReactFlow,
} from "reactflow";
import { nanoid } from "nanoid";

import OrgNode from "./org-node";
import InvisibleNode from "./invisible-node";
import GradientEdge from "./gradient-edge";
import ConnectionLine from "./connection-line";

import {
  RFControls as Controls,
  Export,
  Import,
  Rearrange,
} from "@/components/controls";

import { initialEdges, initialNodes } from "./nodes-edges";
import { getLayoutedElements } from "./dagre";

const nodeTypes: NodeTypes = {
  invisible: InvisibleNode,
  organization: OrgNode,
};

const edgeTypes: EdgeTypes = {
  gradientsmoothstep: GradientEdge,
};

function nodeColor(node: Node) {
  switch (node.type) {
    case "invisible":
      return "transparent";
    default:
      return "#e2e2e2";
  }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

function Actions() {
  const { getNode } = useReactFlow();
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);

  const onChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
      console.log(getNode(nodes[0].id));
    },
    [],
  );

  useOnSelectionChange({
    onChange,
  });

  return (
    <div>
      <p>Selected nodes: {selectedNodes.join(", ")}</p>
      <p>Selected edges: {selectedEdges.join(", ")}</p>
    </div>
  );
}

function Flow() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      id: nanoid(),
      type: "gradientsmoothstep",
      ...connection,
    };
    setEdges((preEdges) => addEdge(newEdge, preEdges));
  }, []);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineComponent={ConnectionLine}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Background />
        <Controls position="top-left">
          <Import />
          <Export />
          <Rearrange />
        </Controls>
        <MiniMap
          pannable
          zoomable
          position="bottom-right"
          nodeColor={nodeColor}
        />
        <Panel
          className="bg-[#fefefe] border-b border-solid border-b-[#eee] shadow-[0_0_2px_1px_rgba(0,0,0,0.08)] p-[5px]"
          position="top-right"
        >
          <Actions />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default memo(Flow);
