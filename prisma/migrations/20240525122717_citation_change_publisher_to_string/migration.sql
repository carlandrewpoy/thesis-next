/*
  Warnings:

  - Added the required column `publisherName` to the `Citation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `citation` DROP FOREIGN KEY `Citation_publisherNameId_fkey`;

-- AlterTable
ALTER TABLE `citation` ADD COLUMN `publisherName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` ALTER COLUMN `centerId` DROP DEFAULT;
