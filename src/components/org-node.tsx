import { memo } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Handle, NodeProps, Position } from "reactflow";
import { EditNode } from "./edit-node";

// from-pink-500 via-red-500 to-yellow-500
// from-indigo-500 via-purple-500 to-pink-500
// from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%

function OrgNode({ data }: NodeProps) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="shadow-gray-50 drop-shadow-2xl w-80 h-56 rounded-[24px] bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% p-1">
        <div className="relative rounded-[22px] flex flex-col h-full w-full items-center justify-center bg-white">
          <div className="absolute top-6 right-6 hidden">
            <EditNode />
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
          <h1 className="text-2xl font-black text-[#141A41]">
            {data.displayName ?? "no label"}
          </h1>
          <h3 className="text-lg font-black text-[#141A41]">
            {data.companyName ?? "no label"}
          </h3>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default memo(OrgNode);
