import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Ищем пользователя по токену
    const user = await prisma.user.findUnique({
      where: { resetToken: token },
    });

    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // Хэшируем новый пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Обновляем пароль и очищаем токен
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetTokenExpires: null },
    });

    return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error in reset-password:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
