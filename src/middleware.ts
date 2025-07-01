import { env } from "@/env";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (env.NODE_ENV === "development") {
    const delay = Math.floor(Math.random() * 150) + 150;
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
