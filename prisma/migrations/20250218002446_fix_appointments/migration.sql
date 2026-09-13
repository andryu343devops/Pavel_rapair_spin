/*
  Warnings:

  - You are about to drop the column `appointmentid` on the `Availability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_appointmentid_fkey";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "appointmentid";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
