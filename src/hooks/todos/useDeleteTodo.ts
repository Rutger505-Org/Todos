import { deleteTodo } from "@/app/todosActions";
import { todoListQueryOptions } from "@/hooks/todos/useTodos";
import { type Todo } from "@/server/db/schema";
import { type MutationOptions } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTodoVariables {
  id: string;
}

interface DeleteTodoContext {
  previousTodos: Todo[] | undefined;
  previousChangedTodo: Todo | undefined;
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

      await queryClient.cancelQueries({
        queryKey: todoListQueryOptions().queryKey,
      });

      const previousTodos = queryClient.getQueryData(
        todoListQueryOptions().queryKey,
      );

      const previousChangedTodo = previousTodos?.find(
        (todo) => todo.id === variables.id,
      );

      queryClient.setQueryData(todoListQueryOptions().queryKey, (oldData) =>
        (oldData ?? []).filter((todo) => todo.id !== variables.id),
      );

      return { previousTodos, previousChangedTodo };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        todoListQueryOptions().queryKey,
        context?.previousTodos,
      );
      console.error("Error deleting todo:", variables.id);

      callbacks?.onError?.(error, variables, context);
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: todoListQueryOptions().queryKey,
      });

      callbacks?.onSuccess?.(data, variables, context);
    },
    onSettled: callbacks?.onSettled,
  });
}
