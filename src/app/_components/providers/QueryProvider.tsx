"use client";

import { Logging } from "@/app/util/logging";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => Logging.error(`Something went wrong: ${error.message}`),
  }),
  mutationCache: new MutationCache({
    onError: (error) => Logging.error(`Something went wrong: ${error.message}`),
  }),
});

export default function QueryProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
