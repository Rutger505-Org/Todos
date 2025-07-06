"use server";

import "server-only";

import { ensureAuthenticated } from "@/server/auth";
import { db } from "@/server/db";
import { type Todo, todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getTodos(): Promise<Todo[]> {
  const session = await ensureAuthenticated();

  return db.query.todos.findMany({
    where: (todo, { eq }) => eq(todo.createdById, session.user.id),
    orderBy: (todo, { desc }) => [desc(todo.order), desc(todo.createdAt)],
  });
}

export async function addTodo({ name }: { name: string }) {
  const session = await ensureAuthenticated();

  await db.insert(todos).values({
    name,
    createdById: session.user.id,
  });
}

export async function deleteTodo({ id }: { id: string }) {
  await ensureAuthenticated();

  throw new Error("Method not implemented.");

  await db.delete(todos).where(eq(todos.id, id));
}

export async function updateTodo({
  id,
  name,
  completed,
}: {
  id: string;
  name: string;
  completed: boolean;
}) {
  await ensureAuthenticated();

  await db.update(todos).set({ name, completed }).where(eq(todos.id, id));
}
