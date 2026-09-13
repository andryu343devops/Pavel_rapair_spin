import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { dateTime, notes } = await request.json();
    console.log("📌 Appointment request received:", { dateTime, notes });

    if (!dateTime) {
      return NextResponse.json({ error: "Date and time are required" }, { status: 400 });
    }

    // Check if the user already has an appointment
    const existingAppointment = await prisma.appointment.findUnique({
      where: { userId },
    });

    if (existingAppointment) {
      return NextResponse.json({ error: "You already have an appointment" }, { status: 400 });
    }

    // Find available slot
    const availability = await prisma.availability.findUnique({
      where: { dateTime: new Date(dateTime) },
    });

    if (!availability || availability.isBooked) {
      return NextResponse.json({ error: "Time slot is already booked" }, { status: 400 });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        availabilityId: availability.id,
        notes: notes || "",
      },
    });

    // Mark slot as booked
    await prisma.availability.update({
      where: { id: availability.id },
      data: { isBooked: true },
    });

    console.log("✅ Appointment successfully created:", appointment);
    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.warn("⚠️ Unauthorized user.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const isAdmin = session.user.email === process.env.NEXT_PUBLIC_ADMIN;

    console.log("🔹 Authorized user:", session.user);

    // Fetch appointments
    const appointments = await prisma.appointment.findMany({
      where: isAdmin ? {} : { userId },
      select: {
        id: true,
        notes: true,
        user: { select: { name: true } },
        availability: { select: { dateTime: true } },
        address: true
      },
    });

    if (!appointments || appointments.length === 0) {
      console.warn("⚠️ No appointments found.");
      return NextResponse.json([]);
    }
    console.log('asdkf', appointments)
    // Format appointments
    const formattedAppointments = appointments.map((appointment) => ({
      id: appointment.id,
      notes: appointment.notes || "",
      date: appointment.availability?.dateTime
        ? appointment.availability.dateTime.toISOString().split("T")[0]
        : "No date specified",
      time: appointment.availability?.dateTime
        ? appointment.availability.dateTime.toISOString().split("T")[1].slice(0, 5)
        : "No time specified",
      user: appointment.user.name || "Unknown",
      address: appointment.address || ""
    }));

    console.log("📌 Appointments found:", formattedAppointments);

    return NextResponse.json(formattedAppointments);
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN; // Admin email

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
    }

    const userEmail = session.user?.email ?? "";
    if (!userEmail) {
      return NextResponse.json({ error: "Invalid user email" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { appointmentId } = await request.json();
    if (!appointmentId || isNaN(Number(appointmentId))) {
      return NextResponse.json({ error: "Invalid appointment ID" }, { status: 400 });
    }

    // Find the appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(appointmentId) },
      select: { id: true, userId: true, availabilityId: true },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Check if the user is the owner or an admin
    const isAdmin = user.email === ADMIN_EMAIL;

    if (!isAdmin && appointment.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Delete appointment
    await prisma.appointment.delete({ where: { id: appointment.id } });

    // Free the time slot
    await prisma.availability.update({
      where: { id: appointment.availabilityId },
      data: { isBooked: false },
    });

    console.log("✅ Appointment deleted:", appointment.id);
    return NextResponse.json({ success: true, message: "Appointment deleted" });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
