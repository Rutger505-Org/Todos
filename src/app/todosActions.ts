"use server";

import { ensureAuthenticated } from "@/server/auth";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getTodos() {
  const session = await ensureAuthenticated();

  return db.query.todos.findMany({
    where: (todo, { eq }) => eq(todo.createdById, session.user.id),
    orderBy: (todo, { desc }) => [desc(todo.order), desc(todo.createdAt)],
  });
}

export async function addTodo({ name }: { name: string }) {
  const session = await ensureAuthenticated();

  return db.insert(todos).values({
    name,
    createdById: session.user.id,
  });
}

export async function deleteTodo({ id }: { id: string }) {
  await ensureAuthenticated();

  return db.delete(todos).where(eq(todos.id, id));
}

export async function changeTodo({ name }: { name: string }) {
  await ensureAuthenticated();

  return db
    .update(todos)
    .set({
      name,
    })
    .where(eq(todos.id, name));
}
