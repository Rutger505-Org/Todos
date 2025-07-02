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
import { useAddTodo } from "@/hooks/todos/useAddTodo";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createTodoSchema = z.object({
  name: z.string().min(1),
});

type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export function CreateTodo() {
  const { mutate, error, isPending } = useAddTodo();

  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div className={"flex-1"}>
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
