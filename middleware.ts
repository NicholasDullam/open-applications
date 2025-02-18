import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "./db";
import { users } from "./db/schema";

const ONBOARDING_URL = "/auth/onboarding";

const isPublicRoute = createRouteMatcher([]);
const isOnboardingRoute = createRouteMatcher([`${ONBOARDING_URL}`]);

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn } = await auth();

    if (isPublicRoute(request)) return NextResponse.next();
    if (isOnboardingRoute(request) && userId) return NextResponse.next();

    if (!userId) return redirectToSignIn({ returnBackUrl: request.url });
    const user = (
      await db
        .select({ id: users.id })
        .from(users)
        .limit(1)
        .where(eq(users.externalId, userId))
    )[0];
    if (!user)
      return NextResponse.redirect(new URL(ONBOARDING_URL, request.url));
    return NextResponse.next();
  },
  { debug: true },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
