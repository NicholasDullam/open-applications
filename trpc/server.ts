import { auth } from "@clerk/nextjs/server";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createQueryClient } from "./client";
import { createTRPCContext } from "./context";
import { AppRouter } from "./routers/_app";
import { createCaller } from "./trpc";

const createContext = cache(async () => {
  return createTRPCContext(await auth());
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
