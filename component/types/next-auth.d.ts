import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _doc: {
        name?: string;
        password?: string;
        admin?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      };
    };
  }
}
