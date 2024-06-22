"use client";

import { ReactFlowProvider } from "reactflow";
import Flow from "@/components/flow";

export default function Home() {
  return (
    <main>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </main>
  );
}
