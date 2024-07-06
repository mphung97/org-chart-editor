import { memo, useCallback } from "react";
import { ControlButton, useReactFlow } from "reactflow";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover/popover";
import { UploadIcon } from "@radix-ui/react-icons";
import { useDropzone } from "react-dropzone";
import { parseFile } from "../actions";
import { nanoid } from "nanoid";
import { getLayoutedElements } from "../dagre";

const UploadButton = memo(() => {
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
      setNodes(layoutedNodes);
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
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ControlButton title="import" aria-label="import">
          <UploadIcon />
        </ControlButton>
      </PopoverTrigger>
      <PopoverContent className="bg-[#f9f9f9] rounded-md border-[2px] border-[#94a3ab] border-dashed">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <h3 className="text-[16px] text-[#818181] font-medium text-center">
            Select a file or drap and drop here
          </h3>
        </div>
      </PopoverContent>
    </Popover>
  );
});

export { UploadButton };
