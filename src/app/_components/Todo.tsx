"use client";

import { TodoAction } from "@/app/_components/TodoAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTodo } from "@/hooks/todos/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/todos/useUpdateTodo";
import { type Todo } from "@/server/db/schema";
import { clsx } from "clsx";
import {
  Circle,
  CircleCheck,
  CircleX,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface Props {
  todo: Todo;
}

export function Todo({ todo }: Readonly<Props>) {
  const [name, setName] = useState(todo.name);
  const [completed, setCompleted] = useState(todo.completed);

  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

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

    updateMutation.mutate({ id: todo.id, completed: !completed });
  }

  return (
    <div
      className={
        "flex items-center justify-between rounded-xl px-3 focus-within:shadow hover:shadow"
      }
    >
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-2 rounded p-1 hover:bg-gray-100">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => deleteMutation.mutate({ id: todo.id })}
            className={clsx(
              "cursor-pointer text-red-600 focus:text-red-600",
              deleteMutation.isPending && "cursor-not-allowed opacity-50",
            )}
            disabled={deleteMutation.isPending}
          >
            <Trash2 size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
