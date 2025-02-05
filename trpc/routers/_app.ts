import { authProcedure } from "../procedures/auth";
import { mergeRouters, router } from "../trpc";
import { applicationsRouter } from "./applications";
import { documentsRouter } from "./documents";

export const appRouter = mergeRouters(
  router({
    applications: applicationsRouter,
    documents: documentsRouter,
    greeting: authProcedure.query(({ ctx: { userId } }) => {
      return `Hello ${userId}!`;
    }),
  }),
);
export type AppRouter = typeof appRouter;
