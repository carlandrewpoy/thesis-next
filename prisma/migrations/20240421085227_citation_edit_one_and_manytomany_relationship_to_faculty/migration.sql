/*
  Warnings:

  - You are about to drop the column `publisherName` on the `citation` table. All the data in the column will be lost.
  - You are about to drop the column `researchers` on the `citation` table. All the data in the column will be lost.
  - Added the required column `publisherNameId` to the `Citation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `citation` DROP COLUMN `publisherName`,
    DROP COLUMN `researchers`,
    ADD COLUMN `publisherNameId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_CitationResearchers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CitationResearchers_AB_unique`(`A`, `B`),
    INDEX `_CitationResearchers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Citation` ADD CONSTRAINT `Citation_publisherNameId_fkey` FOREIGN KEY (`publisherNameId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitationResearchers` ADD CONSTRAINT `_CitationResearchers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Citation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CitationResearchers` ADD CONSTRAINT `_CitationResearchers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
