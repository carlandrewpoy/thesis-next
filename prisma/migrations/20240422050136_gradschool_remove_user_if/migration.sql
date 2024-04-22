/*
  Warnings:

  - You are about to drop the column `userId` on the `gradschoolfaculty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AuditLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `gradschoolfaculty` DROP FOREIGN KEY `GradSchoolFaculty_userId_fkey`;

-- AlterTable
ALTER TABLE `gradschoolfaculty` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `AuditLog_userId_key` ON `AuditLog`(`userId`);
