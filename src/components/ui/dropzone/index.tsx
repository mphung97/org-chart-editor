import { cn } from "@/utils";
import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props: any) {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      className={cn(["border border-dashed border-gray-400 rounded-lg p-4"])}
    >
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex flex-col justify-center items-center"
      >
        <input {...getInputProps()} />
        <h3>Select a file or drap and drop here</h3>
        <p>.xlsx file size less than 5MB</p>

        <button
          type="button"
          onClick={open}
          className="border border-solid border-blue-400 px-4 py-2 rounded-lg text-blue-400 text-[12px]"
        >
          Select File
        </button>
      </div>
    </div>
  );
}

export default Dropzone;
