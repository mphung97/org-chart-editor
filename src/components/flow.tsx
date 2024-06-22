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
} from "reactflow";
import { useShallow } from "zustand/react/shallow";

import { RFControls as Controls } from "./rf-controls";
import ExportPngButton from "./download-image";
import OrgNode from "./org-node";
import GradientSmoothStepEdge from "./gradient-smooth-step-edge";
import { AddIcon, UploadIcon } from "@/react-icons";

import useRFStore from "./store";
import { selectorRF } from "./selectors";

const nodeTypes: NodeTypes = {
  organization: OrgNode,
};

const edgeTypes: EdgeTypes = {
  gradientsmoothstep: GradientSmoothStepEdge,
};

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
          <ControlButton
            onClick={() => alert("Something magical just happened. ✨")}
            title="add node"
            aria-label="add node"
          >
            <AddIcon />
          </ControlButton>
        </Controls>
        <MiniMap pannable zoomable position="top-right" />
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle
                stroke="#2a8af6"
                strokeOpacity="0.75"
                r="2"
                cx="0"
                cy="0"
              />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </div>
  );
}

export default memo(Flow);
