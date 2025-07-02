import { getTodos } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useQuery } from "@tanstack/react-query";

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });
}
