import { type ButtonHTMLAttributes, cloneElement, isValidElement } from "react";
import clsx from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  asChild?: boolean;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  asChild,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-soft font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<typeof variant, string> = {
    primary:
      "bg-forest text-white shadow-subtle hover:bg-forest/90 focus-visible:outline-forest",
    secondary:
      "bg-terracotta text-white shadow-subtle hover:bg-terracotta/90 focus-visible:outline-terracotta",
    ghost:
      "bg-transparent border border-coffee/20 text-coffee hover:bg-white/80 focus-visible:outline-coffee",
  };
  const sizes: Record<typeof size, string> = {
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const buttonClassName = clsx(base, variants[variant], sizes[size], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: clsx(buttonClassName, children.props.className),
      ...rest,
    } as any);
  }

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}
