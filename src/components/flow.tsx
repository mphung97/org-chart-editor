"use client";
import "reactflow/dist/style.css";

import ReactFlow, {
  Background,
  NodeTypes,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  addEdge,
  Connection,
  EdgeTypes,
  MiniMap,
  ControlButton,
} from "reactflow";
import { RFControls as Controls } from "./rf-controls";
import ExportPngButton from "./download-image";
import OrgNode from "./org-node";
import orgEdge from "./org-edge";

import { memo, useCallback, useEffect, useSyncExternalStore } from "react";
import { dagreStore } from "./dagre";

import { initialNodes, initialEdges } from "./nodes-edges";
import { UploadIcon } from "@/react-icons";

const nodeTypes: NodeTypes = { organization: OrgNode };
const edgeTypes: EdgeTypes = {
  organization: orgEdge,
};

const snapshot = {
  nodes: [],
  edges: [],
};

function getServerSnapshot() {
  return snapshot;
}

function Flow() {
  const dagreState = useSyncExternalStore(
    dagreStore.subscribe,
    dagreStore.getDagreValues,
    getServerSnapshot,
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(dagreState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(dagreState.edges);

  useEffect(() => {
    dagreStore.setDagreValues(initialNodes, initialEdges);
  }, []);

  useEffect(() => {
    setNodes(dagreState.nodes);
    setEdges(dagreState.edges);
  }, [dagreState]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [],
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
        </Controls>
        <MiniMap pannable zoomable position="top-right" />
      </ReactFlow>
    </div>
  );
}

export default memo(Flow);
