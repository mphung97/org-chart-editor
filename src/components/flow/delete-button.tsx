import { memo } from "react";
import { TrashIcon as DeleteIcon } from "@radix-ui/react-icons";
import { RoundedButton } from "./rounded-button";

const DeleteButton = memo(function DeleteButton() {
  return (
    <RoundedButton>
      <DeleteIcon />
    </RoundedButton>
  );
});

export { DeleteButton };
