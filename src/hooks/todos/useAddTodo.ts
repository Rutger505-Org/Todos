import { addTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
