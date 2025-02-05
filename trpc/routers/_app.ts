import { authProcedure } from "../procedures/auth";
import { mergeRouters, router } from "../trpc";
import { applicationsRouter } from "./applications";

export const appRouter = mergeRouters(
  router({
    applications: applicationsRouter,
    greeting: authProcedure.query(({ ctx: { userId } }) => {
      return `Hello ${userId}!`;
    }),
  }),
);
export type AppRouter = typeof appRouter;
