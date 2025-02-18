import { db } from "@/db";
import { users } from "@/db/schema";
import { authProcedure } from "@/trpc/procedures/auth";
import { procedure, router } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersRouter = router({
  get: authProcedure
    .input(z.string())
    .query(async ({ ctx: { user }, input }) => {
      if (user.id !== input)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      return await db.select().from(users).where(eq(users.id, input));
    }),
  create: procedure
    .use(async ({ ctx: { auth }, next }) => {
      if (!auth.userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      return next({
        ctx: {
          userId: auth.userId,
        },
      });
    })
    .input(createInsertSchema(users).omit({ id: true }))
    .mutation(async ({ ctx: { userId }, input }) => {
      return await db.insert(users).values({
        ...input,
        externalId: userId,
      });
    }),
});
