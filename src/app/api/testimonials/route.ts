import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 🔹 Получение отзывов
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("❌ Ошибка получения отзывов:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// 🔹 Создание отзыва (админ может создать от любого имени)
export async function POST(req: Request) {
  try {
    const { userName, message, rating } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Создаём отзыв
    const testimonial = await prisma.testimonial.create({
      data: {
        userName: userName || "Anonymous",
        message,
        rating,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("❌ Error creating testimonial:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔹 Удаление отзыва (админ может удалять любые отзывы)

// 🔹 Удаление отзыва по ID (доступно только администратору)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Проверка на администратора
    // const isAdmin = session.user.email === "art.bertes@gmail.com";
    // if (!isAdmin) {
    //   return NextResponse.json({ error: "Only admin can delete testimonials." }, { status: 403 });
    // }

    // Получаем ID из URL-параметров
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Удаление отзыва по ID
    await prisma.testimonial.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Testimonial successfully deleted!" });
  } catch (error) {
    console.error("❌ Error deleting testimonial:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

