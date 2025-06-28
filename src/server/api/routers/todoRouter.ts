import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.todos.findMany({
      orderBy: (posts, { desc, asc }) => [
        asc(posts.order),
        desc(posts.createdAt),
      ],
    });
  }),
});
