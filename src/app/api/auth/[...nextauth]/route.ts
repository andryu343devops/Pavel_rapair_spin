import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Корректный импорт

const handler = NextAuth(authOptions);

// ✅ Экспортируй только нужные методы (GET, POST)
export const GET = handler;
export const POST = handler;