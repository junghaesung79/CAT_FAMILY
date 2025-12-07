import type { HTMLAttributes } from "react";
import clsx from "classnames";

type ChipProps = HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
};

export function Chip({
  active = false,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <div
      className={clsx(
        "chip cursor-pointer select-none",
        active && "bg-forest/10 text-forest border-forest/40 font-semibold",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
