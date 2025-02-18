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
    .mutation(async ({ ctx: { user }, input }) => {
      return await db.insert(applications).values({
        ...input,
        userId: user.id,
      });
    }),
  get: authProcedure
    .input(z.string())
    .query(async ({ ctx: { user }, input }) => {
      return await db
        .select()
        .from(applications)
        .where(
          and(eq(applications.id, input), eq(applications.userId, user.id)),
        );
    }),
  all: authProcedure.query(async ({ ctx: { user } }) => {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.userId, user.id));
  }),
});
