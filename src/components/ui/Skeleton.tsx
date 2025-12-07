import clsx from "classnames";
import type { HTMLAttributes } from "react";

export function Skeleton({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-soft bg-gradient-to-r from-sand to-beige/70",
        className,
      )}
      {...rest}
    />
  );
}
