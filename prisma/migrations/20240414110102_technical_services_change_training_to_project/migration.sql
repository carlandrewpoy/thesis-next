/*
  Warnings:

  - You are about to drop the column `trainingId` on the `technicalservice` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `TechnicalService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `technicalservice` DROP FOREIGN KEY `TechnicalService_trainingId_fkey`;

-- AlterTable
ALTER TABLE `technicalservice` DROP COLUMN `trainingId`,
    ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TechnicalService` ADD CONSTRAINT `TechnicalService_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
