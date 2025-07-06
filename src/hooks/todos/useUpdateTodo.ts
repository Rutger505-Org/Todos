import { updateTodo } from "@/app/todosActions";
import { Logging } from "@/app/util/logging";
import { todoListQueryOptions } from "@/hooks/todos/useTodos";
import { type Todo } from "@/server/db/schema";
import { type MutationOptions } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateTodoVariables {
  id: string;
  name: string;
  completed: boolean;
}

interface UpdateTodoContext {
  previousTodos: Todo[] | undefined;
  previousChangedTodo: Todo | undefined;
}

export function useUpdateTodo(callbacks?: {
  onError?: MutationOptions<
    void,
    Error,
    UpdateTodoVariables,
    UpdateTodoContext
  >["onError"];
  onSuccess?: MutationOptions<
    void,
    Error,
    UpdateTodoVariables,
    UpdateTodoContext
  >["onSuccess"];
  onMutate?: (variables: UpdateTodoVariables) => void | Promise<void>;
  onSettled?: MutationOptions<
    void,
    Error,
    UpdateTodoVariables,
    UpdateTodoContext
  >["onSettled"];
}) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTodoVariables, UpdateTodoContext>({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await callbacks?.onMutate?.(newTodo);

      await queryClient.cancelQueries({
        queryKey: todoListQueryOptions().queryKey,
      });

      const previousTodos = queryClient.getQueryData(
        todoListQueryOptions().queryKey,
      );
      const previousChangedTodo = previousTodos?.find(
        (todo) => todo.id === newTodo.id,
      );

      queryClient.setQueryData(
        todoListQueryOptions().queryKey,
        (oldData = []) =>
          oldData.map((todo) => {
            return todo.id === newTodo.id
              ? {
                  ...todo,
                  ...newTodo,
                }
              : todo;
          }),
      );

      return { previousTodos, previousChangedTodo };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(
        todoListQueryOptions().queryKey,
        context?.previousTodos,
      );
      Logging.error("Error updating todo: " + newTodo.name);

      callbacks?.onError?.(error, newTodo, context);
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
