/*
  Warnings:

  - You are about to drop the column `time` on the `meetings` table. All the data in the column will be lost.
  - Added the required column `timeToEnd` to the `meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeToStart` to the `meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetings" DROP COLUMN "time",
ADD COLUMN     "timeToEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timeToStart" TIMESTAMP(3) NOT NULL;
