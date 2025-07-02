import { getTodos } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useQuery } from "@tanstack/react-query";

export function useTodos() {
  const query = useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });

  return {
    data: query.data,
    isPending: query.isPending,
    error: query.error,
    uncompletedTodos: query.data?.filter((todo) => !todo.completed),
    completedTodos: query.data?.filter((todo) => todo.completed),
  };
}
