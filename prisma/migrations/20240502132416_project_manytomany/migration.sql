/*
  Warnings:

  - You are about to drop the column `projectLeader` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `researchWorkers` on the `project` table. All the data in the column will be lost.
  - Added the required column `projectLeaderId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `projectLeader`,
    DROP COLUMN `researchWorkers`,
    ADD COLUMN `projectLeaderId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_FacultyToProject` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FacultyToProject_AB_unique`(`A`, `B`),
    INDEX `_FacultyToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_projectLeaderId_fkey` FOREIGN KEY (`projectLeaderId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToProject` ADD CONSTRAINT `_FacultyToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FacultyToProject` ADD CONSTRAINT `_FacultyToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
