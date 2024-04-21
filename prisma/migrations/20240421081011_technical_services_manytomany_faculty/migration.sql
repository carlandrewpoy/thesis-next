/*
  Warnings:

  - You are about to drop the column `faculty` on the `technicalservice` table. All the data in the column will be lost.
  - You are about to drop the column `organizer` on the `technicalservice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `training` DROP FOREIGN KEY `Training_projectId_fkey`;

-- AlterTable
ALTER TABLE `technicalservice` DROP COLUMN `faculty`,
    DROP COLUMN `organizer`;

-- AlterTable
ALTER TABLE `training` MODIFY `projectId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_Organizers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Organizers_AB_unique`(`A`, `B`),
    INDEX `_Organizers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InvitedFaculty` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_InvitedFaculty_AB_unique`(`A`, `B`),
    INDEX `_InvitedFaculty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Organizers` ADD CONSTRAINT `_Organizers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Organizers` ADD CONSTRAINT `_Organizers_B_fkey` FOREIGN KEY (`B`) REFERENCES `TechnicalService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InvitedFaculty` ADD CONSTRAINT `_InvitedFaculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InvitedFaculty` ADD CONSTRAINT `_InvitedFaculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `TechnicalService`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
