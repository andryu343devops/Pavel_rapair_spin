// src/app/api/availability/clear/route.ts

import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";// Убедитесь, что Prisma корректно настроен

// 🛠️ Обработка DELETE-запроса
export const DELETE = async () => {
  try {
    console.log("🧹 Starting to clear appointments and availability...");

    const deleteAppointments = await prisma.appointment.deleteMany({});
    const deleteAvailability = await prisma.availability.deleteMany({});

    console.log(`✅ Deleted ${deleteAppointments.count} appointments`);
    console.log(`✅ Deleted ${deleteAvailability.count} availability slots`);

    return NextResponse.json({
      message: "All appointments and availability cleared successfully",
      appointmentsDeleted: deleteAppointments.count,
      availabilityDeleted: deleteAvailability.count,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error("❌ Error clearing availability:", error.message);
    return NextResponse.json(
      { error: "Failed to clear availability" },
      { status: 500 }
    );
  }
  }
};
