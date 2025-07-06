import { addTodo } from "@/app/todosActions";
import { Logging } from "@/app/util/logging";
import { todoListQueryOptions } from "@/hooks/todos/useTodos";
import { type Todo } from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { type MutationOptions } from "@tanstack/query-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddTodoVariables {
  name: string;
}

interface AddTodoContext {
  previousTodos: Todo[] | undefined;
  optimisticTodo: Todo;
}

export function useAddTodo(
  callbacks?: Pick<
    MutationOptions<void, Error, AddTodoVariables, AddTodoContext>,
    "onError" | "onSuccess" | "onMutate" | "onSettled"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AddTodoVariables, AddTodoContext>({
    mutationFn: addTodo,
    onMutate: async (variables) => {
      await callbacks?.onMutate?.(variables);

      await queryClient.cancelQueries({
        queryKey: todoListQueryOptions().queryKey,
      });

      const previousTodos = queryClient.getQueryData(
        todoListQueryOptions().queryKey,
      );
      const optimisticTodo: Todo = {
        id: createId(),
        name: variables.name,
        order: 0,
        completed: false,
        createdById: "optimistic",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      queryClient.setQueryData(todoListQueryOptions().queryKey, (old = []) => [
        optimisticTodo,
        ...old,
      ]);
      return { previousTodos, optimisticTodo };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        todoListQueryOptions().queryKey,
        context?.previousTodos,
      );
      Logging.error(`Error adding todo ${variables.name}`);

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
