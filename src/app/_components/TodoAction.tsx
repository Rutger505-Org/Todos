"use client";

import { clsx } from "clsx";
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  variant?: "default" | "danger";
}

export function TodoAction({
  children,
  className,
  variant = "default",
  ...rest
}: Readonly<Props>) {
  return (
    <button
      className={clsx(
        "flex aspect-square h-fit w-fit items-center justify-center rounded-full p-2",
        variant === "default" && "hover:bg-gray-100",
        variant === "danger" && "hover:bg-red-100",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
