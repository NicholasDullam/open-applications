import { db } from "@/db";
import { applications } from "@/db/schema";
import { authProcedure } from "@/trpc/procedures/auth";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { router } from "../../trpc";

export const applicationsRouter = router({
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
