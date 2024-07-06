import { memo, useCallback } from "react";
import { ControlButton, useReactFlow } from "reactflow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadIcon } from "@radix-ui/react-icons";
import { useDropzone } from "react-dropzone";
import { parseFile } from "@/app/actions";
import { nanoid } from "nanoid";
import { getLayoutedElements } from "@/components/flow/dagre";

const Import = memo(() => {
  const { getNode, setNodes } = useReactFlow();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const { data, error } = await parseFile(acceptedFiles[0]);
    if (error) return;

    const processedData = data?.map((nodeData) => ({
      id: nanoid(),
      position: { x: 0, y: 0 },
      type: "organization",
      data: nodeData,
    }));

    if (processedData) {
      const invisibleNode = getNode("invisible")!;
      const nodes = [invisibleNode, ...processedData];
      const { nodes: layoutedNodes } = getLayoutedElements(nodes, []);
      setNodes([...layoutedNodes]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    noDrag: true,
    noKeyboard: true,
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ControlButton title="import" aria-label="import">
          <UploadIcon />
        </ControlButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuItem
          asChild
          className="text-[12px] cursor-pointer hover:bg-gray-100"
        >
          <span {...getRootProps()}>
            <input {...getInputProps()} />
            .xlsx
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[12px] cursor-not-allowed hover:bg-gray-100">
          .json
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { Import };
