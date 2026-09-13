import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { PrismaClient } from "@prisma/client";

dayjs.extend(utc); // 🔹 Подключаем UTC

const prisma = new PrismaClient();

async function generateAvailability(startDate: string, endDate: string, timeSlots: string[]) {
  const start = dayjs.utc(startDate); // 🔹 Начинаем с UTC
  const end = dayjs.utc(endDate);

  const availabilityData = [];
  let currentDate = start;

  while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
    for (const timeSlot of timeSlots) {
      const dateTime = dayjs.utc(`${currentDate.format("YYYY-MM-DD")}T${timeSlot}:00`).toDate();
      availabilityData.push({ dateTime, isBooked: false });
    }
    currentDate = currentDate.add(1, "day");
  }

  console.log("🛠️ Очищаем БД...");
  await prisma.$transaction([
    prisma.appointment.deleteMany({}),
    prisma.availability.deleteMany({}),
  ]);

  console.log(`🚀 Добавляем ${availabilityData.length} слотов...`);

  const batchSize = 1000;
  for (let i = 0; i < availabilityData.length; i += batchSize) {
    await prisma.availability.createMany({
      data: availabilityData.slice(i, i + batchSize),
    });
  }

  console.log(`✅ Успешно добавлено ${availabilityData.length} записей!`);
}

generateAvailability(
  "2025-05-22",  // Начальная дата
  "2025-06-30",  // Конечная дата
  ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
)
  .catch((error) => console.error("❌ Ошибка генерации:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
