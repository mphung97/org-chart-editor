import { ReloadIcon } from "@radix-ui/react-icons";
import { memo, useCallback } from "react";
import { ControlButton, useReactFlow } from "reactflow";
import { getLayoutedElements } from "@/components/flow/dagre";

const Rearrange = memo(function Rearrange() {
  const { fitView, getNodes, setNodes, getEdges, setEdges } = useReactFlow();

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      getNodes(),
      getEdges(),
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, []);

  return (
    <ControlButton onClick={onLayout} title="rearrange" aria-label="rearrange">
      <ReloadIcon />
    </ControlButton>
  );
});

export { Rearrange };
