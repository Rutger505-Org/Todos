import { getTodos } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function todoListQueryOptions() {
  return queryOptions({
    queryKey: todoKeys.list(),
    queryFn: getTodos,
  });
}

export function useTodos() {
  const query = useQuery(todoListQueryOptions());

  return {
    todos: query.data,
    completedTodos: query.data?.filter((todo) => todo.completed) ?? [],
    uncompletedTodos: query.data?.filter((todo) => !todo.completed) ?? [],
    data: query.data,
    isPending: query.isPending,
    error: query.error,
  };
}
