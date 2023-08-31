const bcrypt = require("bcrypt");
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "../../../utils/connection";
import User from "../../../model/User";

interface IUser {
  name: string;
  password: string;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connection();

        const user = await User.findOne({
          name: credentials?.name,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const { compare } = bcrypt;

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // jwt: async ({ token, user }) => {
    //   user && (token.user = user);
    //   return token;
    // },
    // session: async ({ session, token }) => {
    //   const user = token.user as IUser;
    //   session.user = user;
    //   return session;
    // },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(options);
