import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

type Auth = Awaited<ReturnType<typeof auth>>;

export const createTRPCContext = async (auth: Auth) => {
  if (!auth.userId) throw new Error("User not found");
  const user = (
    await db
      .select()
      .from(users)
      .where(eq(users.externalId, auth.userId))
      .limit(1)
  )[0];
  return { auth, user: user as typeof user | undefined };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
