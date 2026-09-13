import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: unknown;
      id: string;  // ✅ Добавляем ID в `session.user`
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
