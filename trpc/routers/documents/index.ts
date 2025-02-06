import { db } from "@/db";
import { documents } from "@/db/schema";
import { authProcedure } from "@/trpc/procedures/auth";
import { and, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { router } from "../../trpc";

export const documentsRouter = router({
  create: authProcedure
    .input(createInsertSchema(documents).omit({ userId: true }))
    .mutation(async ({ ctx: { userId }, input }) => {
      return await db.insert(documents).values({
        ...input,
        userId,
      });
    }),
  get: authProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await db
      .select()
      .from(documents)
      .where(and(eq(documents.id, input), eq(documents.userId, ctx.userId)));
  }),
  all: authProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.userId, ctx.userId));
  }),
});
