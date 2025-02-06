import { createAsyncCaller } from "@/trpc/server";

export default async function Page() {
  const trpc = await createAsyncCaller();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-4xl font-bold">Open Applications</h1>
      <p className="text-lg text-gray-500">
        A means of managing my application process: {await trpc.greeting()}
      </p>
    </div>
  );
}
