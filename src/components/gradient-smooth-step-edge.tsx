import React, { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "reactflow";

function GradientSmoothStepEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;

  const [edgePath] = getSmoothStepPath({
    sourceX: xEqual ? sourceX + 0.005 : sourceX,
    sourceY: yEqual ? sourceY + 0.005 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
}

export default memo(GradientSmoothStepEdge);
