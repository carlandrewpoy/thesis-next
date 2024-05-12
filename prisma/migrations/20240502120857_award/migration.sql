/*
  Warnings:

  - You are about to drop the column `researchers` on the `award` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `award` DROP COLUMN `researchers`;

-- CreateTable
CREATE TABLE `_AwardToFaculty` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AwardToFaculty_AB_unique`(`A`, `B`),
    INDEX `_AwardToFaculty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AwardToFaculty` ADD CONSTRAINT `_AwardToFaculty_A_fkey` FOREIGN KEY (`A`) REFERENCES `Award`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AwardToFaculty` ADD CONSTRAINT `_AwardToFaculty_B_fkey` FOREIGN KEY (`B`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
