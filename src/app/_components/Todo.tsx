"use client";

import { TodoAction } from "@/app/_components/TodoAction";
import { deleteTodo, updateTodo } from "@/app/todosActions";
import { type Todo } from "@/server/db/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { Circle, CircleCheck, CircleX, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  todo: Todo;
}

export function Todo({ todo }: Readonly<Props>) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(todo.name);
  const [completed, setCompleted] = useState(todo.completed);

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
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

  function handleToggleCompleted() {
    setCompleted(!completed);

    updateMutation.mutate({ id: todo.id, completed: !todo.completed });
  }

  return (
    <div
      className={
        "flex max-w-96 items-center justify-between rounded-xl px-3 focus-within:shadow hover:shadow"
      }
    >
      <TodoAction
        onClick={() => deleteMutation.mutate({ id: todo.id })}
        className={clsx(
          deleteMutation.isPending && "cursor-not-allowed opacity-50",
        )}
        variant={"danger"}
      >
        <Trash2 size={16} />
      </TodoAction>

      <TodoAction onClick={handleToggleCompleted} className={clsx("group")}>
        <span className={"group-hover:hidden"}>
          {completed ? <CircleCheck size={16} /> : <Circle size={16} />}
        </span>
        <span className={"hidden group-hover:inline"}>
          {completed ? <CircleX size={16} /> : <CircleCheck size={16} />}
        </span>
      </TodoAction>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleBlur}
        className={
          "m-2 min-w-0 flex-1 cursor-pointer p-px text-xl outline-none focus:cursor-text focus:border-b focus:border-black"
        }
      />
    </div>
  );
}
