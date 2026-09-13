/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `time` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Availability_date_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
DROP COLUMN "time";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "isAvailable",
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "time" TEXT NOT NULL;
