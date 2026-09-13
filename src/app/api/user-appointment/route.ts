import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() { // Removed the 'req' parameter
  try {
    console.log("📡 Fetching user appointment...");

    // ✅ Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        appointment: {
          include: {
            availability: true, // 🔹 Load date and time from `Availability`
          },
        },
      },
    });

    if (!user || !user.appointment || !user.appointment.availability) {
      return NextResponse.json(null, { status: 200 });
    }

    // ✅ Return complete data with `dateTime`
    return NextResponse.json({
      id: user.appointment.id,
      date: user.appointment.availability.dateTime.toISOString().split("T")[0], // 📅 Format date (YYYY-MM-DD)
      time: user.appointment.availability.dateTime.toISOString().split("T")[1].slice(0, 5), // ⏰ Format time (HH:mm)
      notes: user.appointment.notes || "",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error fetching appointment:", error.message);
      return NextResponse.json(
        { error: "Server error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("❌ Unknown error while fetching appointment:", error);
      return NextResponse.json(
        { error: "Unknown server error" },
        { status: 500 }
      );
    }
  }
}
