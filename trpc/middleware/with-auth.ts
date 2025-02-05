import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

export const withAuth = middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }
  return next({
    ctx: {
      userId: ctx.auth.userId,
    },
  });
});
