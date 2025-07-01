import { env } from "@/env";

export async function middleware() {
  if (env.NODE_ENV === "development") {
    const delay =
      Math.floor(Math.random() * env.DEV_DELAY_DEVIATION_MS) +
      env.DEV_DELAY_BASE_MS;
    console.log(`Artificial delay of ${delay}ms`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
