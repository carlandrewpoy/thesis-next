/*
  Warnings:

  - You are about to drop the column `userId` on the `auditlog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `AuditLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `auditlog` DROP FOREIGN KEY `AuditLog_userId_fkey`;

-- AlterTable
ALTER TABLE `auditlog` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `AuditLog_userEmail_key` ON `AuditLog`(`userEmail`);

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
