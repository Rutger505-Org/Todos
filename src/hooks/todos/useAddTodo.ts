import { addTodo } from "@/app/todosActions";
import { todoListQueryOptions } from "@/hooks/todos/useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: todoListQueryOptions().queryKey,
      });
    },
  });
}
