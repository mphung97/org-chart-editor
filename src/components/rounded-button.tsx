import { cn } from "@/utils";
import React, { forwardRef, memo } from "react";

const RoundedButton = memo(
  forwardRef(
    (
      { children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>,
      ref: React.Ref<HTMLButtonElement>,
    ) => {
      return (
        <button
          ref={ref}
          {...props}
          className={cn([
            "rounded-xl w-[28px] h-[28px]",
            "inline-flex items-center justify-center",
            "text-violet11 bg-white cursor-pointer outline-none",
          ])}
          aria-label="Function button"
        >
          {children}
        </button>
      );
    },
  ),
);

export { RoundedButton };
