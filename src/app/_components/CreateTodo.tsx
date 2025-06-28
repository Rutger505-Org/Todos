"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createTodoSchema = z.object({
  name: z.string().min(1),
});
export function CreateTodo() {
  const { mutate, error, isPending } = api.todo.create.useMutation();

  const form = useForm<z.infer<typeof createTodoSchema>>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createTodoSchema>) => {
    mutate({ name: data.name });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Your new Todo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          <PlusIcon />
        </Button>
      </form>
      <span>{error?.message}</span>
    </Form>
  );
}
