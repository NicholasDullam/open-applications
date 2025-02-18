import { logger, task, wait } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  maxDuration: 300,
  run: async (payload: undefined, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });
    await wait.for({ seconds: 5 });
    return {
      message: "Hello, world!",
    };
  },
});
