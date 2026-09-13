import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Не указана дата" }, { status: 400 });
    }

    // ✅ Приводим начало и конец дня к UTC
    const dateStart = dayjs.utc(dateParam).startOf("day").toDate();
    const dateEnd = dayjs.utc(dateParam).endOf("day").toDate();

    console.log("📅 Получаем слоты для UTC даты:", dateStart, "→", dateEnd);

    const slots = await prisma.availability.findMany({
      where: {
        dateTime: { gte: dateStart, lte: dateEnd },
        isBooked: false,
      },
      select: { dateTime: true },
    });

    console.log("✅ Найденные слоты (UTC):", slots.map((s) => s.dateTime));

    return NextResponse.json(
      slots.map((slot) =>
        dayjs(slot.dateTime).utc().format("HH:mm") // Отдаём строго UTC
      )
    );
  } catch (error) {
    console.error("❌ Ошибка получения времени:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
