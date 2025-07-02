import { getTodos } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useQuery } from "@tanstack/react-query";

export function useTodos() {
  const query = useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });

  return {
    todos: query.data,
    completedTodos: query.data?.filter((todo) => todo.completed) ?? [],
    uncompletedTodos: query.data?.filter((todo) => !todo.completed) ?? [],
    data: query.data,
    isPending: query.isPending,
    error: query.error,
  };
}
