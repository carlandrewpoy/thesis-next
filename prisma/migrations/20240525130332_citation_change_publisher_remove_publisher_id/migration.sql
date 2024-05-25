/*
  Warnings:

  - You are about to drop the column `publisherNameId` on the `citation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Citation_publisherNameId_fkey` ON `citation`;

-- AlterTable
ALTER TABLE `citation` DROP COLUMN `publisherNameId`;
