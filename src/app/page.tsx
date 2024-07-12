// import Image from "next/image";
import FormNewPost from "../components/formNewPost";
// import { getCurrentUser } from "@/lib/session";
// import { auth } from "@/lib/auth";

export default async function Home() {
  // const user = await getCurrentUser();
  // console.log(user);

  return (
    <main className="min-h-screen max-w-5xl my-5 mx-auto">
      <h1 className="max-w-md text-4xl font-bold text-center">Create a new post</h1>
      <FormNewPost />
    </main>
  );
}
