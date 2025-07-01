"use server";

import { ensureAuthenticated } from "@/server/auth";
import { db } from "@/server/db";
import { todos } from "@/server/db/schema";

export async function getTodos() {
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

  return db.query.todos.findMany({
    orderBy: (posts, { desc, asc }) => [
      asc(posts.order),
      desc(posts.createdAt),
    ],
  });
}
