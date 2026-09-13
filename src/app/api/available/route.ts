import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const slots = await prisma.availability.findMany({
      where: { isBooked: false }, // ✅ Только свободные даты
      select: { dateTime: true },
      distinct: ["dateTime"],
      orderBy: { dateTime: "asc" },
    });

    console.log("📆 Доступные даты:", slots);

    return NextResponse.json(slots.map((slot) => ({
      date: slot.dateTime.toISOString().split("T")[0], // ✅ Только дата (YYYY-MM-DD)
    })));
  } catch (error) {
    console.error("❌ Ошибка получения дат:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
