import { nanoid } from "nanoid";
import { memo, useCallback } from "react";
import { ControlButton, Node, useReactFlow } from "reactflow";
import { CardStackPlusIcon as AddIcon } from "@radix-ui/react-icons";

const AddNode = memo(() => {
  const { setNodes } = useReactFlow();

  const onAddNode = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const id = nanoid();
      const draftNode: Node = {
        id,
        data: {
          email: "input@example.com",
          displayName: "Input Node",
          companyName: "Example Corp",
          role: "Input",
        },
        position: {
          x: event.clientX - 240,
          y: event.clientY + 250,
        },
        type: "organization",
      };

      setNodes((nodes) => nodes.concat(draftNode));
    },
    [],
  );

  return (
    <ControlButton
      onClick={onAddNode}
      title="add node"
      aria-label="add node"
      disabled
    >
      <AddIcon />
    </ControlButton>
  );
});

export { AddNode };
