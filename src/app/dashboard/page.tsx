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
    <main className={"space-y-10"}>
      <h1 className="text-center text-4xl font-bold">Todos!</h1>

      <div className={"mx-auto flex max-w-96 flex-col gap-5"}>
        <CreateTodo />
        <Todos />
      </div>
    </main>
  );
}
