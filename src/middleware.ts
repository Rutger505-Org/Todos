import { env } from "@/env";

export async function middleware() {
  if (env.NODE_ENV === "development") {
    // delay 150ms - 300ms
    const delay = Math.floor(Math.random() * 150) + 150;
    console.log(`Artificial delay of ${delay}ms`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
