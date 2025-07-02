"use client";

import { Todo } from "@/app/_components/Todo";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTodos } from "@/hooks/todos/useTodos";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export function Todos() {
  const { isPending, error, uncompletedTodos, completedTodos } = useTodos();
  const [showCompleted, setShowCompleted] = useState(false);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
  if (!uncompletedTodos?.length && !completedTodos?.length) {
    return <div>No todos yet</div>;
  }

  return (
    <div className={"flex flex-col gap-5"}>
      <div>
        {uncompletedTodos?.length === 0 ? (
          <div>No uncompleted todos</div>
        ) : (
          uncompletedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
        )}
      </div>

      {completedTodos?.length > 0 && (
        <Collapsible
          className={"flex flex-col"}
          open={showCompleted}
          onOpenChange={setShowCompleted}
        >
          <CollapsibleTrigger asChild>
            <Button
              className="flex flex-1 justify-start text-start"
              variant={"ghost"}
            >
              <ChevronsUpDown />
              <span>
                {showCompleted ? "Hide" : "Show"} Completed Todos (
                {completedTodos?.length ?? 0})
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              {completedTodos?.length === 0 ? (
                <div>No completed todos</div>
              ) : (
                completedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
