/*
  Warnings:

  - Made the column `name` on table `center` required. This step will fail if there are existing NULL values in that column.
  - Made the column `collegeId` on table `center` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `college` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `college` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `faculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `faculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `faculty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `center` DROP FOREIGN KEY `Center_collegeId_fkey`;

-- AlterTable
ALTER TABLE `center` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `collegeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `college` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `faculty` MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    MODIFY `position` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `superAdmin` BOOLEAN NULL DEFAULT false,
    MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Center` ADD CONSTRAINT `Center_collegeId_fkey` FOREIGN KEY (`collegeId`) REFERENCES `College`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
