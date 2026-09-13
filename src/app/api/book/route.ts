import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    console.log("📡 Booking request received...");

    // ✅ Parse the JSON request
    const { date, time, notes, address } = await req.json();
    console.log(`📅 Date: ${date} ⏰ Time: ${time} 📝 Notes: ${notes}`);

    // ✅ Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Find the user by email
    let user = await prisma.user.findUnique({ where: { email: session.user.email } });

    if (!user) {
      console.log("🆕 Creating a new user...");
      user = await prisma.user.create({
        data: {
          name: session.user.name || "New User",
          email: session.user.email,
          password: "",
        },
      });
    }

    // ✅ Check if the user already has an appointment
    const existingAppointment = await prisma.appointment.findUnique({
      where: { userId: user.id },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { error: "You already have an active appointment." },
        { status: 400 }
      );
    }

    // ✅ Convert the date to the exact UTC format
    const selectedDateTime = dayjs.utc(`${date}T${time}`).toISOString();
    console.log("🔍 Looking for an available slot on:", selectedDateTime);

    // ✅ Check all available slots in the database for debugging
    const allSlots = await prisma.availability.findMany({
      where: { isBooked: false },
      select: { id: true, dateTime: true, isBooked: true },
    });

    console.log("📜 All available slots in the database:", allSlots);

    // ✅ Corrected availability search
    const availability = await prisma.availability.findFirst({
      where: {
        dateTime: selectedDateTime,
        isBooked: false,
      },
    });

    console.log("🧐 Found:", availability);

    if (!availability) {
      return NextResponse.json(
        { error: "The selected time is already booked or not available." },
        { status: 400 }
      );
    }

    // ✅ Create an appointment record
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        availabilityId: availability.id,
        notes,
        address
      },
    });

    // ✅ Update the availability status
    await prisma.availability.update({
      where: { id: availability.id },
      data: { isBooked: true },
    });

    console.log("✅ Appointment created successfully!");
    return NextResponse.json({ message: "Appointment created successfully!", appointment });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Booking error:", error.message);
      return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    } else {
      console.error("❌ Unknown booking error:", error);
      return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
    }
  }
}
