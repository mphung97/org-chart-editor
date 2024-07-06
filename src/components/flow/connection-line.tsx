"use client";

import React, { memo } from "react";
import { ConnectionLineComponentProps } from "reactflow";

export default memo(function EdgeGradient({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) {
  return (
    <g>
      <path
        fill="none"
        stroke={"url(#edge-gradient)"}
        strokeWidth={2}
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="none"
        r={3}
        stroke={"url(#edge-gradient)"}
        strokeWidth={1.5}
      />
    </g>
  );
});
