/*
  Warnings:

  - You are about to drop the column `date` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Availability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dateTime]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateTime` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "appointmentid" INTEGER,
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "authorId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Availability_dateTime_key" ON "Availability"("dateTime");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_appointmentid_fkey" FOREIGN KEY ("appointmentid") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
