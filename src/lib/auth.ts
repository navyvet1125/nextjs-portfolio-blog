import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./db"
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google" 

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
}

// export default NextAuth(authOptions)