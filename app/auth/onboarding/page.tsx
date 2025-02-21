import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  try {
    if (!user) throw new Error("User not found");
    await api.users.create({
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      externalId: user.id,
    });
  } catch (error) {
    console.error(error);
    redirect("/");
  }
}
