"use client";

import React, { memo, useTransition } from "react";
import {
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
  ControlButton,
} from "reactflow";
import { toPng } from "html-to-image";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function downloadImage(dataUrl: any) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

const Export = memo(function Export() {
  const { getNodes } = useReactFlow();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(
          nodesBounds,
          imageWidth,
          imageHeight,
          0.5,
          2,
        );

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
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ControlButton title="export" aria-label="export">
          <DownloadIcon />
        </ControlButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem
          onSelect={onClick}
          className="text-[12px] cursor-pointer hover:bg-gray-100"
        >
          .png
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[12px] cursor-not-allowed hover:bg-gray-100">
          .json
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { Export };
