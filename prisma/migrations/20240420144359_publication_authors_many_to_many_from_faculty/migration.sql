/*
  Warnings:

  - You are about to drop the column `authors` on the `publication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `publication` DROP COLUMN `authors`;

-- CreateTable
CREATE TABLE `_FacultyToPublication` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FacultyToPublication_AB_unique`(`A`, `B`),
    INDEX `_FacultyToPublication_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FacultyToPublication` ADD CONSTRAINT `_FacultyToPublication_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToPublication` ADD CONSTRAINT `_FacultyToPublication_B_fkey` FOREIGN KEY (`B`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
