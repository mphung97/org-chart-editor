"use client";

import "reactflow/dist/style.css";

import { memo, useCallback } from "react";
import ReactFlow, {
  Background,
  NodeTypes,
  ConnectionLineType,
  EdgeTypes,
  MiniMap,
  ControlButton,
  Node,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import { ReloadIcon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";

import OrgNode from "./org-node";
import InvisibleNode from "./invisible-node";
import GradientEdge from "./gradient-edge";
import ConnectionLine from "./connection-line";

import { RFControls as Controls } from "./controls/rf-controls";
import ExportPngButton from "./controls/download-image";
import { AddNodeButton } from "./controls/add-node-button";
import { UploadButton } from "./controls/upload";

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
      return "red";
    default:
      return "#e2e2e2";
  }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

function Flow() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      id: nanoid(),
      type: "gradientsmoothstep",
      ...connection,
    };
    setEdges((preEdges) => addEdge(newEdge, preEdges));
  }, []);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges]);

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
          <UploadButton />
          <ExportPngButton />
          <AddNodeButton />
          <ControlButton
            onClick={onLayout}
            title="rearrange"
            aria-label="rearrange"
          >
            <ReloadIcon />
          </ControlButton>
        </Controls>
        <MiniMap pannable zoomable position="top-right" nodeColor={nodeColor} />
      </ReactFlow>
    </div>
  );
}

export default memo(Flow);
