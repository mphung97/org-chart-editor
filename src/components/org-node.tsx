import { memo } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Handle, NodeProps, Position } from "reactflow";
import { EditButton } from "./edit-button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/utils";

// from-pink-500 via-red-500 to-yellow-500
// from-indigo-500 via-purple-500 to-pink-500
// from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%

function OrgNode({ data }: NodeProps) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={cn(
              "shadow-gray-50 drop-shadow-2xl w-[300px] h-[180px] rounded-[24px] p-1",
              "bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90%",
            )}
          >
            <div
              className={cn(
                "relative rounded-[22px] h-full w-full",
                "flex flex-col items-center justify-center bg-white p-2",
              )}
            >
              <div className="absolute top-6 right-6 hidden">
                <EditButton />
              </div>
              <Avatar.Root className="border-[8px] border-[#F1F3FF] border-solid bg-blackA1 inline-flex h-[100px] w-[100px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src="https://avatars.githubusercontent.com/u/124599?v=4"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <input
                readOnly
                type="text"
                className="text-2xl font-bold text-[#141A41] w-full text-center focus-visible:outline-none"
                value={data.displayName ?? "no label"}
              />
              <input
                readOnly
                type="text"
                className="text-lg font-medium text-[#141A41] w-full text-center focus-visible:outline-none"
                value={data.companyName ?? "no label"}
              />
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default memo(OrgNode);
