import { CreateTodo } from "@/app/_components/CreateTodo";
import { Header } from "@/app/_components/Header";
import { Todos } from "@/app/_components/Todos";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/server/auth";
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

        {session ? (
          <div className={"flex flex-col gap-10"}>
            <CreateTodo />
            <Todos />
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2.5">
            <h2 className="text-2xl font-semibold">Please sign in</h2>
            <p>Sign in with a magic email link</p>

            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button>Sign in with email</Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
