import { createTRPCContext } from "@/trpc/context";
import { appRouter } from "@/trpc/routers/_app";
import { auth } from "@clerk/nextjs/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => createTRPCContext(await auth()),
  });

export { handler as GET, handler as POST };
