"use client";

import { api } from "@/trpc/react";

export function Todos() {
  const { data: posts, isPending, error } = api.todo.getForUser.useQuery();

  return (
    <div>
      {isPending && "Loading..."}
      {error && `Something weng wrong: ${error.message}`}
      {posts?.length === 0 && "No posts yet" && <div>No posts yet</div>}
      {posts?.map((post) => <div key={post.id}>{post.name}</div>)}
    </div>
  );
}
