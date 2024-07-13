import NextAuth from "next-auth" // Import the NextAuthUser type
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters"
import prisma from "@/lib/db"
import authConfig from "./auth.config"
import { Session } from "next-auth"

// Extend the existing User type

// Extend the Session model to include the role in the user object
interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };
}

async function getUserRole(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })
  return user?.role;
}

export const {auth, handlers, signIn, signOut} = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  // session: { strategy: "jwt" },
  ...authConfig,
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (isNewUser && user.email) {
        if (user.email === process.env.ADMIN_EMAIL) {
          await prisma.user.update({
            where: { email: user.email },
            data: { role: "ADMIN" },
          })
        }
      }
    }
  },
  callbacks: {
    session: async ({ session, user }) => {
      const extendedSession = session as ExtendedSession
      extendedSession.user.role = await getUserRole(user.id)
      return extendedSession;
    },
  },
});