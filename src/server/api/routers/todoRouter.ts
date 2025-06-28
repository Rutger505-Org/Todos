import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { todos } from "@/server/db/schema";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getForUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todos.findMany({
      where: (todo, { eq }) => eq(todo.createdById, ctx.session.user.id),
      orderBy: (todo, { desc }) => [desc(todo.order), desc(todo.createdAt)],
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(todos).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });

      return ctx.db.query.todos.findMany({
        orderBy: (posts, { desc, asc }) => [
          asc(posts.order),
          desc(posts.createdAt),
        ],
      });
    }),
});
