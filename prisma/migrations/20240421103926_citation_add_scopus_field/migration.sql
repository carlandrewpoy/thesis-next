/*
  Warnings:

  - Added the required column `scopus` to the `Citation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `citation` ADD COLUMN `scopus` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `title` VARCHAR(191) NULL;
