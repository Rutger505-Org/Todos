import { deleteTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
