"use client";

import React, { memo, useTransition } from "react";
import {
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
  ControlButton,
} from "reactflow";
import { toPng } from "html-to-image";
import { DownloadIcon } from "@/react-icons";

function downloadImage(dataUrl: any) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;


function ExportPngButton() {
  const { getNodes } = useReactFlow();
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    try {
      const nodesBounds = getRectOfNodes(getNodes());
      const transform = getTransformForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.5,
        2,
      );

      console.log(document.querySelector(".react-flow__viewport"));

      const image = await toPng(
        document.querySelector(".react-flow__viewport") as HTMLElement,
        {
          backgroundColor: "#ffffff",
          width: imageWidth,
          height: imageHeight,
          style: {
            width: imageWidth + "px",
            height: imageHeight + "px",
            transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
          },
        },
      );

      downloadImage(image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ControlButton onClick={onClick} title="export" aria-label="export">
      <DownloadIcon />
    </ControlButton>
  );
}

export default memo(ExportPngButton);
