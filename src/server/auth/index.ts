import NextAuth from "next-auth";
import { cache } from "react";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

async function ensureAuthenticated() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export { auth, ensureAuthenticated, handlers, signIn, signOut };
