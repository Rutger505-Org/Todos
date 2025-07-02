import { CreateTodo } from "@/app/_components/CreateTodo";
import { Header } from "@/app/_components/Header";
import { Todos } from "@/app/_components/Todos";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className={"flex flex-col items-center gap-10"}>
        <div className={"flex flex-col items-center space-y-2.5"}>
          <h1 className="text-4xl font-bold">Todo&#39;s!</h1>
        </div>

        <div className={"flex flex-col gap-10"}>
          <CreateTodo />
          <Todos />
        </div>
      </main>
    </div>
  );
}
