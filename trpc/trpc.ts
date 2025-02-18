import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { Context } from "./context";
import { appRouter } from "./routers/_app";

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const middleware = t.middleware;
export const createCaller = t.createCallerFactory(appRouter);
export const mergeRouters = t.mergeRouters;

export const router = t.router;
export const procedure = t.procedure;
