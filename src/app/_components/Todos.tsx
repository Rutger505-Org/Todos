"use client";

import { Todo } from "@/app/_components/Todo";
import { getTodos } from "@/app/todosActions";
import { useQuery } from "@tanstack/react-query";

export function Todos() {
  const {
    data: todos,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
  if (todos?.length === 0) {
    return <div>No posts yet</div>;
  }

  return (
    <div className={"flex flex-col gap-5"}>
      {todos?.map((post) => <Todo key={post.id} todo={post} />)}
    </div>
  );
}
