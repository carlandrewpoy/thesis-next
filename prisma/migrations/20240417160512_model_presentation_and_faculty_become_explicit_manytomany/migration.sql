/*
  Warnings:

  - You are about to drop the `researchersonpresentation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `researchersonpresentation` DROP FOREIGN KEY `ResearchersOnPresentation_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `researchersonpresentation` DROP FOREIGN KEY `ResearchersOnPresentation_presentationID_fkey`;

-- DropTable
DROP TABLE `researchersonpresentation`;

-- CreateTable
CREATE TABLE `_FacultyToPresentation` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FacultyToPresentation_AB_unique`(`A`, `B`),
    INDEX `_FacultyToPresentation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FacultyToPresentation` ADD CONSTRAINT `_FacultyToPresentation_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToPresentation` ADD CONSTRAINT `_FacultyToPresentation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Presentation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
