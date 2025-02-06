import { db } from "@/db";
import { applications } from "@/db/schema";
import { authProcedure } from "@/trpc/procedures/auth";
import { and, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { router } from "../../trpc";

export const applicationsRouter = router({
  create: authProcedure
    .input(createInsertSchema(applications).omit({ userId: true }))
    .mutation(async ({ ctx: { userId }, input }) => {
      return await db.insert(applications).values({
        ...input,
        userId,
      });
    }),
  get: authProcedure
    .input(z.string())
    .query(async ({ ctx: { userId }, input }) => {
      return await db
        .select()
        .from(applications)
        .where(
          and(eq(applications.id, input), eq(applications.userId, userId)),
        );
    }),
  all: authProcedure.query(async ({ ctx: { userId } }) => {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId));
  }),
});
