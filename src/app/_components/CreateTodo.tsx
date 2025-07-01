"use client";

import { addTodo } from "@/app/todosActions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createTodoSchema = z.object({
  name: z.string().min(1),
});

type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export function CreateTodo() {
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: addTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="flex flex-1 gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className={"grow"}>
                <FormControl>
                  <Input placeholder="Enter todo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" size={"icon"}>
            <PlusIcon />
          </Button>
        </form>
      </Form>
      <span>{error?.message}</span>
    </div>
  );
}
