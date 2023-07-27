import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const { GOOGLE_ID = '', GOOGLE_SECRET = '' } = process.env;

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
