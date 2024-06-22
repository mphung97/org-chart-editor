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
          className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white cursor-pointer hover:drop-shadow-lg outline-none"
          aria-label="Update dimensions"
        >
          {children}
        </button>
      );
    },
  ),
);

export { RoundedButton };
