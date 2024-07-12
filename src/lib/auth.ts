import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters"
import prisma from "@/lib/db"
import authConfig from "./auth.config"

// const prisma = new PrismaClient()

export const {auth, handlers, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
})