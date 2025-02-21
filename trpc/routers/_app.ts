import { authProcedure } from "../procedures/auth";
import { mergeRouters, router } from "../trpc";
import { applicationsRouter } from "./applications";
import { documentsRouter } from "./documents";
import { usersRouter } from "./users";

export const appRouter = mergeRouters(
  router({
    applications: applicationsRouter,
    documents: documentsRouter,
    users: usersRouter,
    greeting: authProcedure.query(({ ctx: { user } }) => {
      return `Hello ${user.firstName}!`;
    }),
  }),
);
export type AppRouter = typeof appRouter;
