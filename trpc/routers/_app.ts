import { authProcedure } from "../procedures/auth";
import { router } from "../trpc";

export const appRouter = router({
  greeting: authProcedure.query(({ ctx: { userId } }) => {
    return `hello ${userId}`;
  }),
});
export type AppRouter = typeof appRouter;
