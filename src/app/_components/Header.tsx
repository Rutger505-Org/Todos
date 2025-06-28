import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/server/auth";

export async function Header() {
  const session = await auth();

  console.log("Session", session);
  return (
    <header className="flex justify-between p-10">
      <span>Todo&#39;s</span>

      {session ? (
        <div className={"flex items-center gap-5"}>
          <span>{session.user.name ?? session.user.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button type="submit">Sign In</Button>
        </form>
      )}
    </header>
  );
}
