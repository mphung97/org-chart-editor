import { memo, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import * as PrimitiveAvatar from "@radix-ui/react-avatar";
import { EditButton } from "./edit-button";
import { cn } from "@/utils";
import { useDropzone } from "react-dropzone";

// from-pink-500 via-red-500 to-yellow-500
// from-indigo-500 via-purple-500 to-pink-500
// from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%

const Avatar = memo(({ nodeId }: { nodeId: string }) => {
  const [file, setFile] = useState<string | undefined>();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    noDrag: true,
    noKeyboard: true,
  });

  return (
    <PrimitiveAvatar.Root
      className={cn(
        "border-[8px] border-[#f1f3ff] border-solid inline-flex justify-center",
        "h-[100px] w-[100px] select-none items-center overflow-hidden rounded-full align-middle",
        "cursor-pointer",
      )}
      title="avatar"
      {...getRootProps()}
    >
      <PrimitiveAvatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={file}
        alt="Node Avatar"
      />
      <PrimitiveAvatar.Fallback
        className="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        F
      </PrimitiveAvatar.Fallback>
      <input {...getInputProps()} />
    </PrimitiveAvatar.Root>
  );
});

const OrgNode = memo(({ id, data }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div
        className={cn(
          "shadow-gray-50 drop-shadow-2xl w-[300px] h-[180px] rounded-[24px] p-1",
          "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
          "group",
        )}
      >
        <div
          className={cn(
            "relative rounded-[22px] h-full w-full",
            "flex flex-col items-center justify-center bg-white p-2",
          )}
        >
          <div className="absolute top-4 left-6 invisible group-hover:visible">
            {/* <EditButton /> */}
            {data.no}
          </div>
          <Avatar nodeId={id} />
          <input
            readOnly
            type="text"
            className="text-2xl font-bold text-[#141A41] w-full text-center focus-visible:outline-none"
            value={data.name ?? "unknown"}
          />
          <input
            readOnly
            type="text"
            className="text-lg font-medium text-[#141A41] w-full text-center focus-visible:outline-none"
            value={`${data.role} - ${data.site}`}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});

export default OrgNode;
