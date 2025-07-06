import { updateTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousTodos = queryClient.getQueryData(todoKeys.all);

      queryClient.setQueryData(todoKeys.all, (oldData) =>
        (oldData ?? []).map((todo) => {
          return todo.id === newTodo.id
            ? {
                ...todo,
                ...(newTodo.name && { name: newTodo.name }),
                ...(newTodo.completed !== undefined && {
                  completed: newTodo.completed,
                }),
              }
            : todo;
        }),
      );

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(todoKeys.all, context?.previousTodos);
      console.error("Error updating todo:", newTodo.name);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
