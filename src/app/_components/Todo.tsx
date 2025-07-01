"use client";

import { deleteTodo } from "@/app/todosActions";
import { type Todo } from "@/server/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { Trash2 } from "lucide-react";

interface Props {
  todo: Todo;
}

export function Todo({ todo }: Readonly<Props>) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  return (
    <div
      className={
        "flex w-72 items-center justify-between rounded-xl border px-3"
      }
    >
      <span className={"py-2 pl-2 text-xl"}>{todo.name}</span>
      <button
        onClick={() => deleteMutation.mutate({ id: todo.id })}
        className={clsx(
          "flex aspect-square h-fit w-fit items-center justify-center rounded-full p-2 hover:bg-red-100",
          deleteMutation.isPending && "cursor-not-allowed opacity-50",
        )}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
