"use client";

import { getTodos } from "@/app/todosActions";
import { useQuery } from "@tanstack/react-query";

export function Todos() {
  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <div>
      {isPending && "Loading..."}
      {error && `Something went wrong: ${error.message}`}
      {posts?.length === 0 && <div>No posts yet</div>}
      {posts?.map((post) => <div key={post.id}>{post.name}</div>)}
    </div>
  );
}
