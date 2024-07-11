import { PrismaAdapter } from "@auth/prisma-adapter"
// import { Prisma } from "@prisma/client"
import prisma from "./db"
import NextAuth from "next-auth"
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
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID!,
    //   clientSecret: process.env.GOOGLE_SECRET!,
    // }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)