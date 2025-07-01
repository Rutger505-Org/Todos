"use client";

import { type Todo } from "@/server/db/schema";
import { Trash2 } from "lucide-react";

interface Props {
  todo: Todo;
}

export function Todo({ todo }: Readonly<Props>) {
  return (
    <div
      className={
        "flex w-72 items-center justify-between rounded-xl border px-3"
      }
    >
      <span className={"py-2 pl-2 text-xl"}>{todo.name}</span>
      <button
        className={
          "flex aspect-square h-fit w-fit items-center justify-center rounded-full p-2 hover:bg-red-100"
        }
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
