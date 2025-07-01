"use client";

import { changeTodo, deleteTodo } from "@/app/todosActions";
import { type Todo } from "@/server/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  todo: Todo;
}

export function Todo({ todo }: Readonly<Props>) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(todo.name);

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: changeTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  function handleBlur() {
    if (name.trim() === "") {
      setName(todo.name);
      return;
    }

    if (todo.name === name) {
      return;
    }

    updateMutation.mutate({ id: todo.id, name });
  }

  return (
    <div
      className={
        "flex w-72 items-center justify-between rounded-xl border px-3"
      }
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        className={
          "m-1 min-w-0 flex-1 cursor-pointer p-1 text-xl outline-none focus:cursor-text focus:border-b focus:border-black"
        }
      />
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
