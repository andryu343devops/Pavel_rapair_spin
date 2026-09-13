import { prisma } from "./prisma/prisma-client";

async function clearDatabaseWithTransaction() {
  try {
    await prisma.$transaction([
      prisma.appointment.deleteMany({}),
      prisma.availability.deleteMany({}),
      prisma.blogPost.deleteMany({}),
      prisma.testimonial.deleteMany({}),
      prisma.user.deleteMany({}),
    ]);

    console.log("Database cleared successfully with transaction.");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
}

clearDatabaseWithTransaction();