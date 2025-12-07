import type { HTMLAttributes } from "react";
import clsx from "classnames";

export function Badge({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-beige/60 px-3 py-1 text-xs font-medium text-coffee",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
