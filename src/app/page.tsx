import { Header } from "@/app/_components/Header";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className={"flex flex-col items-center justify-center gap-10"}>
        <div className={"flex flex-col items-center space-y-2.5"}>
          <h1 className="text-4xl font-bold">Todo&#39;s!</h1>
        </div>

        <div className={"flex flex-col gap-7"}>No todo&#39;s yet</div>
      </main>
    </div>
  );
}
