import { CreateTodo } from "@/app/_components/CreateTodo";
import { Header } from "@/app/_components/Header";
import { Todos } from "@/app/_components/Todos";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <Header />

      <main className={"flex flex-col items-center gap-10"}>
        <div className={"flex flex-col items-center space-y-2.5"}>
          <h1 className="text-4xl font-bold">Todo&#39;s!</h1>
        </div>

        {session ? (
          <>
            <CreateTodo />
            <Todos />
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2.5">
            <h2 className="text-2xl font-semibold">Please sign in</h2>
            <p> You can sign in with a magic link</p>
            <p> You will recieve an email with a link to sign in</p>
          </div>
        )}
      </main>
    </div>
  );
}
