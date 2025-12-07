import type { HTMLAttributes } from "react";
import clsx from "classnames";

export function Card({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "card-surface relative overflow-hidden rounded-soft bg-sand p-4",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
