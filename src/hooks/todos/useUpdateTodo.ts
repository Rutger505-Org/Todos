import { updateTodo } from "@/app/todosActions";
import { todoKeys } from "@/hooks/todos/todoKeys";
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
  previousEditedTodo: Todo | undefined;
}

export function useUpdateTodo(
  callbacks?: Pick<
    MutationOptions<void, Error, UpdateTodoVariables, UpdateTodoContext>,
    "onError" | "onSuccess" | "onMutate" | "onSettled"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateTodoVariables, UpdateTodoContext>({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await callbacks?.onMutate?.(newTodo);

      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousTodos = queryClient.getQueryData<Todo[]>(todoKeys.all);
      const previousEditedTodo = previousTodos?.find(
        (todo) => todo.id === newTodo.id,
      );

      queryClient.setQueryData<Todo[]>(todoKeys.all, (oldData) =>
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

      return { previousTodos, previousEditedTodo };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(todoKeys.all, context?.previousTodos);
      console.error("Error updating todo:", newTodo.name);

      callbacks?.onError?.(error, newTodo, context);
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });

      callbacks?.onSuccess?.(data, variables, context);
    },
    onSettled: callbacks?.onSettled,
  });
}
