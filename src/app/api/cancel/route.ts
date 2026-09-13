import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    console.log("📡 Request to delete appointment...");

    // ✅ Get the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      console.error("❌ Error: User not authenticated");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { appointmentId } = await req.json();
    if (!appointmentId) {
      console.error("❌ Error: Appointment ID not provided.");
      return NextResponse.json({ error: "Appointment ID not provided." }, { status: 400 });
    }

    console.log("📌 Deleting appointment with ID:", appointmentId);

    // ✅ Get the appointment record
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { availability: true }, // Fetch related availability data
    });

    if (!appointment) {
      console.error("❌ Error: Appointment not found.");
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }

    // ✅ Delete the appointment
    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    // ✅ Free up the slot (set isBooked to false)
    if (appointment.availability) {
      await prisma.availability.update({
        where: { id: appointment.availability.id },
        data: { isBooked: false },
      });
      console.log(`✅ Slot ${appointment.availability.dateTime} is now available.`);
    }

    console.log("✅ Appointment successfully deleted.");
    return NextResponse.json({ message: "Appointment successfully canceled." });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error deleting appointment:", error.message);
      return NextResponse.json(
        { error: "Server error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("❌ Unknown error while deleting appointment:", error);
      return NextResponse.json(
        { error: "Unknown server error" },
        { status: 500 }
      );
    }
  }
}
