import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Incorrect password");

        return { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email 
        };
      }
    }),
  ],

  pages: {
    signIn: "/login", // Указываем страницу входа
    error: "/login", // Отображение ошибок на той же странице
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
          token.id = user.id.toString();
      }
      console.log("🔑 JWT Callback - Token:", token);
      return token;
  },
    
  async session({ session, token }) {
    if (session.user) {
        session.user.id = token.id ? String(token.id) : "";
    }
    console.log("📦 Session Callback - Session:", session);
    return session;
}
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Включаем логирование для отладки
};
