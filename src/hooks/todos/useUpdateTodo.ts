import { updateTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
