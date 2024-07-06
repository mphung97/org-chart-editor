import { memo } from "react";
import { DeleteIcon } from "@/react-icons";
import { RoundedButton } from "./rounded-button";

const DeleteButton = memo(() => {
  return (
    <RoundedButton>
      <DeleteIcon />
    </RoundedButton>
  );
});

export { DeleteButton };
