import { deleteTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
import { type Todo } from "@/server/db/schema";
import { type MutationOptions } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTodoVariables {
  id: string;
}

interface DeleteTodoContext {
  previousTodos: Todo[] | undefined;
}

export function useDeleteTodo(
  callbacks?: Pick<
    MutationOptions<void, Error, DeleteTodoVariables, DeleteTodoContext>,
    "onError" | "onSuccess" | "onMutate" | "onSettled"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteTodoVariables, DeleteTodoContext>({
    mutationFn: deleteTodo,
    onMutate: async (variables) => {
      await callbacks?.onMutate?.(variables);

      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousTodos = queryClient.getQueryData<Todo[]>(todoKeys.all);

      // Optimistically remove the todo from the list
      queryClient.setQueryData<Todo[]>(todoKeys.all, (oldData) =>
        (oldData ?? []).filter((todo) => todo.id !== variables.id),
      );

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      // Restore the previous state on error
      queryClient.setQueryData(todoKeys.all, context?.previousTodos);
      console.error("Error deleting todo:", variables.id);

      callbacks?.onError?.(error, variables, context);
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });

      callbacks?.onSuccess?.(data, variables, context);
    },
    onSettled: callbacks?.onSettled,
  });
}
