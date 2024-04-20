/*
  Warnings:

  - You are about to drop the column `researchers` on the `presentation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `presentation` DROP COLUMN `researchers`;

-- CreateTable
CREATE TABLE `ResearchersOnPresentation` (
    `presentationID` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`presentationID`, `facultyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ResearchersOnPresentation` ADD CONSTRAINT `ResearchersOnPresentation_presentationID_fkey` FOREIGN KEY (`presentationID`) REFERENCES `Presentation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchersOnPresentation` ADD CONSTRAINT `ResearchersOnPresentation_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
