"use client";

import "reactflow/dist/style.css";

import { memo } from "react";
import ReactFlow, {
  Background,
  NodeTypes,
  ConnectionLineType,
  EdgeTypes,
  MiniMap,
  ControlButton,
  Node,
} from "reactflow";
import { useShallow } from "zustand/react/shallow";

import { RFControls as Controls } from "./controls/rf-controls";
import ExportPngButton from "./controls/download-image";
import OrgNode from "./org-node";
import GradientEdge from "./gradient-edge";
import { UploadIcon } from "@/react-icons";
import ConnectionLine from "./connection-line";

import useRFStore from "./store";
import { selectorRF } from "./selectors";
import { AddNodeButton } from "./controls/add-node-button";
import InvisibleNode from "./invisible-node";

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

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useRFStore(
    useShallow(selectorRF),
  );

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
          <ControlButton
            onClick={() => alert("Something magical just happened. ✨")}
            title="import"
            aria-label="import"
          >
            <UploadIcon />
          </ControlButton>
          <ExportPngButton />
          <AddNodeButton />
        </Controls>
        <MiniMap pannable zoomable position="top-right" nodeColor={nodeColor} />
      </ReactFlow>
    </div>
  );
}

export default memo(Flow);
