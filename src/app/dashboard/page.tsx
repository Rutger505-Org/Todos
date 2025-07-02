import { CreateTodo } from "@/app/_components/CreateTodo";
import { Todos } from "@/app/_components/Todos";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <main className={"flex flex-col items-center gap-10"}>
      <div className={"flex flex-col items-center space-y-2.5"}>
        <h1 className="text-4xl font-bold">Todo&#39;s!</h1>
      </div>

      <div className={"flex flex-col gap-10"}>
        <CreateTodo />
        <Todos />
      </div>
    </main>
  );
}
