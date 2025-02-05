import { createContext } from "./context";
import { appRouter } from "./routers/_app";
import { createCallerFactory } from "./trpc";

export const createCaller = createCallerFactory(appRouter);
export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};
